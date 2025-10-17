import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import ResultCard from '../components/ResultCard'
import soundManager from '../utils/soundEffects'

function QuizPage({ addStar }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessonsData.lessons.find(l => l.id === parseInt(id))

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // تخزين جميع الإجابات
  const [showResults, setShowResults] = useState(false)
  const [starsAwarded, setStarsAwarded] = useState(new Set()) // تتبع الأسئلة التي حصل عليها نجوم

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

  // حساب النقاط من الإجابات المحفوظة
  const score = Object.values(userAnswers).filter(answer => answer.isCorrect).length

  // إضافة نجمة عند الإجابة الصحيحة لأول مرة
  useEffect(() => {
    const currentAnswer = userAnswers[currentQuestion]
    if (currentAnswer && currentAnswer.isCorrect && !starsAwarded.has(currentQuestion)) {
      addStar()
      setStarsAwarded(new Set([...starsAwarded, currentQuestion]))
    }
  }, [userAnswers, currentQuestion, starsAwarded, addStar])

  const handleAnswerClick = (index) => {
    const isCorrect = index === question.correct
    
    // Play sound effect immediately
    if (isCorrect) {
      soundManager.playCorrect()
    } else {
      soundManager.playIncorrect()
    }
    
    // حفظ الإجابة
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: {
        questionId: currentQuestion,
        question: question.question,
        selected: index,
        correct: question.correct,
        isCorrect
      }
    })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      soundManager.playClick()
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      soundManager.playClick()
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleShowResults = () => {
    // Play success sound for completing quiz
    soundManager.playSuccess()
    
    // تحويل الإجابات إلى مصفوفة للنتائج
    const answersArray = quiz.map((q, index) => {
      const userAnswer = userAnswers[index]
      return userAnswer || {
        question: q.question,
        selected: null,
        correct: q.correct,
        isCorrect: false
      }
    })
    
    // حساب وحفظ الدرجة
    const finalScore = Object.values(userAnswers).filter(a => a.isCorrect).length
    const percentage = Math.round((finalScore / quiz.length) * 100)
    
    // حفظ الدرجة في localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (currentUser.email) {
      const userGrades = JSON.parse(localStorage.getItem(`grades_${currentUser.email}`) || '{}')
      userGrades[lesson.id] = percentage
      localStorage.setItem(`grades_${currentUser.email}`, JSON.stringify(userGrades))
    }
    
    setShowResults(true)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers({})
    setStarsAwarded(new Set())
    setShowResults(false)
  }

  // الحصول على الإجابة الحالية
  const currentAnswer = userAnswers[currentQuestion]
  const isAnswered = currentAnswer !== undefined

  if (showResults) {
    // تحويل الإجابات إلى مصفوفة
    const answersArray = quiz.map((q, index) => {
      const userAnswer = userAnswers[index]
      return userAnswer || {
        question: q.question,
        selected: null,
        correct: q.correct,
        isCorrect: false
      }
    })

    return (
      <ResultCard
        score={score}
        total={quiz.length}
        answers={answersArray}
        lessonTitle={lesson.title}
        onRestart={restartQuiz}
        onHome={() => navigate('/')}
      />
    )
  }

  return (
    <div className="min-h-screen py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-4 md:mb-6 flex flex-wrap gap-2 md:gap-3 relative z-[100]">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-xs md:text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            الرئيسية
          </button>
          <button
            onClick={() => navigate(`/lesson/${lesson.id}`)}
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-xs md:text-sm border-2 border-gray-200 hover:border-gray-300"
          >
            📖 الدرس
          </button>
        </div>

        {/* Refined Quiz Card */}
        <div className="card animate-fadeIn max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          {/* Responsive Header */}
          <div className="mb-3 md:mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 pb-3 md:pb-4 border-b border-primary/20">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-2xl md:text-3xl lg:text-4xl">{lesson.icon}</div>
              <div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-black text-gray-800 leading-tight">
                  {lesson.title}
            </h1>
                <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm">
                  <span className="bg-blue-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-primary font-bold">
                    <span className="number-ltr">{currentQuestion + 1}</span>/<span className="number-ltr">{quiz.length}</span>
                </span>
                  <span className="bg-yellow-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-yellow-700 font-bold">
                  النقاط: <span className="number-ltr">{score}</span>
                </span>
              </div>
            </div>
          </div>
            {/* Responsive Progress Bar */}
            <div className="w-full md:w-20 lg:w-24 bg-gray-200 rounded-full h-2 md:h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-purple-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
            />
            </div>
          </div>

          {/* Main Content Area - Responsive Height Container */}
          <div className="min-h-[350px] md:min-h-[450px] lg:min-h-[500px] flex flex-col">
          {/* Question */}
            <div className="mb-3 md:mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-3 md:p-4 lg:p-5 rounded-lg border-r-2 border-primary">
              <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4 flex-grow">
            {question.options.map((option, index) => {
              let bgColor = 'bg-white hover:bg-gray-50'
              let borderColor = 'border-gray-300'
              let icon = ''

              if (isAnswered) {
                if (index === question.correct) {
                  bgColor = 'bg-green-100'
                  borderColor = 'border-green-500'
                  icon = '✅'
                } else if (index === currentAnswer.selected) {
                  bgColor = 'bg-red-100'
                  borderColor = 'border-red-500'
                  icon = '❌'
                }
              } else if (currentAnswer && currentAnswer.selected === index) {
                bgColor = 'bg-blue-100'
                borderColor = 'border-blue-500'
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                    className={`${bgColor} border-2 ${borderColor} rounded-lg p-3 md:p-4 lg:p-5 text-right text-sm md:text-base lg:text-lg font-bold transition-all duration-300 shadow-lg relative z-10 hover:scale-105 hover:shadow-xl`}
                >
                  <div className="flex justify-between items-center">
                      <span className="text-gray-800 leading-relaxed">{option}</span>
                      {icon && <span className="text-lg md:text-xl lg:text-2xl">{icon}</span>}
                  </div>
                </button>
              )
            })}
          </div>

            {/* Reserved Feedback Space - Always Present */}
            <div className="h-14 md:h-16 flex items-center justify-center">
              {isAnswered ? (
                <div className={`p-3 md:p-4 rounded-lg text-center text-sm md:text-base lg:text-lg font-bold animate-fadeIn ${
              currentAnswer.isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {currentAnswer.isCorrect ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl md:text-2xl">🎉</span>
                      <span>رائع! إجابة صحيحة! 🌟</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl md:text-2xl">💪</span>
                      <span>يمكنك تغيير إجابتك! 📚</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-sm md:text-base">اختر إجابتك...</div>
              )}
            </div>
          </div>

          {/* Navigation Buttons - Moved Above Question Indicators */}
          <div className="mb-3 md:mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 relative z-10 flex items-center gap-2 ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="text-lg">➡️</span>
                السابق
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === quiz.length - 1}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 relative z-10 flex items-center gap-2 ${
                  currentQuestion === quiz.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                }`}
              >
                التالي
                <span className="text-lg">⬅️</span>
              </button>
            </div>
            
            {/* Show Results Button */}
            {Object.keys(userAnswers).length === quiz.length && (
              <button
                onClick={handleShowResults}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🎊 عرض النتائج
              </button>
            )}
            
            <div className="text-xs md:text-sm text-gray-500">
              <span className="number-ltr">{Object.keys(userAnswers).length}</span>/{<span className="number-ltr">{quiz.length}</span>}
            </div>
          </div>

          {/* Responsive Question Navigator */}
          <div className="mb-3 md:mb-4 bg-gray-50 p-3 md:p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 md:mb-3 gap-2">
              <span className="text-sm md:text-base font-bold text-gray-700">📋 الأسئلة</span>
              <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded"></div>
                  <span>صحيح</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded"></div>
                  <span>خطأ</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-200 rounded"></div>
                  <span>لم يُجب</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1 md:gap-1.5">
              {quiz.map((_, index) => {
                const answered = userAnswers[index] !== undefined
                const correct = answered && userAnswers[index].isCorrect
                const current = index === currentQuestion

                return (
                  <button
                    key={index}
                    onClick={() => {
                      soundManager.playClick()
                      setCurrentQuestion(index)
                    }}
                    className={`
                      py-1.5 md:py-2 px-1 md:px-2 rounded font-bold text-xs md:text-sm transition-all duration-300
                      ${current ? 'ring-2 ring-primary scale-105' : ''}
                      ${!answered ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : ''}
                      ${answered && correct ? 'bg-green-400 text-white hover:bg-green-500' : ''}
                      ${answered && !correct ? 'bg-red-400 text-white hover:bg-red-500' : ''}
                    `}
                  >
                    <span className="number-ltr">{index + 1}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage

