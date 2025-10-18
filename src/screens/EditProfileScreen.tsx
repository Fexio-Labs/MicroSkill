import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfile } from '../hooks/useUserProfile';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';
import { useTheme } from '../hooks/useTheme';

type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const AVATAR_OPTIONS = ['👤', '👨', '👩', '🧑', '👨‍💻', '👩‍💻', '🎓', '🧠', '🚀', '💼', '🎯', '⭐'];

export default function EditProfileScreen() {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { name, email, phone, avatar, updateProfile } = useUserProfile();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    phone: phone || '',
    avatar: avatar || '👤',
  });

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Hata', 'Lütfen adınızı girin.');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
      return;
    }

    // Basit e-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    await updateProfile({
      ...formData,
      isRegistered: true,
    });

    Alert.alert('✅ Başarılı!', 'Profiliniz kaydedildi.', [
      { text: 'Tamam', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar Selection */}
            <Animated.View entering={FadeInDown.delay(100)} style={styles.section}>
              <Text style={[styles.label, { color: theme.text }]}>Avatar Seç</Text>
              <View style={styles.avatarGrid}>
                {AVATAR_OPTIONS.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={[
                      styles.avatarOption,
                      { backgroundColor: theme.surface, borderColor: theme.border },
                      formData.avatar === emoji && [styles.avatarOptionSelected, {
                        borderColor: theme.primary,
                        backgroundColor: theme.primary + '20',
                      }],
                    ]}
                    onPress={() => setFormData({ ...formData, avatar: emoji })}
                  >
                    <Text style={styles.avatarEmoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>

            {/* Name Input */}
            <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
              <Text style={[styles.label, { color: theme.text }]}>Ad Soyad *</Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border,
                }]}
                placeholder="Adınızı girin"
                placeholderTextColor={theme.textTertiary}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                autoCapitalize="words"
              />
            </Animated.View>

            {/* Email Input */}
            <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
              <Text style={[styles.label, { color: theme.text }]}>E-posta *</Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border,
                }]}
                placeholder="ornek@email.com"
                placeholderTextColor={theme.textTertiary}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Animated.View>

            {/* Phone Input */}
            <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
              <Text style={[styles.label, { color: theme.text }]}>Telefon (İsteğe Bağlı)</Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border,
                }]}
                placeholder="0555 123 45 67"
                placeholderTextColor={theme.textTertiary}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
            </Animated.View>

            {/* Info Card */}
            <Animated.View entering={FadeInDown.delay(500)} style={[styles.infoCard, {
              backgroundColor: theme.primary + '10',
              borderColor: theme.primary + '30',
            }]}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={[styles.infoText, { color: theme.text }]}>
                Bilgileriniz cihazınızda güvenle saklanır ve kimseyle paylaşılmaz.
              </Text>
            </Animated.View>

            {/* Save Button */}
            <Animated.View entering={FadeInDown.delay(600)}>
              <TouchableOpacity
                style={[styles.saveButton, {
                  backgroundColor: theme.primary,
                  shadowColor: theme.primary,
                }]}
                onPress={handleSave}
                activeOpacity={0.9}
              >
                <Text style={[styles.saveButtonText, { color: theme.textInverted }]}>Kaydet</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
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

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  // Avatar Selection
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  avatarOption: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  avatarOptionSelected: {
    borderWidth: 3,
    ...shadows.md,
  },
  avatarEmoji: {
    fontSize: 28,
  },

  // Input
  input: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 1,
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },

  // Save Button
  saveButton: {
    paddingVertical: spacing.xl,
    borderRadius: radii.lg,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '900',
  },
});

