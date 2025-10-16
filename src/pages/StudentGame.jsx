import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import socketService from '../services/socketService'
import lessonsData from '../data/lessons.json'

function StudentGame() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStatus, setGameStatus] = useState('playing') // playing, ended
  const [studentName] = useState(() => localStorage.getItem('studentName') || 'طالب')
  const [gameSettings, setGameSettings] = useState({})
  
  // Use lesson 1 questions for demo (you can modify this)
  const questions = lessonsData.lessons[0].quiz || []
  const currentQ = questions[currentQuestion]

  // Initialize WebSocket connection
  useEffect(() => {
    if (gameId) {
      const socket = socketService.connect(gameId, 'student', studentName)
      
      // Listen for game events
      socket.on('game-started', () => {
        toast.success('بدأت اللعبة!')
      })

      socket.on('game-ended', () => {
        setGameStatus('ended')
        toast.success('انتهت اللعبة!')
      })

      socket.on('answer-result', (data) => {
        if (data.correct) {
          setScore(data.totalScore)
          toast.success(`صحيح! +${data.points} نقطة`)
        } else {
          toast.error('إجابة خاطئة!')
        }
      })

      return () => {
        socketService.disconnect()
      }
    }
  }, [gameId, studentName])

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gameStatus === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      // Time's up - move to next question
      handleNextQuestion()
    }
  }, [timeLeft, gameStatus])

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(answerIndex)
    
    // Send answer to server via WebSocket
    socketService.submitAnswer(
      gameId,
      currentQ.id || currentQuestion,
      answerIndex,
      timeLeft,
      currentQ.correct,
      score
    )
    
    if (answerIndex === currentQ.correct) {
      const points = Math.max(100, timeLeft * 10) // More points for faster answers
      setScore(score + points)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      // Game ended
      setGameStatus('ended')
      toast.success('انتهت اللعبة! شاهد النتائج')
    }
  }

  const getAnswerColor = (index) => {
    if (selectedAnswer === null) {
      return 'bg-white hover:bg-blue-50 border-gray-300'
    }
    
    if (index === currentQ.correct) {
      return 'bg-green-100 border-green-500 text-green-700'
    }
    
    if (index === selectedAnswer && index !== currentQ.correct) {
      return 'bg-red-100 border-red-500 text-red-700'
    }
    
    return 'bg-gray-100 border-gray-300 text-gray-500'
  }

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد أسئلة</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    )
  }

  if (gameStatus === 'ended') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">انتهت اللعبة!</h1>
          
          <div className="mb-6">
            <p className="text-xl text-gray-600 mb-2">اللاعب: <span className="font-bold text-primary">{studentName}</span></p>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-6 mb-4">
              <div className="text-4xl font-black text-white">
                <span className="number-ltr">{score}</span>
              </div>
              <div className="text-white font-bold">نقطة</div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700">
              🎉 أحسنت! انتظر النتائج النهائية من المعلم
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('studentName')
              localStorage.removeItem('gameId')
              navigate('/')
            }}
            className="btn-primary"
          >
            🏠 العودة للرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold text-primary">
              <span className="number-ltr">{currentQuestion + 1}</span> / <span className="number-ltr">{questions.length}</span>
            </div>
            <div className="text-lg font-bold text-gray-600">
              {studentName}
            </div>
            <div className="text-lg font-bold text-orange-600">
              <span className="number-ltr">{score}</span> نقطة
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-4">
            <div className={`text-4xl font-black ${timeLeft <= 10 ? 'text-red-600' : 'text-primary'}`}>
              <span className="number-ltr">{timeLeft}</span>
            </div>
            <div className="text-sm text-gray-600">ثانية متبقية</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`p-6 rounded-xl border-4 font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${getAnswerColor(index)}`}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {selectedAnswer !== null && (
                  <span className="text-2xl">
                    {index === currentQ.correct ? '✅' : index === selectedAnswer ? '❌' : ''}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Next Question Button */}
        {selectedAnswer !== null && (
          <div className="text-center mt-6">
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {currentQuestion < questions.length - 1 ? 'السؤال التالي ➡️' : 'عرض النتائج 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentGame
