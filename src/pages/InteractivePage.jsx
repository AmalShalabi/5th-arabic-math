import { useParams, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import FractionVisualizer from '../components/FractionVisualizer'

function InteractivePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessonsData.lessons.find(l => l.id === parseInt(id))

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <p className="text-2xl text-red-500 mb-4">❌ الدرس غير موجود</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            الرئيسية
          </button>
          <button
            onClick={() => navigate(`/lesson/${lesson.id}`)}
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-gray-200 hover:border-gray-300"
          >
            📖 الدرس
          </button>
          <button
            onClick={() => navigate(`/quiz/${lesson.id}`)}
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-gray-200 hover:border-gray-300"
          >
            🎯 الاختبار
          </button>
        </div>

        {/* Page Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-4 border-secondary">
            <div className="text-8xl mb-4">{lesson.icon}</div>
            <h1 className="text-5xl font-black text-gray-800 mb-2">
              🎮 ألعاب تفاعلية
            </h1>
            <h2 className="text-3xl font-bold text-primary">
              {lesson.title}
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              تعلّم بالممارسة والتفاعل!
            </p>
          </div>

          {/* Interactive Content Based on Lesson */}
          {lesson.id === 3 && <FractionVisualizer />}
          
          {/* For other lessons - coming soon message */}
          {lesson.id !== 3 && (
            <div className="text-center py-12">
              <div className="text-8xl mb-6">🚧</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">
                قريباً...
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                الألعاب التفاعلية لهذا الدرس قيد التطوير
              </p>
              <p className="text-lg text-gray-500">
                حالياً، الألعاب التفاعلية متوفرة فقط لدرس الكسور العادية 🍕
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className="btn-primary"
                >
                  📖 العودة للدرس
                </button>
                <button
                  onClick={() => navigate('/lesson/3')}
                  className="btn-secondary"
                >
                  🍕 جرّب ألعاب الكسور
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InteractivePage

