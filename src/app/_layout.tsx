import '@/lib/styles'

import { t } from '@lingui/core/macro'
import { I18nProvider } from '@lingui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import { LanguageToggle } from '@/components/LanguageToggle'
import { i18n as i18nConfig } from '@/lib/i18n'
import { typography } from '@/lib/tokens'

import icon from '@/assets/icon.png'

const styles = StyleSheet.create((theme) => ({
	headerIcon: {
		height: 32,
		width: 32,
	},
	headerTitle: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: theme.spacing.sm,
	},
	headerTitleText: {
		...theme.typography.button,
		color: theme.colors.text,
	},
}))

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {},
	},
})

function RootStack() {
	const { theme } = useUnistyles()

	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerStyle: { backgroundColor: theme.colors.background },
				headerTintColor: theme.colors.text,
				headerTitleStyle: {
					...typography.button,
					color: theme.colors.text,
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerRight: () => <LanguageToggle />,
					headerTitle: () => (
						<View style={styles.headerTitle}>
							<Image source={icon} style={styles.headerIcon} />
							<Text style={styles.headerTitleText}>{t`Trivia`}</Text>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="quiz/[categoryId]"
				options={{
					animation: 'slide_from_bottom',
					gestureEnabled: false,
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="result"
				options={{
					animation: 'fade',
					headerShown: false,
					presentation: 'transparentModal',
				}}
			/>
		</Stack>
	)
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<I18nProvider i18n={i18nConfig}>
				<RootStack />
				<StatusBar style="auto" />
			</I18nProvider>
		</QueryClientProvider>
	)
}
