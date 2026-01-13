import { StyleSheet } from 'react-native-unistyles'

const gameColors = {
	blue: '#4361EE',
	coffee: '#6F4E37',
	cream: '#FFFDD0',
	espresso: '#3C2415',
	green: '#2DC653',
	latte: '#C8A27A',
	orange: '#FF6B35',
	pink: '#FF4081',
	purple: '#7B2CBF',
	red: '#EF233C',
	teal: '#00C9A7',
	yellow: '#FFD93D',
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
		background: '#FAFAFA',
		border: '#E2E8F0',
		surface: '#FFFFFF',
		text: '#1A1A2E',
		textSecondary: '#64748B',
	},
	// oxlint-disable-next-line sort-keys
	radius: {
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		full: 9999,
	},
	// oxlint-disable-next-line sort-keys
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		xxl: 48,
		screenPadding: 20,
	},
	typography: {
		body: {
			fontSize: 16,
			fontWeight: '400' as const,
		},
		button: {
			fontSize: 18,
			fontWeight: '700' as const,
			letterSpacing: 0.5,
		},
		caption: {
			fontSize: 14,
			fontWeight: '500' as const,
		},
		heading: {
			fontSize: 24,
			fontWeight: '700' as const,
			letterSpacing: -0.3,
		},
		title: {
			fontSize: 32,
			fontWeight: '800' as const,
			letterSpacing: -0.5,
		},
	},
} as const

const darkTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		background: '#0F0F1A',
		border: '#2D2D44',
		surface: '#1A1A2E',
		text: '#FFFFFF',
		textSecondary: '#94A3B8',
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

