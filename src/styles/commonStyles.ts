import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing, typography } from './theme';

// Common container styles
export const containers = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  
  safeArea: {
    flex: 1,
  } as ViewStyle,
  
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 2,
  } as ViewStyle,
  
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});

// Common card styles
export const cards = StyleSheet.create({
  default: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  } as ViewStyle,
  
  elevated: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lg,
  } as ViewStyle,
  
  premium: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.premium,
  } as ViewStyle,
  
  success: {
    backgroundColor: colors.success + '15',
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.success,
  } as ViewStyle,
  
  warning: {
    backgroundColor: colors.warning + '10',
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.warning,
  } as ViewStyle,
});

// Common text styles
export const textStyles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.black,
    color: colors.text,
    lineHeight: typography.lineHeight.xxxl,
  } as TextStyle,
  
  h2: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text,
    lineHeight: typography.lineHeight.xxl,
  } as TextStyle,
  
  h3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text,
    lineHeight: typography.lineHeight.xl,
  } as TextStyle,
  
  h4: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    lineHeight: typography.lineHeight.lg,
  } as TextStyle,
  
  body: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    lineHeight: typography.lineHeight.md,
  } as TextStyle,
  
  bodySecondary: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  } as TextStyle,
  
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.sm,
  } as TextStyle,
  
  captionSmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textTertiary,
    lineHeight: typography.lineHeight.xs,
  } as TextStyle,
});

// Common button styles
export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  } as ViewStyle,
  
  secondary: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  } as ViewStyle,
  
  outline: {
    backgroundColor: 'transparent',
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  } as ViewStyle,
  
  premium: {
    backgroundColor: colors.premium,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});

// Common button text styles
export const buttonTexts = StyleSheet.create({
  primary: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textInverted,
  } as TextStyle,
  
  secondary: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
  } as TextStyle,
  
  outline: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
  } as TextStyle,
  
  premium: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textInverted,
  } as TextStyle,
});

// Common layout styles
export const layouts = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  
  column: {
    flexDirection: 'column',
  } as ViewStyle,
  
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});

