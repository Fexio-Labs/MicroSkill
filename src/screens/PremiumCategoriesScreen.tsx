import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkillCard from '../components/SkillCard';
import { type CategoryType, MOCK_MICRO_SKILLS } from '../data/microSkills';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';
import { useTheme } from '../hooks/useTheme';

type PremiumNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Premium'>;

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

const getCategoryColors = (theme: any): Record<string, string> => ({
  'Yapay Zeka': theme.categoryTech,
  'Startup': theme.categoryStartup,
  'Teknoloji': theme.categoryTech,
  'İş & Kariyer': theme.categoryBusiness,
  'İletişim': theme.categoryCreativity,
  'Kişisel Gelişim': theme.categoryWellbeing,
  'Yaratıcılık': theme.categoryCreativity,
  'Tarih & Kültür': theme.categoryHistory,
});

export default function PremiumCategoriesScreen() {
  const navigation = useNavigation<PremiumNavigationProp>();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType | 'Tümü'>('Tümü');
  const categoryColors = getCategoryColors(theme);

  // Kategorilere göre grupla
  const categorizedSkills = React.useMemo(() => {
    const grouped: Record<string, typeof MOCK_MICRO_SKILLS> = {
      'Tümü': MOCK_MICRO_SKILLS,
    };

    MOCK_MICRO_SKILLS.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });

    return grouped;
  }, []);

  const categories = Object.keys(categorizedSkills);
  const displayedSkills = categorizedSkills[selectedCategory] || [];

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>💎 Premium Kategoriler</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            İleri seviye becerilerle kendini geliştir
          </Text>
        </Animated.View>

        {/* Premium Info Card */}
        <Animated.View entering={FadeInDown.delay(200)} style={[styles.premiumInfoCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.premiumInfoHeader}>
            <Text style={styles.premiumInfoEmoji}>✨</Text>
            <Text style={[styles.premiumInfoTitle, { color: theme.text }]}>Premium Avantajları</Text>
          </View>
          <View style={styles.premiumFeatures}>
            <View style={styles.featureRow}>
              <Text style={[styles.featureBullet, { color: theme.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: theme.text }]}>Yapay Zeka ve Startup içerikleri</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={[styles.featureBullet, { color: theme.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: theme.text }]}>İleri seviye teknoloji becerileri</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={[styles.featureBullet, { color: theme.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: theme.text }]}>Reklamsız deneyim</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={[styles.featureBullet, { color: theme.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: theme.text }]}>Her hafta yeni içerikler</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.premiumButton, { backgroundColor: theme.premium }]}
            onPress={() => navigation.navigate('Payment')}
            activeOpacity={0.9}
          >
            <Text style={[styles.premiumButtonText, { color: theme.textInverted }]}>Premium'a Geç - ₺29.99/ay</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Category Filter */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.categorySection}>
          <Text style={[styles.categorySectionTitle, { color: theme.text }]}>Kategoriler</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category;
              const emoji = CATEGORY_EMOJIS[category] || '📌';
              const color = categoryColors[category] || theme.primary;
              
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    { 
                      backgroundColor: isSelected ? color : theme.surface,
                      borderColor: isSelected ? color : theme.border
                    }
                  ]}
                  onPress={() => setSelectedCategory(category as CategoryType | 'Tümü')}
                >
                  <Text style={styles.categoryEmoji}>{emoji}</Text>
                  <Text style={[
                    styles.categoryChipText,
                    { 
                      color: isSelected ? theme.textInverted : theme.text 
                    }
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Skills List */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.skillsSection}>
          <Text style={[styles.skillsSectionTitle, { color: theme.text }]}>
            {displayedSkills.length} Beceri
          </Text>
          {displayedSkills.map((skill, index) => (
            <Animated.View
              key={skill.id}
              entering={FadeInDown.delay(100 * (index + 1))}
            >
              <SkillCard
                skill={skill}
                isPremium={skill.isPremium}
                onPress={() => navigation.navigate('Lesson', { skillId: skill.id })}
              />
            </Animated.View>
          ))}
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

  // Header
  header: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
  },

  // Premium Info Card
  premiumInfoCard: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 2,
  },
  premiumInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  premiumInfoEmoji: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  premiumInfoTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  premiumFeatures: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  premiumButton: {
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },

  // Category Filter
  categorySection: {
    marginBottom: spacing.xl,
  },
  categorySectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  categoryScroll: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.xl,
    borderWidth: 2,
    gap: spacing.xs,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryChipTextSelected: {
  },

  // Skills Section
  skillsSection: {
    marginBottom: spacing.xl,
  },
  skillsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});


