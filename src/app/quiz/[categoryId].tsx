import { Trans } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated'
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
  withUnistyles,
} from 'react-native-unistyles'

import { AnswerButton } from '@/components/AnswerButton'
import { ProgressBar } from '@/components/ProgressBar'
import { QuestionCard } from '@/components/QuestionCard'
import { questionsQueryOptions } from '@/lib/query-options'

const POINTS_BASE = 100
const POINTS_TIME_BONUS = 10
const QUIZ_QUESTION_LIMIT = 15

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const UniAnimatedView = withUnistyles(Animated.View)

export default function QuizScreen() {
  const { theme } = useUnistyles()
  const insets = UnistylesRuntime.insets
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>()

  const { data: allQuestions, isLoading } = useQuery(
    questionsQueryOptions(categoryId ?? ''),
  )

  const quizQuestions = useMemo(() => {
    if (!allQuestions) return []
    return shuffleArray(allQuestions).slice(0, QUIZ_QUESTION_LIMIT)
  }, [allQuestions])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(20)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentQuestion = quizQuestions[currentIndex]
  const totalQuestions = quizQuestions.length

  useEffect(() => {
    if (currentQuestion && !showResult) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      const timeLimit = currentQuestion.timeLimit ?? 20
      setTimeRemaining(timeLimit)

      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setShowResult(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, currentQuestion, showResult])

  function handleAnswerPress(answerIndex: number) {
    if (showResult || selectedAnswer !== null) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (currentQuestion && answerIndex === currentQuestion.correctAnswerIndex) {
      const timeBonus = timeRemaining * POINTS_TIME_BONUS
      setScore((prev) => prev + POINTS_BASE + timeBonus)
      setCorrectCount((prev) => prev + 1)
    }
  }

  function handleNext() {
    if (currentIndex >= totalQuestions - 1) {
      router.replace({
        pathname: '/result',
        params: {
          score: score.toString(),
          total: totalQuestions.toString(),
          correct: correctCount.toString(),
          categoryId,
        },
      })
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  function handleClose() {
    router.navigate('/')
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.purple} />
      </View>
    )
  }

  if (quizQuestions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🤷</Text>
        <Text style={styles.emptyText}>
          <Trans>No questions available</Trans>
        </Text>
        <Pressable style={styles.backButton} onPress={handleClose}>
          <Text style={styles.backButtonText}>
            <Trans>Go Back</Trans>
          </Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
        <View style={styles.progressContainer}>
          <ProgressBar
            current={currentIndex + 1}
            total={totalQuestions}
            color={theme.colors.purple}
          />
        </View>
        <View style={styles.questionCounter}>
          <Text style={styles.questionCounterText}>
            {currentIndex + 1}/{totalQuestions}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={currentQuestion._id}
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(200)}
        >
          <QuestionCard
            imageUrl={currentQuestion.image?.asset?.url}
            text={currentQuestion.text}
            timeRemaining={timeRemaining}
          />
        </Animated.View>

        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <AnswerButton
              key={answer._key}
              text={answer.text}
              index={index}
              onPress={() => handleAnswerPress(index)}
              disabled={showResult}
              isCorrect={index === currentQuestion.correctAnswerIndex}
              isSelected={selectedAnswer === index}
              showResult={showResult}
            />
          ))}
        </View>

        {showResult && currentQuestion.explanation && (
          <UniAnimatedView
            entering={FadeIn.delay(300)}
            style={styles.explanationContainer}
          >
            <Text style={styles.explanationLabel}>
              <Trans>Explanation</Trans>
            </Text>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </UniAnimatedView>
        )}
      </ScrollView>

      {showResult && (
        <UniAnimatedView entering={FadeIn.delay(500)} style={styles.footer}>
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex >= totalQuestions - 1 ? (
                <Trans>See Results</Trans>
              ) : (
                <Trans>Next Question</Trans>
              )}
            </Text>
          </Pressable>
        </UniAnimatedView>
      )}
    </View>
  )
}

const styles = StyleSheet.create((theme, runtime) => ({
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.heading,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  backButton: {
    backgroundColor: theme.colors.purple,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
  },
  backButtonText: {
    ...theme.typography.button,
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  progressContainer: {
    flex: 1,
  },
  questionCounter: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    minWidth: 60,
    alignItems: 'center',
  },
  questionCounterText: {
    ...theme.typography.button,
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  answersContainer: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  explanationContainer: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.teal,
  },
  explanationLabel: {
    ...theme.typography.caption,
    color: theme.colors.teal,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  explanationText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingBottom: theme.spacing.screenPadding + runtime.insets.bottom,
  },
  nextButton: {
    backgroundColor: theme.colors.purple,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  nextButtonText: {
    ...theme.typography.button,
    color: '#FFFFFF',
  },
}))
