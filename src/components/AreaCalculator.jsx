import { useState } from 'react'

function AreaCalculator() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [calculationSteps, setCalculationSteps] = useState([])

  const exercises = [
    {
      id: 1,
      type: 'square-perimeter',
      question: 'احسب محيط المربع',
      shape: 'square',
      dimensions: { side: 5 },
      formula: 'المحيط = 4 × طول الضلع',
      calculation: '4 × 5 = 20',
      answer: 20,
      unit: 'سم',
      steps: [
        'نطبق قانون محيط المربع: المحيط = 4 × طول الضلع',
        'المحيط = 4 × 5 = 20 سم'
      ],
      difficulty: 'سهل',
      icon: '📏'
    },
    {
      id: 2,
      type: 'square-area',
      question: 'احسب مساحة المربع',
      shape: 'square',
      dimensions: { side: 6 },
      formula: 'المساحة = الضلع × الضلع',
      calculation: '6 × 6 = 36',
      answer: 36,
      unit: 'سم²',
      steps: [
        'نطبق قانون مساحة المربع: المساحة = الضلع × الضلع',
        'المساحة = 6 × 6 = 36 سم²'
      ],
      difficulty: 'سهل',
      icon: '📐'
    },
    {
      id: 3,
      type: 'rectangle-perimeter',
      question: 'احسب محيط المستطيل',
      shape: 'rectangle',
      dimensions: { length: 8, width: 5 },
      formula: 'المحيط = 2 × (الطول + العرض)',
      calculation: '2 × (8 + 5) = 2 × 13 = 26',
      answer: 26,
      unit: 'سم',
      steps: [
        'نطبق قانون محيط المستطيل: المحيط = 2 × (الطول + العرض)',
        'المحيط = 2 × (8 + 5)',
        'المحيط = 2 × 13 = 26 سم'
      ],
      difficulty: 'سهل',
      icon: '📏'
    },
    {
      id: 4,
      type: 'rectangle-area',
      question: 'احسب مساحة المستطيل',
      shape: 'rectangle',
      dimensions: { length: 12, width: 7 },
      formula: 'المساحة = الطول × العرض',
      calculation: '12 × 7 = 84',
      answer: 84,
      unit: 'سم²',
      steps: [
        'نطبق قانون مساحة المستطيل: المساحة = الطول × العرض',
        'المساحة = 12 × 7 = 84 سم²'
      ],
      difficulty: 'سهل',
      icon: '📐'
    },
    {
      id: 5,
      type: 'triangle-area',
      question: 'احسب مساحة المثلث',
      shape: 'triangle',
      dimensions: { base: 10, height: 8 },
      formula: 'المساحة = (القاعدة × الارتفاع) ÷ 2',
      calculation: '(10 × 8) ÷ 2 = 80 ÷ 2 = 40',
      answer: 40,
      unit: 'سم²',
      steps: [
        'نطبق قانون مساحة المثلث: المساحة = (القاعدة × الارتفاع) ÷ 2',
        'المساحة = (10 × 8) ÷ 2',
        'المساحة = 80 ÷ 2 = 40 سم²'
      ],
      difficulty: 'متوسط',
      icon: '🔺'
    },
    {
      id: 6,
      type: 'triangle-perimeter',
      question: 'احسب محيط المثلث',
      shape: 'triangle',
      dimensions: { side1: 5, side2: 7, side3: 9 },
      formula: 'المحيط = مجموع أطوال الأضلاع الثلاثة',
      calculation: '5 + 7 + 9 = 21',
      answer: 21,
      unit: 'سم',
      steps: [
        'محيط المثلث = الضلع الأول + الضلع الثاني + الضلع الثالث',
        'المحيط = 5 + 7 + 9 = 21 سم'
      ],
      difficulty: 'متوسط',
      icon: '📏'
    },
    {
      id: 7,
      type: 'complex-area',
      question: 'احسب مساحة الشكل المركب',
      shape: 'composite',
      dimensions: { rectLength: 10, rectWidth: 6, squareSide: 4 },
      formula: 'المساحة = مساحة المستطيل + مساحة المربع',
      calculation: '(10 × 6) + (4 × 4) = 60 + 16 = 76',
      answer: 76,
      unit: 'سم²',
      steps: [
        'الشكل مكون من مستطيل + مربع',
        'مساحة المستطيل = 10 × 6 = 60 سم²',
        'مساحة المربع = 4 × 4 = 16 سم²',
        'المساحة الكلية = 60 + 16 = 76 سم²'
      ],
      difficulty: 'صعب',
      icon: '🧩'
    },
    {
      id: 8,
      type: 'word-problem',
      question: 'حديقة مستطيلة طولها 15 متر وعرضها 12 متر. كم مساحتها؟',
      shape: 'rectangle',
      dimensions: { length: 15, width: 12 },
      formula: 'المساحة = الطول × العرض',
      calculation: '15 × 12 = 180',
      answer: 180,
      unit: 'متر²',
      steps: [
        'معطيات المسألة: حديقة مستطيلة',
        'الطول = 15 متر، العرض = 12 متر',
        'المساحة = الطول × العرض = 15 × 12 = 180 متر²'
      ],
      difficulty: 'صعب',
      icon: '🏡'
    }
  ]

  const exercise = exercises[currentExercise]

  const checkAnswer = () => {
    setShowFeedback(true)
    setCalculationSteps(exercise.steps)
  }

  const isAnswerCorrect = () => {
    return parseFloat(userAnswer) === exercise.answer
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

  const renderShape = () => {
    const { shape, dimensions } = exercise
    
    switch (shape) {
      case 'square':
        return (
          <div className="text-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto mb-4">
              <rect 
                x="50" y="50" width="100" height="100" 
                fill="#3B82F6" fillOpacity="0.3" 
                stroke="#1E40AF" strokeWidth="3"
              />
              <text x="100" y="105" textAnchor="middle" className="fill-current text-lg font-bold">
                {dimensions.side} سم
              </text>
            </svg>
            <p className="text-sm text-gray-600">طول الضلع = {dimensions.side} سم</p>
          </div>
        )
      
      case 'rectangle':
        return (
          <div className="text-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto mb-4">
              <rect 
                x="30" y="70" width="140" height="60" 
                fill="#10B981" fillOpacity="0.3" 
                stroke="#059669" strokeWidth="3"
              />
              <text x="100" y="105" textAnchor="middle" className="fill-current text-sm font-bold">
                {dimensions.length} × {dimensions.width}
              </text>
            </svg>
            <p className="text-sm text-gray-600">
              الطول = {dimensions.length} {exercise.unit === 'متر²' ? 'متر' : 'سم'}، 
              العرض = {dimensions.width} {exercise.unit === 'متر²' ? 'متر' : 'سم'}
            </p>
          </div>
        )
      
      case 'triangle':
        return (
          <div className="text-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto mb-4">
              <polygon 
                points="100,50 50,150 150,150" 
                fill="#F59E0B" fillOpacity="0.3" 
                stroke="#D97706" strokeWidth="3"
              />
              {/* Height line */}
              {exercise.dimensions.height && (
                <line x1="100" y1="50" x2="100" y2="150" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" />
              )}
              {exercise.dimensions.base && exercise.dimensions.height ? (
                <>
                  <text x="100" y="170" textAnchor="middle" className="fill-current text-sm font-bold">
                    القاعدة = {exercise.dimensions.base} سم
                  </text>
                  <text x="120" y="100" className="fill-current text-sm font-bold">
                    ع = {exercise.dimensions.height} سم
                  </text>
                </>
              ) : (
                <>
                  <text x="75" y="175" className="fill-current text-xs font-bold">{exercise.dimensions.side1}</text>
                  <text x="125" y="175" className="fill-current text-xs font-bold">{exercise.dimensions.side2}</text>
                  <text x="100" y="40" className="fill-current text-xs font-bold">{exercise.dimensions.side3}</text>
                </>
              )}
            </svg>
            {exercise.dimensions.base && exercise.dimensions.height ? (
              <p className="text-sm text-gray-600">
                القاعدة = {exercise.dimensions.base} سم، الارتفاع = {exercise.dimensions.height} سم
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                الأضلاع: {exercise.dimensions.side1} سم، {exercise.dimensions.side2} سم، {exercise.dimensions.side3} سم
              </p>
            )}
          </div>
        )
      
      case 'composite':
        return (
          <div className="text-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto mb-4">
              {/* Rectangle */}
              <rect 
                x="30" y="80" width="100" height="60" 
                fill="#3B82F6" fillOpacity="0.3" 
                stroke="#1E40AF" strokeWidth="2"
              />
              {/* Square */}
              <rect 
                x="130" y="100" width="40" height="40" 
                fill="#10B981" fillOpacity="0.3" 
                stroke="#059669" strokeWidth="2"
              />
              <text x="80" y="115" textAnchor="middle" className="fill-current text-xs font-bold">
                {exercise.dimensions.rectLength}×{exercise.dimensions.rectWidth}
              </text>
              <text x="150" y="125" textAnchor="middle" className="fill-current text-xs font-bold">
                {exercise.dimensions.squareSide}×{exercise.dimensions.squareSide}
              </text>
            </svg>
            <p className="text-sm text-gray-600">
              مستطيل ({exercise.dimensions.rectLength}×{exercise.dimensions.rectWidth}) + 
              مربع ({exercise.dimensions.squareSide}×{exercise.dimensions.squareSide})
            </p>
          </div>
        )
      
      default:
        return <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto"></div>
    }
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-primary mt-6 sm:mt-8 overflow-hidden">
      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1">
            <span>📏</span>
            <span>حاسبة المساحة والمحيط</span>
            <span>📏</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg">القياسات الهندسية</div>
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

      {/* Shape Visualization */}
      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg">
        {renderShape()}
      </div>

      {/* Formula Display */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6 border-r-4 border-primary">
        <h5 className="font-bold text-blue-800 mb-2">📐 القانون المستخدم:</h5>
        <div className="text-lg font-mono text-blue-700 bg-white p-3 rounded-lg border">
          {exercise.formula}
        </div>
      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="text-center">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            الإجابة:
          </label>
          <div className="flex justify-center items-center gap-2">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 p-3 text-2xl font-bold text-center border-4 border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20"
              placeholder="؟"
              step="0.1"
            />
            <span className="text-xl font-bold text-gray-600">{exercise.unit}</span>
          </div>
        </div>
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
              <p className="text-lg mt-2">
                الناتج = {exercise.answer} {exercise.unit}
              </p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-2">💭</div>
              <p className="text-2xl font-bold">حاول مرة أخرى!</p>
              <p className="text-lg mt-2">
                الإجابة الصحيحة: {exercise.answer} {exercise.unit}
              </p>
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
              <div key={index} className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
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

      {/* Formulas Reference */}
      <div className="mt-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
        <h5 className="font-bold text-gray-800 mb-3">📚 قوانين المساحة والمحيط:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h6 className="font-semibold text-primary mb-2">المحيط:</h6>
            <ul className="space-y-1">
              <li><strong>🟦 المربع:</strong> 4 × طول الضلع</li>
              <li><strong>📄 المستطيل:</strong> 2 × (الطول + العرض)</li>
              <li><strong>🔺 المثلث:</strong> مجموع أطوال الأضلاع</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-primary mb-2">المساحة:</h6>
            <ul className="space-y-1">
              <li><strong>🟦 المربع:</strong> الضلع × الضلع</li>
              <li><strong>📄 المستطيل:</strong> الطول × العرض</li>
              <li><strong>🔺 المثلث:</strong> (القاعدة × الارتفاع) ÷ 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AreaCalculator
