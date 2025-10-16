import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCodeGenerator from '../components/QRCodeGenerator'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import lessonsData from '../data/lessons.json'

function LiveQuizDashboard() {
  const navigate = useNavigate()
  const [activeGame, setActiveGame] = useState(null)
  const [connectedStudents, setConnectedStudents] = useState([])
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, active, ended
  const [selectedLesson, setSelectedLesson] = useState(1)

  // Generate game ID when component mounts
  useEffect(() => {
    const gameId = uuidv4().slice(0, 8).toUpperCase()
    setActiveGame(gameId)
  }, [])

  // Simulate students joining (in real app, this would come from WebSocket)
  useEffect(() => {
    if (activeGame) {
      // Simulate some students joining
      const demoStudents = [
        { id: 1, name: 'أحمد محمد', score: 0, isConnected: true },
        { id: 2, name: 'فاطمة علي', score: 0, isConnected: true },
        { id: 3, name: 'محمد أحمد', score: 0, isConnected: true },
        { id: 4, name: 'سارة خالد', score: 0, isConnected: false },
      ]
      setConnectedStudents(demoStudents)
    }
  }, [activeGame])

  const startGame = () => {
    setGameStatus('active')
    toast.success('بدأت اللعبة! 🎮')
    // In real app, this would send WebSocket message to all students
  }

  const endGame = () => {
    setGameStatus('ended')
    toast.success('انتهت اللعبة! 🏆')
    // In real app, this would send WebSocket message to all students
  }

  const resetGame = () => {
    const newGameId = uuidv4().slice(0, 8).toUpperCase()
    setActiveGame(newGameId)
    setConnectedStudents([])
    setGameStatus('waiting')
    toast.success('تم إنشاء لعبة جديدة! 🆕')
  }

  const getLessonTitle = (lessonId) => {
    const lesson = lessonsData.lessons.find(l => l.id === lessonId)
    return lesson ? lesson.title : 'درس غير محدد'
  }

  if (!activeGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin text-6xl">⏳</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🎮 لوحة تحكم اللعبة المباشرة</h1>
              <p className="text-gray-600">إدارة اللعبة التفاعلية للطلاب</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
              >
                🏠 الرئيسية
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Section */}
          <div className="space-y-6">
            <QRCodeGenerator gameId={activeGame} />
            
            {/* Game Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🎛️ تحكم اللعبة</h3>
              
              {/* Lesson Selection */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اختر الدرس:
                </label>
                <select
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                >
                  {lessonsData.lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Game Status */}
              <div className="mb-4 p-4 rounded-lg bg-blue-50">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">حالة اللعبة:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    gameStatus === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                    gameStatus === 'active' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {gameStatus === 'waiting' ? 'في الانتظار' :
                     gameStatus === 'active' ? 'نشطة' : 'انتهت'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  الدرس المحدد: <strong>{getLessonTitle(selectedLesson)}</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {gameStatus === 'waiting' && (
                  <button
                    onClick={startGame}
                    disabled={connectedStudents.length === 0}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                      connectedStudents.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    🚀 بدء اللعبة
                  </button>
                )}
                
                {gameStatus === 'active' && (
                  <button
                    onClick={endGame}
                    className="w-full py-3 px-4 rounded-lg font-bold bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    🏁 إنهاء اللعبة
                  </button>
                )}
                
                {gameStatus === 'ended' && (
                  <button
                    onClick={resetGame}
                    className="w-full py-3 px-4 rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-600 transition-all"
                  >
                    🆕 لعبة جديدة
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Students Section */}
          <div className="space-y-6">
            {/* Connected Students */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                👥 الطلاب المتصلين ({connectedStudents.length})
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {connectedStudents.map(student => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                      student.isConnected 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        student.isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`}></div>
                      <span className="font-semibold text-gray-800">{student.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        <span className="number-ltr">{student.score}</span> نقطة
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.isConnected ? 'متصل' : 'غير متصل'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {connectedStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">👥</div>
                  <p>لا يوجد طلاب متصلين بعد</p>
                  <p className="text-sm">اطلب من الطلاب مسح الكود للانضمام</p>
                </div>
              )}
            </div>

            {/* Live Leaderboard */}
            {gameStatus === 'active' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 لوحة المتصدرين المباشرة</h3>
                
                <div className="space-y-3">
                  {connectedStudents
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map((student, index) => (
                    <div
                      key={student.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index === 0 ? 'bg-yellow-50 border-2 border-yellow-300' :
                        index === 1 ? 'bg-gray-50 border-2 border-gray-300' :
                        index === 2 ? 'bg-orange-50 border-2 border-orange-300' :
                        'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-500 text-white' :
                          index === 2 ? 'bg-orange-500 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-semibold text-gray-800">{student.name}</span>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        <span className="number-ltr">{student.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveQuizDashboard
