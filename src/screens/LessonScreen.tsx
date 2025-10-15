import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radii, shadows, spacing } from '../styles/theme';

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
      colors={[colors.background, colors.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        {/* Header Card */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.headerCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryEmoji}>{categoryEmoji}</Text>
            <Text style={styles.categoryText}>{skill.category}</Text>
          </View>
          <Text style={styles.title}>{skill.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱</Text>
              <Text style={styles.metaText}>{skill.durationMinutes} dakika</Text>
            </View>
            {skill.isPremium && (
              <View style={[styles.metaItem, styles.premiumTag]}>
                <Text style={styles.metaIcon}>💎</Text>
                <Text style={[styles.metaText, styles.premiumText]}>Premium</Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Summary Card */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionTitle}>Ne Öğreneceksin?</Text>
          </View>
          <Text style={styles.summary}>{skill.summary}</Text>
        </Animated.View>

        {/* Detailed Content */}
        {skill.content && (
          <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📖</Text>
              <Text style={styles.sectionTitle}>Detaylı İçerik</Text>
            </View>
            <Text style={styles.content}>{skill.content}</Text>
          </Animated.View>
        )}

        {/* Key Points */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>✨</Text>
            <Text style={styles.sectionTitle}>Önemli Noktalar</Text>
          </View>
          <View style={styles.keyPoints}>
            <View style={styles.keyPoint}>
              <View style={styles.bulletContainer}>
                <View style={styles.bullet} />
              </View>
              <Text style={styles.keyPointText}>5 dakikada hızlı öğrenme</Text>
            </View>
            <View style={styles.keyPoint}>
              <View style={styles.bulletContainer}>
                <View style={styles.bullet} />
              </View>
              <Text style={styles.keyPointText}>Pratik uygulanabilir bilgiler</Text>
            </View>
            <View style={styles.keyPoint}>
              <View style={styles.bulletContainer}>
                <View style={styles.bullet} />
              </View>
              <Text style={styles.keyPointText}>Quiz ile pekiştirme</Text>
            </View>
          </View>
        </Animated.View>

        {/* CTA Button */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.ctaContainer}>
          <TouchableOpacity
            style={[
              styles.ctaButton,
              !hasAccess && styles.ctaButtonLocked
            ]}
            onPress={handleQuizPress}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaButtonText}>
              {hasAccess ? '🎯 Quiz\'e Başla' : '🔒 Premium İçerik'}
            </Text>
            <Text style={styles.ctaButtonSubtext}>
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
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lg,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight + '30',
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
    color: colors.primary,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
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
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 10,
  },
  premiumTag: {
    backgroundColor: colors.premiumLight,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  premiumText: {
    color: colors.premium,
  },

  // Sections
  section: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text,
  },
  summary: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '500',
  },
  content: {
    fontSize: 15,
    color: colors.textSecondary,
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
    backgroundColor: colors.primary,
  },
  keyPointText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 22,
  },

  // CTA
  ctaContainer: {
    marginTop: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonLocked: {
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.premium,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textInverted,
    marginBottom: 4,
  },
  ctaButtonSubtext: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textInverted + 'CC',
  },
});




