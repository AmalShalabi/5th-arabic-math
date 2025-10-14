import { useParams, Link, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import NumberLine from '../components/NumberLine'

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
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          الرئيسية
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

          {/* Number Line - للدرس الأول فقط */}
          {lesson.id === 1 && <NumberLine />}

          {/* Special Layout for Lesson 3 - Side by Side Cards */}
          {lesson.id === 3 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Interactive Games Card */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-xl border-4 border-orange-300 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-orange-700 mb-4 text-center flex items-center justify-center gap-3">
                  <span>🎮</span>
                  ألعاب تفاعلية
                </h2>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  تعلّم الكسور بطريقة ممتعة! لوّن الأشكال وتفاعل مع التمارين 🎨
                </p>
                <div className="text-center">
                  <Link
                    to={`/interactive/${lesson.id}`}
                    className="btn-secondary inline-flex items-center gap-3 text-xl w-full justify-center py-4"
                  >
                    <span>🎨</span>
                    ابدأ الألعاب التفاعلية
                    <span>🎨</span>
                  </Link>
                </div>
              </div>

              {/* Quiz Card */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border-4 border-purple-300 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center flex items-center justify-center gap-3">
                  <span>🎯</span>
                  اختبر نفسك
                </h2>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  الآن حان وقت تطبيق ما تعلمته! اختبر مهاراتك واجمع النجوم ⭐
                </p>
                <div className="text-center">
                  <Link
                    to={`/quiz/${lesson.id}`}
                    className="btn-secondary inline-flex items-center gap-3 text-xl w-full justify-center py-4"
                  >
                    <span>🚀</span>
                    ابدأ الاختبار
                    <span>🚀</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Default Practice Section for other lessons */
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
                  className="btn-secondary inline-flex items-center gap-3 text-xl py-3 px-6"
                >
                  <span>🚀</span>
                  ابدأ الاختبار
                  <span>🚀</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonPage

