import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const categoryTranslations: Record<
	string,
	{ en: { title: string; description: string }; es: { title: string; description: string } }
> = {
	'5c561d8c-d66e-4351-9da5-e5cba998e371': {
		en: { title: 'Introduction to Coffee', description: 'Learn the fundamentals of coffee, from bean to cup' },
		es: { title: 'Introducción al Café', description: 'Aprende los fundamentos del café, del grano a la taza' },
	},
	'c0db7061-0f68-4247-8162-71fb7b13742a': {
		en: { title: 'Barista Skills', description: 'Master the art of espresso and milk-based drinks' },
		es: { title: 'Habilidades de Barista', description: 'Domina el arte del espresso y las bebidas con leche' },
	},
	'9aed1468-5664-4c34-8d90-7f3e3bac797c': {
		en: { title: 'Brewing', description: 'Explore various brewing methods and extraction science' },
		es: { title: 'Preparación', description: 'Explora varios métodos de preparación y la ciencia de extracción' },
	},
	'293f939a-735b-497c-8ad2-b95ee73431db': {
		en: { title: 'Sensory Skills', description: 'Develop your palate and cupping abilities' },
		es: { title: 'Habilidades Sensoriales', description: 'Desarrolla tu paladar y habilidades de catación' },
	},
	'a4b3c80d-18a1-4d27-a567-f855880d601d': {
		en: { title: 'Green Coffee', description: 'Understand coffee origins, processing, and grading' },
		es: { title: 'Café Verde', description: 'Comprende los orígenes del café, procesamiento y clasificación' },
	},
	'689d6772-507b-48e2-8969-307859827365': {
		en: { title: 'Roasting', description: 'Learn the science and art of coffee roasting' },
		es: { title: 'Tueste', description: 'Aprende la ciencia y el arte del tueste del café' },
	},
}

const levelTranslations: Record<string, { en: string; es: string }> = {
	Foundation: { en: 'Foundation', es: 'Fundamentos' },
	Intermediate: { en: 'Intermediate', es: 'Intermedio' },
	Professional: { en: 'Professional', es: 'Profesional' },
}

async function migrateCategories() {
	console.log('Migrating categories...')
	const categories = await client.fetch<Array<{ _id: string; title: string; description?: string }>>(
		'*[_type == "category"]{ _id, title, description }'
	)

	for (const cat of categories) {
		if (Array.isArray(cat.title)) {
			console.log(`Skipping ${cat._id} - already migrated`)
			continue
		}

		const trans = categoryTranslations[cat._id]
		let titleArray: Array<{ _key: string; value: string }>
		let descArray: Array<{ _key: string; value: string }> | undefined

		if (trans) {
			titleArray = [
				{ _key: 'en', value: trans.en.title },
				{ _key: 'es', value: trans.es.title },
			]
			descArray = [
				{ _key: 'en', value: trans.en.description },
				{ _key: 'es', value: trans.es.description },
			]
		} else {
			const level = levelTranslations[cat.title]
			if (level) {
				titleArray = [
					{ _key: 'en', value: level.en },
					{ _key: 'es', value: level.es },
				]
			} else {
				titleArray = [
					{ _key: 'en', value: cat.title },
					{ _key: 'es', value: cat.title },
				]
			}
			if (cat.description) {
				descArray = [
					{ _key: 'en', value: cat.description },
					{ _key: 'es', value: cat.description },
				]
			}
		}

		console.log(`Migrating: ${cat.title}`)
		await client
			.patch(cat._id)
			.set({
				title: titleArray,
				...(descArray && { description: descArray }),
			})
			.commit()
	}
	console.log('Categories done!')
}

async function migrateQuestions() {
	console.log('Migrating questions...')
	const questions = await client.fetch<
		Array<{
			_id: string
			text: string
			explanation?: string
			answers: Array<{ _key: string; text: string }>
		}>
	>('*[_type == "question"]{ _id, text, explanation, answers }')

	for (const q of questions) {
		if (Array.isArray(q.text)) {
			console.log(`Skipping question ${q._id} - already migrated`)
			continue
		}

		console.log(`Migrating question: ${q.text.substring(0, 40)}...`)

		const textArray = [
			{ _key: 'en', value: q.text },
			{ _key: 'es', value: q.text },
		]

		const explanationArray = q.explanation
			? [
					{ _key: 'en', value: q.explanation },
					{ _key: 'es', value: q.explanation },
				]
			: undefined

		const answersArray = q.answers.map((a) => ({
			_key: a._key,
			text: [
				{ _key: 'en', value: a.text },
				{ _key: 'es', value: a.text },
			],
		}))

		await client
			.patch(q._id)
			.set({
				text: textArray,
				answers: answersArray,
				...(explanationArray && { explanation: explanationArray }),
			})
			.commit()
	}
	console.log('Questions done!')
}

async function main() {
	await migrateCategories()
	await migrateQuestions()
	console.log('Migration complete!')
}

main()
