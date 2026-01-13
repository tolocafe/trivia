import { defineQuery } from 'groq'

import { sanityClient } from '@/lib/sanity'
import type { Locale } from '@/lib/i18n'
import type {
	CATEGORIES_QUERYResult,
	SUBCATEGORIES_QUERYResult,
	QUESTIONS_BY_CATEGORY_QUERYResult,
} from '@/lib/sanity.types'

// Re-export types for backwards compatibility
export type Category = CATEGORIES_QUERYResult[number]
export type Subcategory = SUBCATEGORIES_QUERYResult[number]
export type Question = QUESTIONS_BY_CATEGORY_QUERYResult[number]
export type Answer = NonNullable<Question['answers']>[number]

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
	*[_type == "category" && !defined(parent)] | order(order asc) {
		_id,
		"title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
		"slug": slug.current,
		"description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
		color,
		icon,
		image {
			asset-> {
				_id,
				url
			}
		},
		order
	}
`)

export const SUBCATEGORIES_QUERY = defineQuery(/* groq */ `
	*[_type == "category" && parent._ref == $parentId] | order(order asc) {
		_id,
		"title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
		"slug": slug.current,
		"description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
		parent-> {
			_id,
			"title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value)
		},
		color,
		icon,
		image {
			asset-> {
				_id,
				url
			}
		},
		order
	}
`)

export const QUESTIONS_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
	*[_type == "question" && category._ref == $categoryId] {
		_id,
		"text": coalesce(text[_key == $locale][0].value, text[_key == "en"][0].value),
		category-> {
			_id,
			"title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
			timeLimit
		},
		"answers": answers[] {
			_key,
			"text": coalesce(text[_key == $locale][0].value, text[_key == "en"][0].value)
		},
		correctAnswerIndex,
		"explanation": coalesce(explanation[_key == $locale][0].value, explanation[_key == "en"][0].value),
		image {
			asset-> {
				_id,
				url
			}
		}
	}
`)

export async function getCategories(locale: Locale) {
	return sanityClient.fetch(CATEGORIES_QUERY, { locale })
}

export async function getSubcategories(parentId: string, locale: Locale) {
	return sanityClient.fetch(SUBCATEGORIES_QUERY, { parentId, locale })
}

export async function getQuestionsByCategory(categoryId: string, locale: Locale) {
	return sanityClient.fetch(QUESTIONS_BY_CATEGORY_QUERY, { categoryId, locale })
}

// For static generation - get all category IDs
export const ALL_CATEGORY_IDS_QUERY = defineQuery(/* groq */ `
	*[_type == "category"]._id
`)

export async function getAllCategoryIds() {
	return sanityClient.fetch(ALL_CATEGORY_IDS_QUERY)
}
