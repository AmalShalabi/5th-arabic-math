import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { soundEffects } from '../utils/generateSounds'

function Lesson1SlidePresentation() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      soundEffects.click()
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      soundEffects.click()
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    soundEffects.click()
    setCurrentSlide(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        nextSlide()
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  // Define slides for Lesson 1
  const slides = [
    {
      id: 1,
      type: 'title',
      title: 'الأعداد الطبيعية والموجهة',
      subtitle: 'الصف الخامس الابتدائي',
      icon: '🧮',
      content: 'مرحباً بك في درس الأعداد الطبيعية والموجهة!'
    },
    {
      id: 2,
      type: 'natural-numbers',
      title: 'مفهوم الأعداد الطبيعية',
      icon: '🍎',
      content: 'الأعداد الطبيعية هي الأعداد التي نستخدمها للعدّ مثل:',
      numbers: '0, 1, 2, 3, 4, 5…',
      visual: 'تفاحات مرقمة بالأعداد الطبيعية',
      example: 'لدي 3 تفاحات وأضفت تفاحتين فأصبح المجموع 5 تفاحات'
    },
    {
      id: 3,
      type: 'directed-numbers',
      title: 'مفهوم الأعداد الموجهة',
      icon: '🌡️',
      content: 'تشمل الأعداد الموجّهة الأعداد الموجبة (+) والسالبة (−)، ونستخدمها لتمثيل القيم فوق وتحت الصفر',
      visual: 'ميزان حرارة يظهر −3° و +4°',
      example: 'إذا كانت درجة الحرارة في الصباح −3° وفي الظهر +4°، ما الفرق؟',
      solution: 'الفرق = +4° - (−3°) = +4° + 3° = +7°'
    },
    {
      id: 4,
      type: 'number-line',
      title: 'خط الأعداد',
      icon: '📏',
      content: 'يُستخدم خط الأعداد لتمثيل الأعداد الموجهة من اليسار (الأعداد السالبة) إلى اليمين (الأعداد الموجبة)',
      example: 'تحرك سامي 3 خطوات يسارًا من الصفر ثم خطوتين يمينًا، وصل إلى −1',
      visual: 'خط أعداد متحرك',
      calculation: '0 - 3 + 2 = -1'
    },
    {
      id: 5,
      type: 'operations',
      title: 'عمليات على الأعداد الموجهة',
      icon: '➕',
      content: 'دعنا نتعلم العمليات على الأعداد الموجهة',
      operations: [
        { problem: '+3 + (−2) = +1', color: 'blue' },
        { problem: '−4 + (+7) = +3', color: 'green' },
        { problem: '−5 − (−3) = −2', color: 'purple' }
      ],
      visual: 'تغيّر موقع النقطة على خط الأعداد بألوان مختلفة عند كل عملية'
    },
    {
      id: 6,
      type: 'interactive-questions',
      title: 'أسئلة تفاعلية',
      icon: '🤔',
      content: 'دعنا نختبر فهمنا!',
      questions: [
        { 
          level: '1️⃣', 
          question: 'ما الفرق بين العدد الطبيعي والموجه؟', 
          answer: 'الطبيعي للعد (0,1,2...)، الموجه يشمل الموجب والسالب (+3, -2)',
          difficulty: 'easy'
        },
        { 
          level: '2️⃣', 
          question: 'إذا كانت الحرارة −2° وغدًا +3°، كم الفرق؟', 
          answer: 'الفرق = +3° - (−2°) = +3° + 2° = +5°',
          difficulty: 'medium'
        },
        { 
          level: '3️⃣', 
          question: 'أحمد كان على ارتفاع +4م، نزل إلى −1م، كم التغير؟', 
          answer: 'التغير = −1م - (+4م) = −1م - 4م = −5م',
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 7,
      type: 'solutions',
      title: 'الحلول',
      icon: '✅',
      content: 'إجابات الأسئلة التفاعلية',
      solutions: [
        { 
          question: 'الفرق بين العدد الطبيعي والموجه', 
          answer: 'الطبيعي للعد (0,1,2...)، الموجه يشمل الموجب والسالب (+3, -2)',
          color: 'green'
        },
        { 
          question: 'الفرق في درجات الحرارة', 
          answer: 'الفرق = +3° - (−2°) = +3° + 2° = +5°',
          color: 'blue'
        },
        { 
          question: 'تغير ارتفاع أحمد', 
          answer: 'التغير = −1م - (+4م) = −1م - 4م = −5م',
          color: 'purple'
        }
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
        { label: 'الألعاب التفاعلية', icon: '🎮', link: '/interactive/1' },
        { label: 'اختبار Kahoot', icon: '🧠', link: 'https://kahoot.it', external: true }
      ]
    }
  ]

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
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-6">
              {slide.subtitle}
            </p>
            
            {/* Number Line Visual */}
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300 mb-4">
              <div className="flex items-center justify-center space-x-3 text-lg md:text-xl font-bold">
                <span className="text-red-600">−5</span>
                <span className="text-red-600">−4</span>
                <span className="text-red-600">−3</span>
                <span className="text-red-600">−2</span>
                <span className="text-red-600">−1</span>
                <span className="text-blue-600 text-2xl">0</span>
                <span className="text-green-600">+1</span>
                <span className="text-green-600">+2</span>
                <span className="text-green-600">+3</span>
                <span className="text-green-600">+4</span>
                <span className="text-green-600">+5</span>
              </div>
              <div className="flex items-center justify-center mt-2 text-sm">
                <span className="text-red-600">← أزرق للأعداد الموجبة</span>
                <span className="mx-4 text-gray-600">|</span>
                <span className="text-green-600">أحمر للسالبة →</span>
              </div>
            </div>
            
            <div className="text-base md:text-lg text-gray-500">
              {slide.content}
            </div>
          </div>
        )

      case 'natural-numbers':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-green-50 p-4 md:p-6 rounded-lg border-r-4 border-green-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-3">
                {slide.content}
              </p>
              <div className="text-2xl md:text-3xl font-bold text-green-700">
                {slide.numbers}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-700 mb-2">التمثيل البصري:</h3>
                <div className="flex items-center justify-center space-x-2 text-2xl">
                  <span>🍎</span>
                  <span>1</span>
                  <span>🍎</span>
                  <span>2</span>
                  <span>🍎</span>
                  <span>3</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{slide.visual}</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-700 mb-2">مثال عملي:</h3>
                <p className="text-sm md:text-base text-gray-700">
                  {slide.example}
                </p>
              </div>
            </div>
          </div>
        )

      case 'directed-numbers':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-red-50 p-4 md:p-6 rounded-lg border-r-4 border-red-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-700 mb-2">التمثيل البصري:</h3>
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center justify-center space-x-4 text-lg">
                    <span className="text-red-600">🌡️ −3°</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-blue-600">+4° 🌡️</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{slide.visual}</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-700 mb-2">مثال عملي:</h3>
                <p className="text-sm md:text-base text-gray-700 mb-2">
                  {slide.example}
                </p>
                <div className="bg-green-50 p-2 rounded border-r-2 border-green-400">
                  <p className="text-sm text-green-700 font-semibold">
                    {slide.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'number-line':
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

            {/* Interactive Number Line */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-300 mb-4">
              <div className="relative">
                <div className="flex items-center justify-center space-x-4 text-lg md:text-xl font-bold">
                  <span className="text-red-600">−5</span>
                  <span className="text-red-600">−4</span>
                  <span className="text-red-600">−3</span>
                  <span className="text-red-600">−2</span>
                  <span className="text-red-600">−1</span>
                  <span className="text-blue-600 text-2xl">0</span>
                  <span className="text-green-600">+1</span>
                  <span className="text-green-600">+2</span>
                  <span className="text-green-600">+3</span>
                  <span className="text-green-600">+4</span>
                  <span className="text-green-600">+5</span>
                </div>
                <div className="flex items-center justify-center mt-2 text-sm">
                  <span className="text-red-600">← يسار (سالبة)</span>
                  <span className="mx-4 text-gray-600">|</span>
                  <span className="text-green-600">يمين (موجبة) →</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-700 mb-2">مثال:</h3>
                <p className="text-sm md:text-base text-gray-700 mb-2">
                  {slide.example}
                </p>
                <div className="bg-green-50 p-2 rounded border-r-2 border-green-400">
                  <p className="text-sm text-green-700 font-semibold">
                    الحساب: {slide.calculation}
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-700 mb-2">التمثيل البصري:</h3>
                <p className="text-sm text-gray-600">
                  {slide.visual}
                </p>
              </div>
            </div>
          </div>
        )

      case 'operations':
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
              {slide.operations.map((op, index) => (
                <div key={index} className={`bg-${op.color}-50 p-4 rounded-lg border-r-4 border-${op.color}-500`}>
                  <div className={`text-2xl md:text-3xl font-bold text-${op.color}-700`}>
                    {op.problem}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-700 mb-2">التمثيل البصري:</h3>
              <p className="text-sm text-gray-600">
                {slide.visual}
              </p>
            </div>
          </div>
        )

      case 'interactive-questions':
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
                <div key={index} className={`bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-${item.difficulty === 'easy' ? 'green' : item.difficulty === 'medium' ? 'yellow' : 'red'}-400 transition-all`}>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{item.level}</span>
                      <span className={`text-sm font-bold px-2 py-1 rounded ${
                        item.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        item.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.difficulty === 'easy' ? 'سهل' : item.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                      {item.question}
                    </h4>
                    <div className="bg-green-50 p-3 rounded border-r-2 border-green-400">
                      <p className="text-sm md:text-base text-green-700 font-semibold">
                        الإجابة: {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'solutions':
        return (
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {slide.title}
            </h2>
            
            <div className="bg-green-50 p-4 md:p-6 rounded-lg border-r-4 border-green-500 mb-4">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {slide.content}
              </p>
            </div>

            <div className="space-y-4">
              {slide.solutions.map((solution, index) => (
                <div key={index} className={`bg-${solution.color}-50 p-4 rounded-lg border-r-4 border-${solution.color}-500`}>
                  <h3 className={`text-lg font-bold text-${solution.color}-700 mb-2`}>
                    {solution.question}
                  </h3>
                  <div className={`bg-${solution.color}-100 p-3 rounded border-r-2 border-${solution.color}-400`}>
                    <p className={`text-sm md:text-base text-${solution.color}-700 font-semibold`}>
                      {solution.answer}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {slide.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.external ? window.open(action.link, '_blank') : navigate(action.link)}
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
