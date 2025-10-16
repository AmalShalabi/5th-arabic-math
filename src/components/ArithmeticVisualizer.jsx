import { useState } from 'react'

function ArithmeticVisualizer() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [calculationSteps, setCalculationSteps] = useState([])

  const exercises = [
    {
      id: 1,
      question: 'احسب: 5 + 3 × 2',
      expression: '5 + 3 × 2',
      answer: 11,
      steps: [
        { step: 'نبدأ بالضرب أولاً: 3 × 2 = 6', highlight: '3 × 2' },
        { step: 'ثم نجمع: 5 + 6 = 11', highlight: '5 + 6' }
      ],
      difficulty: 'سهل',
      icon: '➕'
    },
    {
      id: 2,
      question: 'احسب: (8 + 4) ÷ 3',
      expression: '(8 + 4) ÷ 3',
      answer: 4,
      steps: [
        { step: 'نبدأ بما داخل الأقواس: (8 + 4) = 12', highlight: '(8 + 4)' },
        { step: 'ثم نقسم: 12 ÷ 3 = 4', highlight: '12 ÷ 3' }
      ],
      difficulty: 'سهل',
      icon: '➗'
    },
    {
      id: 3,
      question: 'احسب: 15 - 2 × 3 + 1',
      expression: '15 - 2 × 3 + 1',
      answer: 10,
      steps: [
        { step: 'نبدأ بالضرب: 2 × 3 = 6', highlight: '2 × 3' },
        { step: 'ثم الطرح والجمع من اليسار: 15 - 6 = 9', highlight: '15 - 6' },
        { step: 'أخيراً: 9 + 1 = 10', highlight: '9 + 1' }
      ],
      difficulty: 'متوسط',
      icon: '➖'
    },
    {
      id: 4,
      question: 'احسب: 4 × (7 - 2) + 8',
      expression: '4 × (7 - 2) + 8',
      answer: 28,
      steps: [
        { step: 'نبدأ بما داخل الأقواس: (7 - 2) = 5', highlight: '(7 - 2)' },
        { step: 'ثم الضرب: 4 × 5 = 20', highlight: '4 × 5' },
        { step: 'أخيراً الجمع: 20 + 8 = 28', highlight: '20 + 8' }
      ],
      difficulty: 'متوسط',
      icon: '✖️'
    },
    {
      id: 5,
      question: 'احسب: 48 ÷ (3 + 3) × 2',
      expression: '48 ÷ (3 + 3) × 2',
      answer: 16,
      steps: [
        { step: 'نبدأ بما داخل الأقواس: (3 + 3) = 6', highlight: '(3 + 3)' },
        { step: 'ثم القسمة والضرب من اليسار: 48 ÷ 6 = 8', highlight: '48 ÷ 6' },
        { step: 'أخيراً: 8 × 2 = 16', highlight: '8 × 2' }
      ],
      difficulty: 'صعب',
      icon: '🔢'
    },
    {
      id: 6,
      question: 'احسب: 2 + 3 × (8 - 5) - 4',
      expression: '2 + 3 × (8 - 5) - 4',
      answer: 7,
      steps: [
        { step: 'نبدأ بما داخل الأقواس: (8 - 5) = 3', highlight: '(8 - 5)' },
        { step: 'ثم الضرب: 3 × 3 = 9', highlight: '3 × 3' },
        { step: 'ثم الجمع والطرح من اليسار: 2 + 9 = 11', highlight: '2 + 9' },
        { step: 'أخيراً: 11 - 4 = 7', highlight: '11 - 4' }
      ],
      difficulty: 'صعب',
      icon: '🎯'
    }
  ]

  const exercise = exercises[currentExercise]

  const checkAnswer = () => {
    setShowFeedback(true)
    // تقسيم الحل إلى خطوات
    setCalculationSteps(exercise.steps)
  }

  const isAnswerCorrect = () => {
    return parseInt(userAnswer) === exercise.answer
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

  const highlightExpression = (expression, highlight) => {
    if (!highlight) return expression
    return expression.replace(highlight, `<mark class="bg-yellow-200 px-1 rounded">${highlight}</mark>`)
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 sm:p-4 md:p-6 rounded-xl border-2 border-primary mt-4 sm:mt-6 overflow-hidden">
      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1">
            <span>🧮</span>
            <span>حاسبة تفاعلية</span>
            <span>🧮</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg">ترتيب العمليات</div>
        </div>
      </h3>

      {/* Exercise Header */}
      <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2">
          <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 ${getDifficultyColor(exercise.difficulty)} font-bold text-xs sm:text-sm`}>
            {exercise.difficulty}
          </div>
          <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
            تمرين <span className="number-ltr">{currentExercise + 1}</span> من <span className="number-ltr">{exercises.length}</span>
          </div>
        </div>

        <h4 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 text-center mb-4 px-2 leading-tight">
          {exercise.icon} {exercise.question}
        </h4>
        
        <div className="text-center mb-4">
          <div className="inline-block bg-gray-100 p-4 rounded-lg text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-gray-800 number-ltr">
            {exercise.expression}
          </div>
        </div>

        {/* Input Field */}
        <div className="text-center">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            الإجابة:
          </label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 p-3 text-2xl font-bold text-center border-4 border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 number-input"
              placeholder="؟"
            />
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
                الناتج = <span className="number-ltr">{exercise.answer}</span>
              </p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-2">💭</div>
              <p className="text-2xl font-bold">حاول مرة أخرى!</p>
              <p className="text-lg mt-2">
                الإجابة الصحيحة هي: <span className="number-ltr">{exercise.answer}</span>
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
              <div key={index} className="bg-blue-50 p-4 rounded-lg border-r-4 border-primary">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm number-ltr">
                    {index + 1}
                  </div>
                  <div className="text-lg text-gray-700 leading-relaxed flex-1">
                    <div dangerouslySetInnerHTML={{ 
                      __html: highlightExpression(step.step, step.highlight) 
                    }} />
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
            التمرين <span className="number-ltr">{currentExercise + 1}</span> من <span className="number-ltr">{exercises.length}</span>
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

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
        <p className="text-gray-700">
          <strong>💡 قواعد ترتيب العمليات:</strong><br />
          1. الأقواس ( ) أولاً<br />
          2. الضرب × والقسمة ÷ ثانياً<br />
          3. الجمع + والطرح - أخيراً<br />
          <em>إذا كانت العمليات من نفس الأولوية، احسب من اليسار إلى اليمين</em>
        </p>
      </div>
    </div>
  )
}

export default ArithmeticVisualizer
