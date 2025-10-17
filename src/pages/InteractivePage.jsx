import { useParams, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import soundManager from '../utils/soundEffects'
import FractionVisualizer from '../components/FractionVisualizer'
import NumberLine from '../components/NumberLine'
import ArithmeticVisualizer from '../components/ArithmeticVisualizer'
import RatioVisualizer from '../components/RatioVisualizer'
import AngleVisualizer from '../components/AngleVisualizer'
import ShapeVisualizer from '../components/ShapeVisualizer'
import AreaCalculator from '../components/AreaCalculator'

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
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-4 flex gap-3 relative z-[100]">
          <button
            onClick={() => {
              soundManager.playClick()
              navigate('/')
            }}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            الرئيسية
          </button>
          <button
            onClick={() => {
              soundManager.playClick()
              navigate(`/lesson/${lesson.id}`)
            }}
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-gray-200 hover:border-gray-300"
          >
            📖 الدرس
          </button>
          <button
            onClick={() => {
              soundManager.playClick()
              navigate(`/quiz/${lesson.id}`)
            }}
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-gray-200 hover:border-gray-300"
          >
            🎯 الاختبار
          </button>
        </div>

        {/* Refined Page Card */}
        <div className="card animate-fadeIn max-w-4xl mx-auto">
          {/* Ultra-Compact Header */}
          <div className="mb-2 flex items-center gap-2 pb-2 border-b border-secondary/20">
            <div className="text-xl">{lesson.icon}</div>
            <div>
              <h1 className="text-base font-black text-gray-800 leading-tight">
                🎮 {lesson.title}
              </h1>
              <p className="text-xs text-gray-600">
                تعلّم بالممارسة والتفاعل!
              </p>
            </div>
          </div>

          {/* Interactive Content Based on Lesson */}
          {lesson.id === 1 && <NumberLine />}
          {lesson.id === 2 && <ArithmeticVisualizer />}
          {lesson.id === 3 && <FractionVisualizer />}
          {lesson.id === 4 && <RatioVisualizer />}
          {lesson.id === 6 && <AngleVisualizer />}
          {lesson.id === 7 && <ShapeVisualizer />}
          {lesson.id === 8 && <AreaCalculator />}
          
          {/* For lessons without interactive content yet */}
          {![1, 2, 3, 4, 6, 7, 8].includes(lesson.id) && (
            <div className="text-center py-2">
              <div className="text-2xl mb-2">🚧</div>
              <h3 className="text-base font-bold text-gray-700 mb-1">
                قريباً...
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                الألعاب التفاعلية لهذا الدرس قيد التطوير
              </p>
              <p className="text-xs text-gray-500 mb-2">
                استكشف الألعاب التفاعلية المتوفرة حالياً:
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-4xl mx-auto">
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/1')
                  }}
                  className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">🔢</div>
                  <div className="font-bold text-xs">خط الأعداد</div>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/2')
                  }}
                  className="bg-green-100 hover:bg-green-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">➕</div>
                  <div className="font-bold text-xs">العمليات الحسابية</div>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/3')
                  }}
                  className="bg-pink-100 hover:bg-pink-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">🍕</div>
                  <div className="font-bold text-xs">الكسور</div>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/4')
                  }}
                  className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">⚖️</div>
                  <div className="font-bold text-xs">النسبة والتناسب</div>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/6')
                  }}
                  className="bg-indigo-100 hover:bg-indigo-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">📐</div>
                  <div className="font-bold text-xs">الزوايا</div>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/7')
                  }}
                  className="bg-teal-100 hover:bg-teal-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">🔷</div>
                  <div className="font-bold text-xs">الأشكال الهندسية</div>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick()
                    navigate('/interactive/8')
                  }}
                  className="bg-orange-100 hover:bg-orange-200 p-2 rounded-lg transition-all"
                >
                  <div className="text-lg mb-1">📏</div>
                  <div className="font-bold text-xs">المحيط والمساحة</div>
                </button>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className="btn-primary"
                >
                  📖 العودة للدرس
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

