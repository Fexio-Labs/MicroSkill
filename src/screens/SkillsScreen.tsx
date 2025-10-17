import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkillCard from '../components/SkillCard';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, spacing } from '../styles/theme';

type Category = 'all' | 'free' | 'premium' | 'completed';
type SkillsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Skills'>;

export default function SkillsScreen() {
  const navigation = useNavigation<SkillsNavigationProp>();
  const { completedSkills } = useSkillContext();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredSkills = React.useMemo(() => {
    switch (selectedCategory) {
      case 'free':
        return MOCK_MICRO_SKILLS.filter(s => !s.isPremium);
      case 'premium':
        return MOCK_MICRO_SKILLS.filter(s => s.isPremium);
      case 'completed':
        return MOCK_MICRO_SKILLS.filter(s => completedSkills.includes(s.id));
      default:
        return MOCK_MICRO_SKILLS;
    }
  }, [selectedCategory, completedSkills]);

  const categories = [
    { id: 'all' as Category, label: 'Tümü', icon: '📚' },
    { id: 'free' as Category, label: 'Ücretsiz', icon: '✨' },
    { id: 'premium' as Category, label: 'Premium', icon: '💎' },
    { id: 'completed' as Category, label: 'Tamamlanan', icon: '✅' },
  ];

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>🎯 Tüm Beceriler</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {filteredSkills.length} beceri mevcut
          </Text>
        </View>

        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category, index) => (
            <Animated.View 
              key={category.id}
              entering={FadeInDown.delay(index * 50)}
            >
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                  selectedCategory === category.id && [styles.categoryButtonActive, { 
                    backgroundColor: theme.primary, 
                    borderColor: theme.primary 
                  }]
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryLabel,
                  { color: theme.text },
                  selectedCategory === category.id && [styles.categoryLabelActive, { color: theme.background }]
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Skills List */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredSkills.map((skill, index) => (
            <Animated.View 
              key={skill.id}
              entering={FadeInDown.delay(100 + index * 50)}
            >
              <SkillCard 
                skill={skill}
                isPremium={skill.isPremium}
                onPress={() => navigation.navigate('Lesson', { skillId: skill.id })}
              />
            </Animated.View>
          ))}

          {filteredSkills.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Bu kategoride beceri bulunamadı</Text>
            </View>
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
  
  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Category Filters
  categoryScroll: {
    maxHeight: 60,
    marginBottom: spacing.md,
  },
  categoryScrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    gap: spacing.xs,
  },
  categoryButtonActive: {
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryLabelActive: {
  },

  // Skills List
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

