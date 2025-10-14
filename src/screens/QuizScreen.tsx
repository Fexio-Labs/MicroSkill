import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import OptionButton, { OptionState } from '../components/OptionButton';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../styles/theme';

type QuizRoute = RouteProp<RootStackParamList, 'Quiz'>;

export default function QuizScreen() {
  const { params } = useRoute<QuizRoute>();
  const navigation = useNavigation();
  const { addScore } = useSkillContext();
  const skill = React.useMemo(
    () => MOCK_MICRO_SKILLS.find((s) => s.id === (params?.skillId ?? '')) ?? MOCK_MICRO_SKILLS[0],
    [params?.skillId]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const question = skill.quiz[currentQuestionIndex];

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [state, setState] = React.useState<OptionState>('unanswered');

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const isCorrect = index === question.correctOptionIndex;
    setState(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      addScore(10, skill.id);
    }

    // 1.2 saniye sonra sonraki soruya geç
    setTimeout(() => {
      if (currentQuestionIndex < skill.quiz.length - 1) {
        // Sonraki soru
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedIndex(null);
        setState('unanswered');
      } else {
        // Quiz bitti
        // @ts-ignore untyped navigate on web
        navigation.navigate('QuizResult' as never);
      }
    }, 1200);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Bar */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestionIndex + 1) / skill.quiz.length) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1} / {skill.quiz.length}
            </Text>
          </Animated.View>

          {/* Question Card */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.questionCard}>
            <View style={styles.skillHeader}>
              <Text style={styles.skillCategory}>{skill.category}</Text>
              <Text style={styles.skillTitle}>{skill.title}</Text>
            </View>
            <Text style={styles.questionText}>{question.question}</Text>
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

          {/* Explanation (if answered) */}
          {selectedIndex !== null && question.explanation && (
            <Animated.View entering={FadeInDown.delay(400)} style={styles.explanationCard}>
              <View style={styles.explanationHeader}>
                <Text style={styles.explanationIcon}>💡</Text>
                <Text style={styles.explanationTitle}>Açıklama</Text>
              </View>
              <Text style={styles.explanationText}>{question.explanation}</Text>
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
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Question Card
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skillHeader: {
    marginBottom: spacing.lg,
  },
  skillCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 28,
    textAlign: 'center',
  },

  // Options
  optionsContainer: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },

  // Explanation
  explanationCard: {
    backgroundColor: colors.accent + '10',
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent + '30',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  explanationIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.accent,
  },
  explanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
