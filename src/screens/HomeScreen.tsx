import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkillCard from '../components/SkillCard';
import StatsHeader from '../components/StatsHeader';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';
import { useSkillContext } from '../hooks/useSkillContext';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, spacing } from '../styles/theme';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const { score, level, getTodaysSkill, streak, completedSkills } = useSkillContext();
  const { theme, toggleTheme, isDark } = useTheme();
  
  // Günün Becerisi - Her gün farklı bir skill
  const todaysSkill = getTodaysSkill();

  // Premium becerileri al (ilk 3 premium skill)
  const premiumSkills = React.useMemo(() => {
    const premium = MOCK_MICRO_SKILLS.filter(s => s.isPremium);
    return premium.slice(0, 3);
  }, []);

  // Önerilen ücretsiz beceriler (henüz tamamlanmamış)
  const recommendedSkills = React.useMemo(() => {
    const free = MOCK_MICRO_SKILLS.filter(
      s => !s.isPremium && !completedSkills.includes(s.id) && s.id !== todaysSkill.id
    );
    return free.slice(0, 2);
  }, [completedSkills, todaysSkill.id]);

  return (
    <LinearGradient
      colors={[theme.background, theme.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        {/* Theme Toggle Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={toggleTheme}
            style={[styles.themeButton, { backgroundColor: theme.surface }]}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isDark ? 'sunny' : 'moon'} 
              size={20} 
              color={theme.primary} 
            />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Stats */}
          <StatsHeader score={score} level={level} streak={streak} />

          {/* Günün Becerisi */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
            <View style={styles.sectionHeaderWithSubtitle}>
              <View>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>🌟 Günün Becerisi</Text>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>Her gün yeni bir şey öğren!</Text>
              </View>
            </View>
            <SkillCard 
              skill={todaysSkill}
              isPremium={todaysSkill.isPremium}
              onPress={() => navigation.navigate('Lesson', { skillId: todaysSkill.id })}
            />
          </Animated.View>

          {/* Premium İçerikler */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>💎 Premium İçerikler</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Premium')}
                style={styles.seeAllButtonContainer}
              >
                <Text style={[styles.seeAllButton, { color: theme.primary }]}>Tümünü Gör →</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={[styles.premiumInfo, { 
                backgroundColor: theme.premium + '10',
                borderColor: theme.premium + '30'
              }]}
              onPress={() => navigation.navigate('Payment')}
              activeOpacity={0.8}
            >
              <Text style={[styles.premiumInfoText, { color: theme.text }]}>
                🚀 Yapay Zeka, Startup ve ileri seviye içerikler
              </Text>
              <Text style={[styles.premiumInfoSubtext, { color: theme.premium }]}>
                Premium'a geçmek için tıkla →
              </Text>
            </TouchableOpacity>
            {premiumSkills.map((skill, index) => (
              <Animated.View 
                key={skill.id} 
                entering={FadeInUp.delay(400 + index * 100)}
              >
                <SkillCard 
                  skill={skill}
                  isPremium={true}
                  onPress={() => navigation.navigate('Lesson', { skillId: skill.id })}
                />
              </Animated.View>
            ))}
          </Animated.View>

          {/* Önerilen Beceriler */}
          {recommendedSkills.length > 0 && (
            <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
              <View style={styles.sectionHeaderWithSubtitle}>
                <View>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>✨ Senin İçin Öneriler</Text>
                  <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>Ücretsiz beceriler</Text>
                </View>
              </View>
              {recommendedSkills.map((skill, index) => (
                <Animated.View 
                  key={skill.id} 
                  entering={FadeInUp.delay(800 + index * 100)}
                >
                  <SkillCard 
                    skill={skill}
                    isPremium={false}
                    onPress={() => navigation.navigate('Lesson', { skillId: skill.id })}
                  />
                </Animated.View>
              ))}
            </Animated.View>
          )}

          {/* Progress Info */}
          <Animated.View entering={FadeInDown.delay(900)} style={[styles.progressInfo, {
            backgroundColor: theme.primary + '10',
            borderColor: theme.primary + '30',
          }]}>
            <Text style={[styles.progressText, { color: theme.primary }]}>
              🎯 {completedSkills.length} beceri tamamladın!
            </Text>
            <Text style={[styles.progressSubtext, { color: theme.textSecondary }]}>
              Öğrenmeye devam et ve seviyeni yükselt 🚀
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

  // Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionHeaderWithSubtitle: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  seeAllButtonContainer: {
    paddingVertical: spacing.xs,
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '700',
  },
  premiumInfo: {
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  premiumInfoText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  premiumInfoSubtext: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Header with theme button
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Progress Info
  progressInfo: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
