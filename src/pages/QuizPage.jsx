import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import ResultCard from '../components/ResultCard'

function QuizPage({ addStar }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessonsData.lessons.find(l => l.id === parseInt(id))

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <p className="text-2xl text-red-500 mb-4">❌ الاختبار غير موجود</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    )
  }

  const quiz = lesson.quiz
  const question = quiz[currentQuestion]

  const handleAnswerClick = (index) => {
    if (isAnswered) return
    
    setSelectedAnswer(index)
    setIsAnswered(true)

    const isCorrect = index === question.correct
    
    if (isCorrect) {
      setScore(score + 1)
      addStar()
    }

    setAnswers([...answers, {
      question: question.question,
      selected: index,
      correct: question.correct,
      isCorrect
    }])
  }

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setAnswers([])
    setShowResults(false)
  }

  if (showResults) {
    return (
      <ResultCard
        score={score}
        total={quiz.length}
        answers={answers}
        lessonTitle={lesson.title}
        onRestart={restartQuiz}
        onHome={() => navigate('/')}
      />
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/lesson/${lesson.id}`)}
          className="mb-6 bg-white text-gray-700 font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ← العودة للدرس
        </button>

        {/* Quiz Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="mb-8 text-center pb-6 border-b-4 border-primary">
            <div className="text-6xl mb-4">{lesson.icon}</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              اختبار: {lesson.title}
            </h1>
            <div className="flex justify-center items-center gap-8 mt-4">
              <div className="bg-blue-100 px-6 py-3 rounded-full">
                <span className="text-xl font-bold text-primary">
                  السؤال {currentQuestion + 1} من {quiz.length}
                </span>
              </div>
              <div className="bg-yellow-100 px-6 py-3 rounded-full">
                <span className="text-xl font-bold text-yellow-700">
                  النقاط: {score}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-purple-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-r-8 border-primary">
            <h2 className="text-3xl font-bold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.options.map((option, index) => {
              let bgColor = 'bg-white hover:bg-gray-50'
              let borderColor = 'border-gray-300'
              let icon = ''

              if (isAnswered) {
                if (index === question.correct) {
                  bgColor = 'bg-green-100'
                  borderColor = 'border-green-500'
                  icon = '✅'
                } else if (index === selectedAnswer) {
                  bgColor = 'bg-red-100'
                  borderColor = 'border-red-500'
                  icon = '❌'
                }
              } else if (selectedAnswer === index) {
                bgColor = 'bg-blue-100'
                borderColor = 'border-blue-500'
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnswered}
                  className={`${bgColor} border-4 ${borderColor} rounded-xl p-6 text-right text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800">{option}</span>
                    {icon && <span className="text-3xl">{icon}</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`mb-6 p-6 rounded-xl text-center text-2xl font-bold animate-fadeIn ${
              selectedAnswer === question.correct
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {selectedAnswer === question.correct ? (
                <div>
                  <div className="text-5xl mb-2">🎉</div>
                  <p>رائع! إجابة صحيحة! 🌟</p>
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-2">💪</div>
                  <p>حاول مرة أخرى! لا تستسلم! 📚</p>
                </div>
              )}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="btn-primary text-2xl"
              >
                {currentQuestion < quiz.length - 1 ? '➡️ السؤال التالي' : '🎊 عرض النتائج'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizPage

