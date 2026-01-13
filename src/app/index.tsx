import { Trans } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from 'react-native'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import { CategoryCard } from '@/components/CategoryCard'
import {
	categoriesQueryOptions,
	subcategoriesQueryOptions,
} from '@/lib/query-options'

export default function CategoriesScreen() {
	const { theme } = useUnistyles()
	const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
		null,
	)

	const { data: categories, isLoading } = useQuery(categoriesQueryOptions)

	const { data: subcategories, isLoading: subcategoriesLoading } = useQuery(
		subcategoriesQueryOptions(expandedCategoryId ?? ''),
	)

	function handleCategoryPress(categoryId: string) {
		if (expandedCategoryId === categoryId) {
			setExpandedCategoryId(null)
		} else {
			setExpandedCategoryId(categoryId)
		}
	}

	function handleSubcategoryPress(subcategoryId: string) {
		router.push(`/quiz/${subcategoryId}`)
	}

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.colors.purple} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={categories}
				keyExtractor={(item) => item._id}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<Animated.View
						entering={FadeIn.delay(index * 100)}
						layout={Layout.springify()}
					>
						<CategoryCard
							category={item}
							onPress={() => handleCategoryPress(item._id)}
						/>

						{expandedCategoryId === item._id && (
							<Animated.View
								entering={FadeIn.duration(200)}
								exiting={FadeOut.duration(150)}
								style={styles.subcategoriesContainer}
							>
								{subcategoriesLoading ? (
									<ActivityIndicator
										size="small"
										color={theme.colors.purple}
										style={styles.subcategoryLoader}
									/>
								) : subcategories && subcategories.length > 0 ? (
									subcategories.map((sub) => (
										<CategoryCard
											key={sub._id}
											category={sub}
											isSubcategory
											onPress={() => handleSubcategoryPress(sub._id)}
										/>
									))
								) : (
									<Pressable
										style={styles.playNowButton(
											item.color ?? theme.colors.purple,
										)}
										onPress={() => handleSubcategoryPress(item._id)}
									>
										<Text style={styles.playNowText}>
											<Trans>Play Now</Trans>
										</Text>
										<Text style={styles.playNowIcon}>→</Text>
									</Pressable>
								)}
							</Animated.View>
						)}
					</Animated.View>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyEmoji}>📚</Text>
						<Text style={styles.emptyText}>
							<Trans>No categories yet</Trans>
						</Text>
						<Text style={styles.emptySubtext}>
							<Trans>Check back soon for coffee trivia!</Trans>
						</Text>
					</View>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.background,
	},
	header: {
		paddingHorizontal: theme.spacing.lg,
		paddingBottom: theme.spacing.lg,
		alignItems: 'center',
	},
	logo: {
		fontSize: 56,
		marginBottom: theme.spacing.sm,
	},
	title: {
		...theme.typography.title,
		color: theme.colors.text,
		textAlign: 'center',
	},
	subtitle: {
		...theme.typography.body,
		color: theme.colors.textSecondary,
		marginTop: theme.spacing.xs,
	},
	list: {
		padding: theme.spacing.lg,
		paddingBottom: theme.spacing.xxl,
	},
	separator: {
		height: theme.spacing.md,
	},
	subcategoriesContainer: {
		marginTop: theme.spacing.sm,
		marginLeft: theme.spacing.lg,
		gap: theme.spacing.sm,
	},
	subcategoryLoader: {
		padding: theme.spacing.lg,
	},
	playNowButton: (color: string) => ({
		backgroundColor: color,
		borderRadius: theme.radius.md,
		padding: theme.spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	}),
	playNowText: {
		...theme.typography.button,
		color: '#FFFFFF',
	},
	playNowIcon: {
		fontSize: 24,
		color: '#FFFFFF',
	},
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing.xxl,
	},
	emptyEmoji: {
		fontSize: 64,
		marginBottom: theme.spacing.md,
	},
	emptyText: {
		...theme.typography.heading,
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
	},
	emptySubtext: {
		...theme.typography.body,
		color: theme.colors.textSecondary,
		textAlign: 'center',
	},
}))
