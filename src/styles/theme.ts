// Centralized theme constants: colors, spacing, radii, and typography
// MicroSkill - Modern, energetic education-themed color palette

// Dark Mode Colors
export const darkColors = {
  // Primary - Deep Purple/Indigo (Learning & Professionalism)
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // Secondary - Vibrant Orange (Energy & Motivation)
  secondary: '#F59E0B',
  secondaryLight: '#FBBF24',
  secondaryDark: '#D97706',
  
  // Accent - Emerald Green (Success & Progress)
  accent: '#10B981',
  accentLight: '#34D399',
  accentDark: '#059669',
  
  // Success - Emerald Green
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',
  
  // Warning - Vibrant Orange
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  
  // Danger - Vibrant Red
  danger: '#EF4444',
  dangerLight: '#F87171',
  
  // Backgrounds - Soft gradient dark mode
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  backgroundTertiary: '#334155',
  backgroundDark: '#0A0F1E',
  surface: '#1E293B',
  surfaceElevated: '#334155',
  
  // Text - High contrast
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textInverted: '#0F172A',
  
  // Borders
  border: '#334155',
  borderLight: '#475569',
  
  // Premium Gold
  premium: '#F59E0B',
  premiumLight: '#FEF3C7',
  premiumBorder: '#F59E0B',
  
  // Category Colors - Updated with new palette
  categoryTech: '#6366F1',
  categoryBusiness: '#10B981',
  categoryHistory: '#EF4444',
  categoryCreativity: '#EC4899',
  categoryWellbeing: '#10B981',
  categoryStartup: '#F59E0B',
  categoryCommunication: '#6366F1',
  categoryPersonalDev: '#F59E0B',
};

// Light Mode Colors
export const lightColors = {
  // Primary - Deep Purple/Indigo (Learning & Professionalism)
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // Secondary - Vibrant Orange (Energy & Motivation)
  secondary: '#F59E0B',
  secondaryLight: '#FBBF24',
  secondaryDark: '#D97706',
  
  // Accent - Emerald Green (Success & Progress)
  accent: '#10B981',
  accentLight: '#34D399',
  accentDark: '#059669',
  
  // Success - Emerald Green
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',
  
  // Warning - Vibrant Orange
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  
  // Danger - Vibrant Red
  danger: '#EF4444',
  dangerLight: '#F87171',
  
  // Backgrounds - Light mode with soft gradients
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundTertiary: '#F1F5F9',
  backgroundDark: '#E2E8F0',
  surface: '#FFFFFF',
  surfaceElevated: '#F8FAFC',
  
  // Text - Dark text for light mode
  text: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  textInverted: '#F8FAFC',
  
  // Borders
  border: '#E2E8F0',
  borderLight: '#CBD5E1',
  
  // Premium Gold
  premium: '#F59E0B',
  premiumLight: '#FEF3C7',
  premiumBorder: '#F59E0B',
  
  // Category Colors - Same for both modes
  categoryTech: '#6366F1',
  categoryBusiness: '#10B981',
  categoryHistory: '#EF4444',
  categoryCreativity: '#EC4899',
  categoryWellbeing: '#10B981',
  categoryStartup: '#F59E0B',
  categoryCommunication: '#6366F1',
  categoryPersonalDev: '#F59E0B',
};

// Default export for backward compatibility
export const colors = darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: 'System',
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 36,
    xxxl: 40,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
};

// Shadow presets for consistent elevation
export const shadows = {
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Animation durations for consistency
export const animations = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
};

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  shadows: typeof shadows;
  animations: typeof animations;
};

export const theme: Theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
  animations,
};


