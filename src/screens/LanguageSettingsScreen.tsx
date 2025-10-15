import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Language, useUserProfile } from '../hooks/useUserProfile';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radii, shadows, spacing } from '../styles/theme';

type LanguageSettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LanguageSettings'>;

const languages = [
  {
    code: 'tr' as Language,
    name: 'Türkçe',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
  },
  {
    code: 'en' as Language,
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
];

export default function LanguageSettingsScreen() {
  const navigation = useNavigation<LanguageSettingsNavigationProp>();
  const { language, setLanguage } = useUserProfile();

  const handleLanguageChange = async (newLang: Language) => {
    if (newLang === language) return;

    Alert.alert(
      newLang === 'tr' ? 'Dili Değiştir' : 'Change Language',
      newLang === 'tr' 
        ? 'Uygulama dilini değiştirmek istiyor musunuz?' 
        : 'Do you want to change the app language?',
      [
        { 
          text: newLang === 'tr' ? 'İptal' : 'Cancel', 
          style: 'cancel' 
        },
        {
          text: newLang === 'tr' ? 'Değiştir' : 'Change',
          onPress: async () => {
            await setLanguage(newLang);
            Alert.alert(
              '✅',
              newLang === 'tr' 
                ? 'Dil başarıyla değiştirildi!' 
                : 'Language changed successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
            <Text style={styles.headerEmoji}>🌐</Text>
            <Text style={styles.headerTitle}>Dil Ayarları</Text>
            <Text style={styles.headerSubtitle}>
              Tercih ettiğin dili seç
            </Text>
          </Animated.View>

          {/* Language Options */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.languageList}>
            {languages.map((lang, index) => (
              <Animated.View
                key={lang.code}
                entering={FadeInDown.delay(300 + index * 100)}
              >
                <TouchableOpacity
                  style={[
                    styles.languageCard,
                    language === lang.code && styles.languageCardSelected,
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                  activeOpacity={0.8}
                >
                  <View style={styles.languageLeft}>
                    <Text style={styles.flag}>{lang.flag}</Text>
                    <View style={styles.languageInfo}>
                      <Text style={styles.languageName}>{lang.name}</Text>
                      <Text style={styles.languageNative}>{lang.nativeName}</Text>
                    </View>
                  </View>
                  {language === lang.code && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedIcon}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Info */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              {language === 'tr'
                ? 'Dil değişikliği tüm uygulama metinlerini etkiler. (Şu anda sadece arayüz desteklenmektedir)'
                : 'Language change affects all app texts. (Currently only interface is supported)'}
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 2,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Language List
  languageList: {
    marginBottom: spacing.xl,
  },
  languageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  languageCardSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
    backgroundColor: colors.primary + '10',
    ...shadows.md,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 48,
    marginRight: spacing.lg,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  selectedBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    fontSize: 20,
    color: colors.textInverted,
    fontWeight: '900',
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 20,
  },
});

