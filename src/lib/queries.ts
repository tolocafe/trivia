import { sanityClient } from '@/lib/sanity'

export type Category = {
	_id: string
	color?: string
	description?: string
	icon?: string
	image?: {
		asset: {
			_id: string
			url: string
		}
	}
	order: number
	parent?: { _id: string; title: string }
	slug: { current: string }
	title: string
}

export type Answer = {
	_key: string
	text: string
}

export type Question = {
	_id: string
	answers: Answer[]
	category: { _id: string; title: string }
	correctAnswerIndex: number
	difficulty: 'foundation' | 'intermediate' | 'professional'
	explanation?: string
	image?: {
		asset: {
			_id: string
			url: string
		}
	}
	text: string
	timeLimit: number
}

export async function getCategories(): Promise<Category[]> {
	return sanityClient.fetch(`
    *[_type == "category" && !defined(parent)] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
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
}

export async function getSubcategories(parentId: string): Promise<Category[]> {
	return sanityClient.fetch(
		`
    *[_type == "category" && parent._ref == $parentId] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      parent-> {
        _id,
        title
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
  `,
		{ parentId },
	)
}

export async function getQuestionsByCategory(
	categoryId: string,
): Promise<Question[]> {
	return sanityClient.fetch(
		`
    *[_type == "question" && category._ref == $categoryId] {
      _id,
      text,
      category-> {
        _id,
        title
      },
      answers[] {
        _key,
        text
      },
      correctAnswerIndex,
      difficulty,
      explanation,
      image {
        asset-> {
          _id,
          url
        }
      },
      timeLimit
    }
  `,
		{ categoryId },
	)
}

