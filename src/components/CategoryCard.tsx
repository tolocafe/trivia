import { Link, type Href } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import type { Category } from '@/lib/queries'

type CategoryCardProps = {
	category: Category
	isSubcategory?: boolean
} & ({ href: Href; onPress?: never } | { href?: never; onPress: () => void })

export function CategoryCard({
	category,
	onPress,
	href,
	isSubcategory = false,
}: CategoryCardProps) {
	const { theme } = useUnistyles()

	styles.useVariants({ isSubcategory })

	const content = (
		<>
			{category.icon ? <Text style={styles.icon}>{category.icon}</Text> : null}
			<Text style={styles.title} numberOfLines={2}>
				{category.title}
			</Text>
			{category.description && !isSubcategory && (
				<Text style={styles.description} numberOfLines={2}>
					{category.description}
				</Text>
			)}
		</>
	)

	if (href) {
		return (
			<Link href={href} style={{ width: '100%' }}>
				<View
					style={[
						styles.container,
						{ backgroundColor: category.color ?? theme.colors.purple },
					]}
				>
					{content}
				</View>
			</Link>
		)
	}

	return (
		<Pressable
			onPress={onPress}
			style={(state) => [
				styles.container,
				{ backgroundColor: category.color ?? theme.colors.purple },
				state.pressed && styles.pressed,
			]}
		>
			{content}
		</Pressable>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		width: '100%',
		borderRadius: theme.radius.lg,
		padding: theme.spacing.lg,
		overflow: 'hidden',
		backgroundColor: theme.colors.purple,
		minHeight: 140,
		variants: {
			isSubcategory: {
				true: {
					borderRadius: theme.radius.md,
					padding: theme.spacing.md,
					minHeight: 80,
				},
			},
		},
	},
	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},
	icon: {
		fontSize: 32,
		marginBottom: theme.spacing.sm,
	},
	title: {
		...theme.typography.heading,
		color: theme.colors.white,
	},
	description: {
		...theme.typography.body,
		color: 'rgba(255,255,255,0.9)',
		marginTop: theme.spacing.xs,
	},
}))
