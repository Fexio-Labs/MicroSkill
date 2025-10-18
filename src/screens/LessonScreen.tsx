import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
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

// Helper function to get card configuration
const getCardConfig = (type: string, theme: any) => {
  const configs = {
    concept: { icon: '🧠', color: theme.primary },
    example: { icon: '💡', color: theme.warning },
    tip: { icon: '✨', color: theme.accent },
    definition: { icon: '📖', color: theme.secondary },
    practice: { icon: '🏋️', color: theme.danger },
    summary: { icon: '📋', color: theme.success },
    code: { icon: '💻', color: theme.primaryDark },
  };
  return configs[type as keyof typeof configs] || configs.concept;
};

// Lesson steps structure
type LessonStep = {
  title: string;
  icon: string;
  content: React.ReactNode;
};

// Helper function to render formatted text with markdown and code blocks
const renderFormattedText = (text: string, theme: any, codeBlocks?: Array<{ language: string; code: string }>) => {
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
      
      {/* Render code blocks if available */}
      {codeBlocks && codeBlocks.map((codeBlock, index) => (
        <View key={`code-${index}`} style={{
          backgroundColor: theme.backgroundTertiary,
          borderRadius: 8,
          padding: 12,
          marginTop: 12,
          borderLeftWidth: 4,
          borderLeftColor: theme.primary,
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '700',
            color: theme.primary,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            {codeBlock.language.toUpperCase()}
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'monospace',
            color: theme.text,
            lineHeight: 20,
          }}>
            {codeBlock.code}
          </Text>
        </View>
      ))}
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
  const [selectedCardType, setSelectedCardType] = React.useState<string>('all');
  
  // Progress bar animation
  const progressWidth = useSharedValue(0);
  
  // Enhanced content parsing and categorization
  const contentCards = React.useMemo(() => {
    const fullContent = skill.content || skill.summary;
    
    // Parse content into structured cards
    const cards: Array<{
      type: 'concept' | 'example' | 'tip' | 'definition' | 'practice' | 'summary' | 'code';
      title: string;
      content: string;
      icon: string;
      color: string;
      codeBlocks?: Array<{ language: string; code: string }>;
    }> = [];

    // Split by major sections (headers ending with :)
    const sections = fullContent.split(/\n\s*\n/).filter(section => section.trim());
    
    sections.forEach((section, sectionIndex) => {
      const lines = section.split('\n').filter(line => line.trim());
      let currentCard = '';
      let cardType: 'concept' | 'example' | 'tip' | 'definition' | 'practice' | 'summary' | 'code' = 'concept';
      let cardTitle = '';
      let codeBlocks: Array<{ language: string; code: string }> = [];
      let inCodeBlock = false;
      let currentCodeBlock = '';
      let currentLanguage = '';
      
      lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim();
        
        // Check for code block start
        if (trimmedLine.startsWith('```')) {
          if (inCodeBlock) {
            // End of code block
            if (currentCodeBlock.trim()) {
              codeBlocks.push({
                language: currentLanguage || 'text',
                code: currentCodeBlock.trim()
              });
            }
            currentCodeBlock = '';
            currentLanguage = '';
            inCodeBlock = false;
          } else {
            // Start of code block
            inCodeBlock = true;
            currentLanguage = trimmedLine.replace(/```/g, '').trim();
            if (!currentLanguage) currentLanguage = 'text';
          }
          return;
        }
        
        // If we're in a code block, collect code
        if (inCodeBlock) {
          currentCodeBlock += (currentCodeBlock ? '\n' : '') + line;
          return;
        }
        
        // Detect card type from content patterns
        if (trimmedLine.includes('**Temel Prensipleri:**') || 
            trimmedLine.includes('**Nasıl Çalışır?**') ||
            trimmedLine.includes('**Nedir?**') ||
            trimmedLine.includes('**Temel Kavramlar:**')) {
          cardType = 'concept';
          cardTitle = 'Temel Kavramlar';
        } else if (trimmedLine.includes('**Örnek') || 
                   trimmedLine.includes('**Gerçek Hayattan Örnek:**') ||
                   trimmedLine.includes('**Pratik Örnek:**')) {
          cardType = 'example';
          cardTitle = 'Gerçek Hayat Örneği';
        } else if (trimmedLine.includes('**Pro İpuçları:**') || 
                   trimmedLine.includes('**İpuçları:**') ||
                   trimmedLine.includes('**Tavsiye:**')) {
          cardType = 'tip';
          cardTitle = 'Uzman İpuçları';
        } else if (trimmedLine.includes('**Tanım:**') || 
                   trimmedLine.includes('**Açıklama:**')) {
          cardType = 'definition';
          cardTitle = 'Detaylı Tanım';
        } else if (trimmedLine.includes('**Alıştırma:**') || 
                   trimmedLine.includes('**Pratik:**') ||
                   trimmedLine.includes('**Deneme:**')) {
          cardType = 'practice';
          cardTitle = 'Pratik Uygulama';
        } else if (trimmedLine.includes('**Özet:**') || 
                   trimmedLine.includes('**Sonuç:**') ||
                   trimmedLine.includes('**Önemli Noktalar:**')) {
          cardType = 'summary';
          cardTitle = 'Özet';
        } else if (trimmedLine.includes('**') && trimmedLine.includes('**') && 
                   (trimmedLine.includes('Repository') || 
                    trimmedLine.includes('Değişiklik') || 
                    trimmedLine.includes('Branch') || 
                    trimmedLine.includes('Sunucu') ||
                    trimmedLine.includes('Komut') ||
                    trimmedLine.includes('Kod'))) {
          // Technical/Code related headers
          cardType = 'code';
          cardTitle = trimmedLine.replace(/[:\*\s]+$/, '').trim();
        } else if (trimmedLine.endsWith(':')) {
          // Generic header - try to extract meaningful title
          const headerText = trimmedLine.replace(/[:\*\s]+$/, '').trim();
          if (headerText.length > 3) {
            cardTitle = headerText;
          }
        } else if (trimmedLine.length > 0) {
          // Regular content line
          currentCard += (currentCard ? '\n' : '') + trimmedLine;
        }
      });
      
      // Create card if we have content or code blocks
      if (currentCard.trim() || codeBlocks.length > 0) {
        // If no specific title found, generate one based on content
        if (!cardTitle) {
          const firstWords = currentCard.split(' ').slice(0, 4).join(' ');
          cardTitle = firstWords.length > 20 ? firstWords.substring(0, 17) + '...' : firstWords;
        }
        
        // Clean content (remove markdown)
        const cleanContent = currentCard.replace(/\*\*/g, '').trim();
        
        // Get card styling
        const cardConfig = getCardConfig(cardType, theme);
        
        cards.push({
          type: cardType,
          title: cardTitle,
          content: cleanContent,
          icon: cardConfig.icon,
          color: cardConfig.color,
          codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined,
        });
        
        // Reset for next card
        currentCard = '';
        cardType = 'concept';
        cardTitle = '';
        codeBlocks = [];
      }
    });
    
    // If no structured cards found, create basic ones from content
    if (cards.length === 0) {
      const sentences = fullContent.replace(/\*\*/g, '').split(/[.!?]+/).filter(s => s.trim().length > 10);
      const chunkSize = Math.ceil(sentences.length / 4); // Max 4 cards
      
      for (let i = 0; i < sentences.length; i += chunkSize) {
        const chunk = sentences.slice(i, i + chunkSize).join('. ').trim();
        if (chunk) {
          const firstWords = chunk.split(' ').slice(0, 4).join(' ');
          const cardConfig = getCardConfig('concept', theme);
          cards.push({
            type: 'concept',
            title: firstWords.length > 20 ? firstWords.substring(0, 17) + '...' : firstWords,
            content: chunk,
            icon: cardConfig.icon,
            color: cardConfig.color,
          });
        }
      }
    }
    
    return cards;
  }, [skill.content, skill.summary, theme.primary]);



  // Filter cards based on selected type
  const filteredCards = React.useMemo(() => {
    if (selectedCardType === 'all') {
      return contentCards;
    }
    return contentCards.filter(card => card.type === selectedCardType);
  }, [contentCards, selectedCardType]);


  // Get available card types for filtering
  const availableCardTypes = React.useMemo(() => {
    const types = [...new Set(contentCards.map(card => card.type))];
    return [
      { type: 'all', label: 'Tümü', icon: '📚', count: contentCards.length },
      ...types.map(type => {
        const cardConfig = getCardConfig(type, theme);
        return {
          type,
          label: type.charAt(0).toUpperCase() + type.slice(1),
          icon: cardConfig.icon,
          count: contentCards.filter(card => card.type === type).length,
        };
      })
    ];
  }, [contentCards, theme]);

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

    // Steps 2-N: Content cards (each filtered card becomes a separate step)
    filteredCards.forEach((card, index) => {
      const example = examples[index % examples.length];
      steps.push({
        title: card.title,
        icon: card.icon,
        content: (
          <View style={styles.contentContainer}>
            {/* Card Header */}
            <View style={[styles.cardHeader, { backgroundColor: card.color + '15', borderColor: card.color + '40' }]}>
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <View style={styles.cardHeaderText}>
                <Text style={[styles.cardType, { color: card.color }]}>
                  {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                </Text>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{card.title}</Text>
              </View>
            <Text style={[styles.cardCounter, { color: theme.textSecondary }]}>
                {index + 1}/{contentCards.length}
            </Text>
            </View>
            
            {/* Card Content */}
            <View style={styles.cardContentContainer}>
              {renderFormattedText(card.content, theme, card.codeBlocks)}
            </View>

            {/* Action Badge */}
            <View style={[styles.actionBadge, { backgroundColor: card.color + '10' }]}>
              <Text style={[styles.actionIcon, { color: card.color }]}>
                {card.type === 'example' ? '💡' : 
                 card.type === 'tip' ? '✨' : 
                 card.type === 'practice' ? '🏋️' : 
                 card.type === 'code' ? '💻' : '📖'}
              </Text>
              <Text style={[styles.actionText, { color: theme.text }]}>{example}</Text>
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
  }, [skill, theme, categoryEmoji, filteredCards, learningOutcomes]);
  
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

          {/* Category Filter Tabs */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.categoryTabsContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryTabsScroll}
            >
              {availableCardTypes.map((cardType) => (
                <TouchableOpacity
                  key={cardType.type}
                  style={[
                    styles.categoryTab,
                    {
                      backgroundColor: selectedCardType === cardType.type 
                        ? theme.primary + '20' 
                        : theme.surface,
                      borderColor: selectedCardType === cardType.type 
                        ? theme.primary 
                        : theme.border,
                    }
                  ]}
                  onPress={() => {
                    setSelectedCardType(cardType.type);
                    setCurrentStep(0); // Reset to first step when changing filter
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.categoryTabIcon}>{cardType.icon}</Text>
                  <Text style={[
                    styles.categoryTabLabel,
                    { 
                      color: selectedCardType === cardType.type 
                        ? theme.primary 
                        : theme.text 
                    }
                  ]}>
                    {cardType.label}
                  </Text>
                  <View style={[
                    styles.categoryTabCount,
                    { 
                      backgroundColor: selectedCardType === cardType.type 
                        ? theme.primary 
                        : theme.backgroundTertiary 
                    }
                  ]}>
                    <Text style={[
                      styles.categoryTabCountText,
                      { 
                        color: selectedCardType === cardType.type 
                          ? theme.textInverted 
                          : theme.textSecondary 
                      }
                    ]}>
                      {cardType.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
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

  // Enhanced Card System Styles
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  // Card Header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 2,
    marginBottom: spacing.lg,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardType: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  cardCounter: {
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  // Card Content
  cardContentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  
  // Action Badge
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radii.lg,
    marginTop: spacing.md,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  // Category Filter Tabs
  categoryTabsContainer: {
    marginBottom: spacing.md,
  },
  categoryTabsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 2,
    minWidth: 100,
    ...shadows.sm,
  },
  categoryTabIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  categoryTabLabel: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  categoryTabCount: {
    marginLeft: spacing.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  categoryTabCountText: {
    fontSize: 11,
    fontWeight: '700',
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
    width: '50%',
  },
  nextButton: {
    flex: 1,
    width: '50%',
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




