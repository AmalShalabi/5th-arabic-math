import { useState } from 'react'

function RatioVisualizer() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [calculationSteps, setCalculationSteps] = useState([])

  const exercises = [
    {
      id: 1,
      type: 'ratio',
      question: 'في الصف 15 طالب و10 طالبات. ما نسبة الطلاب إلى الطالبات؟',
      scenario: 'classroom',
      data: { boys: 15, girls: 10 },
      correctAnswer: '3:2',
      options: ['3:2', '2:3', '15:10', '1:1'],
      explanation: 'النسبة = 15:10 = 3:2 (بالتبسيط)',
      steps: [
        'نسبة الطلاب إلى الطالبات = 15:10',
        'نبسط النسبة بالقسمة على 5',
        '15 ÷ 5 = 3، 10 ÷ 5 = 2',
        'النسبة المبسطة = 3:2'
      ],
      difficulty: 'سهل',
      icon: '👥'
    },
    {
      id: 2,
      type: 'proportion',
      question: 'إذا كانت 3 تفاحات تكلف 6 ريالات، كم تكلفة 5 تفاحات؟',
      scenario: 'shopping',
      data: { items1: 3, cost1: 6, items2: 5 },
      correctAnswer: '10',
      explanation: 'باستخدام التناسب: 3/6 = 5/س، إذن س = 10 ريالات',
      steps: [
        'نكون التناسب: 3 تفاحات ← 6 ريالات',
        '5 تفاحات ← س ريال',
        'التناسب: 3/6 = 5/س',
        'بالضرب التبادلي: 3 × س = 6 × 5',
        '3س = 30',
        'س = 30 ÷ 3 = 10 ريالات'
      ],
      difficulty: 'متوسط',
      icon: '🍎'
    },
    {
      id: 3,
      type: 'visual-ratio',
      question: 'انظر للصورة. ما نسبة الدوائر الحمراء إلى الزرقاء؟',
      scenario: 'circles',
      data: { red: 6, blue: 4 },
      correctAnswer: '3:2',
      options: ['3:2', '2:3', '6:4', '4:6'],
      explanation: 'النسبة = 6:4 = 3:2 (بالتبسيط)',
      steps: [
        'عدد الدوائر الحمراء = 6',
        'عدد الدوائر الزرقاء = 4',
        'النسبة = 6:4',
        'نبسط بالقسمة على 2: 6÷2 = 3، 4÷2 = 2',
        'النسبة المبسطة = 3:2'
      ],
      difficulty: 'سهل',
      icon: '🔴'
    },
    {
      id: 4,
      type: 'proportion',
      question: 'سيارة تقطع 80 كم في ساعتين. كم تقطع في 5 ساعات؟',
      scenario: 'travel',
      data: { distance1: 80, time1: 2, time2: 5 },
      correctAnswer: '200',
      explanation: 'باستخدام التناسب: 80/2 = س/5، إذن س = 200 كم',
      steps: [
        'نكون التناسب: 80 كم ← ساعتان',
        'س كم ← 5 ساعات',
        'التناسب: 80/2 = س/5',
        'بالضرب التبادلي: 80 × 5 = 2 × س',
        '400 = 2س',
        'س = 400 ÷ 2 = 200 كم'
      ],
      difficulty: 'متوسط',
      icon: '🚗'
    },
    {
      id: 5,
      type: 'recipe',
      question: 'وصفة كعكة تحتاج كوبين دقيق لـ 4 أشخاص. كم كوب للـ 10 أشخاص؟',
      scenario: 'cooking',
      data: { flour1: 2, people1: 4, people2: 10 },
      correctAnswer: '5',
      explanation: 'باستخدام التناسب: 2/4 = س/10، إذن س = 5 أكواب',
      steps: [
        'نكون التناسب: كوبان دقيق ← 4 أشخاص',
        'س كوب ← 10 أشخاص',
        'التناسب: 2/4 = س/10',
        'نبسط: 1/2 = س/10',
        'بالضرب التبادلي: 1 × 10 = 2 × س',
        '10 = 2س',
        'س = 10 ÷ 2 = 5 أكواب'
      ],
      difficulty: 'متوسط',
      icon: '🧁'
    },
    {
      id: 6,
      type: 'check-proportion',
      question: 'هل النسبتان 4/6 و 6/9 متناسبتان؟',
      scenario: 'comparison',
      data: { ratio1: [4, 6], ratio2: [6, 9] },
      correctAnswer: 'نعم',
      options: ['نعم', 'لا'],
      explanation: '4×9 = 36 و 6×6 = 36، إذن النسبتان متناسبتان',
      steps: [
        'للتحقق من التناسب نستخدم الضرب التبادلي',
        '4/6 و 6/9',
        'نحسب: 4 × 9 = 36',
        'نحسب: 6 × 6 = 36',
        'لأن 36 = 36، إذن النسبتان متناسبتان'
      ],
      difficulty: 'صعب',
      icon: '⚖️'
    },
    {
      id: 7,
      type: 'scale',
      question: 'على خريطة، 2 سم تمثل 50 كم. كم تمثل 7 سم؟',
      scenario: 'map',
      data: { mapCm1: 2, realKm1: 50, mapCm2: 7 },
      correctAnswer: '175',
      explanation: 'باستخدام التناسب: 2/50 = 7/س، إذن س = 175 كم',
      steps: [
        'نكون التناسب: 2 سم ← 50 كم',
        '7 سم ← س كم',
        'التناسب: 2/50 = 7/س',
        'بالضرب التبادلي: 2 × س = 50 × 7',
        '2س = 350',
        'س = 350 ÷ 2 = 175 كم'
      ],
      difficulty: 'صعب',
      icon: '🗺️'
    },
    {
      id: 8,
      type: 'mixed-ratio',
      question: 'في حقيبة 12 قلم أحمر و18 قلم أزرق و6 أقلام خضراء. ما نسبة الأقلام الحمراء إلى المجموع؟',
      scenario: 'bag',
      data: { red: 12, blue: 18, green: 6 },
      correctAnswer: '1:3',
      options: ['1:3', '2:6', '12:36', '1:4'],
      explanation: 'المجموع = 36، النسبة = 12:36 = 1:3',
      steps: [
        'الأقلام الحمراء = 12',
        'المجموع الكلي = 12 + 18 + 6 = 36',
        'النسبة = 12:36',
        'نبسط بالقسمة على 12: 12÷12 = 1، 36÷12 = 3',
        'النسبة المبسطة = 1:3'
      ],
      difficulty: 'صعب',
      icon: '✏️'
    }
  ]

  const exercise = exercises[currentExercise]

  const checkAnswer = () => {
    setShowFeedback(true)
    setCalculationSteps(exercise.steps)
  }

  const isAnswerCorrect = () => {
    return userAnswer.trim() === exercise.correctAnswer
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer('')
      setShowFeedback(false)
      setCalculationSteps([])
    }
  }

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setUserAnswer('')
      setShowFeedback(false)
      setCalculationSteps([])
    }
  }

  const resetExercise = () => {
    setUserAnswer('')
    setShowFeedback(false)
    setCalculationSteps([])
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'سهل') return 'bg-green-100 text-green-700 border-green-500'
    if (difficulty === 'متوسط') return 'bg-yellow-100 text-yellow-700 border-yellow-500'
    return 'bg-red-100 text-red-700 border-red-500'
  }

  const renderVisualization = () => {
    const { scenario, data } = exercise

    switch (scenario) {
      case 'classroom':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">الصف الدراسي</h5>
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">👦</div>
                <div className="text-2xl font-bold text-blue-600">{data.boys}</div>
                <div className="text-sm text-gray-600">طلاب</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">👧</div>
                <div className="text-2xl font-bold text-pink-600">{data.girls}</div>
                <div className="text-sm text-gray-600">طالبات</div>
              </div>
            </div>
          </div>
        )

      case 'shopping':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">متجر الفواكه</h5>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🍎</div>
                <div className="text-lg">×{data.items1}</div>
                <div className="text-sm text-gray-600">{data.cost1} ريال</div>
              </div>
              <div className="text-2xl">➡️</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🍎</div>
                <div className="text-lg">×{data.items2}</div>
                <div className="text-sm text-gray-600">؟ ريال</div>
              </div>
            </div>
          </div>
        )

      case 'circles':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">الدوائر الملونة</h5>
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              {/* Red circles */}
              {Array.from({ length: data.red }).map((_, index) => (
                <div key={`red-${index}`} className="w-8 h-8 bg-red-500 rounded-full"></div>
              ))}
              {/* Blue circles */}
              {Array.from({ length: data.blue }).map((_, index) => (
                <div key={`blue-${index}`} className="w-8 h-8 bg-blue-500 rounded-full"></div>
              ))}
            </div>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-1"></div>
                <div className="text-sm">حمراء: {data.red}</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto mb-1"></div>
                <div className="text-sm">زرقاء: {data.blue}</div>
              </div>
            </div>
          </div>
        )

      case 'travel':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">رحلة بالسيارة</h5>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🚗</div>
                <div className="text-lg">{data.distance1} كم</div>
                <div className="text-sm text-gray-600">{data.time1} ساعة</div>
              </div>
              <div className="text-2xl">➡️</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🚗</div>
                <div className="text-lg">؟ كم</div>
                <div className="text-sm text-gray-600">{data.time2} ساعات</div>
              </div>
            </div>
          </div>
        )

      case 'cooking':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">وصفة الكعكة</h5>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🥣</div>
                <div className="text-lg">{data.flour1} كوب دقيق</div>
                <div className="text-sm text-gray-600">{data.people1} أشخاص</div>
              </div>
              <div className="text-2xl">➡️</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🥣</div>
                <div className="text-lg">؟ كوب دقيق</div>
                <div className="text-sm text-gray-600">{data.people2} أشخاص</div>
              </div>
            </div>
          </div>
        )

      case 'comparison':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">مقارنة النسب</h5>
            <div className="flex justify-center items-center gap-8 mb-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {data.ratio1[0]}/{data.ratio1[1]}
                </div>
              </div>
              <div className="text-2xl">⚖️</div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {data.ratio2[0]}/{data.ratio2[1]}
                </div>
              </div>
            </div>
          </div>
        )

      case 'map':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">قراءة الخريطة</h5>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🗺️</div>
                <div className="text-lg">{data.mapCm1} سم</div>
                <div className="text-sm text-gray-600">{data.realKm1} كم</div>
              </div>
              <div className="text-2xl">➡️</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🗺️</div>
                <div className="text-lg">{data.mapCm2} سم</div>
                <div className="text-sm text-gray-600">؟ كم</div>
              </div>
            </div>
          </div>
        )

      case 'bag':
        return (
          <div className="text-center">
            <h5 className="font-bold text-gray-700 mb-4">حقيبة الأقلام</h5>
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🔴</div>
                <div className="text-lg font-bold text-red-600">{data.red}</div>
                <div className="text-sm text-gray-600">أحمر</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔵</div>
                <div className="text-lg font-bold text-blue-600">{data.blue}</div>
                <div className="text-sm text-gray-600">أزرق</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🟢</div>
                <div className="text-lg font-bold text-green-600">{data.green}</div>
                <div className="text-sm text-gray-600">أخضر</div>
              </div>
            </div>
          </div>
        )

      default:
        return <div className="text-center text-gray-500">مخطط تصوري</div>
    }
  }

  return (
    <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-3 sm:p-4 md:p-6 rounded-xl border-2 border-primary mt-4 sm:mt-6 overflow-hidden">
      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1">
            <span>⚖️</span>
            <span>مستكشف النسبة والتناسب</span>
            <span>⚖️</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg">المقارنات والتناسب</div>
        </div>
      </h3>

      {/* Exercise Header */}
      <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2">
          <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 ${getDifficultyColor(exercise.difficulty)} font-bold text-xs sm:text-sm`}>
            {exercise.difficulty}
          </div>
          <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
            تمرين {currentExercise + 1} من {exercises.length}
          </div>
        </div>

        <h4 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 text-center mb-4 px-2 leading-tight">
          {exercise.icon} {exercise.question}
        </h4>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg">
        {renderVisualization()}
      </div>

      {/* Answer Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        {exercise.options ? (
          /* Multiple Choice */
          <div>
            <h5 className="text-lg font-bold text-gray-700 mb-4 text-center">اختر الإجابة الصحيحة:</h5>
            <div className="grid grid-cols-2 gap-3">
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option)}
                  className={`p-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    userAnswer === option
                      ? 'bg-primary text-white border-4 border-blue-600'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Input Field */
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              الإجابة:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-40 p-3 text-2xl font-bold text-center border-4 border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20"
              placeholder="مثال: 3:2 أو 10"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={checkAnswer}
          disabled={!userAnswer}
          className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
            !userAnswer 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-blue-600'
          }`}
        >
          ✅ تحقق من الإجابة
        </button>

        <button
          onClick={resetExercise}
          className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🔄 إعادة المحاولة
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-6 rounded-xl mb-6 text-center animate-fadeIn ${
          isAnswerCorrect()
            ? 'bg-green-100 text-green-700 border-4 border-green-500'
            : 'bg-red-100 text-red-700 border-4 border-red-500'
        }`}>
          {isAnswerCorrect() ? (
            <div>
              <div className="text-6xl mb-2">🎉</div>
              <p className="text-2xl font-bold">ممتاز! إجابة صحيحة! ✨</p>
              <p className="text-lg mt-2">{exercise.explanation}</p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-2">💭</div>
              <p className="text-2xl font-bold">حاول مرة أخرى!</p>
              <p className="text-lg mt-2">الإجابة الصحيحة: {exercise.correctAnswer}</p>
              <p className="text-base mt-2 text-gray-600">{exercise.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Solution Steps */}
      {calculationSteps.length > 0 && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h4 className="text-xl font-bold text-primary mb-4 text-center">
            📝 خطوات الحل
          </h4>
          <div className="space-y-3">
            {calculationSteps.map((step, index) => (
              <div key={index} className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="text-lg text-gray-700 leading-relaxed flex-1">
                    {step}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 space-y-4">
        {/* Progress Info */}
        <div className="text-center">
          <div className="text-base sm:text-lg font-bold text-gray-700 mb-3">
            التمرين {currentExercise + 1} من {exercises.length}
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
            ></div>
          </div>
          {/* Progress Dots */}
          <div className="flex gap-2 justify-center flex-wrap">
            {exercises.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                  index === currentExercise ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            onClick={previousExercise}
            disabled={currentExercise === 0}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
              currentExercise === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-secondary to-yellow-400 text-gray-800 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95'
            }`}
          >
            <span className="text-xl">➡️</span>
            <span>السابق</span>
          </button>

          <button
            onClick={nextExercise}
            disabled={currentExercise === exercises.length - 1}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
              currentExercise === exercises.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-secondary to-yellow-400 text-gray-800 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95'
            }`}
          >
            <span>التالي</span>
            <span className="text-xl">⬅️</span>
          </button>
        </div>
      </div>

      {/* Reference Guide */}
      <div className="mt-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
        <h5 className="font-bold text-gray-800 mb-3">📚 دليل النسبة والتناسب:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h6 className="font-semibold text-primary mb-2">النسبة:</h6>
            <ul className="space-y-1">
              <li><strong>التعريف:</strong> مقارنة بين كميتين</li>
              <li><strong>الرمز:</strong> أ : ب أو أ/ب</li>
              <li><strong>التبسيط:</strong> القسمة على العامل المشترك</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-primary mb-2">التناسب:</h6>
            <ul className="space-y-1">
              <li><strong>التعريف:</strong> تساوي نسبتين</li>
              <li><strong>الضرب التبادلي:</strong> أ/ب = ج/د ⟵ أ×د = ب×ج</li>
              <li><strong>الاستخدام:</strong> حل المسائل العملية</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatioVisualizer
