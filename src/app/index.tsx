import { Trans } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { Link, type Href } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import { CategoryCard } from '@/components/CategoryCard'
import { useLocale } from '@/hooks/use-locale'
import {
	categoriesQueryOptions,
	subcategoriesQueryOptions,
} from '@/lib/query-options'

export default function CategoriesScreen() {
	const { theme } = useUnistyles()
	const locale = useLocale()
	const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
		null,
	)

	const { data: categories, isLoading } = useQuery(
		categoriesQueryOptions(locale),
	)

	const { data: subcategories, isLoading: subcategoriesLoading } = useQuery(
		subcategoriesQueryOptions(expandedCategoryId ?? '', locale),
	)

	function handleCategoryPress(categoryId: string) {
		if (expandedCategoryId === categoryId) {
			setExpandedCategoryId(null)
		} else {
			setExpandedCategoryId(categoryId)
		}
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
											href={`/quiz/${sub._id}` as Href}
										/>
									))
								) : (
									<Link href={`/quiz/${item._id}` as Href}>
										<View
											style={[
												styles.playNowButton,
												{ backgroundColor: item.color ?? theme.colors.purple },
											]}
										>
											<Text style={styles.playNowText}>
												<Trans>Play Now</Trans>
											</Text>
											<Text style={styles.playNowIcon}>→</Text>
										</View>
									</Link>
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
	playNowButton: {
		borderRadius: theme.radius.md,
		padding: theme.spacing.md,
		width: '100%',
	},
	playNowText: {
		...theme.typography.button,
		color: theme.colors.white,
	},
	playNowIcon: {
		fontSize: 24,
		color: theme.colors.white,
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
