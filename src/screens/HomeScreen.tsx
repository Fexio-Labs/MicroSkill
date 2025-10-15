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
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radii, spacing } from '../styles/theme';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const { score, level, getTodaysSkill, streak, completedSkills } = useSkillContext();
  
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
      colors={[colors.background, colors.backgroundSecondary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
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
                <Text style={styles.sectionTitle}>🌟 Günün Becerisi</Text>
                <Text style={styles.sectionSubtitle}>Her gün yeni bir şey öğren!</Text>
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
              <Text style={styles.sectionTitle}>💎 Premium İçerikler</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Premium')}
                style={styles.seeAllButtonContainer}
              >
                <Text style={styles.seeAllButton}>Tümünü Gör →</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.premiumInfo}
              onPress={() => navigation.navigate('Payment')}
              activeOpacity={0.8}
            >
              <Text style={styles.premiumInfoText}>
                🚀 Yapay Zeka, Startup ve ileri seviye içerikler
              </Text>
              <Text style={styles.premiumInfoSubtext}>
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
                  <Text style={styles.sectionTitle}>✨ Senin İçin Öneriler</Text>
                  <Text style={styles.sectionSubtitle}>Ücretsiz beceriler</Text>
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
          <Animated.View entering={FadeInDown.delay(900)} style={styles.progressInfo}>
            <Text style={styles.progressText}>
              🎯 {completedSkills.length} beceri tamamladın!
            </Text>
            <Text style={styles.progressSubtext}>
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
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  seeAllButtonContainer: {
    paddingVertical: spacing.xs,
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  premiumInfo: {
    backgroundColor: colors.premium + '10',
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.premium + '30',
  },
  premiumInfoText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  premiumInfoSubtext: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.premium,
    textAlign: 'center',
  },

  // Progress Info
  progressInfo: {
    backgroundColor: colors.primary + '10',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
