import { Image } from 'expo-image'
import { Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

type QuestionCardProps = {
	imageUrl?: string
	text: string
	timeRemaining: number
}

export function QuestionCard({
	text,
	imageUrl,
	timeRemaining,
}: QuestionCardProps) {
	const { theme } = useUnistyles()

	const timerColor =
		timeRemaining <= 5
			? theme.colors.red
			: timeRemaining <= 10
				? theme.colors.yellow
				: theme.colors.teal

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.timerContainer}>
					<Text style={styles.timerText(timerColor)}>{timeRemaining}</Text>
				</View>
			</View>

			{imageUrl && (
				<Image
					source={{ uri: imageUrl }}
					style={styles.image}
					contentFit="cover"
					transition={200}
				/>
			)}

			<Text style={styles.questionText}>{text}</Text>
		</View>
	)
}

const styles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.radius.lg,
		padding: theme.spacing.lg,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: theme.spacing.md,
	},
	image: {
		width: '100%',
		height: 180,
		borderRadius: theme.radius.md,
		marginBottom: theme.spacing.lg,
	},
	questionText: {
		...theme.typography.heading,
		color: theme.colors.text,
		textAlign: 'center',
		lineHeight: 32,
	},
	timerContainer: {
		alignItems: 'center',
		backgroundColor: theme.colors.background,
		borderColor: theme.colors.border,
		borderRadius: theme.radius.full,
		borderWidth: 3,
		height: 48,
		justifyContent: 'center',
		width: 48,
	},
	timerText: (color: string) => ({
		...theme.typography.heading,
		color,
	}),
}))
