import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import OptionButton, { OptionState } from '../components/OptionButton';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';

type QuizRoute = RouteProp<RootStackParamList, 'Quiz'>;
type QuizNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Quiz'>;

export default function QuizScreen() {
  const { params } = useRoute<QuizRoute>();
  const navigation = useNavigation<QuizNavigationProp>();
  const { addScore } = useSkillContext();
  const { theme } = useTheme();
  const skill = React.useMemo(
    () => MOCK_MICRO_SKILLS.find((s) => s.id === (params?.skillId ?? '')) ?? MOCK_MICRO_SKILLS[0],
    [params?.skillId]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const question = skill.quiz[currentQuestionIndex];

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [state, setState] = React.useState<OptionState>('unanswered');
  
  // Quiz sonuç takibi
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  const [earnedPoints, setEarnedPoints] = React.useState(0);

  // Progress bar animation
  const progressWidth = useSharedValue(0);
  
  // ScrollView ref for auto-scroll to explanation
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Animate progress bar when question changes
    const targetProgress = ((currentQuestionIndex + 1) / skill.quiz.length) * 100;
    progressWidth.value = withTiming(targetProgress, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentQuestionIndex, skill.quiz.length, progressWidth]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const handleSelect = async (index: number) => {
    if (selectedIndex !== null) return;
    
    // Cevabı işaretle
    setSelectedIndex(index);
    const isCorrect = index === question.correctOptionIndex;
    setState(isCorrect ? 'correct' : 'incorrect');
    
    // Haptic Feedback - Cihaz titreşimi
    if (isCorrect) {
      // Doğru cevap için yumuşak başarı titreşimi
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const pointsEarned = 10;
      addScore(pointsEarned, skill.id);
      
      // Kazanılan puanları ve doğru cevap sayısını kaydet
      setEarnedPoints(prev => prev + pointsEarned);
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      // Yanlış cevap için hata titreşimi
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // Açıklama kartına scroll et
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 600);
  };

  const handleContinue = async () => {
    const isCorrect = selectedIndex === question.correctOptionIndex;
    
    // Butona tıklama haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (currentQuestionIndex < skill.quiz.length - 1) {
      // Sonraki soruya geç
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedIndex(null);
      setState('unanswered');
    } else {
      // Quiz bitti - Navigate to QuizResult screen with results
      navigation.navigate('QuizResult', {
        earnedPoints: earnedPoints + (isCorrect ? 10 : 0),
        correctAnswers: correctAnswersCount + (isCorrect ? 1 : 0),
        totalQuestions: skill.quiz.length,
        skillTitle: skill.title,
      });
    }
  };

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Bar */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
              <Animated.View 
                style={[
                  styles.progressFill,
                  { backgroundColor: theme.primary },
                  progressBarStyle
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              Soru {currentQuestionIndex + 1} / {skill.quiz.length}
            </Text>
          </Animated.View>

          {/* Question Card */}
          <Animated.View entering={FadeInDown.delay(200)} style={[styles.questionCard, {
            backgroundColor: theme.surface,
            borderColor: theme.border
          }]}>
            <View style={styles.skillHeader}>
              <Text style={[styles.skillCategory, { color: theme.primary }]}>{skill.category}</Text>
              <Text style={[styles.skillTitle, { color: theme.text }]}>{skill.title}</Text>
            </View>
            <Text style={[styles.questionText, { color: theme.text }]}>{question.question}</Text>
          </Animated.View>

          {/* Options */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.optionsContainer}>
            {question.options.map((option, idx) => {
              let optionState: OptionState = 'unanswered';
              if (selectedIndex !== null) {
                if (idx === question.correctOptionIndex) {
                  optionState = 'correct';
                } else if (idx === selectedIndex) {
                  optionState = 'incorrect';
                }
              }
              
              return (
                <OptionButton
                  key={idx}
                  option={option}
                  state={optionState}
                  disabled={selectedIndex !== null}
                  onPress={() => handleSelect(idx)}
                />
              );
            })}
          </Animated.View>

          {/* Explanation Card - Shows after answer is selected */}
          {selectedIndex !== null && question.explanation && (
            <Animated.View 
              entering={FadeInDown.delay(500).springify().damping(15)} 
              style={[
                styles.explanationCard,
                state === 'correct' ? [styles.explanationCorrect, {
                  backgroundColor: theme.success + '15',
                  borderColor: theme.success
                }] : [styles.explanationIncorrect, {
                  backgroundColor: theme.warning + '10',
                  borderColor: theme.warning
                }]
              ]}
            >
              <View style={[styles.explanationHeader, { borderBottomColor: theme.border }]}>
                <View style={[
                  styles.explanationIconContainer,
                  state === 'correct' ? [styles.iconContainerCorrect, {
                    backgroundColor: theme.success + '30'
                  }] : [styles.iconContainerIncorrect, {
                    backgroundColor: theme.warning + '30'
                  }]
                ]}>
                  <Text style={styles.explanationIcon}>
                    {state === 'correct' ? '✅' : '💡'}
                  </Text>
                </View>
                <View style={styles.explanationTitleContainer}>
                  <Text style={[
                    styles.explanationTitle,
                    state === 'correct' ? [styles.titleCorrect, { color: theme.success }] : [styles.titleIncorrect, { color: theme.warning }]
                  ]}>
                    {state === 'correct' ? 'Doğru Cevap!' : 'Öğrenelim'}
                  </Text>
                  <Text style={[styles.explanationSubtitle, { color: theme.textSecondary }]}>
                    {state === 'correct' 
                      ? 'Harika! İşte detaylar...' 
                      : 'İşte doğru açıklama...'}
                  </Text>
                </View>
              </View>
              
              {/* Correct Answer Display */}
              {state === 'incorrect' && (
                <View style={[styles.correctAnswerSection, {
                  backgroundColor: theme.success + '10',
                  borderLeftColor: theme.success
                }]}>
                  <Text style={[styles.correctAnswerLabel, { color: theme.success }]}>Doğru Cevap:</Text>
                  <Text style={[styles.correctAnswerText, { color: theme.text }]}>
                    {question.options[question.correctOptionIndex]}
                  </Text>
                </View>
              )}

              {/* Explanation Text */}
              <View style={styles.explanationContent}>
                <Text style={[styles.explanationText, { color: theme.text }]}>{question.explanation}</Text>
              </View>

              {/* Bottom Badge */}
              <View style={[styles.explanationFooter, { borderTopColor: theme.border }]}>
                <Text style={[styles.footerText, { color: theme.primary }]}>
                  {state === 'correct' ? '🎯 +10 Puan Kazandın!' : '📚 Doğru cevabı öğrendin!'}
                </Text>
              </View>

              {/* Continue Button */}
              <Animated.View entering={FadeInUp.delay(200)}>
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    state === 'correct' ? [styles.continueButtonSuccess, {
                      backgroundColor: theme.success
                    }] : [styles.continueButtonWarning, {
                      backgroundColor: theme.primary
                    }]
                  ]}
                  onPress={handleContinue}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.continueButtonText, { color: theme.textInverted }]}>
                    {currentQuestionIndex < skill.quiz.length - 1 ? 'Sonraki Soru →' : 'Sonuçları Gör 🎉'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: { 
    flex: 1, 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  // Progress
  progressContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Question Card
  questionCard: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    ...shadows.md,
  },
  skillHeader: {
    marginBottom: spacing.lg,
  },
  skillCategory: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },

  // Options
  optionsContainer: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },

  // Explanation Card
  explanationCard: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    ...shadows.lg,
  },
  explanationCorrect: {
  },
  explanationIncorrect: {
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  explanationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerCorrect: {
  },
  iconContainerIncorrect: {
  },
  explanationIcon: {
    fontSize: 24,
  },
  explanationTitleContainer: {
    flex: 1,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 2,
  },
  titleCorrect: {
  },
  titleIncorrect: {
  },
  explanationSubtitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  correctAnswerSection: {
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
  },
  correctAnswerLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  explanationContent: {
    marginBottom: spacing.md,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  explanationFooter: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
  },
  
  // Continue Button
  continueButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonSuccess: {
  },
  continueButtonWarning: {
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
