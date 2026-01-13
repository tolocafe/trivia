import { t } from '@lingui/core/macro'
import { I18nProvider } from '@lingui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useUnistyles } from 'react-native-unistyles'

import { LanguageToggle } from '@/components/LanguageToggle'
import { i18n as i18nConfig } from '@/lib/i18n'

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
					color: theme.colors.text,
					fontSize: 20,
					fontWeight: '700',
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerRight: () => <LanguageToggle />,
					title: t`☕️ TOLO Trivia`,
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
