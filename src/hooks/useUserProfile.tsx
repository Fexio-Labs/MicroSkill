import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'tr' | 'en';

type UserProfile = {
  name: string;
  email: string;
  avatar: string; // emoji
  phone: string;
  isRegistered: boolean;
  language: Language;
};

type UserProfileContextValue = UserProfile & {
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  setLanguage: (lang: Language) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  USER_PROFILE: '@microskill_user_profile',
  LANGUAGE: '@microskill_language',
};

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  avatar: '👤',
  phone: '',
  isRegistered: false,
  language: 'tr',
};

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [profileData, languageData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
      ]);

      if (profileData) {
        const parsedProfile = JSON.parse(profileData);
        setProfile({
          ...DEFAULT_PROFILE,
          ...parsedProfile,
          language: languageData || parsedProfile.language || 'tr',
        });
      } else if (languageData) {
        setProfile(prev => ({ ...prev, language: languageData as Language }));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const newProfile = { ...profile, ...updates };
      setProfile(newProfile);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(newProfile));
      
      if (updates.language) {
        await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, updates.language);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      const newProfile = { ...profile, language: lang };
      setProfile(newProfile);
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(newProfile));
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      setProfile(DEFAULT_PROFILE);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        ...profile,
        updateProfile,
        setLanguage,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return context;
}

