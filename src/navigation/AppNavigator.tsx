import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LessonScreen from '../screens/LessonScreen';
import LevelScreen from '../screens/LevelScreen';
import PremiumCategoriesScreen from '../screens/PremiumCategoriesScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import QuizScreen from '../screens/QuizScreen';
import { colors } from '../styles/theme';

// Root stack route params
export type RootStackParamList = {
  Home: undefined;
  Quiz: { skillId: string } | undefined;
  Lesson: { skillId: string } | undefined;
  Level: undefined;
  Premium: undefined;
  QuizResult: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: '800',
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: '🎓 MicroSkill',
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen 
        name="Lesson" 
        component={LessonScreen}
        options={{
          title: 'Ders',
          headerBackTitle: 'Geri',
        }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{
          title: 'Quiz',
          headerBackTitle: 'Geri',
        }}
      />
      <Stack.Screen 
        name="QuizResult" 
        component={QuizResultScreen}
        options={{
          title: 'Sonuçlar',
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Level" 
        component={LevelScreen}
        options={{
          title: 'Seviyeler',
          headerBackTitle: 'Geri',
        }}
      />
      <Stack.Screen 
        name="Premium" 
        component={PremiumCategoriesScreen}
        options={{
          title: 'Premium',
          headerBackTitle: 'Geri',
        }}
      />
    </Stack.Navigator>
  );
}


