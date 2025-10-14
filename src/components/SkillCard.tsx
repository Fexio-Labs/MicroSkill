import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { MicroSkill } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { colors, spacing } from '../styles/theme';

type SkillCardProps = {
  skill: MicroSkill;
  isPremium?: boolean;
  onPress?: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SkillCard({ skill, isPremium = false, onPress }: SkillCardProps) {
  const { canAccessPremium } = useSkillContext();
  const scale = useSharedValue(1);
  const hasAccess = canAccessPremium(skill.id);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedTouchable 
      style={[
        styles.card, 
        animatedStyle,
        !hasAccess && styles.cardLocked
      ]} 
      activeOpacity={hasAccess ? 1 : 0.6}
      onPress={hasAccess ? onPress : undefined}
      onPressIn={hasAccess ? handlePressIn : undefined}
      onPressOut={hasAccess ? handlePressOut : undefined}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {skill.title}
        </Text>
        <View style={[styles.badge, isPremium ? styles.badgePremium : styles.badgeFree]}>
          <Text style={[styles.badgeText, isPremium ? styles.badgeTextPremium : styles.badgeTextFree]}>
            {isPremium ? '💎 Premium' : '✓ Ücretsiz'}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {skill.category}
        </Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.meta}>{skill.durationMinutes} dk</Text>
      </View>

      <Text style={styles.summary} numberOfLines={3}>
        {skill.summary}
      </Text>

      {/* Action Row */}
      <View style={styles.actionRow}>
        {hasAccess ? (
          <Text style={styles.actionText}>Öğrenmeye Başla →</Text>
        ) : (
          <Text style={styles.lockedText}>🔒 Premium Gerekli</Text>
        )}
      </View>
    </AnimatedTouchable>
  );
}

type Styles = {
  card: ViewStyle;
  cardLocked: ViewStyle;
  headerRow: ViewStyle;
  title: TextStyle;
  badge: ViewStyle;
  badgePremium: ViewStyle;
  badgeFree: ViewStyle;
  badgeText: TextStyle;
  badgeTextPremium: TextStyle;
  badgeTextFree: TextStyle;
  metaRow: ViewStyle;
  meta: TextStyle;
  dot: TextStyle;
  summary: TextStyle;
  actionRow: ViewStyle;
  actionText: TextStyle;
  lockedText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLocked: {
    opacity: 0.7,
    backgroundColor: colors.backgroundTertiary,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 24,
  },
  badge: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgePremium: {
    backgroundColor: colors.premiumLight,
    borderWidth: 1.5,
    borderColor: colors.premium,
  },
  badgeFree: {
    backgroundColor: colors.successLight + '30',
    borderWidth: 1.5,
    borderColor: colors.success,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  badgeTextPremium: {
    color: colors.premium,
  },
  badgeTextFree: {
    color: colors.successDark,
  },
  metaRow: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: spacing.sm,
    color: colors.textTertiary,
    fontWeight: '700',
  },
  summary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  lockedText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textTertiary,
  },
});


