import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function StudentJoin() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [studentName, setStudentName] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, starting, active, ended

  // Simulate WebSocket connection (we'll implement real WebSocket later)
  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => {
      setIsConnected(true)
      toast.success('تم الاتصال باللعبة!')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleJoinGame = (e) => {
    e.preventDefault()
    
    if (!studentName.trim()) {
      toast.error('يرجى إدخال اسمك')
      return
    }

    if (studentName.trim().length < 2) {
      toast.error('الاسم يجب أن يكون أكثر من حرفين')
      return
    }

    // Save student info to localStorage
    localStorage.setItem('studentName', studentName.trim())
    localStorage.setItem('gameId', gameId)
    
    toast.success(`مرحباً ${studentName}! تم الانضمام للعبة`)
    
    // Navigate to waiting room
    navigate(`/student/waiting/${gameId}`)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">جاري الاتصال...</h2>
          <p className="text-gray-600">يرجى الانتظار بينما نربطك باللعبة</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">انضم إلى اللعبة</h1>
          <p className="text-gray-600">رقم اللعبة: <span className="font-bold text-primary">{gameId}</span></p>
        </div>

        {/* Join Form */}
        <form onSubmit={handleJoinGame} className="space-y-6">
          <div>
            <label htmlFor="studentName" className="block text-lg font-semibold text-gray-700 mb-2">
              ✍️ أدخل اسمك
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-center"
              placeholder="مثال: أحمد"
              maxLength={20}
              dir="rtl"
              autoComplete="off"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              {studentName.length}/20 حرف
            </p>
          </div>

          <button
            type="submit"
            disabled={!studentName.trim() || studentName.trim().length < 2}
            className={`w-full py-4 px-6 rounded-lg font-bold text-xl transition-all duration-300 ${
              !studentName.trim() || studentName.trim().length < 2
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg'
            }`}
          >
            🚀 انضم للعبة
          </button>
        </form>

        {/* Game Status */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-700">متصل باللعبة</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p className="mb-2">💡 <strong>كيف تلعب:</strong></p>
          <p>1. أدخل اسمك</p>
          <p>2. اضغط "انضم للعبة"</p>
          <p>3. انتظر بداية اللعبة</p>
          <p>4. أجب على الأسئلة بسرعة!</p>
        </div>
      </div>
    </div>
  )
}

export default StudentJoin
