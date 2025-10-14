import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../styles/theme';

export default function QuizResultScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { score, level, completedSkills, streak } = useSkillContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Success Animation */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.successIcon}>
          <Text style={styles.emoji}>🎉</Text>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleContainer}>
          <Text style={styles.title}>Harika İş Çıkardın!</Text>
          <Text style={styles.subtitle}>Quiz'i başarıyla tamamladın 🚀</Text>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Toplam Puan</Text>
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
        <Animated.View entering={FadeInDown.delay(400)} style={styles.progressCard}>
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
        <Animated.View entering={FadeInUp.delay(500)} style={styles.actionsContainer}>
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
        <Animated.View entering={FadeInUp.delay(600)} style={styles.messageContainer}>
          <Text style={styles.messageText}>
            💪 "Küçük adımlarla büyük başarılara ulaşırsın!"
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background,
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
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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

  // Progress
  progressCard: {
    width: '100%',
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.primaryLight + '40',
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
    borderRadius: 16,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverted,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
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




