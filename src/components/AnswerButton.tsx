import { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

import { answerColors } from '@/lib/tokens'

type AnswerButtonProps = {
	text: string | null
	index: number
	onPress: () => void
	disabled?: boolean
	isCorrect?: boolean
	isSelected?: boolean
	showResult?: boolean
}

const labels = ['A', 'B', 'C', 'D']

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type AnswerState = 'answer0' | 'answer1' | 'answer2' | 'answer3' | 'correct' | 'incorrect' | 'dimmed'

function getAnswerState(params: {
	index: number
	showResult: boolean
	isCorrect: boolean
	isSelected: boolean
}): AnswerState {
	if (!params.showResult) {
		return `answer${params.index}` as AnswerState
	}
	if (params.isCorrect) {
		return 'correct'
	}
	if (params.isSelected) {
		return 'incorrect'
	}
	return 'dimmed'
}

export function AnswerButton({
	text,
	index,
	onPress,
	disabled = false,
	isCorrect = false,
	isSelected = false,
	showResult = false,
}: AnswerButtonProps) {
	const scale = useSharedValue(1)
	const opacity = useSharedValue(1)

	const answerState = getAnswerState({ index, showResult, isCorrect, isSelected })
	styles.useVariants({ answerState })

	useEffect(() => {
		if (showResult) {
			if (isSelected && !isCorrect) {
				scale.value = withSequence(
					withTiming(1.05, { duration: 100 }),
					withSpring(1),
				)
			}
			if (!isSelected && !isCorrect) {
				opacity.value = withTiming(0.6, { duration: 200 })
			}
		} else {
			opacity.value = 1
			scale.value = 1
		}
	}, [showResult, isSelected, isCorrect, opacity, scale])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}))

	return (
		<AnimatedPressable
			onPress={onPress}
			disabled={disabled}
			style={[styles.container, animatedStyle]}
		>
			<View style={styles.label}>
				<Text style={styles.labelText}>{labels[index]}</Text>
			</View>
			<Text style={styles.text} numberOfLines={3}>
				{text}
			</Text>
			{showResult && isCorrect && <Text style={styles.checkmark}>✓</Text>}
			{showResult && isSelected && !isCorrect && (
				<Text style={styles.checkmark}>✗</Text>
			)}
		</AnimatedPressable>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		borderRadius: theme.radius.md,
		padding: theme.spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 64,
		variants: {
			answerState: {
				answer0: { backgroundColor: answerColors[0] },
				answer1: { backgroundColor: answerColors[1] },
				answer2: { backgroundColor: answerColors[2] },
				answer3: { backgroundColor: answerColors[3] },
				correct: { backgroundColor: theme.colors.green },
				incorrect: { backgroundColor: theme.colors.red },
				dimmed: { backgroundColor: theme.colors.textSecondary },
			},
		},
	},
	label: {
		width: 36,
		height: 36,
		borderRadius: theme.radius.sm,
		backgroundColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: theme.spacing.md,
	},
	labelText: {
		...theme.typography.button,
		color: theme.colors.white,
	},
	text: {
		...theme.typography.bodySemibold,
		color: theme.colors.white,
		flex: 1,
	},
	checkmark: {
		fontSize: 24,
		color: theme.colors.white,
		marginLeft: theme.spacing.sm,
	},
}))
