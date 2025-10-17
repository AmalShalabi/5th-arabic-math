import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

function SimpleSlidePresentation() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const topics = [
    {
      id: 1,
      title: "الأعداد الطبيعية والموجهة",
      icon: "🔢"
    },
    {
      id: 2,
      title: "العمليات الحسابية",
      icon: "➕➖✖️➗"
    },
    {
      id: 3,
      title: "الكسور العادية",
      icon: "🍕"
    },
    {
      id: 4,
      title: "المسافة والزمن والسرعة",
      icon: "🚗"
    },
    {
      id: 5,
      title: "الزوايا وأنواعها",
      icon: "📐"
    },
    {
      id: 6,
      title: "الأشكال الهندسية",
      icon: "🔷"
    },
    {
      id: 7,
      title: "المحيط والمساحة",
      icon: "📏"
    },
    {
      id: 8,
      title: "الحجم والسعة",
      icon: "🧊"
    },
    {
      id: 9,
      title: "المسائل الكلامية",
      icon: "📝"
    }
  ]

  const nextSlide = () => {
    if (currentSlide < topics.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const currentTopic = topics[currentSlide]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      
      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="bg-white/10 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-sm border border-white/20"
          >
            🏠 الرئيسية
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white/90">عرض المواضيع</h1>
            <p className="text-sm text-white/70">Topics Presentation</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/presentation')}
              className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-all duration-300 shadow-lg text-sm border border-white/20"
            >
              📽️ التفاعلي
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
            <span className="text-sm font-bold text-white/90">
              {currentSlide + 1} / {topics.length}
            </span>
            <div className="flex gap-1">
              {topics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Slide */}
        <div className="flex items-center justify-center">
          <div className="relative">
            
            {/* Slide Container */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 transform hover:scale-105 transition-all duration-500">
              
              {/* Icon */}
              <div className="text-6xl sm:text-7xl md:text-8xl mb-6 animate-pulse">
                {currentTopic.icon}
              </div>
              
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 text-center leading-tight">
                {currentTopic.title}
              </h2>
              
              {/* Subtle decoration */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20"></div>
            </div>

            {/* Slide Border Animation */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-sm -z-10 animate-pulse"></div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentSlide === 0
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 shadow-lg hover:shadow-xl backdrop-blur-sm'
            }`}
          >
            ⬅️ السابق
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              🏠 الرئيسية
            </button>
            <button
              onClick={() => navigate(`/quiz/${currentTopic.id}`)}
              className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              🎯 الاختبار
            </button>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === topics.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentSlide === topics.length - 1
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 shadow-lg hover:shadow-xl backdrop-blur-sm'
            }`}
          >
            التالي ➡️
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-white/90">تقدم العرض</span>
              <span className="text-sm font-bold text-white/90">
                {Math.round(((currentSlide + 1) / topics.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentSlide + 1) / topics.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/50">
            يمكنك استخدام أسهم لوحة المفاتيح للتنقل
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  )
}

export default SimpleSlidePresentation
