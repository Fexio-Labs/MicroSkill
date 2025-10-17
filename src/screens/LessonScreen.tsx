import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
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

// Helper function to render formatted text with markdown
const renderFormattedText = (text: string, theme: any) => {
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <View>
      {lines.map((line, lineIndex) => {
        const trimmedLine = line.trim();
        
        // Skip empty lines
        if (!trimmedLine) return null;
        
        // Check for numbered list (1., 2., etc.)
        const numberedMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);
        if (numberedMatch) {
          const [, number, content] = numberedMatch;
          return (
            <View key={lineIndex} style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' }}>
              <View style={{ 
                width: 28, 
                height: 28, 
                borderRadius: 14, 
                backgroundColor: theme.primary + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: theme.primary }}>{number}</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 16, lineHeight: 24, fontWeight: '500', color: theme.text }}>
                {renderTextSegments(content, theme)}
              </Text>
            </View>
          );
        }
        
        // Check for bullet list (-, •, *)
        const bulletMatch = trimmedLine.match(/^[-•*]\s*(.+)/);
        if (bulletMatch) {
          const content = bulletMatch[1];
          return (
            <View key={lineIndex} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' }}>
              <View style={{ 
                width: 8, 
                height: 8, 
                borderRadius: 4, 
                backgroundColor: theme.primary,
                marginTop: 8,
                marginRight: 12
              }} />
              <Text style={{ flex: 1, fontSize: 20, lineHeight: 24, fontWeight: '600', color: theme.text }}>
                {renderTextSegments(content, theme)}
              </Text>
            </View>
          );
        }
        
        // Check for header (ends with :)
        if (trimmedLine.endsWith(':')) {
          return (
            <Text key={lineIndex} style={{ 
              fontSize: 18, 
              fontWeight: '900', 
              color: theme.primary,
              marginTop: 16,
              marginBottom: 12,
              textAlign: 'center'
            }}>
              {trimmedLine}
            </Text>
          );
        }
        
        // Regular paragraph
        return (
          <Text key={lineIndex} style={{ 
            fontSize: 17, 
            lineHeight: 28, 
            fontWeight: '500', 
            color: theme.text,
            marginBottom: 12,
            textAlign: 'center'
          }}>
            {renderTextSegments(trimmedLine, theme)}
          </Text>
        );
      })}
    </View>
  );
};

// Helper to render bold text within a line
const renderTextSegments = (text: string, theme: any) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <Text key={index} style={{ fontWeight: '900', color: theme.text }}>
          {boldText}
        </Text>
      );
    }
    return part;
  });
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
  
  // Split content into bite-sized chunks that fit on screen WITHOUT scrolling
  const contentChunks = React.useMemo(() => {
    const fullContent = skill.content || skill.summary;
    
    // Remove markdown and clean content first
    const cleanContent = fullContent.replace(/\*\*/g, '');
    
    // Split by sentences
    const sentences = cleanContent.match(/[^.!?]+[.!?]+/g) || [cleanContent];
    
    // Each chunk = ONLY 1 sentence (to ensure it fits without scrolling)
    const chunks: string[] = sentences.map(s => s.trim()).filter(s => s.length > 0);
    
    // If content is very long, limit to max 8 cards
    if (chunks.length > 8) {
      // Group sentences to reduce card count
      const grouped: string[] = [];
      const groupSize = Math.ceil(chunks.length / 8);
      for (let i = 0; i < chunks.length; i += groupSize) {
        grouped.push(chunks.slice(i, i + groupSize).join(' '));
      }
      return grouped;
    }
    
    return chunks;
  }, [skill.content, skill.summary]);


  // Generate smart titles based on content chunks
  const contentTitles = React.useMemo(() => {
    const titles: string[] = [];
    
    contentChunks.forEach((chunk, index) => {
      // Try to extract a topic from the first few words
      const firstWords = chunk.split(' ').slice(0, 4).join(' ');
      const cleanTitle = firstWords.replace(/[.!?]/g, '').trim();
      
      // If the title is too short or generic, use position-based titles
      if (cleanTitle.length < 10) {
        const positionTitles = [
          'Temel Kavramlar',
          'Detaylar',
          'İleri Seviye',
          'Uygulama',
          'Derinlemesine İnceleme',
          'Ek Bilgiler'
        ];
        titles.push(positionTitles[index % positionTitles.length]);
      } else {
        titles.push(cleanTitle.length > 35 ? cleanTitle.substring(0, 32) + '...' : cleanTitle);
      }
    });
    
    return titles;
  }, [contentChunks]);

  // Generate engaging learning outcomes (max 5-6)
  const learningOutcomes = React.useMemo(() => {
    // Skill-specific engaging outcomes
    const categoryOutcomes: Record<string, string[]> = {
      'Yapay Zeka': [
        'Yapay zekanın temel prensiplerini anlayacaksın',
        'Günlük hayatta AI kullanımını keşfedeceksin',
        'Makine öğrenmesinin mantığını kavrayacaksın',
        'AI araçlarını etkili kullanabileceksin',
        'Yapay zeka trendlerini takip edebileceksin',
      ],
      'Startup': [
        'Startup kurmanın ilk adımlarını öğreneceksin',
        'İş modelini nasıl oluşturacağını bileceksin',
        'Yatırımcılara sunum yapma becerisi kazanacaksın',
        'Pazarlama stratejilerini öğreneceksin',
        'Startup ekosistemini anlayacaksın',
      ],
      'Teknoloji': [
        'En son teknoloji trendlerini keşfedeceksin',
        'Teknik kavramları kolayca anlayacaksın',
        'Pratik uygulamalar yapabileceksin',
        'Günlük işlerinde teknoloji kullanacaksın',
        'Dijital dünyada bir adım önde olacaksın',
      ],
      'İş & Kariyer': [
        'Kariyerinde hızlı ilerleme yöntemlerini öğreneceksin',
        'Etkili networking becerileri kazanacaksın',
        'İş görüşmelerinde başarılı olacaksın',
        'Profesyonel gelişim stratejileri edineceksin',
        'Liderlik becerilerini geliştreceksin',
      ],
      'İletişim': [
        'Etkili iletişim tekniklerini öğreneceksin',
        'İkna kabiliyetini geliştireceksin',
        'Dinleme becerilerini güçlendireceksin',
        'Beden dili okumayı öğreneceksin',
        'Empati kurma yeteneğin artacak',
      ],
      'Kişisel Gelişim': [
        'Kendini daha iyi tanıyacaksın',
        'Hedef belirleme stratejileri öğreneceksin',
        'Motivasyonunu yüksek tutmayı öğreneceksin',
        'Verimlilik alışkanlıkları kazanacaksın',
        'Öz güvenini artıracaksın',
      ],
      'Yaratıcılık': [
        'Yaratıcı düşünme tekniklerini öğreneceksin',
        'Problem çözme becerin gelişecek',
        'Yeni fikirler üretmeyi öğreneceksin',
        'Hayal gücünü güçlendireceksin',
        'İnovatif yaklaşımlar geliştireceksin',
      ],
      'Tarih & Kültür': [
        'Tarihi olayların arkasındaki hikayeyi öğreneceksin',
        'Kültürel zenginlikleri keşfedeceksin',
        'Geçmişten günümüze bağlantılar kuracaksın',
        'Farklı perspektifler kazanacaksın',
        'Dünya görüşün genişleyecek',
      ],
    };
    
    // Get outcomes for this category, or use generic ones
    const outcomes = categoryOutcomes[skill.category] || [
      'Bu konuda uzmanlaşacaksın',
      'Pratik bilgiler edineceksin',
      'Günlük hayatta uygulayabileceksin',
      'Yeni bir beceri kazanacaksın',
      'Kendini geliştirmiş olacaksın',
    ];
    
    // Return first 5 outcomes (consistent number)
    return outcomes.slice(0, 5);
  }, [skill.category]);
  
  // Create lesson steps - flatten all content cards into main steps
  const lessonSteps: LessonStep[] = React.useMemo(() => {
    const steps: LessonStep[] = [];
    
    // Examples for each content card
    const examples = [
      'Örnek: Günlük hayatta bu pratiği uygulayabilirsiniz',
      'Uygulama: Bu bilgiyi hemen kullanmaya başlayın',
      'İpucu: Bu tekniği sabah rutininize ekleyin',
      'Pratik: Öğrendiklerinizi test edin',
      'Deneme: Bu yöntemi bugün deneyin',
      'Not: Bu bilgiyi unutmayın',
    ];
    
    // Step 1: Introduction with learning outcomes
    steps.push({
      title: 'Giriş',
      icon: '👋',
      content: (
        <View>
          <View style={[styles.categoryBadge, { backgroundColor: theme.primaryLight + '30' }]}>
            <Text style={styles.categoryEmoji}>{categoryEmoji}</Text>
            <Text style={[styles.categoryText, { color: theme.primary }]}>{skill.category}</Text>
          </View>
          
          <Text style={[styles.introTitle, { color: theme.text }]}>{skill.title}</Text>
          
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

          <View style={[styles.outcomesSection, { backgroundColor: theme.accent + '10', borderColor: theme.accent + '40' }]}>
            <Text style={[styles.outcomesTitle, { color: theme.accent }]}>
              🎓 Eğitim bitince bunları öğrenmiş olacaksın:
            </Text>
            {learningOutcomes.map((outcome, idx) => (
              <View key={idx} style={styles.outcomeItem}>
                <Text style={[styles.outcomeIcon, { color: theme.accent }]}>✓</Text>
                <Text style={[styles.outcomeText, { color: theme.text }]}>{outcome}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.motivationBadge, { backgroundColor: theme.primary + '10' }]}>
            <Text style={[styles.motivationText, { color: theme.primary }]}>
              🚀 Hadi başlayalım!
            </Text>
          </View>
        </View>
      )
    });

    // Steps 2-N: Content cards (each chunk becomes a separate step)
    contentChunks.forEach((chunk, index) => {
      const example = examples[index % examples.length];
      const title = contentTitles[index];
      steps.push({
        title: title,
        icon: '📖',
        content: (
          <View style={styles.contentContainer}>
            <Text style={[styles.contentStepTitle, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.cardCounter, { color: theme.textSecondary }]}>
              Kart {index + 1} / {contentChunks.length}
            </Text>
            
            <View style={styles.contentTextContainer}>
              {renderFormattedText(chunk, theme)}
            </View>

            {/* Example Badge */}
            <View style={[styles.exampleBadge, { backgroundColor: theme.accent + '15' }]}>
              <Text style={[styles.exampleIcon, { color: theme.accent }]}>💡</Text>
              <Text style={[styles.exampleText, { color: theme.text }]}>{example}</Text>
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
  }, [skill, theme, categoryEmoji, contentChunks, contentTitles, learningOutcomes]);
  
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

          {/* Step Content Card - NO SCROLL, content fits perfectly */}
          <Animated.View 
            key={currentStep}
            entering={FadeInRight.duration(400).springify()}
            style={[styles.stepCard, { 
              backgroundColor: theme.surface,
              borderColor: theme.border 
            }]}
          >
            <View style={styles.cardContent}>
              {lessonSteps[currentStep].content}
          </View>
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
                <Text style={[styles.navButtonText, { color: theme.textInverted }]}>
                  {currentStep === 0 ? '🎓 Öğrenmeye Başla' : 'İleri →'}
                </Text>
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
  cardContent: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: spacing.md,
    lineHeight: 28,
    textAlign: 'center',
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: spacing.md,
    lineHeight: 32,
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

  // Content Section (new clean version)
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentStepTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: spacing.xs,
    lineHeight: 32,
    textAlign: 'center',
  },
  cardCounter: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  contentTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  contentSection: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 0,
    position: 'relative',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  summary: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Learning Outcomes Section
  outcomesSection: {
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 2,
  },
  outcomesTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
    paddingVertical: spacing.xs,
  },
  outcomeIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
    marginTop: 1,
  },
  outcomeText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Motivation Badge
  motivationBadge: {
    borderRadius: radii.md,
    padding: spacing.sm,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  motivationText: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },

  // Example Badge (simpler, no card)
  exampleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  exampleIcon: {
    fontSize: 16,
  },
  exampleText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  // Key Points
  keyPoints: {
    gap: spacing.md,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletContainer: {
    marginTop: 6,
    marginRight: spacing.md,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  keyPointText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },

  // Completion & Summary
  completionText: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 26,
    textAlign: 'center',
  },
  summaryBox: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  summaryContent: {
    fontSize: 16,
    lineHeight: 24,
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




