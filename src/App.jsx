import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import ScoreDisplay from './components/ScoreDisplay'

function App() {
  const [totalStars, setTotalStars] = useState(0)

  const addStar = () => {
    setTotalStars(prev => prev + 1)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300">
        <ScoreDisplay stars={totalStars} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/quiz/:id" element={<QuizPage addStar={addStar} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

