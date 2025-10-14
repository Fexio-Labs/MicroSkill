import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  visible: boolean;
  title: string;
  content: string;
  onClose?: () => void;
};

export default function SkillDetailModal({ visible, title, content, onClose }: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { height } = useWindowDimensions();

  const translateY = useSharedValue(height);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withTiming(height, { duration: 280, easing: Easing.in(Easing.cubic) });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, height, translateY, backdropOpacity]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', { skillId: title });
    if (onClose) onClose();
  };

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.backdrop, overlayStyle]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />
      </Animated.View>

      <Animated.View style={[styles.sheetContainer, sheetStyle]}> 
        <View style={styles.handle} />
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.content}>{content}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.button, styles.secondary]} onPress={handleClose}>
            <Text style={[styles.buttonText, styles.secondaryText]}>Kapat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.primary]} onPress={handleStartQuiz}>
            <Text style={[styles.buttonText, styles.primaryText]}>Quiz'e Başla</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#334155',
  },
  actionsRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12 as unknown as number, // RN doesn't support gap in all versions; harmless if ignored
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: '#f1e3ff',
    borderColor: '#9333ea',
  },
  primaryText: {
    color: '#7e22ce',
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
  },
  secondaryText: {
    color: '#334155',
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 14,
  },
});


