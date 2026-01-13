import { i18n } from '@lingui/core'

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

export function activateLocale(locale: Locale) {
	i18n.loadAndActivate({ locale, messages: allMessages[locale] })
}

// Initialize with English
activateLocale('en')

export { i18n }
