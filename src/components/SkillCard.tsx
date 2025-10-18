import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { MicroSkill } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { useTheme } from '../hooks/useTheme';
import { radii, shadows, spacing } from '../styles/theme';

type SkillCardProps = {
  skill: MicroSkill;
  isPremium?: boolean;
  onPress?: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SkillCard({ skill, isPremium = false, onPress }: SkillCardProps) {
  const { canAccessPremium } = useSkillContext();
  const { theme } = useTheme();
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
        { backgroundColor: theme.surface, borderColor: theme.border },
        animatedStyle,
        isPremium && [
          styles.cardPremium, 
          { 
            borderColor: theme.premium,
            backgroundColor: theme.premiumLight + '20'
          }
        ],
        !hasAccess && [styles.cardLocked, { backgroundColor: theme.backgroundTertiary }]
      ]} 
      activeOpacity={hasAccess ? 1 : 0.6}
      onPress={hasAccess ? onPress : undefined}
      onPressIn={hasAccess ? handlePressIn : undefined}
      onPressOut={hasAccess ? handlePressOut : undefined}
    >
      {/* Premium Badge Ribbon */}
      {isPremium && !hasAccess && (
        <View style={[styles.premiumRibbon, { backgroundColor: theme.premium }]}>
          <Text style={[styles.premiumRibbonText, { color: theme.textInverted }]}>🔒 Premium</Text>
        </View>
      )}
      
      {isPremium && hasAccess && (
        <View style={[styles.premiumRibbonUnlocked, { backgroundColor: theme.primary }]}>
          <Text style={[styles.premiumRibbonTextUnlocked, { color: theme.textInverted }]}>💎 Premium</Text>
        </View>
      )}

      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {skill.title}
        </Text>
        {!isPremium && (
          <View style={[styles.badgeFree, { 
            backgroundColor: theme.successLight + '30',
            borderColor: theme.success 
          }]}>
            <Text style={[styles.badgeTextFree, { color: theme.successDark }]}>✓ Ücretsiz</Text>
          </View>
        )}
      </View>

      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {skill.category}
        </Text>
        <Text style={[styles.dot, { color: theme.textTertiary }]}>•</Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>{skill.durationMinutes} dk</Text>
      </View>

      <Text style={[styles.summary, { color: theme.textSecondary }]} numberOfLines={3}>
        {skill.summary}
      </Text>

      {/* Action Row */}
      <View style={[styles.actionRow, { borderTopColor: theme.borderLight }]}>
        {hasAccess ? (
          <Text style={[styles.actionText, { color: theme.primary }]}>Öğrenmeye Başla →</Text>
        ) : (
          <Text style={[styles.lockedText, { color: theme.textTertiary }]}>🔒 Premium Gerekli</Text>
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
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  cardPremium: {
    borderWidth: 2,
  },
  cardLocked: {
    opacity: 0.85,
  },
  premiumRibbon: {
    position: 'absolute',
    top: 12,
    right: -32,
    paddingVertical: 6,
    paddingHorizontal: 40,
    transform: [{ rotate: '45deg' }],
    zIndex: 10,
  },
  premiumRibbonText: {
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  premiumRibbonUnlocked: {
    position: 'absolute',
    top: 12,
    right: -32,
    paddingVertical: 6,
    paddingHorizontal: 40,
    transform: [{ rotate: '45deg' }],
    zIndex: 10,
  },
  premiumRibbonTextUnlocked: {
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
    lineHeight: 24,
  },
  badgeFree: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  badgeTextFree: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  metaRow: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 13,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: spacing.sm,
    fontWeight: '700',
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  lockedText: {
    fontSize: 14,
    fontWeight: '700',
  },
});


