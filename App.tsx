import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { SkillProvider, useSkillContext } from './src/hooks/useSkillContext';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { UserProfileProvider } from './src/hooks/useUserProfile';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen, { ONBOARDING_STORAGE_KEY } from './src/screens/OnboardingScreen';

enableScreens(true);

function AppContent() {
  const { isLoading } = useSkillContext();
  const { theme, isDark } = useTheme();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
      setShowOnboarding(hasSeenOnboarding !== 'true');
    } catch (error) {
      console.error('Error checking onboarding:', error);
      setShowOnboarding(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };
  
  // Loading state
  if (isLoading || showOnboarding === null) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <Text style={styles.logo}>🎓</Text>
        <Text style={[styles.appName, { color: theme.text }]}>MicroSkill</Text>
        <Text style={[styles.tagline, { color: theme.textSecondary }]}>5 Dakikada Bir Şey Öğren</Text>
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      </View>
    );
  }

  // Show onboarding for first-time users
  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }
  
  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.surface,
          text: theme.text,
          border: theme.border,
          notification: theme.accent,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '800',
          },
        },
      }}
    >
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProfileProvider>
          <SkillProvider>
            <AppContent />
          </SkillProvider>
        </UserProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 32,
  },
  loader: {
    marginTop: 16,
  },
});


