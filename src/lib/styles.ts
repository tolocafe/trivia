import { StyleSheet } from 'react-native-unistyles'

import { answerColors, colors, radius, spacing, typography } from '@/lib/tokens'

export { answerColors }

const lightTheme = {
	colors: {
		...colors,
		background: colors.light.background,
		border: colors.light.border,
		surface: colors.light.surface,
		text: colors.light.text,
		textSecondary: colors.light.textSecondary,
	},
	radius,
	spacing,
	typography,
} as const

const darkTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		background: colors.dark.background,
		border: colors.dark.border,
		surface: colors.dark.surface,
		text: colors.dark.text,
		textSecondary: colors.dark.textSecondary,
	},
} as const

type AppThemes = {
	light: typeof lightTheme
	dark: typeof darkTheme
}

declare module 'react-native-unistyles' {
	// oxlint-disable-next-line no-empty-interface, no-empty-object-type, consistent-type-definitions
	export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
	settings: {
		adaptiveThemes: true,
	},
	themes: {
		dark: darkTheme,
		light: lightTheme,
	},
})
