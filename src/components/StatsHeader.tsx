import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, radii, shadows, spacing } from '../styles/theme';

type StatsHeaderProps = {
  score: number;
  level: number;
  streak: number;
};

export default function StatsHeader({ score, level, streak }: StatsHeaderProps) {
  return (
    <Animated.View entering={FadeInDown.delay(100)} style={styles.container}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{score}</Text>
        <Text style={styles.statLabel}>Puan</Text>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>⭐</Text>
        </View>
      </View>
      
      <View style={[styles.statCard, styles.statCardHighlight]}>
        <Text style={[styles.statValue, styles.statValueHighlight]}>{level}</Text>
        <Text style={styles.statLabel}>Seviye</Text>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>🏆</Text>
        </View>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{streak}</Text>
        <Text style={styles.statLabel}>Seri</Text>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>🔥</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    ...shadows.sm,
  },
  statCardHighlight: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 4,
  },
  statValueHighlight: {
    color: colors.primary,
    fontSize: 32,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statIconContainer: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    opacity: 0.3,
  },
  statIcon: {
    fontSize: 20,
  },
});

