import { Link } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

function GradesOverview({ userEmail }) {
  // الحصول على درجات الطالب
  const userGrades = JSON.parse(localStorage.getItem(`grades_${userEmail}`) || '{}')
  
  // حساب المعدل الكلي
  const completedLessons = Object.values(userGrades).filter(g => g !== null)
  const totalAverage = completedLessons.length > 0
    ? Math.round(completedLessons.reduce((sum, g) => sum + g, 0) / completedLessons.length)
    : 0

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'from-green-400 to-emerald-500'
    if (grade >= 80) return 'from-blue-400 to-cyan-500'
    if (grade >= 70) return 'from-yellow-400 to-orange-500'
    if (grade >= 60) return 'from-orange-400 to-red-500'
    return 'from-red-400 to-pink-500'
  }

  const getGradeEmoji = (grade) => {
    if (grade >= 90) return '🏆'
    if (grade >= 80) return '⭐'
    if (grade >= 70) return '👍'
    if (grade >= 60) return '📚'
    return '💪'
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-primary">
        <h2 className="text-4xl font-black text-gray-800 mb-4 flex items-center justify-center gap-3">
          <span>📊</span>
          سجل الدرجات
        </h2>
        
        {/* Overall Average */}
        {completedLessons.length > 0 && (
          <div className={`inline-block bg-gradient-to-r ${getGradeColor(totalAverage)} rounded-full px-8 py-4 shadow-lg`}>
            <div className="text-white">
              <div className="text-sm font-semibold">المعدل الكلي</div>
              <div className="text-5xl font-black">{totalAverage}%</div>
              <div className="text-2xl">{getGradeEmoji(totalAverage)}</div>
            </div>
          </div>
        )}
        
        {completedLessons.length === 0 && (
          <p className="text-xl text-gray-600">
            لم تكمل أي اختبار بعد. ابدأ الآن! 🚀
          </p>
        )}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonsData.lessons.map((lesson) => {
          const grade = userGrades[lesson.id]
          const hasGrade = grade !== undefined && grade !== null

          return (
            <div
              key={lesson.id}
              className={`rounded-xl p-6 border-4 ${
                hasGrade ? 'border-primary bg-gradient-to-br from-blue-50 to-purple-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Lesson Info */}
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{lesson.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
              </div>

              {/* Grade Display */}
              {hasGrade ? (
                <div className={`bg-gradient-to-r ${getGradeColor(grade)} rounded-lg p-4 mb-4`}>
                  <div className="text-center text-white">
                    <div className="text-sm font-semibold mb-1">الدرجة</div>
                    <div className="text-4xl font-black mb-1">{grade}%</div>
                    <div className="text-2xl">{getGradeEmoji(grade)}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-200 rounded-lg p-4 mb-4">
                  <div className="text-center text-gray-500">
                    <div className="text-3xl mb-2">❓</div>
                    <div className="font-semibold">لم يتم الاختبار</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  to={`/lesson/${lesson.id}`}
                  className="block w-full bg-primary text-white text-center py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition-all"
                >
                  📖 الدرس
                </Link>
                <Link
                  to={`/quiz/${lesson.id}`}
                  className="block w-full bg-secondary text-gray-800 text-center py-2 px-4 rounded-lg font-bold hover:bg-yellow-500 transition-all"
                >
                  {hasGrade ? '🔄 إعادة الاختبار' : '🎯 ابدأ الاختبار'}
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Statistics */}
      {completedLessons.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-blue-700">{completedLessons.length}</div>
            <div className="text-gray-700 font-semibold mt-2">اختبارات مكتملة</div>
          </div>
          
          <div className="bg-green-100 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-green-700">
              {completedLessons.filter(g => g >= 80).length}
            </div>
            <div className="text-gray-700 font-semibold mt-2">درجات ممتازة (80%+)</div>
          </div>
          
          <div className="bg-yellow-100 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-yellow-700">
              {lessonsData.lessons.length - completedLessons.length}
            </div>
            <div className="text-gray-700 font-semibold mt-2">اختبارات متبقية</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GradesOverview

