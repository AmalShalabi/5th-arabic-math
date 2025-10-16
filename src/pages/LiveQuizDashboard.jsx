import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCodeGenerator from '../components/QRCodeGenerator'
import QuizCustomizer from '../components/QuizCustomizer'
import StudentAnalytics from '../components/StudentAnalytics'
import QuestionEditor from '../components/QuestionEditor'
import socketService from '../services/socketService'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import lessonsData from '../data/lessons.json'

function LiveQuizDashboard() {
  const navigate = useNavigate()
  const [activeGame, setActiveGame] = useState(null)
  const [connectedStudents, setConnectedStudents] = useState([])
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, active, ended
  const [currentView, setCurrentView] = useState('dashboard') // dashboard, analytics, questions
  const [gameSettings, setGameSettings] = useState({
    gameMode: 'classic',
    timePerQuestion: 30,
    selectedLesson: 1,
    questionCount: 5,
    showLeaderboard: true,
    allowMultipleAttempts: false,
    difficulty: 'mixed'
  })
  const [customQuestions, setCustomQuestions] = useState([])
  const [showQuestionEditor, setShowQuestionEditor] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)

  // Generate game ID when component mounts
  useEffect(() => {
    const gameId = uuidv4().slice(0, 8).toUpperCase()
    setActiveGame(gameId)
  }, [])

  // Initialize WebSocket connection
  useEffect(() => {
    if (activeGame) {
      // Connect as teacher
      const socket = socketService.connect(activeGame, 'teacher')
      
      // Listen for student connections
      socket.on('student-joined', (data) => {
        setConnectedStudents(prev => [
          ...prev,
          {
            id: data.studentId,
            name: data.studentName,
            score: 0,
            isConnected: true,
            completed: false,
            averageTime: 0
          }
        ])
        toast.success(`${data.studentName} انضم للعبة!`)
      })

      // Listen for game events
      socket.on('game-started', () => {
        setGameStatus('active')
        toast.success('بدأت اللعبة!')
      })

      socket.on('game-ended', () => {
        setGameStatus('ended')
        toast.success('انتهت اللعبة!')
      })

      // Simulate some demo students
      const demoStudents = [
        { id: 1, name: 'أحمد محمد', score: 850, isConnected: true, completed: true, averageTime: 25 },
        { id: 2, name: 'فاطمة علي', score: 720, isConnected: true, completed: true, averageTime: 28 },
        { id: 3, name: 'محمد أحمد', score: 680, isConnected: true, completed: true, averageTime: 32 },
        { id: 4, name: 'سارة خالد', score: 590, isConnected: true, completed: true, averageTime: 35 },
      ]
      setConnectedStudents(demoStudents)

      return () => {
        socketService.disconnect()
      }
    }
  }, [activeGame])

  const startGame = () => {
    setGameStatus('active')
    socketService.startGame(activeGame, gameSettings)
    toast.success('بدأت اللعبة! 🎮')
  }

  const endGame = () => {
    setGameStatus('ended')
    socketService.endGame(activeGame)
    toast.success('انتهت اللعبة! 🏆')
  }

  const resetGame = () => {
    const newGameId = uuidv4().slice(0, 8).toUpperCase()
    setActiveGame(newGameId)
    setConnectedStudents([])
    setGameStatus('waiting')
    toast.success('تم إنشاء لعبة جديدة! 🆕')
  }

  const handleSettingsSave = (settings) => {
    setGameSettings(settings)
    toast.success('تم حفظ الإعدادات! ⚙️')
  }

  const handleQuestionSave = (question) => {
    if (editingQuestion) {
      setCustomQuestions(prev => 
        prev.map(q => q.id === editingQuestion.id ? question : q)
      )
      toast.success('تم تحديث السؤال! ✏️')
    } else {
      setCustomQuestions(prev => [...prev, question])
      toast.success('تم إضافة السؤال! ➕')
    }
    setShowQuestionEditor(false)
    setEditingQuestion(null)
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion(question)
    setShowQuestionEditor(true)
  }

  const handleDeleteQuestion = (questionId) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== questionId))
    toast.success('تم حذف السؤال! 🗑️')
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
          
          {/* Navigation Tabs */}
          <div className="mt-6 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                currentView === 'dashboard' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎮 لوحة التحكم
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                currentView === 'analytics' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 التحليلات
            </button>
            <button
              onClick={() => setCurrentView('questions')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                currentView === 'questions' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ❓ إدارة الأسئلة
            </button>
          </div>
        </div>

        {/* Conditional Content Based on View */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code and Settings */}
            <div className="space-y-6">
              <QRCodeGenerator gameId={activeGame} />
              <QuizCustomizer 
                onSave={handleSettingsSave}
                initialSettings={gameSettings}
              />
            </div>

            {/* Students and Leaderboard */}
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

              {/* Game Controls */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎛️ تحكم اللعبة</h3>
                
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
                    الدرس المحدد: <strong>{getLessonTitle(gameSettings.selectedLesson)}</strong>
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
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && (
          <StudentAnalytics 
            gameId={activeGame} 
            students={connectedStudents}
          />
        )}

        {/* Questions Management View */}
        {currentView === 'questions' && (
          <div className="space-y-6">
            {/* Custom Questions List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">❓ الأسئلة المخصصة</h3>
                <button
                  onClick={() => setShowQuestionEditor(true)}
                  className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                >
                  ➕ إضافة سؤال جديد
                </button>
              </div>

              {customQuestions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">❓</div>
                  <p className="text-xl mb-2">لا توجد أسئلة مخصصة</p>
                  <p className="text-sm">ابدأ بإنشاء أسئلة مخصصة للعبة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customQuestions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            السؤال <span className="number-ltr">{index + 1}</span>: {question.question}
                          </h4>
                          <div className="flex gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {question.difficulty === 'easy' ? 'سهل' :
                               question.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                              {question.category}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                              <span className="number-ltr">{question.points}</span> نقطة
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="text-blue-500 hover:text-blue-700 p-1"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded text-sm ${
                              optIndex === question.correct 
                                ? 'bg-green-100 border border-green-300' 
                                : 'bg-gray-100'
                            }`}
                          >
                            {optIndex === question.correct && '✅ '}{option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Question Editor Modal */}
        {showQuestionEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <QuestionEditor
                onSave={handleQuestionSave}
                onCancel={() => {
                  setShowQuestionEditor(false)
                  setEditingQuestion(null)
                }}
                initialQuestion={editingQuestion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveQuizDashboard