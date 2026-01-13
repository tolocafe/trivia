import { Trans } from '@lingui/react/macro'
import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

type ScoreDisplayProps = {
	score: number
	totalQuestions: number
	correctAnswers: number
}

export function ScoreDisplay({
	score,
	totalQuestions,
	correctAnswers,
}: ScoreDisplayProps) {
	const scale = useSharedValue(0)
	const opacity = useSharedValue(0)
	const scoreScale = useSharedValue(0)

	useEffect(() => {
		scale.value = withSpring(1, { damping: 12 })
		opacity.value = withTiming(1, { duration: 400 })
		scoreScale.value = withDelay(
			300,
			withSequence(
				withSpring(1.2, { damping: 8 }),
				withSpring(1, { damping: 10 }),
			),
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const containerStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}))

	const scoreStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scoreScale.value }],
	}))

	const percentage = Math.round((correctAnswers / totalQuestions) * 100)
	const emoji =
		percentage >= 80
			? '🏆'
			: percentage >= 60
				? '⭐'
				: percentage >= 40
					? '👍'
					: '💪'
	const message =
		percentage >= 80
			? 'Amazing!'
			: percentage >= 60
				? 'Great job!'
				: percentage >= 40
					? 'Good effort!'
					: 'Keep practicing!'

	return (
		<Animated.View style={[styles.container, containerStyle]}>
			<Text style={styles.emoji}>{emoji}</Text>

			<Animated.View style={[styles.scoreContainer, scoreStyle]}>
				<Text style={styles.scoreLabel}>
					<Trans>Score</Trans>
				</Text>
				<Text style={styles.scoreValue}>{score}</Text>
			</Animated.View>

			<Text style={styles.message}>{message}</Text>

			<View style={styles.statsContainer}>
				<View style={styles.stat}>
					<Text style={styles.statValue}>{correctAnswers}</Text>
					<Text style={styles.statLabel}>
						<Trans>Correct</Trans>
					</Text>
				</View>
				<View style={styles.divider} />
				<View style={styles.stat}>
					<Text style={styles.statValue}>
						{totalQuestions - correctAnswers}
					</Text>
					<Text style={styles.statLabel}>
						<Trans>Wrong</Trans>
					</Text>
				</View>
				<View style={styles.divider} />
				<View style={styles.stat}>
					<Text style={styles.statValue}>{percentage}%</Text>
					<Text style={styles.statLabel}>
						<Trans>Accuracy</Trans>
					</Text>
				</View>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.radius.xl,
		padding: theme.spacing.xl,
		alignItems: 'center',
	},
	emoji: {
		fontSize: 64,
		marginBottom: theme.spacing.md,
	},
	scoreContainer: {
		alignItems: 'center',
		marginBottom: theme.spacing.md,
	},
	scoreLabel: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
		textTransform: 'uppercase',
		letterSpacing: 2,
	},
	scoreValue: {
		fontSize: 72,
		fontWeight: '800',
		color: theme.colors.purple,
		letterSpacing: -2,
	},
	message: {
		...theme.typography.heading,
		color: theme.colors.text,
		marginBottom: theme.spacing.xl,
	},
	statsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-around',
		paddingTop: theme.spacing.lg,
		borderTopWidth: 1,
		borderTopColor: theme.colors.border,
	},
	stat: {
		alignItems: 'center',
	},
	statValue: {
		...theme.typography.heading,
		color: theme.colors.text,
	},
	statLabel: {
		...theme.typography.caption,
		color: theme.colors.textSecondary,
		marginTop: theme.spacing.xs,
	},
	divider: {
		width: 1,
		height: 40,
		backgroundColor: theme.colors.border,
	},
}))
