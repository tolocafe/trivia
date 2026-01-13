import { queryOptions } from '@tanstack/react-query'

import type { Locale } from '@/lib/i18n'
import {
	getCategories,
	getQuestionsByCategory,
	getSubcategories,
} from '@/lib/queries'

export function categoriesQueryOptions(locale: Locale) {
	return queryOptions({
		queryFn: () => getCategories(locale),
		queryKey: ['categories', locale],
	})
}

export function subcategoriesQueryOptions(parentId: string, locale: Locale) {
	return queryOptions({
		enabled: Boolean(parentId),
		queryFn: () => getSubcategories(parentId, locale),
		queryKey: ['subcategories', parentId, locale],
	})
}

export function questionsQueryOptions(categoryId: string, locale: Locale) {
	return queryOptions({
		enabled: Boolean(categoryId),
		queryFn: () => getQuestionsByCategory(categoryId, locale),
		queryKey: ['questions', categoryId, locale],
	})
}
