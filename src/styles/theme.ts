// Centralized theme constants: colors, spacing, radii, and typography
// MicroSkill - Modern, energetic education-themed color palette

export const colors = {
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

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
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
    xxl: 26,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
  },
};

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export const theme: Theme = {
  colors,
  spacing,
  radii,
  typography,
};


