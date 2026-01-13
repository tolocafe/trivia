import { Trans } from '@lingui/react/macro'
import { router, useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'

import { ScoreDisplay } from '@/components/ScoreDisplay'

export default function ResultScreen() {
	const insets = UnistylesRuntime.insets
	const { score, total, correct, categoryId } = useLocalSearchParams<{
		score: string
		total: string
		correct: string
		categoryId: string
	}>()

	function handlePlayAgain() {
		router.replace(`/quiz/${categoryId}`)
	}

	function handleGoHome() {
		router.replace('/')
	}

	return (
		<View style={styles.container}>
			<Head>
				<title>Results - TOLO Trivia</title>
			</Head>
			<View style={styles.overlay} />

			<View
				style={[
					styles.content,
					{ paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 },
				]}
			>
				<ScoreDisplay
					score={parseInt(score ?? '0', 10)}
					totalQuestions={parseInt(total ?? '0', 10)}
					correctAnswers={parseInt(correct ?? '0', 10)}
				/>

				<View style={styles.buttons}>
					<Pressable style={styles.playAgainButton} onPress={handlePlayAgain}>
						<Text style={styles.playAgainText}>
							<Trans>Play Again</Trans>
						</Text>
					</Pressable>

					<Pressable style={styles.homeButton} onPress={handleGoHome}>
						<Text style={styles.homeButtonText}>
							<Trans>Back to Categories</Trans>
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		padding: theme.spacing.lg,
	},
	buttons: {
		marginTop: theme.spacing.xl,
		gap: theme.spacing.md,
	},
	playAgainButton: {
		backgroundColor: theme.colors.purple,
		borderRadius: theme.radius.full,
		paddingVertical: theme.spacing.md,
		alignItems: 'center',
	},
	playAgainText: {
		...theme.typography.button,
		color: theme.colors.white,
	},
	homeButton: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.radius.full,
		paddingVertical: theme.spacing.md,
		alignItems: 'center',
	},
	homeButtonText: {
		...theme.typography.button,
		color: theme.colors.text,
	},
}))
