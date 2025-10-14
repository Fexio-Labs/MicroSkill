import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { colors, spacing } from '../styles/theme';

export type OptionState = 'unanswered' | 'correct' | 'incorrect';

type Props = {
  label: string;
  state: OptionState;
  onPress?: () => void;
  disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OptionButton({ label, state, onPress, disabled }: Props) {
  const progress = useSharedValue(0); // drives color
  const scale = useSharedValue(1);

  useEffect(() => {
    // Map states to progress values: unanswered=0, correct=1, incorrect=-1
    const target = state === 'correct' ? 1 : state === 'incorrect' ? -1 : 0;
    progress.value = withTiming(target, { duration: 300, easing: Easing.out(Easing.cubic) });
  }, [state, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [-1, 0, 1],
      [colors.dangerLight + '30', colors.surface, colors.successLight + '30']
    );
    const borderColor = interpolateColor(
      progress.value,
      [-1, 0, 1],
      [colors.danger, colors.border, colors.success]
    );
    return {
      backgroundColor,
      borderColor,
      transform: [{ scale: scale.value }],
    } as ViewStyle;
  });

  const onPressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.97, { damping: 12, stiffness: 200 });
    }
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  return (
    <AnimatedPressable
      style={[styles.button, animatedStyle]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
    >
      <Text 
        style={[
          styles.label, 
          state === 'incorrect' && styles.textDanger, 
          state === 'correct' && styles.textSuccess
        ]} 
        numberOfLines={3}
      >
        {label}
      </Text>
      {state === 'correct' && <Text style={styles.emoji}>✓</Text>}
      {state === 'incorrect' && <Text style={styles.emoji}>✗</Text>}
    </AnimatedPressable>
  );
}

type Styles = {
  button: ViewStyle;
  label: TextStyle;
  textDanger: TextStyle;
  textSuccess: TextStyle;
  emoji: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 22,
  },
  textDanger: { 
    color: colors.danger,
    fontWeight: '700',
  },
  textSuccess: { 
    color: colors.successDark,
    fontWeight: '700',
  },
  emoji: {
    fontSize: 20,
    marginLeft: spacing.sm,
    fontWeight: '700',
  },
});


