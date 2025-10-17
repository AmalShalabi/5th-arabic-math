import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

function EnhancedSlidePresentation() {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showSolutions, setShowSolutions] = useState({})

  const currentLesson = lessonsData.lessons.find(l => l.id === parseInt(lessonId)) || lessonsData.lessons[0]
  
  // Debug logging
  useEffect(() => {
    console.log('EnhancedSlidePresentation mounted with lessonId:', lessonId)
    console.log('Parsed lessonId:', parseInt(lessonId))
    console.log('Available lessons:', lessonsData.lessons.map(l => l.id))
    console.log('Current lesson:', currentLesson)
  }, [lessonId, currentLesson])

  // Early return if no lesson found
  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <p className="mb-4">Lesson ID: {lessonId}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // Helper functions to get content based on lesson ID
  const getVisualElements = (lessonId) => {
    const visualElements = {
      1: [
        { type: 'number-line', content: 'خط الأعداد يوضح ترتيب الأعداد من السالب إلى الموجب' },
        { type: 'temperature', content: 'مقياس الحرارة: +25°C فوق الصفر، -5°C تحت الصفر' }
      ],
      2: [
        { type: 'operations', content: 'رموز العمليات: + (الجمع)، - (الطرح)، × (الضرب)، ÷ (القسمة)' },
        { type: 'calculator', content: 'آلة حاسبة تظهر العمليات بالترتيب الصحيح' }
      ],
      3: [
        { type: 'pie-chart', content: 'دائرة مقسمة إلى أجزاء متساوية تمثل الكسور المختلفة' },
        { type: 'fraction-bar', content: 'شريط مقسم يوضح البسط والمقام في الكسر' }
      ]
    }
    return visualElements[lessonId] || []
  }

  const getStepByStepExample = (lessonId) => {
    const examples = {
      1: {
        title: '🌡️ درجات الحرارة',
        steps: [
          'الخطوة 1: فهم المقارنة\n+25°C (خمس وعشرون درجة فوق الصفر)',
          'الخطوة 2: ترتيب الأعداد\n-5 < 0 < +25',
          'الخطوة 3: التطبيق العملي\nفي الشتاء: -3°C (بارد جداً)'
        ]
      },
      2: {
        title: '🛒 التسوق',
        steps: [
          'الخطوة 1: فهم المسألة\nاشترى أحمد 3 أقلام بسعر 5 ريالات لكل قلم',
          'الخطوة 2: تحديد العملية\nهذه مسألة ضرب: 3 × 5',
          'الخطوة 3: الحل\n3 × 5 = 15 ريال'
        ]
      },
      3: {
        title: '🍰 تقسيم الكعكة',
        steps: [
          'الخطوة 1: فهم الكسر\nكعكة مقسمة إلى 8 أجزاء متساوية',
          'الخطوة 2: حساب ما أُكل\nأكل أحمد 3 أجزاء = 3/8 من الكعكة',
          'الخطوة 3: حساب ما بقي\nبقي: 8 - 3 = 5 أجزاء = 5/8 من الكعكة'
        ]
      }
    }
    return examples[lessonId] || examples[1]
  }

  const getPracticeQuestions = (lessonId, difficulty) => {
    const questions = {
      1: {
        easy: [
          { question: 'ما هو العدد الأكبر: +5 أم -3؟', options: ['+5', '-3'], correct: 0, explanation: '+5 أكبر من -3 لأن الأعداد الموجبة أكبر من الأعداد السالبة' },
          { question: 'إذا كانت درجة الحرارة -2°C، هل الجو بارد أم حار؟', options: ['بارد', 'حار'], correct: 0, explanation: '-2°C تحت الصفر، إذن الجو بارد' }
        ],
        medium: [
          { question: 'رجل خسر 50 ريالاً ثم ربح 30 ريالاً. ما رصيده النهائي؟', options: ['-20 ريال', '-80 ريال', '+20 ريال'], correct: 0, explanation: '-50 + 30 = -20 ريال (خسارة صافية)' },
          { question: 'رتب هذه الأعداد من الأصغر للأكبر: +3، -1، +7، -5', options: ['-5، -1، +3، +7', '+7، +3، -1، -5'], correct: 0, explanation: '-5 < -1 < +3 < +7' }
        ],
        hard: [
          { question: 'في يوم شتوي، كانت درجة الحرارة -8°C في الصباح، وارتفعت 12 درجة في الظهيرة. ما درجة الحرارة في الظهيرة؟', options: ['+4°C', '-20°C', '+20°C'], correct: 0, explanation: '-8 + 12 = +4°C' }
        ]
      },
      2: {
        easy: [
          { question: 'ما نتيجة: 8 + 7؟', options: ['15', '13', '16'], correct: 0, explanation: '8 + 7 = 15' },
          { question: 'ما نتيجة: 4 × 3؟', options: ['12', '7', '1'], correct: 0, explanation: '4 × 3 = 12' }
        ],
        medium: [
          { question: 'احسب: 5 + 3 × 2', options: ['11', '16', '13'], correct: 0, explanation: '5 + 3 × 2 = 5 + 6 = 11 (الضرب أولاً)' },
          { question: 'اشترى سعد 4 أقلام بسعر 6 ريالات لكل قلم. كم دفع؟', options: ['24 ريال', '10 ريال', '20 ريال'], correct: 0, explanation: '4 × 6 = 24 ريال' }
        ],
        hard: [
          { question: 'احسب: (12 + 8) ÷ (7 - 3)', options: ['5', '4', '3'], correct: 0, explanation: '(12 + 8) ÷ (7 - 3) = 20 ÷ 4 = 5' }
        ]
      },
      3: {
        easy: [
          { question: 'ما معنى الكسر 2/5؟', options: ['2 أجزاء من 5', '5 أجزاء من 2'], correct: 0, explanation: '2/5 يعني 2 أجزاء من أصل 5 أجزاء متساوية' },
          { question: 'إذا قسمت بيتزا إلى 6 أجزاء متساوية، فما قيمة كل جزء؟', options: ['1/6', '6/1'], correct: 0, explanation: 'كل جزء = 1/6 من البيتزا' }
        ],
        medium: [
          { question: 'كتاب من 90 صفحة، قرأ أحمد 2/5 منه. كم صفحة قرأ؟', options: ['36 صفحة', '45 صفحة', '30 صفحة'], correct: 0, explanation: '90 × 2/5 = 36 صفحة' }
        ],
        hard: [
          { question: 'اشترى سعد 3/4 كيلو من التفاح، واشترى فاطمة 2/3 كيلو. كم كيلو اشتروا معاً؟', options: ['17/12 كيلو', '5/7 كيلو', '6/7 كيلو'], correct: 0, explanation: '3/4 + 2/3 = 9/12 + 8/12 = 17/12 كيلو' }
        ]
      }
    }
    return questions[lessonId]?.[difficulty] || questions[1][difficulty]
  }

  const getVisualIcon = (type) => {
    const icons = {
      'number-line': '📏', 'temperature': '🌡️', 'operations': '🔢',
      'calculator': '🧮', 'pie-chart': '📊', 'fraction-bar': '📏'
    }
    return icons[type] || '📊'
  }

  // Generate all slides for the current lesson
  const generateSlides = () => {
    const slides = []

    // 1. Main slide with lesson title
    slides.push({
      type: 'main',
      id: 'main',
      title: currentLesson.title,
      icon: currentLesson.icon,
      description: currentLesson.description
    })

    // 2. Concept illustration slide
    slides.push({
      type: 'illustration',
      id: 'illustration',
      title: 'التمثيل البصري',
      icon: '👁️',
      content: {
        explanation: currentLesson.content.explanation,
        visualElements: getVisualElements(currentLesson.id)
      }
    })

    // 3. Example slide
    slides.push({
      type: 'example',
      id: 'example',
      title: 'مثال عملي',
      icon: '💡',
      content: {
        example: currentLesson.content.example,
        stepByStep: getStepByStepExample(currentLesson.id)
      }
    })

    // 4. Practice questions (Easy)
    const easyQuestions = getPracticeQuestions(currentLesson.id, 'easy')
    easyQuestions.forEach((question, index) => {
      slides.push({
        type: 'question',
        id: `easy-${index}`,
        difficulty: 'easy',
        title: 'سؤال سهل',
        icon: '🟢',
        content: question
      })
    })

    // 5. Practice questions (Medium)
    const mediumQuestions = getPracticeQuestions(currentLesson.id, 'medium')
    mediumQuestions.forEach((question, index) => {
      slides.push({
        type: 'question',
        id: `medium-${index}`,
        difficulty: 'medium',
        title: 'سؤال متوسط',
        icon: '🟡',
        content: question
      })
    })

    // 6. Practice questions (Hard)
    const hardQuestions = getPracticeQuestions(currentLesson.id, 'hard')
    hardQuestions.forEach((question, index) => {
      slides.push({
        type: 'question',
        id: `hard-${index}`,
        difficulty: 'hard',
        title: 'سؤال صعب',
        icon: '🔴',
        content: question
      })
    })

    return slides
  }

  const slides = generateSlides()

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

  const handleAnswerSelect = (slideId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [slideId]: answerIndex
    }))
    setShowSolutions(prev => ({
      ...prev,
      [slideId]: true
    }))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-emerald-500'
      case 'medium': return 'from-yellow-400 to-orange-500'
      case 'hard': return 'from-red-400 to-pink-500'
      default: return 'from-blue-400 to-purple-500'
    }
  }

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

  const currentSlideData = slides[currentSlide]

  const renderSlideContent = () => {
    switch (currentSlideData.type) {
      case 'main':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="text-8xl mb-8 animate-pulse">
              {currentSlideData.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 text-center leading-tight mb-4">
              {currentSlideData.title}
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl">
              {currentSlideData.description}
            </p>
          </div>
        )

      case 'illustration':
        return (
          <div className="w-full h-full p-6 overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{currentSlideData.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800">{currentSlideData.title}</h2>
            </div>
            
            <div className="mb-6 bg-blue-50 p-4 rounded-xl">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentSlideData.content.explanation}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSlideData.content.visualElements.map((element, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-3xl mb-2 text-center">{getVisualIcon(element.type)}</div>
                  <p className="text-gray-700 text-center">{element.content}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'example':
        return (
          <div className="w-full h-full p-6 overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{currentSlideData.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800">{currentSlideData.title}</h2>
            </div>

            <div className="mb-6 bg-yellow-50 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">المثال الأساسي</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentSlideData.content.example}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-green-800 mb-3">{currentSlideData.content.stepByStep.title}</h3>
              <div className="space-y-3">
                {currentSlideData.content.stepByStep.steps.map((step, index) => (
                  <div key={index} className="bg-white/70 p-3 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full min-w-fit">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'question':
        const question = currentSlideData.content
        const isAnswered = selectedAnswers[currentSlideData.id] !== undefined
        const isCorrect = selectedAnswers[currentSlideData.id] === question.correct

        return (
          <div className="w-full h-full p-6 overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{currentSlideData.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800">{currentSlideData.title}</h2>
            </div>

            <div className={`bg-gradient-to-r ${getDifficultyColor(currentSlideData.difficulty)} p-6 rounded-xl text-white mb-6`}>
              <h3 className="text-xl font-bold mb-4">السؤال:</h3>
              <p className="text-lg">{question.question}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentSlideData.id] === index
                const isCorrectOption = index === question.correct
                const showResult = showSolutions[currentSlideData.id]

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentSlideData.id, index)}
                    disabled={showResult}
                    className={`p-4 rounded-xl text-left transition-all duration-300 ${
                      showResult
                        ? isCorrectOption
                          ? 'bg-green-100 border-2 border-green-500 text-green-800'
                          : isSelected
                          ? 'bg-red-100 border-2 border-red-500 text-red-800'
                          : 'bg-gray-100 border-2 border-gray-300 text-gray-600'
                        : isSelected
                        ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        showResult
                          ? isCorrectOption
                            ? 'bg-green-500 border-green-500 text-white'
                            : isSelected
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'border-gray-300'
                          : isSelected
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-gray-300'
                      }`}>
                        {showResult && isCorrectOption ? '✓' : String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {showSolutions[currentSlideData.id] && (
              <div className={`p-4 rounded-xl ${
                isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '🎉' : '💡'}
                  </span>
                  <span className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                  </span>
                </div>
                <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        )

      default:
        return <div>Unknown slide type</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      
      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="bg-white/10 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-sm border border-white/20"
          >
            🏠 الرئيسية
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-white/90">عرض شامل</h1>
            <p className="text-sm text-white/70">Comprehensive Presentation</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/slides')}
              className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-all duration-300 shadow-lg text-sm border border-white/20"
            >
              📱 البسيط
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-white/20">
            <span className="text-sm font-bold text-white/90">
              {currentSlide + 1} / {slides.length}
            </span>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
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
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              {renderSlideContent()}
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-sm -z-10 animate-pulse"></div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
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
              onClick={() => navigate(`/quiz/${currentLesson.id}`)}
              className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              🎯 الاختبار
            </button>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentSlide === slides.length - 1
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 shadow-lg hover:shadow-xl backdrop-blur-sm'
            }`}
          >
            التالي ➡️
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-white/90">تقدم العرض</span>
              <span className="text-sm font-bold text-white/90">
                {Math.round(((currentSlide + 1) / slides.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}

export default EnhancedSlidePresentation
