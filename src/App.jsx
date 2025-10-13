import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ScoreDisplay from './components/ScoreDisplay'
import UserMenu from './components/UserMenu'

function App() {
  const [totalStars, setTotalStars] = useState(0)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // التحقق من وجود مستخدم مسجل عند تحميل التطبيق
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
    
    // إنشاء حساب تجريبي إذا لم يكن موجوداً
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.length === 0) {
      const demoUser = {
        name: 'طالب تجريبي',
        email: 'demo@test.com',
        password: '123456',
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('users', JSON.stringify([demoUser]))
    }
    
    setLoading(false)
  }, [])

  const addStar = () => {
    setTotalStars(prev => prev + 1)
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setTotalStars(0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300">
        <div className="text-6xl animate-bounce">🎓</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300">
        {user && (
          <>
            <UserMenu user={user} onLogout={handleLogout} />
            <ScoreDisplay stars={totalStars} />
          </>
        )}
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          
          {/* Protected Routes */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/lesson/:id" element={user ? <LessonPage /> : <Navigate to="/login" />} />
          <Route path="/quiz/:id" element={user ? <QuizPage addStar={addStar} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

