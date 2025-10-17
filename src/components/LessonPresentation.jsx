import { useParams, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import NumberLine from './NumberLine'

function LessonPresentation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentLesson = lessonsData.lessons.find(l => l.id === parseInt(id))
  const currentIndex = lessonsData.lessons.findIndex(l => l.id === parseInt(id))
  const nextLesson = lessonsData.lessons[currentIndex + 1]
  const prevLesson = lessonsData.lessons[currentIndex - 1]

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">❌ الدرس غير موجود</h1>
          <button onClick={() => navigate('/')} className="btn-primary">
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    )
  }

  const getTopicData = (lessonId) => {
    const topics = {
      1: {
        title: "الأعداد الطبيعية والموجهة",
        icon: "🔢",
        historicalContext: "اكتُشفت الأعداد الطبيعية في العصور القديمة للعد والتجارة، بينما ظهرت الأعداد السالبة في القرن السابع الميلادي لدى الرياضيين الهنود والعرب.",
        visualElements: [
          { type: "number-line", content: "خط الأعداد يوضح ترتيب الأعداد من السالب إلى الموجب" },
          { type: "temperature", content: "مقياس الحرارة: +25°C فوق الصفر، -5°C تحت الصفر" },
          { type: "elevation", content: "الارتفاع: جبل +1000م، بحر -50م تحت سطح الأرض" }
        ],
        practicalExamples: [
          {
            title: "🌡️ درجات الحرارة",
            description: "في الشتاء: -3°C (ثلاث درجات تحت الصفر)\nفي الصيف: +35°C (خمس وثلاثون درجة فوق الصفر)"
          },
          {
            title: "💰 الأرباح والخسائر",
            description: "ربح: +150 ريال\nخسارة: -80 ريال\nالرصيد النهائي: +70 ريال"
          },
          {
            title: "🏔️ الارتفاعات",
            description: "جبل إيفرست: +8848 متر\nالبحر الميت: -427 متر تحت سطح البحر"
          }
        ]
      },
      2: {
        title: "العمليات الحسابية",
        icon: "➕➖✖️➗",
        historicalContext: "العمليات الحسابية الأربع كانت معروفة لدى البابليين والمصريين القدماء منذ 4000 عام، وتم تطويرها بشكل كامل في الحضارة العربية الإسلامية.",
        visualElements: [
          { type: "operations", content: "رموز العمليات: + (الجمع)، - (الطرح)، × (الضرب)، ÷ (القسمة)" },
          { type: "order", content: "ترتيب العمليات: الأقواس أولاً، ثم الضرب والقسمة، ثم الجمع والطرح" },
          { type: "calculator", content: "آلة حاسبة تظهر العمليات بالترتيب الصحيح" }
        ],
        practicalExamples: [
          {
            title: "🛒 التسوق",
            description: "اشترى أحمد 3 أقلام بسعر 5 ريالات لكل قلم\nالتكلفة = 3 × 5 = 15 ريال"
          },
          {
            title: "📚 توزيع الكتب",
            description: "لدى المعلم 24 كتاباً يريد توزيعها على 6 طلاب\nلكل طالب = 24 ÷ 6 = 4 كتب"
          },
          {
            title: "🏃‍♂️ التمارين الرياضية",
            description: "أكمل سعد 15 تمريناً، ثم أضاف 8 تمارين أخرى\nالمجموع = 15 + 8 = 23 تمرين"
          }
        ]
      },
      3: {
        title: "الكسور العادية",
        icon: "🍕",
        historicalContext: "استخدم المصريون القدماء الكسور منذ 4000 عام، وطور العرب نظام الكسور العشرية في القرن التاسع الميلادي، مما ساهم في تقدم الرياضيات.",
        visualElements: [
          { type: "pie-chart", content: "دائرة مقسمة إلى أجزاء متساوية تمثل الكسور المختلفة" },
          { type: "fraction-bar", content: "شريط مقسم يوضح البسط والمقام في الكسر" },
          { type: "pizza", content: "بيتزا مقسمة إلى 8 أجزاء متساوية، كل جزء = 1/8" }
        ],
        practicalExamples: [
          {
            title: "🍰 تقسيم الكعكة",
            description: "كعكة مقسمة إلى 8 أجزاء متساوية\nأكل أحمد 3 أجزاء = 3/8\nبقي 5 أجزاء = 5/8"
          },
          {
            title: "📖 قراءة الكتب",
            description: "كتاب من 120 صفحة\nقرأت سارة 1/3 الكتاب = 40 صفحة\nبقي 2/3 الكتاب = 80 صفحة"
          },
          {
            title: "⏰ الوقت",
            description: "ساعة مقسمة إلى 60 دقيقة\nمر 1/4 ساعة = 15 دقيقة\nبقي 3/4 ساعة = 45 دقيقة"
          }
        ]
      },
      4: {
        title: "النسبة والتناسب",
        icon: "⚖️",
        historicalContext: "استخدم المصريون القدماء النسبة والتناسب في بناء الأهرامات، وطور اليونانيون مفهوم النسبة الذهبية، بينما طور العرب المسلمون علم الجبر المتقدم.",
        visualElements: [
          { type: "scale", content: "ميزان يوضح تساوي النسبتين في التناسب" },
          { type: "recipe", content: "وصفة طبخ تظهر النسبة بين المكونات" },
          { type: "map", content: "خريطة تظهر مقياس الرسم والنسبة" }
        ],
        practicalExamples: [
          {
            title: "🍳 الطبخ",
            description: "لصنع كعكة لـ 6 أشخاص نحتاج:\n2 كوب دقيق : 6 أشخاص\nلكن لـ 12 شخص نحتاج: 4 كوب دقيق"
          },
          {
            title: "🚗 السفر",
            description: "السيارة تسير 100 كم في ساعة\nفي 3 ساعات تسير: 100 × 3 = 300 كم"
          },
          {
            title: "🏗️ البناء",
            description: "لبناء جدار طوله 10 متر نحتاج 100 طوبة\nلجدار 5 متر نحتاج: 100 ÷ 2 = 50 طوبة"
          }
        ]
      },
      5: {
        title: "المسافة والزمن والسرعة",
        icon: "🚗",
        historicalContext: "اكتشف العلماء المسلمون في العصور الوسطى قوانين الحركة والسرعة، وطور إسحاق نيوتن قوانين الحركة في القرن السابع عشر.",
        visualElements: [
          { type: "speedometer", content: "عداد السرعة يظهر كم/ساعة" },
          { type: "clock", content: "ساعة تظهر الزمن المنقضي" },
          { type: "road", content: "طريق مستقيم يوضح المسافة" }
        ],
        practicalExamples: [
          {
            title: "🚌 رحلة المدرسة",
            description: "المدرسة على بعد 5 كم من المنزل\nالسيارة تسير بسرعة 50 كم/ساعة\nالزمن = 5 ÷ 50 = 0.1 ساعة = 6 دقائق"
          },
          {
            title: "🏃‍♂️ الجري",
            description: "عداء يجري 100 متر في 10 ثواني\nالسرعة = 100 ÷ 10 = 10 متر/ثانية"
          },
          {
            title: "✈️ الطيران",
            description: "طائرة تحلق 1000 كم في ساعتين\nالسرعة = 1000 ÷ 2 = 500 كم/ساعة"
          }
        ]
      },
      6: {
        title: "الزوايا وأنواعها",
        icon: "📐",
        historicalContext: "درس البابليون والمصريون القدماء الزوايا في بناء المعابد والأهرامات، وطور إقليدس علم الهندسة في القرن الثالث قبل الميلاد.",
        visualElements: [
          { type: "protractor", content: "منقلة لقياس الزوايا بالدرجات" },
          { type: "clock", content: "عقارب الساعة تشكل زوايا مختلفة" },
          { type: "triangle", content: "مثلث يوضح مجموع الزوايا = 180°" }
        ],
        practicalExamples: [
          {
            title: "🏠 بناء المنازل",
            description: "زاوية سقف المنزل = 45° (زاوية حادة)\nزاوية الباب = 90° (زاوية قائمة)\nزاوية الركن = 270° (زاوية منفرجة)"
          },
          {
            title: "🕐 الساعة",
            description: "الساعة 3:00 → زاوية 90°\nالساعة 6:00 → زاوية 180°\nالساعة 12:00 → زاوية 360°"
          },
          {
            title: "🌍 البوصلة",
            description: "الشمال = 0°\nالشرق = 90°\nالجنوب = 180°\nالغرب = 270°"
          }
        ]
      },
      7: {
        title: "الأشكال الهندسية",
        icon: "🔷",
        historicalContext: "استخدم المصريون القدماء الأشكال الهندسية في بناء الأهرامات، وطور الإغريق علم الهندسة الإقليدية، بينما طور العرب المسلمون الهندسة التحليلية.",
        visualElements: [
          { type: "shapes", content: "مجموعة من الأشكال: مثلث، مربع، دائرة، مستطيل" },
          { type: "pattern", content: "نمط متكرر من الأشكال الهندسية" },
          { type: "building", content: "مبنى يوضح استخدام الأشكال في البناء" }
        ],
        practicalExamples: [
          {
            title: "🏠 تصميم المنازل",
            description: "الغرف مستطيلة الشكل\nالنوافذ دائرية أو مربعة\nالسقف مثلثي الشكل"
          },
          {
            title: "🚗 السيارات",
            description: "العجلات دائرية\nالمرايا مستطيلة\nالمصابيح دائرية أو بيضاوية"
          },
          {
            title: "🍕 الطعام",
            description: "البيتزا دائرية\nالساندويتش مثلثي\nالبسكويت مربع أو دائري"
          }
        ]
      },
      8: {
        title: "المحيط والمساحة",
        icon: "📏",
        historicalContext: "اكتشف المصريون القدماء طرق حساب المساحة لضريبة الأراضي، وطور أرخميدس طرق حساب المساحة والمحيط في القرن الثالث قبل الميلاد.",
        visualElements: [
          { type: "ruler", content: "مسطرة لقياس الأطوال والمحيط" },
          { type: "grid", content: "شبكة مربعات لحساب المساحة" },
          { type: "field", content: "حقل زراعي يوضح المحيط والمساحة" }
        ],
        practicalExamples: [
          {
            title: "🏠 غرفة النوم",
            description: "غرفة مستطيلة طولها 4 متر وعرضها 3 متر\nالمحيط = (4 + 3) × 2 = 14 متر\nالمساحة = 4 × 3 = 12 متر مربع"
          },
          {
            title: "🌳 الحديقة",
            description: "حديقة مربعة طول ضلعها 10 متر\nالمحيط = 10 × 4 = 40 متر\nالمساحة = 10 × 10 = 100 متر مربع"
          },
          {
            title: "🏊‍♂️ حمام السباحة",
            description: "حمام مستطيل طوله 25 متر وعرضه 10 متر\nالمحيط = (25 + 10) × 2 = 70 متر\nالمساحة = 25 × 10 = 250 متر مربع"
          }
        ]
      },
      9: {
        title: "الحجم والسعة",
        icon: "🧊",
        historicalContext: "استخدم المصريون القدماء الحجم والسعة في التجارة والبناء، وطور أرخميدس قانون الطفو وحساب حجم الأجسام في القرن الثالث قبل الميلاد.",
        visualElements: [
          { type: "cube", content: "مكعب يوضح الأبعاد الثلاثة: الطول والعرض والارتفاع" },
          { type: "container", content: "وعاء يوضح السعة والسائل" },
          { type: "graduated", content: "أسطوانة مدرجة لقياس الحجم" }
        ],
        practicalExamples: [
          {
            title: "📦 صندوق الهدايا",
            description: "صندوق طوله 20 سم وعرضه 15 سم وارتفاعه 10 سم\nالحجم = 20 × 15 × 10 = 3000 سم مكعب"
          },
          {
            title: "🥤 زجاجة الماء",
            description: "زجاجة سعة 500 مل\nزجاجة سعة 1 لتر = 1000 مل\n2 زجاجة صغيرة = زجاجة كبيرة واحدة"
          },
          {
            title: "🏊‍♂️ حمام السباحة",
            description: "حمام طوله 25 متر وعرضه 10 متر وعمقه 2 متر\nالحجم = 25 × 10 × 2 = 500 متر مكعب"
          }
        ]
      },
      10: {
        title: "المسائل الكلامية",
        icon: "📝",
        historicalContext: "طور العرب المسلمون علم الجبر وحل المسائل الكلامية في القرن التاسع الميلادي، وكان الخوارزمي أول من وضع قواعد حل المسائل الرياضية.",
        visualElements: [
          { type: "problem", content: "مسألة مكتوبة بالكلمات" },
          { type: "equation", content: "معادلة رياضية لحل المسألة" },
          { type: "solution", content: "الحل النهائي مع الخطوات" }
        ],
        practicalExamples: [
          {
            title: "🛒 التسوق",
            description: "اشترى أحمد 3 أقلام بسعر 5 ريالات لكل قلم، و2 دفتر بسعر 8 ريالات لكل دفتر. كم دفع أحمد؟\nالحل: (3 × 5) + (2 × 8) = 15 + 16 = 31 ريال"
          },
          {
            title: "👥 الطلاب",
            description: "في الصف 24 طالباً، منهم 15 طالباً و9 طالبات. كم عدد الطلاب الذكور؟\nالحل: 24 - 9 = 15 طالب"
          },
          {
            title: "⏰ الوقت",
            description: "بدأ أحمد الدراسة الساعة 3:00 مساءً وانتهى الساعة 5:30 مساءً. كم ساعة درس؟\nالحل: 5:30 - 3:00 = ساعتان ونصف"
          }
        ]
      }
    }
    return topics[lessonId] || null
  }

  const topicData = getTopicData(currentLesson.id)

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            🏠 الرئيسية
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-600">
              الدرس {currentIndex + 1} من {lessonsData.lessons.length}
            </span>
          </div>
        </div>

        {/* Main Presentation Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Topic Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
            <div className="text-6xl mb-3">{currentLesson.icon}</div>
            <h1 className="text-3xl font-black mb-2">{currentLesson.title}</h1>
            <p className="text-lg opacity-90">{currentLesson.description}</p>
          </div>

          <div className="p-6">
            
            {/* Historical Context */}
            {topicData?.historicalContext && (
              <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-l-4 border-amber-400">
                <h2 className="text-xl font-bold text-amber-800 mb-2 flex items-center gap-2">
                  📜 <span>لمحة تاريخية</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">{topicData.historicalContext}</p>
              </div>
            )}

            {/* Visual Elements */}
            {topicData?.visualElements && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  👁️ <span>التمثيل البصري</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topicData.visualElements.map((element, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl mb-2">
                        {element.type === 'number-line' && '📏'}
                        {element.type === 'temperature' && '🌡️'}
                        {element.type === 'elevation' && '🏔️'}
                        {element.type === 'operations' && '🔢'}
                        {element.type === 'order' && '📋'}
                        {element.type === 'calculator' && '🧮'}
                        {element.type === 'pie-chart' && '📊'}
                        {element.type === 'fraction-bar' && '📏'}
                        {element.type === 'pizza' && '🍕'}
                        {element.type === 'scale' && '⚖️'}
                        {element.type === 'recipe' && '🍳'}
                        {element.type === 'map' && '🗺️'}
                        {element.type === 'speedometer' && '🚗'}
                        {element.type === 'clock' && '🕐'}
                        {element.type === 'road' && '🛣️'}
                        {element.type === 'protractor' && '📐'}
                        {element.type === 'triangle' && '🔺'}
                        {element.type === 'shapes' && '🔷'}
                        {element.type === 'pattern' && '🎨'}
                        {element.type === 'building' && '🏗️'}
                        {element.type === 'ruler' && '📏'}
                        {element.type === 'grid' && '📋'}
                        {element.type === 'field' && '🌾'}
                        {element.type === 'cube' && '🧊'}
                        {element.type === 'container' && '🥤'}
                        {element.type === 'graduated' && '🧪'}
                        {element.type === 'problem' && '📝'}
                        {element.type === 'equation' && '🧮'}
                        {element.type === 'solution' && '✅'}
                      </div>
                      <p className="text-sm text-gray-700">{element.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation Section */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                📚 <span>الشرح المفصل</span>
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {currentLesson.content.explanation}
              </div>
            </div>

            {/* Practical Examples */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                💡 <span>أمثلة عملية</span>
              </h2>
              <div className="space-y-4">
                {/* Original example */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-l-4 border-yellow-400">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">📖 المثال الأساسي</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentLesson.content.example}
                  </div>
                </div>

                {/* Additional practical examples */}
                {topicData?.practicalExamples?.map((example, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-400">
                    <h3 className="text-lg font-bold text-green-800 mb-2">{example.title}</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {example.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Components */}
            {currentLesson.id === 1 && (
              <div className="mb-6">
                <NumberLine />
              </div>
            )}

            {/* Kahoot Quiz Button */}
            {currentLesson.kahootLink && (
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
                <h2 className="text-xl font-bold text-purple-700 mb-3 text-center flex items-center justify-center gap-2">
                  🎮 <span>اختبار تفاعلي</span> 🎮
                </h2>
                <p className="text-gray-700 mb-4 text-center">
                  العب اختبار كاهوت تفاعلي لاختبار فهمك لهذا الدرس مع أصدقائك! 🎯
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => window.open(currentLesson.kahootLink, '_blank')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
                  >
                    🎮 العب اختبار كاهوت ↗️
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => prevLesson && navigate(`/lesson/${prevLesson.id}`)}
                disabled={!prevLesson}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  prevLesson
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ⬅️ الدرس السابق
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  🏠 الرئيسية
                </button>
                <button
                  onClick={() => navigate(`/quiz/${currentLesson.id}`)}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  🎯 الاختبار
                </button>
              </div>

              <button
                onClick={() => nextLesson && navigate(`/lesson/${nextLesson.id}`)}
                disabled={!nextLesson}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  nextLesson
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                الدرس التالي ➡️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPresentation
