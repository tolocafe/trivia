import { StyleSheet } from 'react-native-unistyles'

import { colors, radius, spacing, typography } from '@/lib/tokens'

const gameColors = {
	blue: colors.blue,
	coffee: colors.coffee,
	cream: colors.cream,
	espresso: colors.espresso,
	green: colors.green,
	latte: colors.latte,
	orange: colors.orange,
	pink: colors.pink,
	purple: colors.purple,
	red: colors.red,
	teal: colors.teal,
	yellow: colors.yellow,
} as const

export const answerColors = [
	gameColors.red,
	gameColors.blue,
	gameColors.yellow,
	gameColors.green,
] as const

const lightTheme = {
	colors: {
		...gameColors,
		background: colors.light.background,
		border: colors.light.border,
		surface: colors.light.surface,
		text: colors.light.text,
		textSecondary: colors.light.textSecondary,
		white: colors.white,
	},
	// oxlint-disable-next-line sort-keys
	radius,
	// oxlint-disable-next-line sort-keys
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
