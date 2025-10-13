import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import InteractivePage from './pages/InteractivePage'
import Header from './components/Header'

function App() {
  const [totalStars, setTotalStars] = useState(0)
  const [visitorCount, setVisitorCount] = useState(0)

  // تتبع الزوار الجدد
  useEffect(() => {
    const hasVisitedThisSession = sessionStorage.getItem('hasVisited')
    if (!hasVisitedThisSession) {
      // زائر جديد في هذه الجلسة
      const currentVisitorCount = parseInt(localStorage.getItem('totalVisitors') || '0')
      const newVisitorCount = currentVisitorCount + 1
      localStorage.setItem('totalVisitors', newVisitorCount.toString())
      sessionStorage.setItem('hasVisited', 'true')
      setVisitorCount(newVisitorCount)
    } else {
      // زائر عائد في نفس الجلسة
      const currentVisitorCount = parseInt(localStorage.getItem('totalVisitors') || '0')
      setVisitorCount(currentVisitorCount)
    }
  }, [])

  const addStar = () => {
    setTotalStars(prev => prev + 1)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 pt-16">
        <Header stars={totalStars} visitors={visitorCount} />
        
        <Routes>
          {/* Public Routes - No Authentication Required */}
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/quiz/:id" element={<QuizPage addStar={addStar} />} />
          <Route path="/interactive/:id" element={<InteractivePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

