import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function StudentWaiting() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, starting, active
  const [countdown, setCountdown] = useState(null)
  const [studentName] = useState(() => localStorage.getItem('studentName') || 'طالب')

  // Simulate WebSocket listening for game updates
  useEffect(() => {
    // Simulate receiving game status updates
    const interval = setInterval(() => {
      // This would normally come from WebSocket
      // For demo, we'll simulate game starting after 10 seconds
    }, 1000)

    // Simulate countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null) return null
        if (prev <= 1) {
          setGameStatus('active')
          navigate(`/student/game/${gameId}`)
          return null
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(countdownInterval)
    }
  }, [gameId, navigate])

  // Simulate game starting (for demo)
  const simulateGameStart = () => {
    setGameStatus('starting')
    setCountdown(5)
    toast.success('اللعبة ستبدأ قريباً!')
  }

  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'waiting':
        return 'انتظار بداية اللعبة...'
      case 'starting':
        return 'اللعبة ستبدأ قريباً!'
      case 'active':
        return 'اللعبة بدأت!'
      default:
        return 'انتظار...'
    }
  }

  const getStatusColor = () => {
    switch (gameStatus) {
      case 'waiting':
        return 'text-blue-600'
      case 'starting':
        return 'text-orange-600'
      case 'active':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">غرفة الانتظار</h1>
          <p className="text-gray-600">مرحباً <span className="font-bold text-primary">{studentName}</span></p>
          <p className="text-sm text-gray-500">رقم اللعبة: {gameId}</p>
        </div>

        {/* Status */}
        <div className="mb-8">
          <div className={`text-xl font-bold mb-4 ${getStatusColor()}`}>
            {getStatusMessage()}
          </div>
          
          {countdown && (
            <div className="text-6xl font-black text-primary mb-4">
              {countdown}
            </div>
          )}
        </div>

        {/* Connection Status */}
        <div className="mb-8 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700">متصل باللعبة</span>
          </div>
        </div>

        {/* Demo Button (for testing) */}
        {gameStatus === 'waiting' && (
          <button
            onClick={simulateGameStart}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🚀 بدء اللعبة (تجريبي)
          </button>
        )}

        {/* Instructions */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="mb-4">📋 <strong>تعليمات اللعبة:</strong></p>
          <div className="text-right space-y-2">
            <p>• اقرأ السؤال بعناية</p>
            <p>• اختر الإجابة الصحيحة</p>
            <p>• كلما أجبت أسرع، حصلت على نقاط أكثر</p>
            <p>• راقب ترتيبك في لوحة المتصدرين</p>
          </div>
        </div>

        {/* Leave Game Button */}
        <button
          onClick={() => {
            localStorage.removeItem('studentName')
            localStorage.removeItem('gameId')
            navigate('/')
          }}
          className="mt-6 text-gray-500 hover:text-gray-700 underline"
        >
          🚪 مغادرة اللعبة
        </button>
      </div>
    </div>
  )
}

export default StudentWaiting
