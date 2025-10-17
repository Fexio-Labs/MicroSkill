import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import { useTheme } from '../hooks/useTheme';
import { useUserProfile } from '../hooks/useUserProfile';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { score, level, streak, completedSkills } = useSkillContext();
  const { name, email, avatar, isRegistered, language } = useUserProfile();
  const { theme, toggleTheme } = useTheme();

  const stats = [
    { label: 'Toplam Puan', value: score, icon: '⭐', color: theme.primary },
    { label: 'Seviye', value: level, icon: '🏆', color: theme.accent },
    { label: 'Günlük Seri', value: `${streak} gün`, icon: '🔥', color: '#FF6B35' },
    { label: 'Tamamlanan', value: completedSkills.length, icon: '✅', color: '#4CAF50' },
  ];

  const achievements = [
    { id: 1, title: 'İlk Adım', description: 'İlk becerini tamamla', icon: '🎯', unlocked: completedSkills.length >= 1 },
    { id: 2, title: 'Hızlı Öğrenen', description: '5 beceri tamamla', icon: '⚡', unlocked: completedSkills.length >= 5 },
    { id: 3, title: 'Ustalaşıyor', description: '10 beceri tamamla', icon: '💪', unlocked: completedSkills.length >= 10 },
    { id: 4, title: 'Ateş Yakıyor', description: '7 günlük seri yap', icon: '🔥', unlocked: streak >= 7 },
    { id: 5, title: 'Kararlı', description: '30 günlük seri yap', icon: '💎', unlocked: streak >= 30 },
    { id: 6, title: 'Seviye Canavarı', description: 'Seviye 10\'a ulaş', icon: '🚀', unlocked: level >= 10 },
  ];

  const settings = [
    { id: 1, title: 'Bildirimler', icon: '🔔', action: () => {} },
    { id: 2, title: 'Tema Değiştir', icon: '🎨', action: toggleTheme },
    { id: 3, title: 'Dil Ayarları', icon: '🌐', action: () => navigation.navigate('LanguageSettings') },
    { id: 4, title: 'Hakkında', icon: 'ℹ️', action: () => {} },
  ];

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.profileHeader}>
            <TouchableOpacity 
              style={[styles.avatarContainer, { backgroundColor: theme.surface, borderColor: theme.primary }]}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.8}
            >
              <Text style={styles.avatarEmoji}>{avatar || '👤'}</Text>
              <View style={[styles.editBadge, { backgroundColor: theme.primary, borderColor: theme.surface }]}>
                <Text style={styles.editIcon}>✏️</Text>
              </View>
            </TouchableOpacity>
            <Text style={[styles.userName, { color: theme.text }]}>{name || 'Öğrenci'}</Text>
            {isRegistered && email && (
              <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{email}</Text>
            )}
            <Text style={[styles.userLevel, { color: theme.textSecondary }]}>Seviye {level} • {score} Puan</Text>
            {!isRegistered && (
              <TouchableOpacity
                style={[styles.registerButton, { backgroundColor: theme.primary }]}
                onPress={() => navigation.navigate('EditProfile')}
                activeOpacity={0.9}
              >
                <Text style={[styles.registerButtonText, { color: theme.textInverted }]}>Profili Tamamla →</Text>
              </TouchableOpacity>
            )}
            {language && (
              <View style={[styles.languageBadge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.languageBadgeText, { color: theme.textSecondary }]}>
                  {language === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
                </Text>
              </View>
            )}
          </Animated.View>

          {/* Stats Grid */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Achievements */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>🏅 Başarılar</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <Animated.View 
                  key={achievement.id}
                  entering={FadeInDown.delay(400 + index * 50)}
                  style={[
                    styles.achievementCard,
                    { backgroundColor: theme.surface, borderColor: theme.border },
                    !achievement.unlocked && styles.achievementLocked
                  ]}
                >
                  <Text style={[
                    styles.achievementIcon,
                    !achievement.unlocked && styles.achievementIconLocked
                  ]}>
                    {achievement.icon}
                  </Text>
                  <Text style={[
                    styles.achievementTitle,
                    { color: theme.text },
                    !achievement.unlocked && styles.achievementTextLocked
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    { color: theme.textSecondary },
                    !achievement.unlocked && styles.achievementTextLocked
                  ]}>
                    {achievement.description}
                  </Text>
                  {achievement.unlocked && (
                    <View style={[styles.unlockedBadge, { backgroundColor: theme.primary }]}>
                      <Text style={[styles.unlockedText, { color: theme.background }]}>✓</Text>
                    </View>
                  )}
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Profile Action */}
          {isRegistered && (
            <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
              <TouchableOpacity
                style={[styles.editProfileButton, { backgroundColor: theme.surface, borderColor: theme.primary }]}
                onPress={() => navigation.navigate('EditProfile')}
                activeOpacity={0.9}
              >
                <Text style={styles.editProfileIcon}>✏️</Text>
                <Text style={[styles.editProfileText, { color: theme.primary }]}>Profili Düzenle</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Settings */}
          <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>⚙️ Ayarlar</Text>
            {settings.map((setting, index) => (
              <TouchableOpacity 
                key={setting.id}
                style={[styles.settingItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
                onPress={setting.action}
                activeOpacity={0.8}
              >
                <View style={styles.settingLeft}>
                  <Text style={styles.settingIcon}>{setting.icon}</Text>
                  <Text style={[styles.settingTitle, { color: theme.text }]}>{setting.title}</Text>
                </View>
                <Text style={[styles.settingArrow, { color: theme.textSecondary }]}>›</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={[styles.appInfoText, { color: theme.textTertiary }]}>MicroSkill v1.0.0</Text>
            <Text style={[styles.appInfoSubtext, { color: theme.textTertiary }]}>5 Dakikada Bir Şey Öğren 🎓</Text>
          </View>
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
    paddingBottom: spacing.xl,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 3,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  editIcon: {
    fontSize: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  userLevel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  registerButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
    marginTop: spacing.sm,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  languageBadge: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  languageBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Edit Profile Button
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 2,
    gap: spacing.sm,
  },
  editProfileIcon: {
    fontSize: 20,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '800',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    ...shadows.sm,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },

  // Achievements
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  achievementCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    ...shadows.sm,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  achievementIconLocked: {
    opacity: 0.3,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 11,
    textAlign: 'center',
  },
  achievementTextLocked: {
    opacity: 0.5,
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedText: {
    fontSize: 12,
    fontWeight: '900',
  },

  // Settings
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    ...shadows.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingArrow: {
    fontSize: 24,
    fontWeight: '300',
  },

  // App Info
  appInfo: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  appInfoText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  appInfoSubtext: {
    fontSize: 11,
  },
});

