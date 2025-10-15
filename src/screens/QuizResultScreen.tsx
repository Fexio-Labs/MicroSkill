import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radii, shadows, spacing } from '../styles/theme';

type QuizResultRoute = RouteProp<RootStackParamList, 'QuizResult'>;
type QuizResultNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizResult'>;

export default function QuizResultScreen() {
  const { params } = useRoute<QuizResultRoute>();
  const navigation = useNavigation<QuizResultNavigationProp>();
  const { score, level, completedSkills, streak } = useSkillContext();

  // Quiz sonuç bilgileri
  const earnedPoints = params?.earnedPoints ?? 0;
  const correctAnswers = params?.correctAnswers ?? 0;
  const totalQuestions = params?.totalQuestions ?? 2;
  const skillTitle = params?.skillTitle ?? 'Beceri';
  
  // Başarı yüzdesi
  const successRate = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>
        {/* Success Animation */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.successIcon}>
          <Text style={styles.emoji}>🎉</Text>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleContainer}>
          <Text style={styles.title}>
            {successRate === 100 ? 'Mükemmel!' : successRate >= 50 ? 'Harika İş!' : 'İyi Deneme!'}
          </Text>
          <Text style={styles.subtitle}>"{skillTitle}" quiz'ini tamamladın 🚀</Text>
        </Animated.View>

        {/* Quiz Sonuç Kartı */}
        <Animated.View entering={FadeInDown.delay(250)} style={styles.quizResultCard}>
          <View style={styles.quizResultHeader}>
            <Text style={styles.quizResultTitle}>Quiz Sonuçları</Text>
          </View>
          <View style={styles.quizResultStats}>
            <View style={styles.quizResultItem}>
              <Text style={styles.quizResultValue}>{correctAnswers}/{totalQuestions}</Text>
              <Text style={styles.quizResultLabel}>Doğru Cevap</Text>
            </View>
            <View style={styles.quizResultDivider} />
            <View style={styles.quizResultItem}>
              <Text style={[styles.quizResultValue, styles.pointsValue]}>+{earnedPoints}</Text>
              <Text style={styles.quizResultLabel}>Kazanılan Puan</Text>
            </View>
            <View style={styles.quizResultDivider} />
            <View style={styles.quizResultItem}>
              <Text style={[styles.quizResultValue, styles.successValue]}>{successRate}%</Text>
              <Text style={styles.quizResultLabel}>Başarı Oranı</Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats Cards - Genel İstatistikler */}
        <Animated.View entering={FadeInDown.delay(350)} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Toplam Puan</Text>
            {earnedPoints > 0 && (
              <Text style={styles.statChange}>+{earnedPoints}</Text>
            )}
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
        </Animated.View>

        {/* Progress Info */}
        <Animated.View entering={FadeInDown.delay(450)} style={styles.progressCard}>
          <Text style={styles.progressTitle}>🎯 İlerleme Durumun</Text>
          <Text style={styles.progressText}>
            {completedSkills.length} beceri tamamladın
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min((completedSkills.length / 12) * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressSubtext}>
            Tüm becerileri tamamlamaya devam et!
          </Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.delay(550)} style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.primaryButtonText}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Level')}
          >
            <Text style={styles.secondaryButtonText}>Seviyelerimi Gör</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Motivational Message */}
        <Animated.View entering={FadeInUp.delay(650)} style={styles.messageContainer}>
          <Text style={styles.messageText}>
            💪 "Küçük adımlarla büyük başarılara ulaşırsın!"
          </Text>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Success Icon
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.successLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 3,
    borderColor: colors.success,
    ...shadows.lg,
  },
  emoji: {
    fontSize: 60,
  },

  // Title
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Stats
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statChange: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.success,
    marginTop: 4,
  },

  // Quiz Result Card
  quizResultCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  quizResultHeader: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  quizResultTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  quizResultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quizResultItem: {
    flex: 1,
    alignItems: 'center',
  },
  quizResultValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  pointsValue: {
    color: colors.success,
  },
  successValue: {
    color: colors.primary,
  },
  quizResultLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quizResultDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },

  // Progress
  progressCard: {
    width: '100%',
    backgroundColor: colors.primaryLight + '20',
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.primaryLight + '40',
    ...shadows.sm,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.backgroundDark,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Actions
  actionsContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverted,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  // Message
  messageContainer: {
    paddingHorizontal: spacing.lg,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});




