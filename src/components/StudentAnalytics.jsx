import { useState, useEffect } from 'react'

function StudentAnalytics({ gameId, students = [] }) {
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    completionRate: 0,
    averageTime: 0,
    questionAccuracy: [],
    difficultyPerformance: {}
  })

  useEffect(() => {
    if (students.length > 0) {
      calculateAnalytics()
    }
  }, [students])

  const calculateAnalytics = () => {
    const scores = students.map(s => s.score || 0).filter(score => score > 0)
    const totalStudents = students.length
    const completedStudents = students.filter(s => s.completed).length
    
    const newAnalytics = {
      totalStudents,
      averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
      highestScore: scores.length > 0 ? Math.max(...scores) : 0,
      lowestScore: scores.length > 0 ? Math.min(...scores) : 0,
      completionRate: totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0,
      averageTime: students.length > 0 ? Math.round(students.reduce((a, b) => a + (b.averageTime || 0), 0) / students.length) : 0,
      questionAccuracy: calculateQuestionAccuracy(),
      difficultyPerformance: calculateDifficultyPerformance()
    }
    
    setAnalytics(newAnalytics)
  }

  const calculateQuestionAccuracy = () => {
    // Mock data for question accuracy
    return [
      { questionNumber: 1, accuracy: 85, difficulty: 'easy' },
      { questionNumber: 2, accuracy: 72, difficulty: 'medium' },
      { questionNumber: 3, accuracy: 68, difficulty: 'hard' },
      { questionNumber: 4, accuracy: 91, difficulty: 'easy' },
      { questionNumber: 5, accuracy: 45, difficulty: 'hard' }
    ]
  }

  const calculateDifficultyPerformance = () => {
    return {
      easy: { average: 87, count: 2 },
      medium: { average: 72, count: 1 },
      hard: { average: 56, count: 2 }
    }
  }

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    }
    return colors[difficulty] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 تحليلات الطلاب</h3>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            <span className="number-ltr">{analytics.totalStudents}</span>
          </div>
          <div className="text-sm text-blue-700">إجمالي الطلاب</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            <span className="number-ltr">{analytics.averageScore}</span>
          </div>
          <div className="text-sm text-green-700">متوسط الدرجات</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            <span className="number-ltr">{analytics.completionRate}</span>%
          </div>
          <div className="text-sm text-purple-700">معدل الإنجاز</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            <span className="number-ltr">{analytics.averageTime}</span>
          </div>
          <div className="text-sm text-orange-700">متوسط الوقت (ث)</div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">📈 توزيع الدرجات</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-600">
              <span className="number-ltr">{analytics.lowestScore}</span>
            </div>
            <div className="text-sm text-gray-600">أقل درجة</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-xl font-bold text-yellow-600">
              <span className="number-ltr">{analytics.averageScore}</span>
            </div>
            <div className="text-sm text-yellow-600">متوسط</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">
              <span className="number-ltr">{analytics.highestScore}</span>
            </div>
            <div className="text-sm text-green-600">أعلى درجة</div>
          </div>
        </div>
      </div>

      {/* Question Accuracy */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">🎯 دقة الإجابات حسب السؤال</h4>
        <div className="space-y-3">
          {analytics.questionAccuracy.map((question, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold text-gray-700">
                  السؤال <span className="number-ltr">{question.questionNumber}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty === 'easy' ? 'سهل' : 
                   question.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                </span>
              </div>
              <div className={`text-lg font-bold ${getPerformanceColor(question.accuracy)}`}>
                <span className="number-ltr">{question.accuracy}</span>%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Performance */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">📊 الأداء حسب الصعوبة</h4>
        <div className="space-y-3">
          {Object.entries(analytics.difficultyPerformance).map(([difficulty, data]) => (
            <div key={difficulty} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(difficulty)}`}>
                  {difficulty === 'easy' ? 'سهل' : 
                   difficulty === 'medium' ? 'متوسط' : 'صعب'}
                </span>
                <span className="text-sm text-gray-600">
                  <span className="number-ltr">{data.count}</span> أسئلة
                </span>
              </div>
              <div className={`text-lg font-bold ${getPerformanceColor(data.average)}`}>
                <span className="number-ltr">{data.average}</span>% متوسط
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-3">🏆 أفضل الأداء</h4>
        <div className="space-y-2">
          {students
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, 5)
            .map((student, index) => (
            <div key={student.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                <span className="number-ltr">{student.score || 0}</span> نقطة
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentAnalytics
