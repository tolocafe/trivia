import { useMMKVString } from 'react-native-mmkv'

import { getDeviceLocale, type Locale, locales } from '@/lib/i18n'
import { storage, STORAGE_KEYS } from '@/lib/storage'

export function useLocale(): Locale {
	const [storedLocale] = useMMKVString(STORAGE_KEYS.locale, storage)
	return storedLocale && storedLocale in locales
		? (storedLocale as Locale)
		: getDeviceLocale()
}
