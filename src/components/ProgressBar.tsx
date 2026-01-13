import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type ProgressBarProps = {
	current: number
	total: number
	color?: string
}

export function ProgressBar({ current, total, color }: ProgressBarProps) {
	const progress = current / total
	const fillColor = color ?? '#4361EE'

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.fill,
					{
						backgroundColor: fillColor,
						width: `${progress * 100}%`,
					},
				]}
			/>
		</View>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.border,
		borderRadius: theme.radius.full,
		height: 8,
		overflow: 'hidden',
	},
	fill: {
		borderRadius: theme.radius.full,
		height: '100%',
	},
}))
