import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';

type LessonRoute = RouteProp<RootStackParamList, 'Lesson'>;
type LessonNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Lesson'>;

const CATEGORY_EMOJIS: Record<string, string> = {
  'Yapay Zeka': '🤖',
  'Startup': '🚀',
  'Teknoloji': '💻',
  'İş & Kariyer': '💼',
  'İletişim': '💬',
  'Kişisel Gelişim': '🌱',
  'Yaratıcılık': '🎨',
  'Tarih & Kültür': '📚',
};

// Lesson steps structure
type LessonStep = {
  title: string;
  icon: string;
  content: React.ReactNode;
};

export default function LessonScreen() {
  const { params } = useRoute<LessonRoute>();
  const navigation = useNavigation<LessonNavigationProp>();
  const { canAccessPremium } = useSkillContext();
  const { theme } = useTheme();
  
  const skill = React.useMemo(
    () => MOCK_MICRO_SKILLS.find((s) => s.id === (params?.skillId ?? '')) ?? MOCK_MICRO_SKILLS[0],
    [params?.skillId]
  );

  const hasAccess = canAccessPremium(skill.id);
  const categoryEmoji = CATEGORY_EMOJIS[skill.category] || '📌';

  // Step management
  const [currentStep, setCurrentStep] = React.useState(0);
  
  // Progress bar animation
  const progressWidth = useSharedValue(0);
  
  // Split content into larger chunks for content cards
  const contentChunks = React.useMemo(() => {
    const fullContent = skill.content || skill.summary;
    // Split by paragraphs
    const paragraphs = fullContent.split(/\n\n+/).filter(chunk => chunk.trim());
    
    // If we have multiple paragraphs, group them into 2 chunks max
    if (paragraphs.length > 1) {
      const midPoint = Math.ceil(paragraphs.length / 2);
      return [
        paragraphs.slice(0, midPoint).join('\n\n'),
        paragraphs.slice(midPoint).join('\n\n')
      ].filter(chunk => chunk.trim());
    }
    
    // If no paragraphs, split by sentences into 2 larger groups
    const sentences = fullContent.match(/[^.!?]+[.!?]+/g) || [fullContent];
    if (sentences.length > 3) {
      const midPoint = Math.ceil(sentences.length / 2);
      return [
        sentences.slice(0, midPoint).join(' ').trim(),
        sentences.slice(midPoint).join(' ').trim()
      ];
    }
    
    // If very short content, keep as single chunk
    return [fullContent];
  }, [skill.content, skill.summary]);
  
  // Create lesson steps - flatten all content cards into main steps
  const lessonSteps: LessonStep[] = React.useMemo(() => {
    const steps: LessonStep[] = [];
    
    // Step 1: Introduction
    steps.push({
      title: 'Giriş',
      icon: '👋',
      content: (
        <View>
          <View style={[styles.categoryBadge, { backgroundColor: theme.primaryLight + '30' }]}>
            <Text style={styles.categoryEmoji}>{categoryEmoji}</Text>
            <Text style={[styles.categoryText, { color: theme.primary }]}>{skill.category}</Text>
          </View>
          <Text style={[styles.stepTitle, { color: theme.text }]}>{skill.title}</Text>
          <View style={styles.metaRow}>
            <View style={[styles.metaItem, { backgroundColor: theme.backgroundDark }]}>
              <Text style={styles.metaIcon}>⏱</Text>
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>{skill.durationMinutes} dakika</Text>
            </View>
            {skill.isPremium && (
              <View style={[styles.metaItem, { backgroundColor: theme.premiumLight }]}>
                <Text style={styles.metaIcon}>💎</Text>
                <Text style={[styles.metaText, { color: theme.premium }]}>Premium</Text>
              </View>
            )}
          </View>
          <View style={[styles.contentSection, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.sectionLabel, { color: theme.primary }]}>Ne Öğreneceksin?</Text>
            <Text style={[styles.summary, { color: theme.text }]}>{skill.summary}</Text>
          </View>
        </View>
      )
    });

    // Steps 2-N: Content cards (each chunk becomes a separate step)
    contentChunks.forEach((chunk, index) => {
      steps.push({
        title: `Detaylı Bilgi ${index + 1}`,
        icon: '📖',
        content: (
          <View>
            <View style={styles.contentStepHeader}>
              <Text style={[styles.stepTitle, { color: theme.text }]}>Detaylı Bilgi</Text>
              <Text style={[styles.cardCounter, { color: theme.textSecondary }]}>
                Kart {index + 1} / {contentChunks.length}
              </Text>
            </View>
            
            <View style={[styles.contentSection, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={[styles.contentCardHeader, { backgroundColor: theme.primary + '10' }]}>
                <Text style={[styles.contentCardNumber, { color: theme.primary }]}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[styles.content, { color: theme.text }]}>
                {chunk}
              </Text>
            </View>
          </View>
        )
      });
    });

    // Step N+1: Key Points
    steps.push({
      title: 'Önemli Noktalar',
      icon: '✨',
      content: (
        <View>
          <Text style={[styles.stepTitle, { color: theme.text }]}>Önemli Noktalar</Text>
          <View style={[styles.contentSection, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.keyPoints}>
              <View style={styles.keyPoint}>
                <View style={styles.bulletContainer}>
                  <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
                </View>
                <Text style={[styles.keyPointText, { color: theme.text }]}>5 dakikada hızlı öğrenme</Text>
              </View>
              <View style={styles.keyPoint}>
                <View style={styles.bulletContainer}>
                  <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
                </View>
                <Text style={[styles.keyPointText, { color: theme.text }]}>Pratik uygulanabilir bilgiler</Text>
              </View>
              <View style={styles.keyPoint}>
                <View style={styles.bulletContainer}>
                  <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
                </View>
                <Text style={[styles.keyPointText, { color: theme.text }]}>Quiz ile pekiştirme</Text>
              </View>
            </View>
          </View>
        </View>
      )
    });

    // Final Step: Summary & Quiz
    steps.push({
      title: 'Özet & Quiz',
      icon: '🎯',
      content: (
        <View>
          <Text style={[styles.stepTitle, { color: theme.text }]}>Harika! Eğitimi Tamamladın 🎉</Text>
          <View style={[styles.contentSection, { backgroundColor: theme.success + '15', borderColor: theme.success }]}>
            <Text style={[styles.completionText, { color: theme.text }]}>
              {skill.title} konusunu başarıyla tamamladın! Şimdi bilgini test etme zamanı.
            </Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Bu Eğitimde Öğrendiğin:</Text>
            <Text style={[styles.summaryContent, { color: theme.text }]}>{skill.summary}</Text>
          </View>
        </View>
      )
    });

    return steps;
  }, [skill, theme, categoryEmoji, contentChunks]);
  
  const totalSteps = lessonSteps.length;
  
  useEffect(() => {
    // Animate progress bar when step changes
    const targetProgress = ((currentStep + 1) / totalSteps) * 100;
    progressWidth.value = withTiming(targetProgress, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentStep, totalSteps, progressWidth]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const handleNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleQuizPress = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    if (!hasAccess) {
      Alert.alert(
        '💎 Premium Gerekli',
        'Bu içerik premium kullanıcılar içindir. Premium\'a geçmek ister misiniz?',
        [
          { text: 'Vazgeç', style: 'cancel' },
          { 
            text: 'Premium\'a Geç', 
            onPress: () => {
              navigation.navigate('Payment');
            }
          },
        ]
      );
      return;
    }
    
    // Navigate to Quiz screen with skillId parameter
    navigation.navigate('Quiz', { skillId: skill.id });
  };

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.container}>
          {/* Progress Bar - Fixed at top */}
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
              Adım {currentStep + 1} / {totalSteps} {lessonSteps[currentStep].icon}
            </Text>
          </Animated.View>

          {/* Step Content Card - Scrollable full height */}
          <Animated.View 
            key={currentStep}
            entering={FadeInRight.duration(400).springify()}
            style={[styles.stepCard, { 
              backgroundColor: theme.surface,
              borderColor: theme.border 
            }]}
          >
            <ScrollView 
              style={styles.cardScrollView}
              contentContainerStyle={styles.cardScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {lessonSteps[currentStep].content}
            </ScrollView>
          </Animated.View>

          {/* Navigation Buttons - Fixed at bottom */}
          <Animated.View entering={FadeInUp.delay(300)} style={styles.navigationContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton, { 
                  backgroundColor: theme.surface,
                  borderColor: theme.border 
                }]}
                onPress={handlePrevious}
                activeOpacity={0.8}
              >
                <Text style={[styles.navButtonText, { color: theme.text }]}>← Geri</Text>
              </TouchableOpacity>
            )}
            
            {currentStep < totalSteps - 1 ? (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton, { 
                  backgroundColor: theme.primary,
                  flex: currentStep === 0 ? 1 : undefined
                }]}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={[styles.navButtonText, { color: theme.textInverted }]}>İleri →</Text>
              </TouchableOpacity>
            ) : (
          <TouchableOpacity
                style={[styles.quizButton, { 
                  backgroundColor: hasAccess ? theme.success : theme.backgroundTertiary,
                  borderColor: hasAccess ? theme.success : theme.premium,
                  flex: 1
                }]}
            onPress={handleQuizPress}
            activeOpacity={0.9}
          >
                <Text style={[styles.quizButtonText, { color: hasAccess ? theme.textInverted : theme.text }]}>
                  {hasAccess ? '🎯 Quiz\'e Başla' : '🔒 Premium Gerekli'}
            </Text>
                <Text style={[styles.quizButtonSubtext, { 
                  color: hasAccess ? theme.textInverted + 'CC' : theme.textSecondary 
                }]}>
                  {hasAccess ? 'Bilgini test et!' : 'Premium\'a geç'}
            </Text>
          </TouchableOpacity>
            )}
          </Animated.View>
        </View>
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
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  // Progress Bar
  progressContainer: {
    marginBottom: spacing.md,
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

  // Step Card
  stepCard: {
    borderRadius: radii.xxl,
    borderWidth: 1,
    ...shadows.lg,
    flex: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  cardScrollView: {
    flex: 1,
  },
  cardScrollContent: {
    padding: spacing.xl,
    flexGrow: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: spacing.xl,
    lineHeight: 36,
    textAlign: 'center',
  },
  
  // Category Badge
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    marginBottom: spacing.lg,
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  
  // Meta Row
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
    justifyContent: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
  },
  metaIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Content Section
  contentStepHeader: {
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardCounter: {
    fontSize: 14,
    fontWeight: '700',
  },
  contentSection: {
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginTop: spacing.lg,
    borderWidth: 0,
    position: 'relative',
  },
  contentCardHeader: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCardNumber: {
    fontSize: 16,
    fontWeight: '900',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  summary: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Key Points
  keyPoints: {
    gap: spacing.lg,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletContainer: {
    marginTop: 8,
    marginRight: spacing.md,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  keyPointText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 26,
  },

  // Completion & Summary
  completionText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  summaryBox: {
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginTop: spacing.xl,
    borderWidth: 1,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  summaryContent: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Navigation Buttons
  navigationContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  navButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  prevButton: {
    borderWidth: 2,
  },
  nextButton: {
    flex: 1,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },

  // Quiz Button
  quizButton: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    alignItems: 'center',
    borderWidth: 2,
    ...shadows.lg,
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  quizButtonSubtext: {
    fontSize: 14,
    fontWeight: '600',
  },
});




