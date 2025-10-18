import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import { radii, shadows, spacing } from '../styles/theme';
import { useTheme } from '../hooks/useTheme';

const LevelScreen: React.FC = () => {
  const { level, score, completedSkills, streak } = useSkillContext();
  const { theme } = useTheme();

  const scoreToNextLevel = 20;
  const currentLevelMinScore = (level - 1) * scoreToNextLevel;
  const progressInLevel = Math.max(0, score - currentLevelMinScore);
  const progressPercentage = Math.min(100, (progressInLevel / scoreToNextLevel) * 100);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progressPercentage}%`, { duration: 800 }),
    };
  });

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.headerTitle}>📊 Seviye & İstatistikler</Text>
          <Text style={styles.headerSubtitle}>İlerlemeni takip et</Text>
        </Animated.View>

        {/* Level Card */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.levelCard}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>Mevcut Seviye</Text>
          </View>
          <View style={styles.levelCircle}>
            <Text style={styles.levelNumber}>{level}</Text>
          </View>
          <Text style={styles.levelLabel}>Seviye {level}</Text>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>
              Seviye {level + 1}'e {scoreToNextLevel - progressInLevel} puan kaldı
            </Text>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
            </View>
            <Text style={styles.progressText}>
              {progressInLevel} / {scoreToNextLevel} puan
            </Text>
          </View>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Toplam Puan</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>✅</Text>
            <Text style={styles.statValue}>{completedSkills.length}</Text>
            <Text style={styles.statLabel}>Tamamlanan</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
        </Animated.View>

        {/* Achievements */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>🏆 Başarılar</Text>
          <View style={styles.achievementsList}>
            <View style={[styles.achievementCard, completedSkills.length >= 1 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>🎯</Text>
              <Text style={styles.achievementText}>İlk Adım</Text>
              <Text style={styles.achievementDesc}>1 beceri tamamla</Text>
            </View>
            <View style={[styles.achievementCard, completedSkills.length >= 5 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>🚀</Text>
              <Text style={styles.achievementText}>Yükseliş</Text>
              <Text style={styles.achievementDesc}>5 beceri tamamla</Text>
            </View>
            <View style={[styles.achievementCard, level >= 5 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>💎</Text>
              <Text style={styles.achievementText}>Uzman</Text>
              <Text style={styles.achievementDesc}>5. seviyeye ulaş</Text>
            </View>
            <View style={[styles.achievementCard, streak >= 7 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <Text style={styles.achievementText}>Ateşli</Text>
              <Text style={styles.achievementDesc}>7 günlük seri</Text>
            </View>
          </View>
        </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
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

  // Level Card
  levelCard: {
    borderRadius: radii.xxl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    ...shadows.lg,
  },
  levelBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  levelBadgeText: {
    fontSize: 13,
    fontWeight: '800',
  },
  levelCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  levelNumber: {
    fontSize: 56,
    fontWeight: '900',
  },
  levelLabel: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xl,
  },
  progressSection: {
    width: '100%',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  progressBarContainer: {
    height: 12,
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    borderRadius: radii.xl,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    ...shadows.sm,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Achievements
  achievementsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  achievementCard: {
    width: '48%',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    opacity: 0.5,
    borderWidth: 2,
  },
  achievementUnlocked: {
    opacity: 1,
    ...shadows.md,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  achievementDesc: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default LevelScreen;


