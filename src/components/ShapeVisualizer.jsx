import { useState } from 'react'

function ShapeVisualizer() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)

  const exercises = [
    {
      id: 1,
      type: 'identification',
      question: 'ما اسم هذا الشكل؟',
      shape: 'square',
      correctAnswer: 'مربع',
      options: ['مربع', 'مستطيل', 'معين', 'مثلث'],
      properties: [
        '4 أضلاع متساوية',
        '4 زوايا قائمة (90°)',
        'الأضلاع المتقابلة متوازية',
        'الأقطار متساوية ومتعامدة'
      ],
      difficulty: 'سهل',
      icon: '🟦'
    },
    {
      id: 2,
      type: 'identification',
      question: 'ما اسم هذا الشكل؟',
      shape: 'rectangle',
      correctAnswer: 'مستطيل',
      options: ['مربع', 'مستطيل', 'معين', 'شبه منحرف'],
      properties: [
        '4 أضلاع (كل ضلعين متقابلين متساويين)',
        '4 زوايا قائمة (90°)',
        'الأضلاع المتقابلة متوازية',
        'الأقطار متساوية'
      ],
      difficulty: 'سهل',
      icon: '📄'
    },
    {
      id: 3,
      type: 'identification',
      question: 'ما اسم هذا الشكل؟',
      shape: 'triangle',
      correctAnswer: 'مثلث',
      options: ['مربع', 'مثلث', 'دائرة', 'خماسي'],
      properties: [
        '3 أضلاع',
        '3 زوايا',
        'مجموع الزوايا = 180°',
        'له 3 أنواع رئيسية'
      ],
      difficulty: 'سهل',
      icon: '🔺'
    },
    {
      id: 4,
      type: 'identification',
      question: 'ما اسم هذا الشكل؟',
      shape: 'rhombus',
      correctAnswer: 'معين',
      options: ['مربع', 'مستطيل', 'معين', 'مثلث'],
      properties: [
        '4 أضلاع متساوية',
        'الزوايا المتقابلة متساوية',
        'الأضلاع المتقابلة متوازية',
        'الأقطار متعامدة (ليست متساوية)'
      ],
      difficulty: 'متوسط',
      icon: '🔸'
    },
    {
      id: 5,
      type: 'identification',
      question: 'ما اسم هذا الشكل؟',
      shape: 'trapezoid',
      correctAnswer: 'شبه منحرف',
      options: ['مربع', 'مستطيل', 'شبه منحرف', 'معين'],
      properties: [
        '4 أضلاع',
        'ضلعان متوازيان فقط',
        'الضلعان المتوازيان يُسميان القاعدتين',
        'الضلعان الآخران يُسميان الساقين'
      ],
      difficulty: 'متوسط',
      icon: '🪁'
    },
    {
      id: 6,
      type: 'properties',
      question: 'كم عدد الزوايا القائمة في المربع؟',
      shape: 'square',
      correctAnswer: '4',
      explanation: 'المربع له 4 زوايا جميعها قائمة (90°)',
      difficulty: 'سهل',
      icon: '🟦'
    },
    {
      id: 7,
      type: 'properties',
      question: 'كم يبلغ مجموع زوايا المثلث؟',
      shape: 'triangle',
      correctAnswer: '180',
      explanation: 'مجموع زوايا أي مثلث دائماً يساوي 180°',
      difficulty: 'متوسط',
      icon: '🔺'
    },
    {
      id: 8,
      type: 'comparison',
      question: 'ما الفرق بين المربع والمعين؟',
      shape: 'comparison',
      correctAnswer: 'الزوايا',
      options: ['الأضلاع', 'الزوايا', 'الأقطار', 'المساحة'],
      explanation: 'كلاهما له 4 أضلاع متساوية، لكن المربع زواياه قائمة والمعين زواياه ليست قائمة',
      difficulty: 'صعب',
      icon: '🤔'
    }
  ]

  const exercise = exercises[currentExercise]

  const checkAnswer = () => {
    setShowFeedback(true)
  }

  const isAnswerCorrect = () => {
    if (exercise.type === 'identification' || exercise.type === 'comparison') {
      return userAnswer === exercise.correctAnswer
    } else {
      return parseInt(userAnswer) === parseInt(exercise.correctAnswer)
    }
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer('')
      setShowFeedback(false)
    }
  }

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setUserAnswer('')
      setShowFeedback(false)
    }
  }

  const resetExercise = () => {
    setUserAnswer('')
    setShowFeedback(false)
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'سهل') return 'bg-green-100 text-green-700 border-green-500'
    if (difficulty === 'متوسط') return 'bg-yellow-100 text-yellow-700 border-yellow-500'
    return 'bg-red-100 text-red-700 border-red-500'
  }

  const renderShape = (shapeType) => {
    const baseProps = {
      className: "transition-all duration-300 hover:scale-105",
      fill: "#3B82F6",
      fillOpacity: "0.7",
      stroke: "#1E40AF",
      strokeWidth: "3"
    }

    switch (shapeType) {
      case 'square':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs mx-auto">
            <rect x="50" y="50" width="100" height="100" {...baseProps} />
            {/* Corner markers for right angles */}
            {[
              { x: 50, y: 50 },
              { x: 150, y: 50 },
              { x: 150, y: 150 },
              { x: 50, y: 150 }
            ].map((corner, index) => (
              <rect 
                key={index}
                x={corner.x + (index === 1 || index === 2 ? -10 : 0)} 
                y={corner.y + (index >= 2 ? -10 : 0)} 
                width="10" 
                height="10" 
                fill="none" 
                stroke="#1E40AF" 
                strokeWidth="2"
              />
            ))}
          </svg>
        )
      
      case 'rectangle':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs mx-auto">
            <rect x="30" y="70" width="140" height="60" {...baseProps} />
            {/* Corner markers for right angles */}
            {[
              { x: 30, y: 70 },
              { x: 170, y: 70 },
              { x: 170, y: 130 },
              { x: 30, y: 130 }
            ].map((corner, index) => (
              <rect 
                key={index}
                x={corner.x + (index === 1 || index === 2 ? -8 : 0)} 
                y={corner.y + (index >= 2 ? -8 : 0)} 
                width="8" 
                height="8" 
                fill="none" 
                stroke="#1E40AF" 
                strokeWidth="2"
              />
            ))}
          </svg>
        )
      
      case 'triangle':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs mx-auto">
            <polygon points="100,50 50,150 150,150" {...baseProps} />
          </svg>
        )
      
      case 'rhombus':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs mx-auto">
            <polygon points="100,40 160,100 100,160 40,100" {...baseProps} />
            {/* Diagonals */}
            <line x1="100" y1="40" x2="100" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="40" y1="100" x2="160" y2="100" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        )
      
      case 'trapezoid':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs mx-auto">
            <polygon points="70,50 130,50 150,150 50,150" {...baseProps} />
            {/* Parallel lines indicator */}
            <line x1="70" y1="45" x2="130" y2="45" stroke="#10B981" strokeWidth="3" />
            <line x1="50" y1="155" x2="150" y2="155" stroke="#10B981" strokeWidth="3" />
          </svg>
        )
      
      case 'comparison':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-lg mx-auto">
            {/* Square */}
            <g>
              <rect x="50" y="50" width="100" height="100" fill="#3B82F6" fillOpacity="0.7" stroke="#1E40AF" strokeWidth="2" />
              <text x="100" y="170" textAnchor="middle" className="fill-current text-sm font-bold">مربع</text>
            </g>
            {/* Rhombus */}
            <g>
              <polygon points="300,40 360,100 300,160 240,100" fill="#F59E0B" fillOpacity="0.7" stroke="#D97706" strokeWidth="2" />
              <text x="300" y="180" textAnchor="middle" className="fill-current text-sm font-bold">معين</text>
            </g>
          </svg>
        )
      
      default:
        return <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto"></div>
    }
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-primary mt-6 sm:mt-8 overflow-hidden">
      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1">
            <span>🔷</span>
            <span>مستكشف الأشكال</span>
            <span>🔷</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg">الأشكال الهندسية</div>
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
        <div className="flex justify-center items-center mb-4">
          <div className="w-full max-w-md">
            {renderShape(exercise.shape)}
          </div>
        </div>
      </div>

      {/* Properties Display (for identification exercises) */}
      {exercise.properties && !showFeedback && (
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-r-4 border-primary">
          <h5 className="font-bold text-gray-800 mb-2">🔍 خصائص هذا الشكل:</h5>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {exercise.properties.map((property, index) => (
              <li key={index}>{property}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Answer Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        {(exercise.type === 'identification' || exercise.type === 'comparison') ? (
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
          /* Input Field for Properties */
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              الإجابة:
            </label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 p-3 text-2xl font-bold text-center border-4 border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20"
              placeholder="؟"
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
              {exercise.explanation && (
                <p className="text-lg mt-2">{exercise.explanation}</p>
              )}
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-2">💭</div>
              <p className="text-2xl font-bold">حاول مرة أخرى!</p>
              <p className="text-lg mt-2">الإجابة الصحيحة: {exercise.correctAnswer}</p>
              {exercise.explanation && (
                <p className="text-base mt-2 text-gray-600">{exercise.explanation}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Shape Properties (shown after feedback) */}
      {showFeedback && exercise.properties && (
        <div className="bg-green-50 rounded-xl p-4 mb-6 border-r-4 border-green-500">
          <h5 className="font-bold text-green-800 mb-2">✅ خصائص {exercise.correctAnswer}:</h5>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            {exercise.properties.map((property, index) => (
              <li key={index}>{property}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={previousExercise}
          disabled={currentExercise === 0}
          className={`py-2 px-6 rounded-lg font-bold transition-all ${
            currentExercise === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-secondary text-gray-800 hover:bg-yellow-500 shadow-lg hover:shadow-xl'
          }`}
        >
          ➡️ السابق
        </button>

        <div className="text-center">
          <div className="text-sm text-gray-600 font-semibold">
            {currentExercise + 1} / {exercises.length}
          </div>
          {/* Progress Dots */}
          <div className="flex gap-2 mt-2">
            {exercises.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentExercise ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextExercise}
          disabled={currentExercise === exercises.length - 1}
          className={`py-2 px-6 rounded-lg font-bold transition-all ${
            currentExercise === exercises.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-secondary text-gray-800 hover:bg-yellow-500 shadow-lg hover:shadow-xl'
          }`}
        >
          التالي ⬅️
        </button>
      </div>

      {/* Shapes Reference */}
      <div className="mt-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
        <h5 className="font-bold text-gray-800 mb-3">📚 دليل الأشكال الهندسية:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h6 className="font-semibold text-primary mb-2">الأشكال الرباعية:</h6>
            <ul className="space-y-1">
              <li><strong>🟦 المربع:</strong> 4 أضلاع متساوية، 4 زوايا قائمة</li>
              <li><strong>📄 المستطيل:</strong> ضلعان متقابلان متساويان، 4 زوايا قائمة</li>
              <li><strong>🔸 المعين:</strong> 4 أضلاع متساوية، زوايا غير قائمة</li>
              <li><strong>🪁 شبه المنحرف:</strong> ضلعان متوازيان فقط</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-primary mb-2">معلومات مهمة:</h6>
            <ul className="space-y-1">
              <li><strong>🔺 المثلث:</strong> مجموع زواياه = 180°</li>
              <li><strong>⭐ متوازي الأضلاع:</strong> الأضلاع المتقابلة متوازية ومتساوية</li>
              <li><strong>🔄 الأقطار:</strong> خطوط تصل بين الرؤوس المتقابلة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShapeVisualizer
