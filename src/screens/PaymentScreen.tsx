import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSkillContext } from '../hooks/useSkillContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radii, shadows, spacing } from '../styles/theme';

type PaymentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

export default function PaymentScreen() {
  const navigation = useNavigation<PaymentNavigationProp>();
  const { upgradeToPremium, isPremium } = useSkillContext();
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
        colors={[colors.background, colors.backgroundSecondary]}
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
            <Text style={styles.headerEmoji}>💎</Text>
            <Text style={styles.headerTitle}>Premium'a Geç</Text>
            <Text style={styles.headerSubtitle}>
              Tüm özelliklerin kilidini aç ve öğrenmeye hız ver!
            </Text>
          </Animated.View>

          {/* Features */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.featuresSection}>
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
                  style={styles.featureItem}
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

          {/* Pricing Plans */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.plansSection}>
            <Text style={styles.sectionTitle}>💳 Plan Seç</Text>
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected,
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
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedText}>Seçildi ✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Payment Methods */}
          <Animated.View entering={FadeInDown.delay(700)} style={styles.paymentMethods}>
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

          {/* Purchase Button */}
          <Animated.View entering={FadeInUp.delay(800)} style={styles.purchaseSection}>
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
    color: colors.text,
    marginBottom: spacing.sm,
  },
  successSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl * 2,
    borderRadius: radii.lg,
    ...shadows.md,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverted,
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
    color: colors.text,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
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
    color: colors.text,
    marginBottom: spacing.lg,
  },
  featuresList: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
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
    color: colors.text,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },

  // Plans Section
  plansSection: {
    marginBottom: spacing.xl,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
    ...shadows.lg,
  },
  savingsBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textInverted,
    letterSpacing: 0.3,
  },
  planHeader: {
    marginBottom: spacing.lg,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.primary,
  },
  period: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
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
    color: colors.success,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  planFeatureText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedIndicator: {
    marginTop: spacing.md,
    backgroundColor: colors.primary + '20',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },

  // Payment Methods
  paymentMethods: {
    marginBottom: spacing.xl,
  },
  methodsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
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
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  methodText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },

  // Purchase Section
  purchaseSection: {
    marginBottom: spacing.xl,
  },
  purchaseButton: {
    backgroundColor: colors.premium,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.premium,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  purchaseButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textInverted,
    marginBottom: 4,
  },
  purchaseButtonSubtext: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textInverted + 'CC',
  },
  termsText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
});

