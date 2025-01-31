"use client"
import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import CircuitBackground from "@/components/CircuitBackground"

// --------------------------------------------------
// Tipagem das perguntas
// --------------------------------------------------
interface Question {
  id: number
  level: number
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}

// --------------------------------------------------
// Perguntas em INGLÊS (20)
// --------------------------------------------------
const questionsEnglish: Question[] = [
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
  {
    id: 6,
    level: 6,
    question: "Which of the following is NOT a programming language?",
    correctAnswer: "HTML",
    incorrectAnswers: ["Python", "C++"],
  },
  {
    id: 7,
    level: 7,
    question: "Which command is used to initialize a new Git repository?",
    correctAnswer: "git init",
    incorrectAnswers: ["git start", "git new"],
  },
  {
    id: 8,
    level: 8,
    question: "Which of the following is used to style a React component in Next.js?",
    correctAnswer: "CSS modules or styled-jsx",
    incorrectAnswers: ["index.html", "component.json"],
  },
  {
    id: 9,
    level: 9,
    question: "What is the difference between '==' and '===' in JavaScript?",
    correctAnswer: "'===' checks for type as well as value",
    incorrectAnswers: ["There is no difference", "'==' is not allowed in strict mode"],
  },
  {
    id: 10,
    level: 10,
    question: "Which array method adds one or more elements to the end of an array in JavaScript?",
    correctAnswer: "push()",
    incorrectAnswers: ["pop()", "shift()"],
  },
  {
    id: 11,
    level: 11,
    question: "Which HTML tag is used to define an internal style sheet?",
    correctAnswer: "<style>",
    incorrectAnswers: ["<css>", "<script>"],
  },
  {
    id: 12,
    level: 12,
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    correctAnswer: "=",
    incorrectAnswers: ["==", "==="],
  },
  {
    id: 13,
    level: 13,
    question: "What is the default port for a React development server?",
    correctAnswer: "3000",
    incorrectAnswers: ["8080", "5000"],
  },
  {
    id: 14,
    level: 14,
    question: "Which of these is a JavaScript package manager?",
    correctAnswer: "npm",
    incorrectAnswers: ["composer", "pip"],
  },
  {
    id: 15,
    level: 15,
    question: "Which method is used to convert a JSON string into a JavaScript object?",
    correctAnswer: "JSON.parse()",
    incorrectAnswers: ["JSON.stringify()", "JSON.objectify()"],
  },
  {
    id: 16,
    level: 16,
    question: "Which SQL statement is used to insert new data in a database table?",
    correctAnswer: "INSERT INTO",
    incorrectAnswers: ["ADD DATA", "ADD ROW"],
  },
  {
    id: 17,
    level: 17,
    question: "Which HTML element is used to display a scalar measurement within a range?",
    correctAnswer: "<meter>",
    incorrectAnswers: ["<progress>", "<gauge>"],
  },
  {
    id: 18,
    level: 18,
    question: "Which Git command is used to retrieve the latest changes from a remote repository?",
    correctAnswer: "git pull",
    incorrectAnswers: ["git push", "git commit"],
  },
  {
    id: 19,
    level: 19,
    question: "What does the acronym REST stand for in web services?",
    correctAnswer: "Representational State Transfer",
    incorrectAnswers: ["Responsive State Transfer", "Repetitive System Transfer"],
  },
  {
    id: 20,
    level: 20,
    question: "What is the name of the React hook used for performing side effects in function components?",
    correctAnswer: "useEffect",
    incorrectAnswers: ["useLayoutEffect", "useCallback"],
  },
]

// --------------------------------------------------
// Perguntas em PORTUGUÊS (20)
// --------------------------------------------------
const questionsPortuguese: Question[] = [
  {
    id: 1,
    level: 1,
    question: "O que significa HTML?",
    correctAnswer: "Linguagem de Marcação de Hipertexto",
    incorrectAnswers: ["Hiperlink e Linguagem de Marcação de Texto", "Linguagem de Marcação de Ferramenta Doméstica"],
  },
  {
    id: 2,
    level: 2,
    question: "Qual linguagem de programação é conhecida como a 'linguagem da web'?",
    correctAnswer: "JavaScript",
    incorrectAnswers: ["Java", "Python"],
  },
  {
    id: 3,
    level: 3,
    question: "O que significa CSS?",
    correctAnswer: "Folhas de Estilo em Cascata",
    incorrectAnswers: ["Folhas de Estilo de Computador", "Folhas de Estilo Criativas"],
  },
  {
    id: 4,
    level: 4,
    question: "Qual é o propósito do 'useState' no React?",
    correctAnswer: "Adicionar estado a componentes funcionais",
    incorrectAnswers: ["Criar um novo componente", "Lidar com efeitos colaterais em componentes"],
  },
  {
    id: 5,
    level: 5,
    question: "O que é um closure em JavaScript?",
    correctAnswer: "Uma função que tem acesso às variáveis em seu escopo léxico externo",
    incorrectAnswers: ["Uma forma de fechar uma janela do navegador", "Um método para encerrar um loop"],
  },
  {
    id: 6,
    level: 6,
    question: "Qual das seguintes NÃO é uma linguagem de programação?",
    correctAnswer: "HTML",
    incorrectAnswers: ["Python", "C++"],
  },
  {
    id: 7,
    level: 7,
    question: "Qual comando é usado para inicializar um novo repositório Git?",
    correctAnswer: "git init",
    incorrectAnswers: ["git start", "git new"],
  },
  {
    id: 8,
    level: 8,
    question: "Qual das seguintes é usada para estilizar um componente React no Next.js?",
    correctAnswer: "CSS modules ou styled-jsx",
    incorrectAnswers: ["index.html", "component.json"],
  },
  {
    id: 9,
    level: 9,
    question: "Qual a diferença entre '==' e '===' em JavaScript?",
    correctAnswer: "'===' verifica tanto o tipo quanto o valor",
    incorrectAnswers: ["Não há diferença", "'==' não é permitido em modo estrito"],
  },
  {
    id: 10,
    level: 10,
    question: "Qual método de array adiciona um ou mais elementos ao final de um array em JavaScript?",
    correctAnswer: "push()",
    incorrectAnswers: ["pop()", "shift()"],
  },
  {
    id: 11,
    level: 11,
    question: "Qual tag HTML é usada para definir uma folha de estilo interna?",
    correctAnswer: "<style>",
    incorrectAnswers: ["<css>", "<script>"],
  },
  {
    id: 12,
    level: 12,
    question: "Qual operador é usado para atribuir um valor a uma variável em JavaScript?",
    correctAnswer: "=",
    incorrectAnswers: ["==", "==="],
  },
  {
    id: 13,
    level: 13,
    question: "Qual é a porta padrão para um servidor de desenvolvimento React?",
    correctAnswer: "3000",
    incorrectAnswers: ["8080", "5000"],
  },
  {
    id: 14,
    level: 14,
    question: "Qual das seguintes é um gerenciador de pacotes JavaScript?",
    correctAnswer: "npm",
    incorrectAnswers: ["composer", "pip"],
  },
  {
    id: 15,
    level: 15,
    question: "Qual método é usado para converter uma string JSON em um objeto JavaScript?",
    correctAnswer: "JSON.parse()",
    incorrectAnswers: ["JSON.stringify()", "JSON.objectify()"],
  },
  {
    id: 16,
    level: 16,
    question: "Qual instrução SQL é usada para inserir novos dados em uma tabela de banco de dados?",
    correctAnswer: "INSERT INTO",
    incorrectAnswers: ["ADD DATA", "ADD ROW"],
  },
  {
    id: 17,
    level: 17,
    question: "Qual elemento HTML é usado para exibir uma medição escalar dentro de um intervalo?",
    correctAnswer: "<meter>",
    incorrectAnswers: ["<progress>", "<gauge>"],
  },
  {
    id: 18,
    level: 18,
    question: "Qual comando Git é usado para obter as alterações mais recentes de um repositório remoto?",
    correctAnswer: "git pull",
    incorrectAnswers: ["git push", "git commit"],
  },
  {
    id: 19,
    level: 19,
    question: "O que significa a sigla REST em serviços web?",
    correctAnswer: "Representational State Transfer",
    incorrectAnswers: ["Responsive State Transfer", "Repetitive System Transfer"],
  },
  {
    id: 20,
    level: 20,
    question: "Qual é o nome do hook do React usado para realizar efeitos colaterais em componentes funcionais?",
    correctAnswer: "useEffect",
    incorrectAnswers: ["useLayoutEffect", "useCallback"],
  },
]

// --------------------------------------------------
// Função auxiliar para embaralhar array
// --------------------------------------------------
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

// --------------------------------------------------
// Componente principal: Quiz
// --------------------------------------------------
export default function Quiz() {
  // 1. States e Hooks no topo
  const [selectedLanguage, setSelectedLanguage] = useState<"" | "en" | "pt">("")
  const [numQuestions, setNumQuestions] = useState<0 | 5 | 10 | 15>(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [quizEnded, setQuizEnded] = useState(false)
  const [feedbackColor, setFeedbackColor] = useState("")

  const router = useRouter()

  // 2. Define a lista completa de perguntas com base no idioma
  let allQuestions: Question[] = []
  if (selectedLanguage === "en") {
    allQuestions = questionsEnglish
  } else if (selectedLanguage === "pt") {
    allQuestions = questionsPortuguese
  }

  // 3. Embaralhar completamente as perguntas somente quando o idioma mudar
  const shuffledAll = useMemo(() => {
    if (allQuestions.length > 0) {
      return shuffleArray(allQuestions)
    }
    return []
  }, [selectedLanguage]) // Re-embaralha só quando "selectedLanguage" muda

  // 4. Se user escolheu numQuestions (5,10,15), cortamos do array embaralhado
  const finalQuestions = useMemo(() => {
    if (numQuestions > 0) {
      return shuffledAll.slice(0, numQuestions)
    }
    return []
  }, [shuffledAll, numQuestions])

  // 5. Qual a questão atual?
  const currentQuestion = finalQuestions[currentQuestionIndex] || null

  // 6. Embaralha respostas da questão atual
  const answers = useMemo(() => {
    if (!currentQuestion) return []
    return shuffleArray([...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer])
  }, [currentQuestion])

  // 7. Controla o tempo
  useEffect(() => {
    if (!quizEnded && timeLeft > 0 && currentQuestion) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (timeLeft === 0 && !quizEnded) {
      handleNextQuestion()
    }
  }, [timeLeft, quizEnded, currentQuestion])

  // 8. Função para próxima questão
  const handleNextQuestion = () => {
    if (currentQuestionIndex < finalQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeft(15)
    } else {
      setQuizEnded(true)
    }
  }

  // 9. Função para avaliar a resposta
  const handleAnswer = (answer: string) => {
    const correct = currentQuestion && answer === currentQuestion.correctAnswer
    setFeedbackColor(correct ? "green" : "red")
    if (correct) {
      setScore(score + 1)
    }
    setTimeout(() => {
      setFeedbackColor("")
      handleNextQuestion()
    }, 1000)
  }

  // 10. Reiniciar completamente o quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(15)
    setQuizEnded(false)
  }

  // 11. Voltar para a tela inicial (reseta tudo)
  const goBackToInitial = () => {
    setSelectedLanguage("")
    setNumQuestions(0)
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(15)
    setQuizEnded(false)
    setFeedbackColor("")
  }

  // 12. Renderização única com condicionais
  return (
    // Container principal, onde o background de circuito fica sempre atrás (via position: absolute)
    
    <div className="relative min-h-screen z-10 bg-black overflow-hidden">
      <CircuitBackground />

      {/* Conteúdo do quiz em si */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {!selectedLanguage ? (
            // A) TELA DE SELEÇÃO DE IDIOMA
            <div className="p-6 bg-gray-900/80 rounded-lg shadow-lg neon-glow  text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-electric-purple neon-text break-words">
                Select your language
              </h2>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => setSelectedLanguage("en")}
                  className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow w-full sm:w-auto"
                >
                  English
                </Button>
                <Button
                  onClick={() => setSelectedLanguage("pt")}
                  className="bg-cyan-700 hover:bg-cyan-600 text-white neon-glow w-full sm:w-auto"
                >
                  Portuguese
                </Button>
              </div>
            </div>
          ) : numQuestions === 0 ? (
            // B) TELA DE SELEÇÃO DE QUANTIDADE DE QUESTÕES
            <div className="p-6 bg-gray-900/80 rounded-lg shadow-lg neon-glow z-10 text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-electric-purple neon-text break-words">
                {selectedLanguage === "en"
                  ? "Select number of questions"
                  : "Selecione a quantidade de questões"}
              </h2>
              <div className="flex gap-4 justify-center flex-wrap mb-6">
                <Button
                  onClick={() => setNumQuestions(5)}
                  className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow w-full sm:w-auto"
                >
                  5
                </Button>
                <Button
                  onClick={() => setNumQuestions(10)}
                  className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow w-full sm:w-auto"
                >
                  10
                </Button>
                <Button
                  onClick={() => setNumQuestions(15)}
                  className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow w-full sm:w-auto"
                >
                  15
                </Button>
              </div>
              <Button
                onClick={goBackToInitial}
                className="bg-cyan-700 hover:bg-cyan-600 text-white neon-glow w-full sm:w-auto"
              >
                {selectedLanguage === "en" ? "Back to start" : "Voltar à tela inicial"}
              </Button>
            </div>
          ) : quizEnded ? (
            // C) TELA DE RESULTADOS
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 bg-gray-900/80 rounded-lg shadow-lg neon-glow z-10"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-electric-purple neon-text break-words">
                {selectedLanguage === "en" ? "Quiz Completed!" : "Quiz Finalizado!"}
              </h2>
              <p className="text-xl md:text-2xl mb-6 text-cyan-400 break-words">
                {selectedLanguage === "en" ? "Your score:" : "Sua pontuação:"} {score} /{" "}
                {finalQuestions.length}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={restartQuiz}
                  className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow w-full sm:w-auto"
                >
                  {selectedLanguage === "en" ? "Restart Quiz" : "Reiniciar Quiz"}
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  className="bg-cyan-700 hover:bg-cyan-600 text-white neon-glow w-full sm:w-auto"
                >
                  {selectedLanguage === "en" ? "Back to Home" : "Voltar para Home"}
                </Button>
              </div>
            </motion.div>
          ) : (
            // D) TELA DO QUIZ (Pergunta atual)
            <div
              className={`w-full p-6 bg-gray-900/80 rounded-lg shadow-lg neon-glow z-10 ${
                feedbackColor ? `shake ${feedbackColor}-glow` : ""
              }`}
            >
              <motion.div
                key={currentQuestion?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-electric-purple neon-text break-words">
                  {selectedLanguage === "en" ? "Question" : "Questão"} {currentQuestionIndex + 1}
                </h2>
                <p className="text-base md:text-xl mb-6 text-cyan-400 break-words">
                  {currentQuestion?.question}
                </p>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {answers.map((answer, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(answer)}
                      className="w-full text-left py-3 px-4 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded transition duration-300 text-sm md:text-base"
                    >
                      {answer}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <p className="text-sm md:text-lg text-cyan-400">
                    {selectedLanguage === "en" ? "Time left:" : "Tempo restante:"} {timeLeft}s
                  </p>
                  <p className="text-sm md:text-lg text-cyan-400">
                    {selectedLanguage === "en" ? "Score:" : "Pontuação:"} {score}
                  </p>
                </div>

                {/* Botão para voltar à tela inicial */}
                <div className="text-center">
                  <Button
                    onClick={goBackToInitial}
                    className="bg-cyan-700 hover:bg-cyan-600 text-white neon-glow w-full sm:w-auto"
                  >
                    {selectedLanguage === "en"
                      ? "Back to initial screen"
                      : "Voltar para tela inicial"}
                  </Button>
                </div>
              </motion.div>
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
            </div>
            
          )}
        </div>
      </div>
    </div>
  )
}
