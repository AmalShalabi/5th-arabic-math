import { useParams, Link, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessonsData.lessons.find(l => l.id === parseInt(id))

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <p className="text-2xl text-red-500 mb-4">❌ الدرس غير موجود</p>
          <Link to="/" className="btn-primary">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-white text-gray-700 font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          ← العودة للرئيسية
        </button>

        {/* Lesson Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-4 border-primary">
            <div className="text-8xl mb-4">{lesson.icon}</div>
            <h1 className="text-5xl font-black text-gray-800 mb-2">
              {lesson.title}
            </h1>
            <p className="text-xl text-gray-600">{lesson.description}</p>
          </div>

          {/* Explanation Section */}
          <div className="mb-8 bg-blue-50 p-8 rounded-xl border-r-8 border-primary">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center gap-3">
              <span>📚</span>
              الشرح
            </h2>
            <div className="text-xl text-gray-800 leading-relaxed whitespace-pre-line">
              {lesson.content.explanation}
            </div>
          </div>

          {/* Example Section */}
          <div className="mb-8 bg-yellow-50 p-8 rounded-xl border-r-8 border-secondary">
            <h2 className="text-3xl font-bold text-yellow-700 mb-4 flex items-center gap-3">
              <span>💡</span>
              مثال عملي
            </h2>
            <div className="text-xl text-gray-800 leading-relaxed whitespace-pre-line">
              {lesson.content.example}
            </div>
          </div>

          {/* Practice Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border-4 border-purple-300">
            <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center flex items-center justify-center gap-3">
              <span>🎯</span>
              هل أنت جاهز للاختبار؟
            </h2>
            <p className="text-xl text-gray-700 mb-6 text-center">
              الآن حان وقت تطبيق ما تعلمته! اختبر مهاراتك واجمع النجوم ⭐
            </p>
            <div className="text-center">
              <Link
                to={`/quiz/${lesson.id}`}
                className="btn-secondary inline-flex items-center gap-3 text-2xl"
              >
                <span>🚀</span>
                ابدأ الاختبار الآن
                <span>🚀</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPage

