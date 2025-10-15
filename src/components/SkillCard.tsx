import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { MicroSkill } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { colors, radii, shadows, spacing } from '../styles/theme';

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
        isPremium && styles.cardPremium,
        !hasAccess && styles.cardLocked
      ]} 
      activeOpacity={hasAccess ? 1 : 0.6}
      onPress={hasAccess ? onPress : undefined}
      onPressIn={hasAccess ? handlePressIn : undefined}
      onPressOut={hasAccess ? handlePressOut : undefined}
    >
      {/* Premium Badge Ribbon */}
      {isPremium && !hasAccess && (
        <View style={styles.premiumRibbon}>
          <Text style={styles.premiumRibbonText}>🔒 Premium</Text>
        </View>
      )}
      
      {isPremium && hasAccess && (
        <View style={styles.premiumRibbonUnlocked}>
          <Text style={styles.premiumRibbonTextUnlocked}>💎 Premium</Text>
        </View>
      )}

      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {skill.title}
        </Text>
        {!isPremium && (
          <View style={styles.badgeFree}>
            <Text style={styles.badgeTextFree}>✓ Ücretsiz</Text>
          </View>
        )}
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
  cardPremium: ViewStyle;
  cardLocked: ViewStyle;
  premiumRibbon: ViewStyle;
  premiumRibbonText: TextStyle;
  premiumRibbonUnlocked: ViewStyle;
  premiumRibbonTextUnlocked: TextStyle;
  headerRow: ViewStyle;
  title: TextStyle;
  badgeFree: ViewStyle;
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
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
  },
  cardPremium: {
    borderColor: colors.premium,
    borderWidth: 2,
    backgroundColor: colors.surface,
  },
  cardLocked: {
    opacity: 0.85,
    backgroundColor: colors.backgroundTertiary,
  },
  premiumRibbon: {
    position: 'absolute',
    top: 12,
    right: -32,
    backgroundColor: colors.premium,
    paddingVertical: 6,
    paddingHorizontal: 40,
    transform: [{ rotate: '45deg' }],
    zIndex: 10,
    shadowColor: colors.premium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  premiumRibbonText: {
    color: colors.textInverted,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  premiumRibbonUnlocked: {
    position: 'absolute',
    top: 12,
    right: -32,
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 40,
    transform: [{ rotate: '45deg' }],
    zIndex: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  premiumRibbonTextUnlocked: {
    color: colors.textInverted,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
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
  badgeFree: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.successLight + '30',
    borderWidth: 1.5,
    borderColor: colors.success,
  },
  badgeTextFree: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
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


