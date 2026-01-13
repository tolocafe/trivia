import type { PostHogCustomStorage } from 'posthog-react-native'
import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV()

export const STORAGE_KEYS = {
	locale: 'app.locale',
} as const

// PostHog storage adapter using MMKV
export const postHogStorage: PostHogCustomStorage = {
	getItem: (key: string) => storage.getString(key) ?? null,
	setItem: (key: string, value: string) => storage.set(key, value),
}
