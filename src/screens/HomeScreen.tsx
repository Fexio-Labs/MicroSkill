import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import SkillCard from '../components/SkillCard';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../styles/theme';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { score, level, getTodaysSkill, streak, completedSkills } = useSkillContext();
  const todaysSkill = getTodaysSkill();

  // Rastgele 3 premium skill seç
  const premiumSkills = React.useMemo(() => {
    const premium = MOCK_MICRO_SKILLS.filter(s => s.isPremium);
    return premium.slice(0, 3);
  }, []);

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
          {/* Header Stats */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{level}</Text>
              <Text style={styles.statLabel}>Seviye</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>🔥 Seri</Text>
            </View>
          </Animated.View>

          {/* Günün Becerisi */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🌟 Günün Becerisi</Text>
              <Text style={styles.sectionSubtitle}>Her gün yeni bir şey öğren!</Text>
            </View>
            <SkillCard 
              skill={todaysSkill}
              onPress={() => navigation.navigate('Lesson', { skillId: todaysSkill.id })}
            />
          </Animated.View>

          {/* Premium İçerikler */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>💎 Premium İçerikler</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
                <Text style={styles.seeAllButton}>Tümünü Gör →</Text>
              </TouchableOpacity>
            </View>
            {premiumSkills.map((skill, index) => (
              <Animated.View 
                key={skill.id} 
                entering={FadeInUp.delay(400 + index * 100)}
              >
                <SkillCard 
                  skill={skill}
                  isPremium={true}
                  onPress={() => navigation.navigate('Lesson', { skillId: skill.id })}
                />
              </Animated.View>
            ))}
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Levels')}
            >
              <Text style={styles.actionButtonText}>📊 Seviyeler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Premium')}
            >
              <Text style={styles.actionButtonText}>💎 Premium</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Progress Info */}
          <Animated.View entering={FadeInDown.delay(700)} style={styles.progressInfo}>
            <Text style={styles.progressText}>
              🎯 {completedSkills.length} beceri tamamladın!
            </Text>
            <Text style={styles.progressSubtext}>
              Öğrenmeye devam et ve seviyeni yükselt 🚀
            </Text>
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
  
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },

  // Progress Info
  progressInfo: {
    backgroundColor: colors.primary + '10',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
