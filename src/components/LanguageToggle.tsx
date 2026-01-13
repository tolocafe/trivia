import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Pressable, Text } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { StyleSheet } from 'react-native-unistyles'

import { activateLocale, type Locale, locales } from '@/lib/i18n'
import { STORAGE_KEYS } from '@/lib/storage'

export function LanguageToggle() {
	const queryClient = useQueryClient()
	const [storedLocale, setStoredLocale] = useMMKVString(STORAGE_KEYS.locale)

	const locale: Locale =
		storedLocale && storedLocale in locales ? (storedLocale as Locale) : 'en'

	useEffect(() => {
		activateLocale(locale)
	}, [locale])

	function handleToggle() {
		const localeKeys = Object.keys(locales) as Locale[]
		const currentIndex = localeKeys.indexOf(locale)
		const nextLocale = localeKeys[(currentIndex + 1) % localeKeys.length]
		setStoredLocale(nextLocale)
		queryClient.invalidateQueries()
	}

	return (
		<Pressable
			onPress={handleToggle}
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
		>
			<Text style={styles.text}>{locale.toUpperCase()}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		alignItems: 'center',
		backgroundColor: theme.colors.surface,
		borderRadius: theme.radius.sm,
		justifyContent: 'center',
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
	},
	pressed: {
		opacity: 0.7,
	},
	text: {
		...theme.typography.bodySemibold,
		color: theme.colors.text,
	},
}))
