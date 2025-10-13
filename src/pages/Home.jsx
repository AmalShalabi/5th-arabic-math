import { Link } from 'react-router-dom'
import { useState } from 'react'
import lessonsData from '../data/lessons.json'
import GradesOverview from '../components/GradesOverview'

function Home() {
  const [showGrades, setShowGrades] = useState(false)
  
  // الحصول على بيانات المستخدم الحالي
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const userEmail = currentUser.email || ''
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl">
            🎓 تعلّم الرياضيات مع جمانة
          </h1>
          <p className="text-3xl text-white font-semibold drop-shadow-lg">
            الصف الخامس الابتدائي
          </p>
          <div className="mt-6 text-2xl text-white">
            اختر موضوعاً لتبدأ رحلة التعلم! 🚀
          </div>
          
          {/* Toggle Grades Button */}
          <div className="mt-6">
            <button
              onClick={() => setShowGrades(!showGrades)}
              className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-xl"
            >
              {showGrades ? '📚 عرض المواضيع' : '📊 عرض سجل الدرجات'}
            </button>
          </div>
        </div>

        {/* Grades Overview */}
        {showGrades && userEmail && (
          <GradesOverview userEmail={userEmail} />
        )}

        {/* Lessons Grid */}
        {!showGrades && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessonsData.lessons.map((lesson, index) => {
            // الحصول على درجة الطالب لهذا الدرس
            const userGrades = JSON.parse(localStorage.getItem(`grades_${userEmail}`) || '{}')
            const lessonGrade = userGrades[lesson.id]
            const hasGrade = lessonGrade !== undefined && lessonGrade !== null
            
            const getGradeColor = (grade) => {
              if (grade >= 90) return 'bg-green-500'
              if (grade >= 80) return 'bg-blue-500'
              if (grade >= 70) return 'bg-yellow-500'
              return 'bg-orange-500'
            }

            return (
            <div
              key={lesson.id}
              className="lesson-card group animate-slideUp relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Grade Badge */}
              {hasGrade && (
                <div className={`absolute top-4 left-4 ${getGradeColor(lessonGrade)} text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg z-10`}>
                  <div className="text-xs font-semibold">الدرجة</div>
                  <div className="text-xl font-black">{lessonGrade}%</div>
                </div>
              )}
              
              <div className="text-center">
                <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {lesson.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {lesson.description}
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    📖 ابدأ التعلم
                  </Link>
                  <Link
                    to={`/quiz/${lesson.id}`}
                    className="bg-secondary hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {hasGrade ? '🔄 إعادة' : '🎯 اختبر'}
                  </Link>
                </div>
              </div>
            </div>
            )
          })}
        </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-white text-xl">
          <p className="mb-2">✨ استمتع بالتعلم واجمع أكبر عدد من النجوم! ✨</p>
          <p>💪 كل إجابة صحيحة = نجمة جديدة!</p>
        </div>
      </div>
    </div>
  )
}

export default Home

