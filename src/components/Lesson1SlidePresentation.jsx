import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Lesson1SlidePresentation() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Define slides for Lesson 1
  const slides = [
    {
      id: 1,
      type: 'title',
      title: 'الأعداد الطبيعية والموجهة',
      subtitle: 'مراجعة مفهوم الأعداد الطبيعية والأعداد الموجّهة بطريقة تفاعلية',
      icon: '🔢',
      content: 'مرحباً بك في درس الأعداد الطبيعية والموجهة!'
    },
    {
      id: 2,
      type: 'explanation',
      title: 'الأعداد الطبيعية',
      icon: '🔢',
      content: 'الأعداد الطبيعية هي الأعداد التي نستخدمها للعدّ',
      details: ['1، 2، 3، 4، 5...', 'تبدأ من العدد 1', 'لا تشمل الصفر', 'لا تشمل الأعداد السالبة'],
      examples: ['عدد الطلاب في الفصل', 'عدد الكتب على المكتب', 'عدد الأيام في الأسبوع']
    },
    {
      id: 3,
      type: 'explanation',
      title: 'الأعداد الموجّهة',
      icon: '📊',
      content: 'الأعداد الموجّهة تشمل الأعداد الموجبة والسالبة',
      details: ['الأعداد الموجبة: +1، +2، +3...', 'الأعداد السالبة: -1، -2، -3...', 'تشمل الصفر: 0'],
      examples: ['درجات الحرارة: +25°C، -5°C', 'الارتفاع: +120م، -60م', 'الربح والخسارة: +100، -50']
    },
    {
      id: 4,
      type: 'visual',
      title: 'مستقيم الأعداد',
      icon: '📏',
      content: 'مستقيم الأعداد يساعدنا في فهم الأعداد الموجّهة',
      visual: {
        type: 'number-line',
        description: 'الأعداد الموجبة تقع يمين الصفر ←\nالأعداد السالبة تقع يسار الصفر →\nكلما اتجهنا يميناً، زادت قيمة العدد\nكلما اتجهنا يساراً، قلّت قيمة العدد'
      }
    },
    {
      id: 5,
      type: 'example',
      title: 'مثال تطبيقي',
      icon: '🎈',
      content: 'مثال على منطاد يتحرك لأعلى وأسفل',
      problem: 'كان ارتفاع منطاد +120 متر فوق سطح البحر\nثم نزل 180 متر\nما هو موقعه الآن بالنسبة لسطح البحر؟',
      solution: 'الحل:\n120 - 180 = -60 متر\n\nإذن المنطاد الآن على ارتفاع -60 متر\n(أي 60 متر تحت سطح البحر)'
    },
    {
      id: 6,
      type: 'practice',
      title: 'تمرين تفاعلي',
      icon: '💡',
      content: 'دعنا نتدرب على فهم الأعداد الموجّهة',
      questions: [
        { q: 'ما هو المعكوس الجمعي للعدد +8؟', a: '-8' },
        { q: 'أيهما أكبر: -3 أم -7؟', a: '-3 أكبر من -7' },
        { q: 'ما هو العدد الطبيعي الوحيد من: -5، 0، 3، -2؟', a: '3' }
      ]
    },
    {
      id: 7,
      type: 'summary',
      title: 'ملخص الدرس',
      icon: '📚',
      content: 'ما تعلمناه اليوم:',
      points: [
        'الأعداد الطبيعية: 1، 2، 3... (للعدّ)',
        'الأعداد الموجّهة: موجبة وسالبة (للاتجاهات)',
        'مستقيم الأعداد: يساعد في المقارنة',
        'التطبيقات: الحرارة، الارتفاع، الربح والخسارة'
      ]
    },
    {
      id: 8,
      type: 'action',
      title: 'هل أنت جاهز للاختبار؟',
      icon: '🚀',
      content: 'الآن حان وقت تطبيق ما تعلمته!',
      actions: [
        { label: 'ابدأ الاختبار', icon: '🎯', link: '/quiz/1' },
        { label: 'الألعاب التفاعلية', icon: '🎮', link: '/interactive/1' }
      ]
    }
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const renderSlideContent = () => {
    const slide = slides[currentSlide]

    switch (slide.type) {
      case 'title':
        return (
          <div className="text-center">
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">{slide.icon}</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="mt-8 text-base md:text-lg text-gray-500">
              {slide.content}
            </div>
          </div>
        )

      case 'explanation':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg border-r-4 border-blue-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-700 mb-2">المفاهيم الأساسية:</h3>
                <ul className="text-sm md:text-base text-gray-700 space-y-1">
                  {slide.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-yellow-600">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                <h3 className="text-lg font-bold text-green-700 mb-2">أمثلة من الحياة:</h3>
                <ul className="text-sm md:text-base text-gray-700 space-y-1">
                  {slide.examples.map((example, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )

      case 'visual':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-purple-50 p-4 md:p-6 rounded-lg border-r-4 border-purple-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>

            {/* Number Line Visual */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-300 mb-4">
              <div className="relative">
                <div className="flex items-center justify-center space-x-4 text-lg md:text-xl font-bold">
                  <span className="text-red-600">-5</span>
                  <span className="text-red-600">-4</span>
                  <span className="text-red-600">-3</span>
                  <span className="text-red-600">-2</span>
                  <span className="text-red-600">-1</span>
                  <span className="text-blue-600 text-2xl">0</span>
                  <span className="text-green-600">+1</span>
                  <span className="text-green-600">+2</span>
                  <span className="text-green-600">+3</span>
                  <span className="text-green-600">+4</span>
                  <span className="text-green-600">+5</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-red-600">←</span>
                  <span className="mx-4 text-gray-600">يسار الصفر</span>
                  <span className="text-gray-600 mx-4">يمين الصفر</span>
                  <span className="text-green-600">→</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                {slide.visual.description}
              </p>
            </div>
          </div>
        )

      case 'example':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-yellow-50 p-4 md:p-6 rounded-lg border-r-4 border-yellow-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-700 mb-3">المسألة:</h3>
                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {slide.problem}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                <h3 className="text-lg font-bold text-green-700 mb-3">الحل:</h3>
                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {slide.solution}
                </p>
              </div>
            </div>
          </div>
        )

      case 'practice':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-purple-50 p-4 md:p-6 rounded-lg border-r-4 border-purple-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>

            <div className="space-y-4">
              {slide.questions.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-purple-400 transition-all">
                  <div className="text-left">
                    <h4 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                      {item.q}
                    </h4>
                    <div className="bg-green-50 p-3 rounded border-r-2 border-green-400">
                      <p className="text-sm md:text-base text-green-700 font-semibold">
                        الإجابة: {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'summary':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg border-r-4 border-blue-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.points.map((point, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-blue-600">✓</span>
                    <p className="text-sm md:text-base text-gray-700 text-right">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'action':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 md:p-6 rounded-lg border-r-4 border-purple-500 mb-6">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.link)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return <div>محتوى غير معروف</div>
    }
  }

  return (
    <div className="min-h-screen py-4 md:py-6 px-3 md:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-1.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1.5 text-sm border border-primary/20 hover:border-primary/40"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            الرئيسية
          </button>
        </div>

        {/* Slide Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 animate-fadeIn">
          {/* Slide Content */}
          <div className="min-h-[400px] md:min-h-[500px] flex items-center justify-center">
            {renderSlideContent()}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                currentSlide === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="text-lg">←</span>
              السابق
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={`انتقل إلى الشريحة ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              التالي
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Progress Info */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              الشريحة {currentSlide + 1} من {slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lesson1SlidePresentation
