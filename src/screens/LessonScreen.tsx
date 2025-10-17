import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
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

  const handleQuizPress = () => {
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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        {/* Header Card */}
        <Animated.View entering={FadeInDown.delay(100)} style={[styles.headerCard, { 
          backgroundColor: theme.surface,
          borderColor: theme.border 
        }]}>
          <View style={[styles.categoryBadge, { backgroundColor: theme.primaryLight + '30' }]}>
            <Text style={styles.categoryEmoji}>{categoryEmoji}</Text>
            <Text style={[styles.categoryText, { color: theme.primary }]}>{skill.category}</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>{skill.title}</Text>
          <View style={styles.metaRow}>
            <View style={[styles.metaItem, { backgroundColor: theme.backgroundDark }]}>
              <Text style={styles.metaIcon}>⏱</Text>
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>{skill.durationMinutes} dakika</Text>
            </View>
            {skill.isPremium && (
              <View style={[styles.metaItem, styles.premiumTag, { backgroundColor: theme.premiumLight }]}>
                <Text style={styles.metaIcon}>💎</Text>
                <Text style={[styles.metaText, styles.premiumText, { color: theme.premium }]}>Premium</Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Summary Card */}
        <Animated.View entering={FadeInDown.delay(200)} style={[styles.section, { 
          backgroundColor: theme.surface,
          borderColor: theme.border 
        }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Ne Öğreneceksin?</Text>
          </View>
          <Text style={[styles.summary, { color: theme.text }]}>{skill.summary}</Text>
        </Animated.View>

        {/* Detailed Content */}
        {skill.content && (
          <Animated.View entering={FadeInDown.delay(300)} style={[styles.section, { 
            backgroundColor: theme.surface,
            borderColor: theme.border 
          }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📖</Text>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Detaylı İçerik</Text>
            </View>
            <Text style={[styles.content, { color: theme.textSecondary }]}>{skill.content}</Text>
          </Animated.View>
        )}

        {/* Key Points */}
        <Animated.View entering={FadeInDown.delay(400)} style={[styles.section, { 
          backgroundColor: theme.surface,
          borderColor: theme.border 
        }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>✨</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Önemli Noktalar</Text>
          </View>
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
        </Animated.View>

        {/* CTA Button */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.ctaContainer}>
          <TouchableOpacity
            style={[
              styles.ctaButton,
              { backgroundColor: theme.primary },
              !hasAccess && [styles.ctaButtonLocked, { 
                backgroundColor: theme.backgroundTertiary,
                borderColor: theme.premium 
              }]
            ]}
            onPress={handleQuizPress}
            activeOpacity={0.9}
          >
            <Text style={[styles.ctaButtonText, { color: theme.textInverted }]}>
              {hasAccess ? '🎯 Quiz\'e Başla' : '🔒 Premium İçerik'}
            </Text>
            <Text style={[styles.ctaButtonSubtext, { color: theme.textInverted + 'CC' }]}>
              {hasAccess ? 'Bilgini test et!' : 'Premium\'a geç ve eriş'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
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

  // Header Card
  headerCard: {
    borderRadius: radii.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    ...shadows.lg,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 10,
  },
  premiumTag: {
  },
  metaIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  premiumText: {
  },

  // Sections
  section: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  summary: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
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
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },

  // CTA
  ctaContainer: {
    marginTop: spacing.md,
  },
  ctaButton: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonLocked: {
    borderWidth: 2,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  ctaButtonSubtext: {
    fontSize: 14,
    fontWeight: '600',
  },
});




