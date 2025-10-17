import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function InteractivePresentation() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "التمثيل البصري",
      icon: "👁️",
      subtitle: "Visual Representation",
      content: {
        explanation: "التمثيل البصري هو استخدام الصور والأشكال والألوان لشرح المفاهيم الرياضية بطريقة واضحة ومفهومة. يساعد التمثيل البصري الطلاب على فهم المفاهيم المجردة من خلال ربطها بأشياء ملموسة.",
        keyPoints: [
          "استخدام الصور والأشكال لشرح المفاهيم",
          "ربط المفاهيم المجردة بأشياء ملموسة",
          "تحسين الفهم والاستيعاب",
          "تسهيل الحفظ والتذكر"
        ],
        examples: [
          {
            title: "🍎 العد بالأشياء",
            description: "لعد التفاحات: نستخدم أشياء حقيقية أو صور لتمثيل العدد",
            visual: "🍎🍎🍎 = 3 تفاحات"
          },
          {
            title: "📊 الرسوم البيانية",
            description: "لتمثيل البيانات: نستخدم الأعمدة والدوائر لشرح الإحصائيات",
            visual: "📊📈📉 = تمثيل مرئي للبيانات"
          },
          {
            title: "🔢 خط الأعداد",
            description: "لتمثيل الأعداد: نستخدم خط مستقيم لترتيب الأعداد",
            visual: "0 ←→ 1 ←→ 2 ←→ 3 ←→ 4"
          }
        ],
        practiceQuestions: {
          easy: [
            "كيف يمكن تمثيل العدد 5 بصرياً؟",
            "ما فائدة استخدام الصور في الرياضيات؟"
          ],
          medium: [
            "اشرح كيف يساعد التمثيل البصري في فهم الكسور",
            "متى نستخدم الرسوم البيانية في الرياضيات؟"
          ],
          hard: [
            "صمم تمثيلاً بصرياً لشرح مفهوم النسبة",
            "كيف يمكن استخدام التمثيل البصري لحل المسائل المعقدة؟"
          ]
        }
      }
    },
    {
      id: 2,
      title: "رموز العمليات",
      icon: "🔢",
      subtitle: "Operation Symbols",
      content: {
        explanation: "رموز العمليات هي العلامات التي نستخدمها في الرياضيات لتمثيل العمليات الحسابية المختلفة. كل رمز له معنى محدد ويخبرنا بالعملية التي يجب تنفيذها.",
        keyPoints: [
          "+ الجمع: إضافة أعداد معاً",
          "- الطرح: إزالة عدد من آخر",
          "× الضرب: تكرار الجمع",
          "÷ القسمة: تقسيم عدد على آخر"
        ],
        examples: [
          {
            title: "➕ الجمع (+)",
            description: "نستخدم علامة الجمع لإضافة أعداد معاً",
            visual: "3 + 2 = 5",
            realLife: "🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎"
          },
          {
            title: "➖ الطرح (-)",
            description: "نستخدم علامة الطرح لإزالة عدد من آخر",
            visual: "7 - 3 = 4",
            realLife: "🍪🍪🍪🍪🍪🍪🍪 - 🍪🍪🍪 = 🍪🍪🍪🍪"
          },
          {
            title: "✖️ الضرب (×)",
            description: "نستخدم علامة الضرب لتكرار الجمع",
            visual: "4 × 3 = 12",
            realLife: "4 مجموعات من 3 أقلام = 12 قلم"
          },
          {
            title: "➗ القسمة (÷)",
            description: "نستخدم علامة القسمة لتقسيم عدد على آخر",
            visual: "12 ÷ 3 = 4",
            realLife: "12 قطعة حلوى ÷ 3 أصدقاء = 4 قطع لكل صديق"
          }
        ],
        practiceQuestions: {
          easy: [
            "ما الرمز المستخدم للجمع؟",
            "ما الرمز المستخدم للطرح؟",
            "اكتب العملية: 5 + 3"
          ],
          medium: [
            "اشرح الفرق بين رمز الضرب ورمز القسمة",
            "إذا كان لديك 8 تفاحات وأكلت 3، فما العملية المناسبة؟",
            "حل: 6 × 4 = ؟"
          ],
          hard: [
            "إذا كان لديك 24 قطعة حلوى وتريد توزيعها على 6 أصدقاء، فما العملية المناسبة؟",
            "اشرح متى نستخدم كل رمز من رموز العمليات مع أمثلة من الحياة اليومية",
            "حل: (8 + 4) ÷ 3 = ؟"
          ]
        }
      }
    },
    {
      id: 3,
      title: "ترتيب العمليات",
      icon: "📋",
      subtitle: "Order of Operations",
      content: {
        explanation: "ترتيب العمليات هو القاعدة التي تحدد أي عملية نحسبها أولاً عندما يكون لدينا أكثر من عملية في مسألة واحدة. هذا الترتيب مهم جداً للحصول على الإجابة الصحيحة.",
        keyPoints: [
          "1️⃣ الأقواس أولاً: ()",
          "2️⃣ الضرب والقسمة: × ÷ (من اليسار إلى اليمين)",
          "3️⃣ الجمع والطرح: + - (من اليسار إلى اليمين)",
          "تذكر: 'أقواس، ضرب قسمة، جمع طرح'"
        ],
        examples: [
          {
            title: "🔢 مثال 1: الأقواس أولاً",
            description: "نحسب ما داخل الأقواس أولاً",
            problem: "(5 + 3) × 2",
            steps: [
              "الخطوة 1: (5 + 3) = 8",
              "الخطوة 2: 8 × 2 = 16"
            ],
            answer: "الإجابة: 16"
          },
          {
            title: "🔢 مثال 2: الضرب قبل الجمع",
            description: "الضرب والقسمة قبل الجمع والطرح",
            problem: "4 + 3 × 2",
            steps: [
              "الخطوة 1: 3 × 2 = 6",
              "الخطوة 2: 4 + 6 = 10"
            ],
            answer: "الإجابة: 10"
          },
          {
            title: "🔢 مثال 3: من اليسار إلى اليمين",
            description: "عندما تكون العمليات من نفس المستوى",
            problem: "12 ÷ 3 × 2",
            steps: [
              "الخطوة 1: 12 ÷ 3 = 4",
              "الخطوة 2: 4 × 2 = 8"
            ],
            answer: "الإجابة: 8"
          }
        ],
        practiceQuestions: {
          easy: [
            "ما العملية التي نحسبها أولاً في: (6 + 2) × 3؟",
            "احسب: 5 + 2 × 3",
            "احسب: (4 + 1) × 2"
          ],
          medium: [
            "احسب: 8 ÷ 2 + 3 × 2",
            "احسب: (10 - 4) ÷ 2 + 1",
            "احسب: 6 × 2 - 8 ÷ 4"
          ],
          hard: [
            "احسب: (5 + 3) × (8 - 4) ÷ 2",
            "احسب: 12 ÷ 3 × 2 + 4 - 1",
            "إذا كان لديك 20 ريالاً واشتريت 3 أقلام بسعر 4 ريالات لكل قلم، فكم يبقى معك؟"
          ]
        }
      }
    },
    {
      id: 4,
      title: "آلة حاسبة العمليات",
      icon: "🧮",
      subtitle: "Calculator Operations",
      content: {
        explanation: "آلة الحاسبة تساعدنا في التأكد من صحة حساباتنا وفهم كيفية تنفيذ العمليات بالترتيب الصحيح. من المهم أن نفهم كيف تعمل الآلة الحاسبة لنحصل على النتائج الصحيحة.",
        keyPoints: [
          "آلة الحاسبة تحترم ترتيب العمليات",
          "الأقواس لها الأولوية الأولى",
          "الضرب والقسمة قبل الجمع والطرح",
          "من اليسار إلى اليمين للعمليات من نفس المستوى"
        ],
        examples: [
          {
            title: "🧮 مثال 1: عملية بسيطة",
            description: "آلة حاسبة تحسب: 5 + 3 × 2",
            calculatorDisplay: [
              "5 + 3 × 2 =",
              "5 + 6 =",
              "11"
            ],
            explanation: "الآلة تحسب 3 × 2 أولاً، ثم تضيف 5"
          },
          {
            title: "🧮 مثال 2: مع الأقواس",
            description: "آلة حاسبة تحسب: (5 + 3) × 2",
            calculatorDisplay: [
              "(5 + 3) × 2 =",
              "8 × 2 =",
              "16"
            ],
            explanation: "الآلة تحسب (5 + 3) أولاً، ثم تضرب النتيجة في 2"
          },
          {
            title: "🧮 مثال 3: عملية معقدة",
            description: "آلة حاسبة تحسب: 12 ÷ 3 + 2 × 4",
            calculatorDisplay: [
              "12 ÷ 3 + 2 × 4 =",
              "4 + 8 =",
              "12"
            ],
            explanation: "الآلة تحسب القسمة والضرب أولاً، ثم الجمع"
          }
        ],
        practiceQuestions: {
          easy: [
            "ما النتيجة التي تظهرها الآلة الحاسبة عند كتابة: 6 + 2 × 3؟",
            "ما النتيجة التي تظهرها الآلة الحاسبة عند كتابة: (4 + 2) × 3؟",
            "اكتب العملية: 8 ÷ 2 + 1"
          ],
          medium: [
            "قارن بين: 5 + 3 × 2 و (5 + 3) × 2 في الآلة الحاسبة",
            "ما النتيجة الصحيحة لـ: 15 ÷ 3 × 2؟",
            "استخدم الآلة الحاسبة لحساب: (8 - 2) × (3 + 1)"
          ],
          hard: [
            "اشرح لماذا تعطي الآلة الحاسبة نتائج مختلفة لـ: 10 + 5 × 2 و (10 + 5) × 2",
            "حسّن العملية التالية باستخدام الآلة الحاسبة: 24 ÷ 6 × 3 + 2 × 5",
            "إذا كانت الآلة الحاسبة تعطي نتيجة 20 لـ: (4 + 6) × 2، فهل هذا صحيح؟ اشرح"
          ]
        }
      }
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

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            🏠 الرئيسية
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-800">عرض تفاعلي</h1>
            <p className="text-sm text-gray-600">Interactive Presentation</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/complete-guide')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
            >
              📖 الدليل الشامل
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <span className="text-sm font-bold text-gray-600">
              الشريحة {currentSlide + 1} من {slides.length}
            </span>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Slide */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Slide Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
            <div className="text-6xl mb-3">{currentSlideData.icon}</div>
            <h2 className="text-3xl font-black mb-2">{currentSlideData.title}</h2>
            <p className="text-lg opacity-90">{currentSlideData.subtitle}</p>
          </div>

          <div className="p-6">
            
            {/* Explanation Section */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                📚 <span>الشرح</span>
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentSlideData.content.explanation}
              </p>
              
              {/* Key Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSlideData.content.keyPoints.map((point, index) => (
                  <div key={index} className="bg-white/70 p-3 rounded-lg border border-blue-200">
                    <p className="text-gray-700 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                💡 <span>أمثلة وتطبيقات</span>
              </h3>
              <div className="space-y-4">
                {currentSlideData.content.examples.map((example, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-400">
                    <h4 className="text-lg font-bold text-green-800 mb-2">{example.title}</h4>
                    <p className="text-gray-700 mb-3">{example.description}</p>
                    
                    {example.visual && (
                      <div className="bg-white/70 p-3 rounded-lg border border-green-200 mb-3">
                        <p className="text-center text-2xl font-bold text-green-700">{example.visual}</p>
                      </div>
                    )}
                    
                    {example.calculatorDisplay && (
                      <div className="bg-white/70 p-3 rounded-lg border border-green-200 mb-3">
                        <div className="font-mono text-sm space-y-1">
                          {example.calculatorDisplay.map((line, lineIndex) => (
                            <div key={lineIndex} className="text-gray-700">{line}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {example.steps && (
                      <div className="space-y-2">
                        {example.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="bg-white/70 p-2 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {example.answer && (
                      <div className="mt-3 bg-green-100 p-2 rounded-lg border border-green-300">
                        <p className="text-green-800 font-bold text-sm">{example.answer}</p>
                      </div>
                    )}
                    
                    {example.realLife && (
                      <div className="mt-3 bg-yellow-100 p-2 rounded-lg border border-yellow-300">
                        <p className="text-yellow-800 text-sm font-semibold">من الحياة: {example.realLife}</p>
                      </div>
                    )}
                    
                    {example.explanation && (
                      <div className="mt-3 bg-blue-100 p-2 rounded-lg border border-blue-300">
                        <p className="text-blue-800 text-sm">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Questions Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                🎯 <span>أسئلة التدريب</span>
              </h3>
              
              {/* Easy Questions */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-green-600 mb-2 flex items-center gap-2">
                  🟢 <span>سهل</span>
                </h4>
                <div className="space-y-2">
                  {currentSlideData.content.practiceQuestions.easy.map((question, index) => (
                    <div key={index} className="bg-white/70 p-3 rounded-lg border border-green-200">
                      <p className="text-gray-700 text-sm">{question}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium Questions */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-yellow-600 mb-2 flex items-center gap-2">
                  🟡 <span>متوسط</span>
                </h4>
                <div className="space-y-2">
                  {currentSlideData.content.practiceQuestions.medium.map((question, index) => (
                    <div key={index} className="bg-white/70 p-3 rounded-lg border border-yellow-200">
                      <p className="text-gray-700 text-sm">{question}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hard Questions */}
              <div>
                <h4 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                  🔴 <span>صعب</span>
                </h4>
                <div className="space-y-2">
                  {currentSlideData.content.practiceQuestions.hard.map((question, index) => (
                    <div key={index} className="bg-white/70 p-3 rounded-lg border border-red-200">
                      <p className="text-gray-700 text-sm">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentSlide === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
            }`}
          >
            ⬅️ الشريحة السابقة
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🏠 الرئيسية
            </button>
            <button
              onClick={() => navigate('/quiz/1')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🎯 الاختبار
            </button>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentSlide === slides.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
            }`}
          >
            الشريحة التالية ➡️
          </button>
        </div>

        {/* Slide Progress */}
        <div className="mt-4">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-600">تقدم العرض</span>
              <span className="text-sm font-bold text-gray-600">
                {Math.round(((currentSlide + 1) / slides.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractivePresentation
