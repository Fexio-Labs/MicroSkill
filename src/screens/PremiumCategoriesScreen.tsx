import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import SkillCard from '../components/SkillCard';
import { type CategoryType, MOCK_MICRO_SKILLS } from '../data/microSkills';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../styles/theme';

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

const CATEGORY_COLORS: Record<string, string> = {
  'Yapay Zeka': colors.categoryTech,
  'Startup': colors.categoryStartup,
  'Teknoloji': colors.categoryTech,
  'İş & Kariyer': colors.categoryBusiness,
  'İletişim': colors.categoryCreativity,
  'Kişisel Gelişim': colors.categoryWellbeing,
  'Yaratıcılık': colors.categoryCreativity,
  'Tarih & Kültür': colors.categoryHistory,
};

export default function PremiumCategoriesScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType | 'Tümü'>('Tümü');

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.headerTitle}>💎 Premium Kategoriler</Text>
          <Text style={styles.headerSubtitle}>
            İleri seviye becerilerle kendini geliştir
          </Text>
        </Animated.View>

        {/* Premium Info Card */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.premiumInfoCard}>
          <View style={styles.premiumInfoHeader}>
            <Text style={styles.premiumInfoEmoji}>✨</Text>
            <Text style={styles.premiumInfoTitle}>Premium Avantajları</Text>
          </View>
          <View style={styles.premiumFeatures}>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Yapay Zeka ve Startup içerikleri</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>İleri seviye teknoloji becerileri</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Reklamsız deneyim</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Her hafta yeni içerikler</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.premiumButtonText}>Premium'a Geç - ₺29.99/ay</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Category Filter */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.categorySection}>
          <Text style={styles.categorySectionTitle}>Kategoriler</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category;
              const emoji = CATEGORY_EMOJIS[category] || '📌';
              const color = CATEGORY_COLORS[category] || colors.primary;
              
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    isSelected && { backgroundColor: color, borderColor: color }
                  ]}
                  onPress={() => setSelectedCategory(category as CategoryType | 'Tümü')}
                >
                  <Text style={styles.categoryEmoji}>{emoji}</Text>
                  <Text style={[
                    styles.categoryChipText,
                    isSelected && styles.categoryChipTextSelected
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
          <Text style={styles.skillsSectionTitle}>
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
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background,
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
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  // Premium Info Card
  premiumInfoCard: {
    backgroundColor: colors.premium + '10',
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.premium + '40',
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
    color: colors.text,
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
    color: colors.success,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  premiumButton: {
    backgroundColor: colors.premium,
    paddingVertical: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.premium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverted,
  },

  // Category Filter
  categorySection: {
    marginBottom: spacing.xl,
  },
  categorySectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
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
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  categoryChipTextSelected: {
    color: colors.textInverted,
  },

  // Skills Section
  skillsSection: {
    marginBottom: spacing.xl,
  },
  skillsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
});


