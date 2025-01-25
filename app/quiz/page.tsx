"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import CircuitBackground from "@/components/CircuitBackground"

interface Question {
  id: number
  level: number
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}

const questions: Question[] = [
  {
    id: 1,
    level: 1,
    question: "What does HTML stand for?",
    correctAnswer: "Hypertext Markup Language",
    incorrectAnswers: ["Hyperlink and Text Markup Language", "Home Tool Markup Language"],
  },
  {
    id: 2,
    level: 2,
    question: "Which programming language is known as the 'language of the web'?",
    correctAnswer: "JavaScript",
    incorrectAnswers: ["Java", "Python"],
  },
  {
    id: 3,
    level: 3,
    question: "What does CSS stand for?",
    correctAnswer: "Cascading Style Sheets",
    incorrectAnswers: ["Computer Style Sheets", "Creative Style Sheets"],
  },
  {
    id: 4,
    level: 4,
    question: "What is the purpose of the 'useState' hook in React?",
    correctAnswer: "To add state to functional components",
    incorrectAnswers: ["To create a new component", "To handle side effects in components"],
  },
  {
    id: 5,
    level: 5,
    question: "What is a closure in JavaScript?",
    correctAnswer: "A function that has access to variables in its outer lexical scope",
    incorrectAnswers: ["A way to close a browser window", "A method to end a loop"],
  },
]

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [quizEnded, setQuizEnded] = useState(false)
  const [feedbackColor, setFeedbackColor] = useState("")
  const router = useRouter()

  const currentQuestion = questions[currentQuestionIndex]
  const answers = useMemo(() => shuffleAnswers(currentQuestion), [currentQuestion])

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizEnded) {
      handleNextQuestion()
    }
  }, [timeLeft, quizEnded])

  function shuffleAnswers(question: Question) {
    return [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (answer: string) => {
    const correct = answer === currentQuestion.correctAnswer
    setFeedbackColor(correct ? "green" : "red")
    if (correct) {
      setScore(score + 1)
    }
    setTimeout(() => {
      setFeedbackColor("")
      handleNextQuestion()
    }, 1000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeft(15)
    } else {
      setQuizEnded(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(15)
    setQuizEnded(false)
  }

  if (quizEnded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative">
        <CircuitBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-gray-900 rounded-lg shadow-lg neon-glow z-10"
        >
          <h2 className="text-4xl font-bold mb-4 text-electric-purple neon-text">Quiz Completed!</h2>
          <p className="text-2xl mb-6 text-cyan-400">
            Your score: {score} / {questions.length}
          </p>
          <Button
            onClick={restartQuiz}
            className="mr-4 bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow"
          >
            Restart Quiz
          </Button>
          <Button onClick={() => router.push("/")} className="bg-cyan-700 hover:bg-cyan-600 text-white neon-glow">
            Back to Home
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <CircuitBackground />
      <div
        className={`w-full max-w-2xl p-8 bg-gray-900 rounded-lg shadow-lg neon-glow z-10 ${feedbackColor ? `shake ${feedbackColor}-glow` : ""}`}
      >
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-electric-purple neon-text">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-xl mb-6 text-cyan-400">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(answer)}
                className="w-full text-left py-3 px-4 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded transition duration-300"
              >
                {answer}
              </Button>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg text-cyan-400">Time left: {timeLeft}s</p>
            <p className="text-lg text-cyan-400">Score: {score}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

