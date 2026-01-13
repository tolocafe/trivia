import { i18n } from '@lingui/core'
import { getLocales } from 'expo-localization'

import { messages as enMessages } from '@/locales/en/messages.po'
import { messages as esMessages } from '@/locales/es/messages.po'

export const locales = {
	en: 'English',
	es: 'Español',
} as const

export type Locale = keyof typeof locales

const allMessages: Record<Locale, typeof enMessages> = {
	en: enMessages,
	es: esMessages,
}

export function getDeviceLocale(): Locale {
	const deviceLocales = getLocales()
	const deviceLang = deviceLocales[0]?.languageCode

	if (deviceLang && deviceLang in locales) {
		return deviceLang as Locale
	}

	return 'en'
}

export function activateLocale(locale: Locale) {
	i18n.loadAndActivate({ locale, messages: allMessages[locale] })
}

// Initialize with device locale
activateLocale(getDeviceLocale())

export { i18n }
