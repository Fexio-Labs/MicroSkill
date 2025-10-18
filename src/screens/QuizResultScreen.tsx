import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';
import { useTheme } from '../hooks/useTheme';

type QuizResultRoute = RouteProp<RootStackParamList, 'QuizResult'>;
type QuizResultNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizResult'>;

export default function QuizResultScreen() {
  const { params } = useRoute<QuizResultRoute>();
  const navigation = useNavigation<QuizResultNavigationProp>();
  const { score, level, completedSkills, streak } = useSkillContext();
  const { theme } = useTheme();

  // Quiz sonuç bilgileri
  const earnedPoints = params?.earnedPoints ?? 0;
  const correctAnswers = params?.correctAnswers ?? 0;
  const totalQuestions = params?.totalQuestions ?? 2;
  const skillTitle = params?.skillTitle ?? 'Beceri';
  
  // Başarı yüzdesi
  const successRate = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>
        {/* Success Animation */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={[styles.successIcon, {
          backgroundColor: theme.successLight + '30',
          borderColor: theme.success,
        }]}>
          <Text style={styles.emoji}>🎉</Text>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            {successRate === 100 ? 'Mükemmel!' : successRate >= 50 ? 'Harika İş!' : 'İyi Deneme!'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>"{skillTitle}" quiz'ini tamamladın 🚀</Text>
        </Animated.View>

        {/* Quiz Sonuç Kartı */}
        <Animated.View entering={FadeInDown.delay(250)} style={[styles.quizResultCard, {
          backgroundColor: theme.surface,
          borderColor: theme.primary,
          shadowColor: theme.primary,
        }]}>
          <View style={styles.quizResultHeader}>
            <Text style={[styles.quizResultTitle, { color: theme.text }]}>Quiz Sonuçları</Text>
          </View>
          <View style={styles.quizResultStats}>
            <View style={styles.quizResultItem}>
              <Text style={[styles.quizResultValue, { color: theme.text }]}>{correctAnswers}/{totalQuestions}</Text>
              <Text style={[styles.quizResultLabel, { color: theme.textSecondary }]}>Doğru Cevap</Text>
            </View>
            <View style={[styles.quizResultDivider, { backgroundColor: theme.border }]} />
            <View style={styles.quizResultItem}>
              <Text style={[styles.quizResultValue, { color: theme.success }]}>+{earnedPoints}</Text>
              <Text style={[styles.quizResultLabel, { color: theme.textSecondary }]}>Kazanılan Puan</Text>
            </View>
            <View style={[styles.quizResultDivider, { backgroundColor: theme.border }]} />
            <View style={styles.quizResultItem}>
              <Text style={[styles.quizResultValue, { color: theme.primary }]}>{successRate}%</Text>
              <Text style={[styles.quizResultLabel, { color: theme.textSecondary }]}>Başarı Oranı</Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats Cards - Genel İstatistikler */}
        <Animated.View entering={FadeInDown.delay(350)} style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>{score}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Toplam Puan</Text>
            {earnedPoints > 0 && (
              <Text style={[styles.statChange, { color: theme.success }]}>+{earnedPoints}</Text>
            )}
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>{level}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Seviye</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>{streak}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Günlük Seri</Text>
          </View>
        </Animated.View>

        {/* Progress Info */}
        <Animated.View entering={FadeInDown.delay(450)} style={[styles.progressCard, {
          backgroundColor: theme.primaryLight + '20',
          borderColor: theme.primaryLight + '40',
        }]}>
          <Text style={[styles.progressTitle, { color: theme.text }]}>🎯 İlerleme Durumun</Text>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {completedSkills.length} beceri tamamladın
          </Text>
          <View style={[styles.progressBar, { backgroundColor: theme.backgroundDark }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${Math.min((completedSkills.length / 12) * 100, 100)}%`,
                  backgroundColor: theme.primary,
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressSubtext, { color: theme.textSecondary }]}>
            Tüm becerileri tamamlamaya devam et!
          </Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.delay(550)} style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { 
              backgroundColor: theme.primary,
              shadowColor: theme.primary,
            }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.primaryButtonText, { color: theme.textInverted }]}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryButton, { 
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }]}
            onPress={() => navigation.navigate('Level')}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>Seviyelerimi Gör</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Motivational Message */}
        <Animated.View entering={FadeInUp.delay(650)} style={styles.messageContainer}>
          <Text style={[styles.messageText, { color: theme.textSecondary }]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 3,
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
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: radii.xl,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    ...shadows.md,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statChange: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
  },

  // Quiz Result Card
  quizResultCard: {
    width: '100%',
    borderRadius: radii.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 2,
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
    marginBottom: 4,
  },
  pointsValue: {
  },
  successValue: {
  },
  quizResultLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  quizResultDivider: {
    width: 1,
    height: 40,
    marginHorizontal: spacing.sm,
  },

  // Progress
  progressCard: {
    width: '100%',
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    ...shadows.sm,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressSubtext: {
    fontSize: 13,
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
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    ...shadows.sm,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },

  // Message
  messageContainer: {
    paddingHorizontal: spacing.lg,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});




