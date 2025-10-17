import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AnimatedTabBar from '../components/AnimatedTabBar';
import { useTheme } from '../hooks/useTheme';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import LanguageSettingsScreen from '../screens/LanguageSettingsScreen';
import LessonScreen from '../screens/LessonScreen';
import LevelScreen from '../screens/LevelScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PremiumCategoriesScreen from '../screens/PremiumCategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import QuizScreen from '../screens/QuizScreen';
import SkillsScreen from '../screens/SkillsScreen';

// Root stack route params
export type RootStackParamList = {
  Home: undefined;
  Quiz: { skillId: string } | undefined;
  Lesson: { skillId: string } | undefined;
  Level: undefined;
  Premium: undefined;
  Payment: undefined;
  QuizResult: {
    earnedPoints: number;
    correctAnswers: number;
    totalQuestions: number;
    skillTitle: string;
  };
  Skills: undefined;
  Profile: undefined;
  EditProfile: undefined;
  LanguageSettings: undefined;
};

// Tab Navigator params
export type TabParamList = {
  HomeTab: undefined;
  SkillsTab: undefined;
  PremiumTab: undefined;
  ProfileTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Home Stack
function HomeStack() {
  const { theme } = useTheme();
  
  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: theme.surface,
    },
    headerTintColor: theme.primary,
    headerTitleStyle: {
      fontWeight: '800',
      fontSize: 18,
      color: theme.text,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    animation: 'slide_from_right' as const,
    animationDuration: 300,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    fullScreenGestureEnabled: true,
  };
  
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
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
        name="Payment" 
        component={PaymentScreen}
        options={{
          title: '💎 Premium',
          headerBackTitle: 'Geri',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}

// Skills Stack
function SkillsStack() {
  const { theme } = useTheme();
  
  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: theme.surface,
    },
    headerTintColor: theme.primary,
    headerTitleStyle: {
      fontWeight: '800',
      fontSize: 18,
      color: theme.text,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    animation: 'slide_from_right' as const,
    animationDuration: 300,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    fullScreenGestureEnabled: true,
  };
  
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen 
        name="Skills" 
        component={SkillsScreen}
        options={{
          headerShown: false,
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
          animation: 'fade_from_bottom',
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="QuizResult" 
        component={QuizResultScreen}
        options={{
          title: 'Sonuçlar',
          headerBackVisible: false,
          gestureEnabled: false,
          animation: 'fade',
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{
          title: '💎 Premium',
          headerBackTitle: 'Geri',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}

// Premium Stack
function PremiumStack() {
  const { theme } = useTheme();
  
  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: theme.surface,
    },
    headerTintColor: theme.primary,
    headerTitleStyle: {
      fontWeight: '800',
      fontSize: 18,
      color: theme.text,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    animation: 'slide_from_right' as const,
    animationDuration: 300,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    fullScreenGestureEnabled: true,
  };
  
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen 
        name="Premium" 
        component={PremiumCategoriesScreen}
        options={{
          title: '💎 Premium',
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
          animation: 'fade_from_bottom',
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="QuizResult" 
        component={QuizResultScreen}
        options={{
          title: 'Sonuçlar',
          headerBackVisible: false,
          gestureEnabled: false,
          animation: 'fade',
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{
          title: '💎 Premium',
          headerBackTitle: 'Geri',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  const { theme } = useTheme();
  
  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: theme.surface,
    },
    headerTintColor: theme.primary,
    headerTitleStyle: {
      fontWeight: '800',
      fontSize: 18,
      color: theme.text,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    animation: 'slide_from_right' as const,
    animationDuration: 300,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    fullScreenGestureEnabled: true,
  };
  
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          title: 'Profili Düzenle',
          headerBackTitle: 'Geri',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="LanguageSettings" 
        component={LanguageSettingsScreen}
        options={{
          title: '🌐 Dil Ayarları',
          headerBackTitle: 'Geri',
        }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
export default function AppNavigator() {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          title: 'Ana Sayfa',
        }}
      />
      <Tab.Screen 
        name="SkillsTab" 
        component={SkillsStack}
        options={{
          title: 'Beceriler',
        }}
      />
      <Tab.Screen 
        name="PremiumTab" 
        component={PremiumStack}
        options={{
          title: 'Premium',
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack}
        options={{
          title: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}


