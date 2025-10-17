import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../styles/theme';

type IconName = 'home' | 'book' | 'diamond' | 'person';

const TAB_ICONS: Record<string, IconName> = {
  HomeTab: 'home',
  SkillsTab: 'book',
  PremiumTab: 'diamond',
  ProfileTab: 'person',
};

export default function AnimatedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.tabBar, { 
      backgroundColor: theme.surface,
      borderTopColor: theme.border 
    }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const iconName = TAB_ICONS[route.name] || 'ellipse';

        const onPress = () => {
          // Haptic feedback
          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <AnimatedTab
            key={route.key}
            label={String(label)}
            iconName={iconName}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

type AnimatedTabProps = {
  label: string;
  iconName: IconName;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

function AnimatedTab({ label, iconName, isFocused, onPress, onLongPress }: AnimatedTabProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    scale.value = isFocused
      ? withSpring(1.1, { damping: 15, stiffness: 150 })
      : withSpring(1, { damping: 15, stiffness: 150 });
    
    translateY.value = isFocused
      ? withSpring(-4, { damping: 15, stiffness: 150 })
      : withSpring(0, { damping: 15, stiffness: 150 });
  }, [isFocused, scale, translateY]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0.7, { duration: 200 }),
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        <Ionicons
          name={iconName}
          size={24}
          color={isFocused ? theme.primary : theme.textTertiary}
        />
        {isFocused && <View style={[styles.activeIndicator, { backgroundColor: theme.primary }]} />}
      </Animated.View>
      <Animated.Text
        style={[
          styles.label,
          { color: isFocused ? theme.primary : theme.textTertiary },
          animatedLabelStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
    paddingTop: 8,
    paddingHorizontal: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

