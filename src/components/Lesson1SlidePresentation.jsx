import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { soundEffects } from '../utils/generateSounds'

function Lesson1SlidePresentation() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Debug logging
  useEffect(() => {
    console.log('Lesson1SlidePresentation loaded successfully!')
  }, [])

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
      type: 'natural-numbers-intro',
      title: 'ما هي الأعداد الطبيعية؟',
      icon: '🍎',
      content: 'الأعداد الطبيعية هي الأعداد التي نستخدمها للعدّ',
      numbers: '0, 1, 2, 3, 4, 5…',
      description: 'تبدأ من الصفر وتستمر إلى ما لا نهاية'
    },
    {
      id: 3,
      type: 'natural-numbers-examples',
      title: 'أمثلة على الأعداد الطبيعية',
      icon: '📚',
      content: 'دعنا نرى كيف نستخدم الأعداد الطبيعية',
      visual: 'تفاحات مرقمة بالأعداد الطبيعية',
      example: 'لدي 3 تفاحات وأضفت تفاحتين فأصبح المجموع 5 تفاحات',
      keyPoints: [
        'تستخدم للعد والحساب',
        'لا تحتوي على أعداد سالبة',
        'تبدأ من الصفر'
      ]
    },
    {
      id: 4,
      type: 'directed-numbers-intro',
      title: 'ما هي الأعداد الموجهة؟',
      icon: '🌡️',
      content: 'تشمل الأعداد الموجّهة الأعداد الموجبة (+) والسالبة (−)',
      description: 'نستخدمها لتمثيل القيم فوق وتحت الصفر',
      visual: 'ميزان حرارة يظهر −3° و +4°',
      keyPoints: [
        'تشمل الأعداد الموجبة والسالبة',
        'تستخدم لتمثيل الاتجاهات',
        'تطبق في الحياة اليومية'
      ]
    },
    {
      id: 5,
      type: 'directed-numbers-examples',
      title: 'أمثلة على الأعداد الموجهة',
      icon: '🌡️',
      content: 'مثال عملي على الأعداد الموجهة',
      example: 'إذا كانت درجة الحرارة في الصباح −3° وفي الظهر +4°، ما الفرق؟',
      solution: 'الفرق = +4° - (−3°) = +4° + 3° = +7°',
      applications: [
        'درجات الحرارة',
        'الارتفاع والانخفاض',
        'الربح والخسارة'
      ]
    },
    {
      id: 6,
      type: 'number-line-intro',
      title: 'خط الأعداد',
      icon: '📏',
      content: 'يُستخدم خط الأعداد لتمثيل الأعداد الموجهة',
      description: 'من اليسار (الأعداد السالبة) إلى اليمين (الأعداد الموجبة)',
      keyPoints: [
        'الأعداد السالبة على اليسار',
        'الأعداد الموجبة على اليمين',
        'الصفر في المنتصف'
      ]
    },
    {
      id: 7,
      type: 'number-line-example',
      title: 'مثال على خط الأعداد',
      icon: '👟',
      content: 'مثال عملي باستخدام خط الأعداد',
      example: 'تحرك سامي 3 خطوات يسارًا من الصفر ثم خطوتين يمينًا، وصل إلى −1',
      visual: 'خط أعداد متحرك',
      calculation: '0 - 3 + 2 = -1'
    },
    {
      id: 8,
      type: 'operations-intro',
      title: 'العمليات على الأعداد الموجهة',
      icon: '➕',
      content: 'دعنا نتعلم العمليات على الأعداد الموجهة',
      description: 'نبدأ بفهم قواعد العمليات الأساسية'
    },
    {
      id: 9,
      type: 'operations-examples',
      title: 'أمثلة على العمليات',
      icon: '🧮',
      operations: [
        { problem: '+3 + (−2) = +1', color: 'blue', explanation: 'إضافة عدد سالب = طرح العدد الموجب' },
        { problem: '−4 + (+7) = +3', color: 'green', explanation: 'إضافة عدد موجب = زيادة القيمة' },
        { problem: '−5 − (−3) = −2', color: 'purple', explanation: 'طرح عدد سالب = إضافة العدد الموجب' }
      ],
      visual: 'تغيّر موقع النقطة على خط الأعداد بألوان مختلفة عند كل عملية'
    },
    {
      id: 10,
      type: 'summary',
      title: 'ملخص الدرس',
      icon: '📚',
      content: 'ما تعلمناه اليوم:',
      points: [
        'الأعداد الطبيعية: للعد والحساب (0, 1, 2, 3...)',
        'الأعداد الموجهة: تشمل الموجبة والسالبة (+3, -2)',
        'خط الأعداد: يساعد في المقارنة والفهم',
        'التطبيقات: الحرارة، الارتفاع، الربح والخسارة'
      ]
    },
    {
      id: 11,
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

  const renderSlideContent = () => {
    const slide = slides[currentSlide]

    switch (slide.type) {
               case 'title':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-6xl md:text-7xl mb-4 animate-bounce">{slide.icon}</div>
                     <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-3 leading-tight">
                       {slide.title}
                     </h1>
                     <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 font-semibold">
                       {slide.subtitle}
                     </p>
                     
                     {/* Number Line Visual */}
                     <div className="bg-white p-4 rounded-lg border-2 border-gray-300 mb-4 shadow-md">
                       <div className="flex items-center justify-center space-x-2 text-base md:text-lg font-bold">
                         <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−5</span>
                         <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−4</span>
                         <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−3</span>
                         <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−2</span>
                         <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−1</span>
                         <span className="text-blue-600 text-xl bg-blue-50 px-3 py-2 rounded-lg font-black">0</span>
                         <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+1</span>
                         <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+2</span>
                         <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+3</span>
                         <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+4</span>
                         <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+5</span>
                       </div>
                       <div className="flex items-center justify-center mt-2 text-xs md:text-sm font-semibold">
                         <span className="text-red-600 bg-red-100 px-2 py-1 rounded">← يسار (سالبة)</span>
                         <span className="mx-3 text-gray-600">|</span>
                         <span className="text-green-600 bg-green-100 px-2 py-1 rounded">يمين (موجبة) →</span>
                       </div>
                     </div>
                     
                     <div className="text-base md:text-lg text-gray-500 font-medium">
                       {slide.content}
                     </div>
                   </div>
                 )

               case 'natural-numbers-intro':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-6xl md:text-7xl mb-4">{slide.icon}</div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-green-50 p-6 rounded-xl border-r-6 border-green-500 mb-6">
                       <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4 font-semibold">
                         {slide.content}
                       </p>
                       <div className="text-4xl md:text-5xl font-bold text-green-700 bg-white p-6 rounded-lg mb-4">
                         {slide.numbers}
                       </div>
                       <p className="text-lg md:text-xl text-gray-600 font-medium">
                         {slide.description}
                       </p>
                     </div>

                     <div className="bg-blue-50 p-6 rounded-xl border-r-6 border-blue-500">
                       <h3 className="text-xl font-bold text-blue-700 mb-4">💡 تذكر:</h3>
                       <p className="text-lg md:text-xl text-gray-700 font-medium">
                         الأعداد الطبيعية هي أول نوع من الأعداد التي نتعلمها في الرياضيات
                       </p>
                     </div>
                   </div>
                 )

               case 'natural-numbers-examples':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-5xl md:text-6xl mb-3">{slide.icon}</div>
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500 mb-4">
                       <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
                         {slide.content}
                       </p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                       <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                         <h3 className="text-lg font-bold text-blue-700 mb-2">التمثيل البصري:</h3>
                         <div className="flex items-center justify-center space-x-2 text-2xl mb-2">
                           <span>🍎</span>
                           <span className="font-bold text-blue-600">1</span>
                           <span>🍎</span>
                           <span className="font-bold text-blue-600">2</span>
                           <span>🍎</span>
                           <span className="font-bold text-blue-600">3</span>
                         </div>
                         <p className="text-sm text-gray-600 font-medium">{slide.visual}</p>
                       </div>
                       
                       <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                         <h3 className="text-lg font-bold text-yellow-700 mb-2">مثال عملي:</h3>
                         <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                           {slide.example}
                         </p>
                       </div>
                     </div>

                     {/* Key Points */}
                     <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                       <h3 className="text-lg font-bold text-purple-700 mb-3">النقاط المهمة:</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                         {slide.keyPoints.map((point, index) => (
                           <div key={index} className="bg-white p-2 rounded border border-purple-200">
                             <p className="text-sm font-bold text-purple-700">• {point}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 )

               case 'directed-numbers-intro':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-6xl md:text-7xl mb-4">{slide.icon}</div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-red-50 p-6 rounded-xl border-r-6 border-red-500 mb-6">
                       <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4 font-semibold">
                         {slide.content}
                       </p>
                       <p className="text-lg md:text-xl text-gray-600 font-medium">
                         {slide.description}
                       </p>
                     </div>
                     
                     <div className="bg-blue-50 p-6 rounded-xl border-r-6 border-blue-500 mb-6">
                       <h3 className="text-xl font-bold text-blue-700 mb-4">التمثيل البصري:</h3>
                       <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                         <div className="flex items-center justify-center space-x-6 text-2xl font-bold">
                           <span className="text-red-600">🌡️ −3°</span>
                           <span className="text-gray-400 text-3xl">|</span>
                           <span className="text-green-600">+4° 🌡️</span>
                         </div>
                       </div>
                       <p className="text-base text-gray-600 mt-3 font-medium">{slide.visual}</p>
                     </div>

                     {/* Key Points */}
                     <div className="bg-purple-50 p-6 rounded-xl border-r-6 border-purple-500">
                       <h3 className="text-xl font-bold text-purple-700 mb-4">النقاط المهمة:</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                         {slide.keyPoints.map((point, index) => (
                           <div key={index} className="bg-white p-3 rounded-lg border-2 border-purple-200">
                             <p className="text-base font-bold text-purple-700">• {point}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 )

               case 'directed-numbers-examples':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-5xl md:text-6xl mb-3">{slide.icon}</div>
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500 mb-4">
                       <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
                         {slide.content}
                       </p>
                     </div>
                     
                     <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500 mb-4">
                       <h3 className="text-lg font-bold text-yellow-700 mb-2">مثال عملي:</h3>
                       <p className="text-sm md:text-base text-gray-700 mb-2 font-medium">
                         {slide.example}
                       </p>
                       <div className="bg-green-50 p-2 rounded-lg border border-green-400">
                         <p className="text-sm text-green-700 font-bold">
                           {slide.solution}
                         </p>
                       </div>
                     </div>

                     {/* Applications */}
                     <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                       <h3 className="text-lg font-bold text-blue-700 mb-3">تطبيقات في الحياة:</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                         {slide.applications.map((app, index) => (
                           <div key={index} className="bg-white p-2 rounded border border-blue-200">
                             <p className="text-sm font-bold text-blue-700">• {app}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 )

               case 'number-line-intro':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-6xl md:text-7xl mb-4">{slide.icon}</div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-purple-50 p-6 rounded-xl border-r-6 border-purple-500 mb-6">
                       <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4 font-semibold">
                         {slide.content}
                       </p>
                       <p className="text-lg md:text-xl text-gray-600 font-medium">
                         {slide.description}
                       </p>
                     </div>

                     {/* Interactive Number Line */}
                     <div className="bg-white p-6 rounded-xl border-4 border-gray-300 mb-6 shadow-lg">
                       <div className="relative">
                         <div className="flex items-center justify-center space-x-3 text-xl md:text-2xl font-bold">
                           <span className="text-red-600 bg-red-50 px-3 py-2 rounded-lg">−5</span>
                           <span className="text-red-600 bg-red-50 px-3 py-2 rounded-lg">−4</span>
                           <span className="text-red-600 bg-red-50 px-3 py-2 rounded-lg">−3</span>
                           <span className="text-red-600 bg-red-50 px-3 py-2 rounded-lg">−2</span>
                           <span className="text-red-600 bg-red-50 px-3 py-2 rounded-lg">−1</span>
                           <span className="text-blue-600 text-3xl bg-blue-50 px-4 py-3 rounded-xl font-black">0</span>
                           <span className="text-green-600 bg-green-50 px-3 py-2 rounded-lg">+1</span>
                           <span className="text-green-600 bg-green-50 px-3 py-2 rounded-lg">+2</span>
                           <span className="text-green-600 bg-green-50 px-3 py-2 rounded-lg">+3</span>
                           <span className="text-green-600 bg-green-50 px-3 py-2 rounded-lg">+4</span>
                           <span className="text-green-600 bg-green-50 px-3 py-2 rounded-lg">+5</span>
                         </div>
                         <div className="flex items-center justify-center mt-4 text-base font-semibold">
                           <span className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">← يسار (سالبة)</span>
                           <span className="mx-6 text-gray-600 text-xl">|</span>
                           <span className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">يمين (موجبة) →</span>
                         </div>
                       </div>
                     </div>

                     {/* Key Points */}
                     <div className="bg-purple-50 p-6 rounded-xl border-r-6 border-purple-500">
                       <h3 className="text-xl font-bold text-purple-700 mb-4">النقاط المهمة:</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                         {slide.keyPoints.map((point, index) => (
                           <div key={index} className="bg-white p-3 rounded-lg border-2 border-purple-200">
                             <p className="text-base font-bold text-purple-700">• {point}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 )

               case 'number-line-example':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-5xl md:text-6xl mb-3">{slide.icon}</div>
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500 mb-4">
                       <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
                         {slide.content}
                       </p>
                     </div>

                     <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500 mb-4">
                       <h3 className="text-lg font-bold text-blue-700 mb-2">مثال:</h3>
                       <p className="text-sm md:text-base text-gray-700 mb-2 font-medium">
                         {slide.example}
                       </p>
                       <div className="bg-green-50 p-2 rounded-lg border border-green-400">
                         <p className="text-sm text-green-700 font-bold">
                           الحساب: {slide.calculation}
                         </p>
                       </div>
                     </div>

                     {/* Interactive Number Line */}
                     <div className="bg-white p-4 rounded-lg border-2 border-gray-300 mb-4 shadow-md">
                       <div className="relative">
                         <div className="flex items-center justify-center space-x-2 text-base md:text-lg font-bold">
                           <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−5</span>
                           <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−4</span>
                           <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−3</span>
                           <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−2</span>
                           <span className="text-red-600 bg-red-50 px-2 py-1 rounded">−1</span>
                           <span className="text-blue-600 text-xl bg-blue-50 px-3 py-2 rounded-lg font-black">0</span>
                           <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+1</span>
                           <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+2</span>
                           <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+3</span>
                           <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+4</span>
                           <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+5</span>
                         </div>
                         <div className="flex items-center justify-center mt-2 text-xs md:text-sm font-semibold">
                           <span className="text-red-600 bg-red-100 px-2 py-1 rounded">← يسار (سالبة)</span>
                           <span className="mx-3 text-gray-600">|</span>
                           <span className="text-green-600 bg-green-100 px-2 py-1 rounded">يمين (موجبة) →</span>
                         </div>
                       </div>
                     </div>

                     <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                       <h3 className="text-lg font-bold text-yellow-700 mb-2">التمثيل البصري:</h3>
                       <p className="text-sm text-gray-600 font-medium">
                         {slide.visual}
                       </p>
                     </div>
                   </div>
                 )

               case 'operations-intro':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-6xl md:text-7xl mb-4">{slide.icon}</div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-purple-50 p-6 rounded-xl border-r-6 border-purple-500 mb-6">
                       <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4 font-semibold">
                         {slide.content}
                       </p>
                       <p className="text-lg md:text-xl text-gray-600 font-medium">
                         {slide.description}
                       </p>
                     </div>

                     <div className="bg-blue-50 p-6 rounded-xl border-r-6 border-blue-500 mb-6">
                       <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 الهدف:</h3>
                       <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                         فهم كيفية إجراء العمليات الحسابية على الأعداد الموجهة بطريقة صحيحة
                       </p>
                     </div>

                     <div className="bg-green-50 p-6 rounded-xl border-r-6 border-green-500">
                       <h3 className="text-xl font-bold text-green-700 mb-4">💡 تذكر:</h3>
                       <p className="text-lg md:text-xl text-gray-700 font-medium">
                         كل عملية لها قواعد خاصة تساعدنا في الحصول على النتيجة الصحيحة
                       </p>
                     </div>
                   </div>
                 )

               case 'operations-examples':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-5xl md:text-6xl mb-3">{slide.icon}</div>
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                       {slide.title}
                     </h2>

                     <div className="space-y-3 mb-4">
                       {slide.operations.map((op, index) => (
                         <div key={index} className={`bg-${op.color}-50 p-4 rounded-lg border-r-4 border-${op.color}-500 shadow-md`}>
                           <div className={`text-2xl md:text-3xl font-bold text-${op.color}-700 mb-2`}>
                             {op.problem}
                           </div>
                           <div className={`bg-white p-2 rounded border border-${op.color}-200`}>
                             <p className={`text-sm font-bold text-${op.color}-600`}>
                               💡 {op.explanation}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>

                     <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                       <h3 className="text-lg font-bold text-gray-700 mb-2">التمثيل البصري:</h3>
                       <p className="text-sm text-gray-600 font-medium">
                         {slide.visual}
                       </p>
                     </div>
                   </div>
                 )

               case 'summary':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-5xl md:text-6xl mb-3">{slide.icon}</div>
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500 mb-4">
                       <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
                         {slide.content}
                       </p>
                     </div>

                     <div className="space-y-3 mb-4">
                       {slide.points.map((point, index) => (
                         <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
                           <div className="flex items-start gap-3">
                             <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                               {index + 1}
                             </div>
                             <p className="text-base md:text-lg text-gray-800 font-medium leading-relaxed text-right">
                               {point}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>

                     <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-300">
                       <p className="text-base font-bold text-gray-700">
                         🎯 الآن أنت جاهز لتطبيق ما تعلمته في الاختبارات والألعاب!
                       </p>
                     </div>
                   </div>
                 )

               case 'action':
                 return (
                   <div className="text-center h-full flex flex-col justify-center">
                     <div className="text-5xl md:text-6xl mb-3">{slide.icon}</div>
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                       {slide.title}
                     </h2>
                     
                     <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-r-4 border-purple-500 mb-6">
                       <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
                         {slide.content}
                       </p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {slide.actions.map((action, index) => (
                         <button
                           key={index}
                           onClick={() => action.external ? window.open(action.link, '_blank') : navigate(action.link)}
                           className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-base md:text-lg"
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
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 animate-fadeIn h-[75vh] flex flex-col">
          {/* Slide Content */}
          <div className="flex-grow flex items-center justify-center overflow-hidden">
            {renderSlideContent()}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 flex-shrink-0">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
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
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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
              className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              التالي
              <span className="text-lg">→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Lesson1SlidePresentation
