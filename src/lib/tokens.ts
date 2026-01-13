// Base palette
export const colors = {
	white: '#FFFFFF',
	black: '#000000',

	// Game colors
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

	// Light theme semantic
	light: {
		background: '#FAFAFA',
		border: '#E2E8F0',
		surface: '#FFFFFF',
		text: '#1A1A2E',
		textSecondary: '#64748B',
	},

	// Dark theme semantic
	dark: {
		background: '#0F0F1A',
		border: '#2D2D44',
		surface: '#1A1A2E',
		text: '#FFFFFF',
		textSecondary: '#94A3B8',
	},
} as const

export const answerColors = [
	colors.red,
	colors.blue,
	colors.yellow,
	colors.green,
] as const

export const radius = {
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	full: 9999,
} as const

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
	screenPadding: 20,
} as const

// Font weights: 400 (regular), 600 (semibold), 700 (bold)
// Font sizes: 16, 20, 24, 32 (+ 72 for display)
export const typography = {
	body: {
		fontSize: 16,
		fontWeight: '400' as const,
	},
	bodySemibold: {
		fontSize: 16,
		fontWeight: '600' as const,
	},
	button: {
		fontSize: 20,
		fontWeight: '700' as const,
	},
	display: {
		fontSize: 72,
		fontWeight: '700' as const,
		letterSpacing: -2,
	},
	heading: {
		fontSize: 24,
		fontWeight: '700' as const,
	},
	title: {
		fontSize: 32,
		fontWeight: '700' as const,
		letterSpacing: -0.5,
	},
} as const
