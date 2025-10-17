import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { radii, shadows, spacing } from '../styles/theme';

type StatsHeaderProps = {
  score: number;
  level: number;
  streak: number;
};

export default function StatsHeader({ score, level, streak }: StatsHeaderProps) {
  const { theme } = useTheme();
  
  return (
    <Animated.View entering={FadeInDown.delay(100)} style={styles.container}>
      <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.statValue, { color: theme.primary }]}>{score}</Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Puan</Text>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>⭐</Text>
        </View>
      </View>
      
      <View style={[styles.statCard, styles.statCardHighlight, { 
        backgroundColor: theme.primary + '15', 
        borderColor: theme.primary 
      }]}>
        <Text style={[styles.statValue, styles.statValueHighlight, { color: theme.primary }]}>{level}</Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Seviye</Text>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>🏆</Text>
        </View>
      </View>
      
      <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.statValue, { color: theme.primary }]}>{streak}</Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Seri</Text>
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
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    ...shadows.sm,
  },
  statCardHighlight: {
    borderWidth: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  statValueHighlight: {
    fontSize: 32,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
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

