import { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import { answerColors } from '@/lib/styles'

type AnswerButtonProps = {
	text: string
	index: number
	onPress: () => void
	disabled?: boolean
	isCorrect?: boolean
	isSelected?: boolean
	showResult?: boolean
}

const labels = ['A', 'B', 'C', 'D']

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function AnswerButton({
	text,
	index,
	onPress,
	disabled = false,
	isCorrect = false,
	isSelected = false,
	showResult = false,
}: AnswerButtonProps) {
	const { theme } = useUnistyles()
	const scale = useSharedValue(1)
	const opacity = useSharedValue(1)

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

	function getBackgroundColor() {
		if (!showResult) {
			return answerColors[index]
		}
		if (isCorrect) {
			return theme.colors.green
		}
		if (isSelected) {
			return theme.colors.red
		}
		return theme.colors.textSecondary
	}

	return (
		<AnimatedPressable
			onPress={onPress}
			disabled={disabled}
			style={[styles.container(getBackgroundColor()), animatedStyle]}
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
	container: (backgroundColor: string) => ({
		backgroundColor,
		borderRadius: theme.radius.md,
		padding: theme.spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 64,
	}),
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
		color: '#FFFFFF',
	},
	text: {
		...theme.typography.body,
		color: '#FFFFFF',
		flex: 1,
		fontWeight: '600',
	},
	checkmark: {
		fontSize: 24,
		color: '#FFFFFF',
		marginLeft: theme.spacing.sm,
	},
}))
