import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, {
    Easing,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { colors, radii, shadows, spacing } from '../styles/theme';

export type OptionState = 'unanswered' | 'correct' | 'incorrect';

type Props = {
  option: string;
  state: OptionState;
  onPress?: () => void;
  disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OptionButton({ option, state, onPress, disabled }: Props) {
  const progress = useSharedValue(0); // drives color
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0); // for shake animation

  useEffect(() => {
    // Map states to progress values: unanswered=0, correct=1, incorrect=-1
    const target = state === 'correct' ? 1 : state === 'incorrect' ? -1 : 0;
    
    if (state === 'correct') {
      // Pulse animation for correct answer
      progress.value = withTiming(target, { duration: 400, easing: Easing.out(Easing.cubic) });
      scale.value = withSequence(
        withTiming(1.05, { duration: 150, easing: Easing.out(Easing.quad) }),
        withSpring(1, { damping: 8, stiffness: 100 })
      );
    } else if (state === 'incorrect') {
      // Shake animation for incorrect answer
      progress.value = withTiming(target, { duration: 300, easing: Easing.out(Easing.cubic) });
      translateX.value = withSequence(
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withRepeat(
          withSequence(
            withTiming(10, { duration: 50, easing: Easing.linear }),
            withTiming(-10, { duration: 50, easing: Easing.linear })
          ),
          2,
          false
        ),
        withTiming(0, { duration: 50, easing: Easing.linear })
      );
    } else {
      // Reset to unanswered state
      progress.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
      translateX.value = withTiming(0, { duration: 200 });
    }
  }, [state, progress, scale, translateX]);

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
      transform: [
        { scale: scale.value },
        { translateX: translateX.value }
      ],
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
        {option}
      </Text>
      {state === 'correct' && <Text style={styles.emojiSuccess}>✓</Text>}
      {state === 'incorrect' && <Text style={styles.emojiIncorrect}>✗</Text>}
    </AnimatedPressable>
  );
}

type Styles = {
  button: ViewStyle;
  label: TextStyle;
  textDanger: TextStyle;
  textSuccess: TextStyle;
  emojiSuccess: TextStyle;
  emojiIncorrect: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    ...shadows.sm,
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
  emojiSuccess: {
    fontSize: 24,
    marginLeft: spacing.sm,
    color: colors.success,
    fontWeight: '900',
  },
  emojiIncorrect: {
    fontSize: 24,
    marginLeft: spacing.sm,
    color: colors.danger,
    fontWeight: '900',
  },
});


