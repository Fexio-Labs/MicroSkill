import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { radii, shadows, spacing } from '../styles/theme';
import { useTheme } from '../hooks/useTheme';

type PaymentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

export default function PaymentScreen() {
  const navigation = useNavigation<PaymentNavigationProp>();
  const { upgradeToPremium, isPremium } = useSkillContext();
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'monthly',
      title: 'Aylık',
      price: '₺29.99',
      period: 'ay',
      savings: null,
      features: [
        'Tüm premium içerikler',
        'Yapay Zeka becerileri',
        'Startup içerikleri',
        'Reklamsız deneyim',
      ],
    },
    {
      id: 'yearly',
      title: 'Yıllık',
      price: '₺299.99',
      period: 'yıl',
      savings: '%17 tasarruf',
      features: [
        'Tüm premium içerikler',
        'Yapay Zeka becerileri',
        'Startup içerikleri',
        'Reklamsız deneyim',
        '2 ay bedava!',
        'Öncelikli destek',
      ],
    },
  ];

  const handlePurchase = () => {
    Alert.alert(
      '✨ Premium Aktivasyonu',
      `${selectedPlan === 'monthly' ? 'Aylık' : 'Yıllık'} plan ile devam etmek istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Satın Al',
          onPress: () => {
            upgradeToPremium();
            Alert.alert(
              '🎉 Başarılı!',
              'Premium üyeliğiniz aktif edildi! Tüm özelliklere erişebilirsiniz.',
              [
                {
                  text: 'Harika!',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  if (isPremium) {
    return (
      <LinearGradient
        colors={[theme.background, theme.backgroundSecondary]}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <View style={styles.container}>
            <Animated.View entering={FadeInDown.delay(100)} style={styles.successContainer}>
              <Text style={styles.successEmoji}>💎</Text>
              <Text style={styles.successTitle}>Premium Üyesin!</Text>
              <Text style={styles.successSubtitle}>
                Tüm özelliklere sınırsız erişimin var 🚀
              </Text>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Geri Dön</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
          {/* Header */}
          <View style={styles.header}>
            <Animated.View entering={FadeInDown.delay(100)}>
              <Text style={styles.headerEmoji}>💎</Text>
              <Text style={styles.headerTitle}>Premium'a Geç</Text>
              <Text style={styles.headerSubtitle}>
                Tüm özelliklerin kilidini aç ve öğrenmeye hız ver!
              </Text>
            </Animated.View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Animated.View entering={FadeInDown.delay(200)}>
              <Text style={styles.sectionTitle}>✨ Premium Avantajları</Text>
              <View style={styles.featuresList}>
              {[
                { icon: '🤖', title: 'Yapay Zeka İçerikleri', desc: 'ML, Prompt Engineering ve daha fazlası' },
                { icon: '🚀', title: 'Startup Becerileri', desc: 'MVP, Lean Startup, Growth Hacking' },
                { icon: '🎯', title: 'İleri Seviye Konular', desc: 'Profesyonel kariyer becerileri' },
                { icon: '🚫', title: 'Reklamsız Deneyim', desc: 'Kesintisiz öğrenme' },
                { icon: '⚡', title: 'Erken Erişim', desc: 'Yeni içeriklere ilk sen ulaş' },
                { icon: '💬', title: 'Öncelikli Destek', desc: 'Hızlı yardım ve çözüm' },
              ].map((feature, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInUp.delay(300 + index * 50)}
                  style={[
                    styles.featureItem, 
                    { 
                      borderColor: theme.borderLight,
                      backgroundColor: theme.surface
                    }
                  ]}
                >
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDesc}>{feature.desc}</Text>
                  </View>
                </Animated.View>
              ))}
              </View>
            </Animated.View>
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansSection}>
            <Animated.View entering={FadeInDown.delay(600)}>
              <Text style={styles.sectionTitle}>💳 Plan Seç</Text>
              {plans.map((plan, index) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                  selectedPlan === plan.id && [
                    styles.planCardSelected,
                    { 
                      borderColor: theme.premium,
                      backgroundColor: theme.premiumLight + '20'
                    }
                  ],
                ]}
                onPress={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
                activeOpacity={0.9}
              >
                {plan.savings && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>{plan.savings}</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.period}>/{plan.period}</Text>
                  </View>
                </View>
                <View style={styles.planFeatures}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.planFeatureRow}>
                      <Text style={styles.checkmark}>✓</Text>
                      <Text style={styles.planFeatureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                {selectedPlan === plan.id && (
                  <View style={[styles.selectedIndicator, { backgroundColor: theme.premium }]}>
                    <Text style={[styles.selectedText, { color: theme.textInverted }]}>Seçildi ✓</Text>
                  </View>
                )}
              </TouchableOpacity>
              ))}
            </Animated.View>
          </View>

          {/* Payment Methods */}
          <View style={styles.paymentMethods}>
            <Animated.View entering={FadeInDown.delay(700)}>
              <Text style={styles.methodsTitle}>Güvenli Ödeme</Text>
              <View style={styles.methodsRow}>
              <View style={styles.methodBadge}>
                <Text style={styles.methodText}>💳 Kredi Kartı</Text>
              </View>
              <View style={styles.methodBadge}>
                <Text style={styles.methodText}>🏦 Banka Kartı</Text>
              </View>
              <View style={styles.methodBadge}>
                <Text style={styles.methodText}>📱 Mobil Ödeme</Text>
              </View>
              </View>
            </Animated.View>
          </View>

          {/* Purchase Button */}
          <View style={styles.purchaseSection}>
            <Animated.View entering={FadeInUp.delay(800)}>
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={handlePurchase}
                activeOpacity={0.9}
              >
                <Text style={styles.purchaseButtonText}>
                  Premium'a Geç - {selectedPlan === 'monthly' ? '₺29.99/ay' : '₺299.99/yıl'}
                </Text>
                <Text style={styles.purchaseButtonSubtext}>
                  İstediğin zaman iptal edebilirsin
                </Text>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={styles.termsText}>
                Satın alarak Kullanım Şartları ve Gizlilik Politikası'nı kabul etmiş olursunuz.
              </Text>
            </Animated.View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 2,
  },

  // Already Premium State
  successContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  successEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  successSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl * 2,
    borderRadius: radii.lg,
    ...shadows.md,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '800',
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
    fontSize: 32,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Features Section
  featuresSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  featuresList: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Plans Section
  plansSection: {
    marginBottom: spacing.xl,
  },
  planCard: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.md,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSelected: {
    borderWidth: 3,
  },
  savingsBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  planHeader: {
    marginBottom: spacing.lg,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 36,
    fontWeight: '900',
  },
  period: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  planFeatures: {
    gap: spacing.sm,
  },
  planFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  planFeatureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedIndicator: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 13,
    fontWeight: '800',
  },

  // Payment Methods
  paymentMethods: {
    marginBottom: spacing.xl,
  },
  methodsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  methodsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  methodBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    borderWidth: 1,
  },
  methodText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Purchase Section
  purchaseSection: {
    marginBottom: spacing.xl,
  },
  purchaseButton: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  purchaseButtonText: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  purchaseButtonSubtext: {
    fontSize: 13,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
});

