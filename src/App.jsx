import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import lessonsData from './data/lessons.json'
import Header from './components/Header'
import LessonPresentation from './components/LessonPresentation'
import QuizPage from './pages/QuizPage'
import InteractivePage from './pages/InteractivePage'
import SoundTest from './components/SoundTest'

function App() {
  const [totalStars, setTotalStars] = useState(0)
  const [visitorCount, setVisitorCount] = useState(0)

  // تتبع الزوار الجدد
  useEffect(() => {
    const hasVisitedThisSession = sessionStorage.getItem('hasVisited')
    if (!hasVisitedThisSession) {
      const currentVisitorCount = parseInt(localStorage.getItem('totalVisitors') || '0')
      const newVisitorCount = currentVisitorCount + 1
      localStorage.setItem('totalVisitors', newVisitorCount.toString())
      sessionStorage.setItem('hasVisited', 'true')
      setVisitorCount(newVisitorCount)
    } else {
      const currentVisitorCount = parseInt(localStorage.getItem('totalVisitors') || '0')
      setVisitorCount(currentVisitorCount)
    }
  }, [])

  const addStar = () => {
    setTotalStars(prev => prev + 1)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 pt-16 overflow-x-hidden w-full">
        <Header stars={totalStars} visitors={visitorCount} />
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/lesson/:id" element={<LessonPresentation />} />
          <Route path="/quiz/:id" element={<QuizPage addStar={addStar} />} />
          <Route path="/interactive/:id" element={<InteractivePage />} />
          <Route path="/live-quiz" element={<LiveQuizPlaceholder />} />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              fontSize: '16px',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
        
        {/* Sound Test Component */}
        <SoundTest />
      </div>
    </Router>
  )
}

function SimpleHome() {
  const navigate = useNavigate()

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`)
  }

  const handleQuizClick = (lessonId) => {
    navigate(`/quiz/${lessonId}`)
  }

  const handleInteractiveClick = (lessonId) => {
    navigate(`/interactive/${lessonId}`)
  }

  const handleLiveQuizClick = () => {
    navigate('/live-quiz')
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeIn px-2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl leading-tight">
            🎓 مرحباً بك في عالم الرياضيات
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-white font-semibold drop-shadow-lg">
            الصف الخامس الابتدائي
          </p>
          <div className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-white px-4">
            اختر موضوعاً لتبدأ رحلة التعلم! 🚀
          </div>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessonsData.lessons.map((lesson, index) => (
            <div key={lesson.id} className="bg-white rounded-2xl shadow-2xl p-8 text-center hover:scale-105 transition-transform duration-300 flex flex-col h-full">
              <div className="text-6xl mb-4">{lesson.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{lesson.title}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{lesson.description}</p>
              <div className="space-y-2 mt-auto">
                <button 
                  onClick={() => handleLessonClick(lesson.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  📚 درس
                </button>
                <button 
                  onClick={() => handleQuizClick(lesson.id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🎯 اختبار
                </button>
                <button 
                  onClick={() => handleInteractiveClick(lesson.id)}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🎮 تفاعلي
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Quiz Section */}
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-3xl font-bold text-white mb-4">لعبة تفاعلية مباشرة</h2>
            <p className="text-xl text-white mb-6 opacity-90">
              اجمع طلابك في لعبة ممتعة ومثيرة! أنشئ QR code واطلب من الطلاب الانضمام
            </p>
            <button 
              onClick={handleLiveQuizClick}
              className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-xl text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 إنشاء لعبة مباشرة
            </button>
            <div className="mt-4 text-white text-sm opacity-75">
              <p>📱 الطلاب يمسحون QR code بالهاتف</p>
              <p>🏆 لوحة متصدرين مباشرة</p>
              <p>⚡ نتائج فورية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InteractivePlaceholder() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="text-8xl mb-8">🎮</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            التمرين التفاعلي رقم <span className="number-ltr">{id}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">التمرين التفاعلي سيكون متاحاً قريباً!</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-600 transition-all"
          >
            🏠 العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}

function LiveQuizPlaceholder() {
  const navigate = useNavigate()
  const [gameId, setGameId] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [students, setStudents] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions] = useState([
    {
      question: "ما هو ناتج 5 + 3؟",
      options: ["6", "7", "8", "9"],
      correct: 2,
      time: 30
    },
    {
      question: "ما هو ناتج 12 - 4؟",
      options: ["6", "7", "8", "9"],
      correct: 2,
      time: 30
    },
    {
      question: "ما هو ناتج 3 × 4؟",
      options: ["10", "11", "12", "13"],
      correct: 2,
      time: 30
    }
  ])
  
  const generateGameId = () => {
    const newGameId = Math.random().toString(36).substr(2, 9).toUpperCase()
    setGameId(newGameId)
    const joinUrl = `http://localhost:5173/join/${newGameId}`
    setQrCode(joinUrl)
    
    // Store game data in localStorage for student access
    localStorage.setItem(`game_${newGameId}`, JSON.stringify({
      id: newGameId,
      status: 'waiting',
      students: [],
      currentQuestion: 0,
      questions: questions
    }))
  }
  
  const addStudent = (name) => {
    const newStudent = {
      id: Date.now(),
      name: name,
      score: 0,
      joinedAt: new Date().toLocaleTimeString(),
      answers: []
    }
    setStudents([...students, newStudent])
    
    // Update stored game data
    if (gameId) {
      const gameData = JSON.parse(localStorage.getItem(`game_${gameId}`) || '{}')
      gameData.students = [...students, newStudent]
      localStorage.setItem(`game_${gameId}`, JSON.stringify(gameData))
    }
  }
  
  const startGame = () => {
    setGameStarted(true)
    if (gameId) {
      const gameData = JSON.parse(localStorage.getItem(`game_${gameId}`) || '{}')
      gameData.status = 'active'
      localStorage.setItem(`game_${gameId}`, JSON.stringify(gameData))
    }
  }
  
  const endGame = () => {
    setGameStarted(false)
    setCurrentQuestion(0)
    if (gameId) {
      const gameData = JSON.parse(localStorage.getItem(`game_${gameId}`) || '{}')
      gameData.status = 'finished'
      localStorage.setItem(`game_${gameId}`, JSON.stringify(gameData))
    }
  }
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">🎮</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  لوحة تحكم اللعبة المباشرة
                </h1>
                <p className="text-xl text-gray-600">
                  أنشئ لعبة تفاعلية واجمع طلابك
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
            >
              🏠 الرئيسية
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Creation */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              🚀 إنشاء لعبة جديدة
            </h2>
            
            {!gameId ? (
              <div className="text-center">
                <p className="text-gray-600 mb-6">اضغط على الزر لإنشاء لعبة جديدة</p>
                <button 
                  onClick={generateGameId}
                  className="bg-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-purple-600 transition-all text-lg"
                >
                  🎮 إنشاء لعبة جديدة
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-2">🎯 معرف اللعبة:</h3>
                  <div className="text-3xl font-mono font-bold text-purple-600 number-ltr">
                    {gameId}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">📱 رابط الانضمام:</h3>
                  <div className="text-sm font-mono bg-white p-3 rounded border text-blue-600">
                    {qrCode}
                  </div>
                </div>
                
                {/* QR Code Display */}
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
                  <h3 className="font-bold text-gray-800 mb-4 text-center">📱 QR Code للانضمام</h3>
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                      {/* Simple QR Code representation */}
                      <div className="grid grid-cols-8 gap-1 w-32 h-32 mx-auto">
                        {Array.from({length: 64}).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">امسح هذا الكود بالهاتف</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-4">شارك هذا الرابط أو QR Code مع طلابك</p>
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => navigator.clipboard.writeText(qrCode)}
                      className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
                    >
                      📋 نسخ الرابط
                    </button>
                    <button 
                      onClick={() => addStudent(`طالب ${students.length + 1}`)}
                      className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all"
                    >
                      👤 إضافة طالب تجريبي
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Students List */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              👥 الطلاب المتصلين
            </h2>
            
            {students.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-gray-600">لا يوجد طلاب متصلين بعد</p>
                <p className="text-sm text-gray-500 mt-2">شارك الرابط مع الطلاب لبدء اللعبة</p>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{student.name}</div>
                        <div className="text-sm text-gray-500">انضم في {student.joinedAt}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 number-ltr">{student.score}</div>
                      <div className="text-sm text-gray-500">نقطة</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-purple-600 number-ltr">
                {students.length}
              </div>
              <div className="text-sm text-gray-500">طالب متصل</div>
              
              {/* Add Student Form */}
              <div className="mt-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="اسم الطالب"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        addStudent(e.target.value.trim())
                        e.target.value = ''
                      }
                    }}
                  />
                  <button 
                    onClick={(e) => {
                      const input = e.target.previousElementSibling
                      if (input.value.trim()) {
                        addStudent(input.value.trim())
                        input.value = ''
                      }
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm"
                  >
                    إضافة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        {gameId && (
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🎮 تحكم في اللعبة
            </h2>
            <div className="flex justify-center gap-4">
              {!gameStarted ? (
                <button 
                  onClick={startGame}
                  className="bg-green-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-600 transition-all text-lg"
                >
                  ▶️ بدء اللعبة
                </button>
              ) : (
                <>
                  <button className="bg-yellow-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-yellow-600 transition-all text-lg">
                    ⏸️ إيقاف مؤقت
                  </button>
                  <button 
                    onClick={endGame}
                    className="bg-red-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-red-600 transition-all text-lg"
                  >
                    ⏹️ إنهاء اللعبة
                  </button>
                </>
              )}
            </div>
            
            {gameStarted && (
              <div className="mt-6 bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-800 mb-4 text-center">🎯 اللعبة نشطة</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 number-ltr">
                      {currentQuestion + 1}/{questions.length}
                    </div>
                    <div className="text-sm text-gray-500">السؤال الحالي</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 number-ltr">
                      {students.length}
                    </div>
                    <div className="text-sm text-gray-500">الطلاب المشاركين</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">30</div>
                    <div className="text-sm text-gray-500">ثانية متبقية</div>
                  </div>
                </div>
                
                {/* Current Question Display */}
                <div className="mt-6 bg-white p-6 rounded-lg border">
                  <h4 className="font-bold text-gray-800 mb-4">
                    السؤال {currentQuestion + 1}: {questions[currentQuestion]?.question}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {questions[currentQuestion]?.options.map((option, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-gray-100 rounded-lg text-center font-bold"
                      >
                        {index + 1}. {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App