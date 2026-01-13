import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import type { Category } from '@/lib/queries'

type CategoryCardProps = {
	category: Category
	isSubcategory?: boolean
	onPress: () => void
}

export function CategoryCard({
	category,
	onPress,
	isSubcategory = false,
}: CategoryCardProps) {
	const { theme } = useUnistyles()

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.container(category.color ?? theme.colors.purple, isSubcategory),
				pressed && styles.pressed,
			]}
		>
			<View style={styles.content}>
				{category.icon && <Text style={styles.icon}>{category.icon}</Text>}
				<Text style={styles.title} numberOfLines={2}>
					{category.title}
				</Text>
				{category.description && !isSubcategory && (
					<Text style={styles.description} numberOfLines={2}>
						{category.description}
					</Text>
				)}
			</View>
			{category.image?.asset?.url && (
				<Image
					source={{ uri: category.image.asset.url }}
					style={styles.image}
					contentFit="cover"
					transition={200}
				/>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: (color: string, isSubcategory: boolean) => ({
		backgroundColor: color,
		borderRadius: isSubcategory ? theme.radius.md : theme.radius.lg,
		padding: isSubcategory ? theme.spacing.md : theme.spacing.lg,
		minHeight: isSubcategory ? 80 : 140,
		overflow: 'hidden',
		position: 'relative',
	}),
	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},
	content: {
		flex: 1,
		zIndex: 1,
	},
	icon: {
		fontSize: 32,
		marginBottom: theme.spacing.sm,
	},
	title: {
		...theme.typography.heading,
		color: '#FFFFFF',
	},
	description: {
		...theme.typography.caption,
		color: 'rgba(255,255,255,0.9)',
		marginTop: theme.spacing.xs,
	},
	image: {
		position: 'absolute',
		right: -20,
		bottom: -20,
		width: 120,
		height: 120,
		opacity: 0.3,
		borderRadius: theme.radius.lg,
	},
}))
