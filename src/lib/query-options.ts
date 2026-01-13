import { queryOptions } from '@tanstack/react-query'

import {
	getCategories,
	getQuestionsByCategory,
	getSubcategories,
} from '@/lib/queries'

export const categoriesQueryOptions = queryOptions({
	queryFn: getCategories,
	queryKey: ['categories'],
})

export function subcategoriesQueryOptions(parentId: string) {
	return queryOptions({
		enabled: Boolean(parentId),
		queryFn: () => getSubcategories(parentId),
		queryKey: ['subcategories', parentId],
	})
}

export function questionsQueryOptions(categoryId: string) {
	return queryOptions({
		enabled: Boolean(categoryId),
		queryFn: () => getQuestionsByCategory(categoryId),
		queryKey: ['questions', categoryId],
	})
}
