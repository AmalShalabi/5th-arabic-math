import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import ResultCard from '../components/ResultCard'

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
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleShowResults = () => {
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
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-4 flex gap-3 relative z-[100]">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            الرئيسية
          </button>
          <button
            onClick={() => navigate(`/lesson/${lesson.id}`)}
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-gray-200 hover:border-gray-300"
          >
            📖 الدرس
          </button>
        </div>

        {/* Quiz Card */}
        <div className="card animate-fadeIn">
          {/* Compact Header with Progress */}
          <div className="mb-3 flex items-center justify-between pb-3 border-b border-primary/20">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{lesson.icon}</div>
              <div>
                <h1 className="text-lg font-black text-gray-800 leading-tight">
                  {lesson.title}
                </h1>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-blue-100 px-2 py-1 rounded-full text-primary font-bold">
                    السؤال <span className="number-ltr">{currentQuestion + 1}</span> من <span className="number-ltr">{quiz.length}</span>
                  </span>
                  <span className="bg-yellow-100 px-2 py-1 rounded-full text-yellow-700 font-bold">
                    النقاط: <span className="number-ltr">{score}</span>
                  </span>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-purple-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-3 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border-r-2 border-primary">
            <h2 className="text-lg font-bold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
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
                  className={`${bgColor} border-2 ${borderColor} rounded-lg p-3 text-right text-base font-bold transition-all duration-300 shadow-lg relative z-10`}
                  style={{ transform: 'scale(1)', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.zIndex = '20';
                    e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.zIndex = '10';
                    e.target.style.boxShadow = '';
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800">{option}</span>
                    {icon && <span className="text-3xl">{icon}</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Compact Feedback */}
          {isAnswered && (
            <div className={`mb-3 p-3 rounded-lg text-center text-base font-bold animate-fadeIn ${
              currentAnswer.isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {currentAnswer.isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span>رائع! إجابة صحيحة! 🌟</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">💪</span>
                  <span>يمكنك تغيير إجابتك! 📚</span>
                </div>
              )}
            </div>
          )}

          {/* Compact Question Navigator - أرقام الأسئلة */}
          <div className="mb-4 bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-bold text-gray-700 mb-2 text-center">
              📋 جميع الأسئلة
            </h3>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-1">
              {quiz.map((_, index) => {
                const answered = userAnswers[index] !== undefined
                const correct = answered && userAnswers[index].isCorrect
                const current = index === currentQuestion

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`
                      py-1 px-2 rounded-md font-bold text-sm transition-all duration-300
                      ${current ? 'ring-2 ring-primary ring-offset-1 scale-105' : ''}
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
            <div className="flex justify-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span>صحيح</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span>خطأ</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <span>لم يُجب</span>
              </div>
            </div>
          </div>

          {/* Compact Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 relative z-10 ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                }`}
              >
                ➡️ السابق
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === quiz.length - 1}
                className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 relative z-10 ${
                  currentQuestion === quiz.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                }`}
              >
                التالي ⬅️
              </button>
            </div>
            
            {/* Show Results Button */}
            {Object.keys(userAnswers).length === quiz.length && (
              <button
                onClick={handleShowResults}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg"
              >
                🎊 عرض النتائج
              </button>
            )}
            
            <div className="text-xs text-gray-500">
              <span className="number-ltr">{Object.keys(userAnswers).length}</span>/{<span className="number-ltr">{quiz.length}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage

