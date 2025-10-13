import { useState } from 'react'

function FractionVisualizer() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedPieces, setSelectedPieces] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)

  const exercises = [
    {
      id: 1,
      question: 'لوّن ½ (نصف) الكعكة',
      fraction: { numerator: 1, denominator: 2 },
      pieces: 2,
      difficulty: 'سهل',
      shape: 'كعكة',
      icon: '🍰'
    },
    {
      id: 2,
      question: 'لوّن ¼ (ربع) البيتزا',
      fraction: { numerator: 1, denominator: 4 },
      pieces: 4,
      difficulty: 'سهل',
      shape: 'بيتزا',
      icon: '🍕'
    },
    {
      id: 3,
      question: 'لوّن ¾ (ثلاثة أرباع) الشوكولاتة',
      fraction: { numerator: 3, denominator: 4 },
      pieces: 4,
      difficulty: 'متوسط',
      shape: 'شوكولاتة',
      icon: '🍫'
    },
    {
      id: 4,
      question: 'لوّن ⅔ (ثلثين) التفاحة',
      fraction: { numerator: 2, denominator: 3 },
      pieces: 3,
      difficulty: 'متوسط',
      shape: 'تفاحة',
      icon: '🍎'
    },
    {
      id: 5,
      question: 'لوّن ⅗ (ثلاثة أخماس) الكعكة',
      fraction: { numerator: 3, denominator: 5 },
      pieces: 5,
      difficulty: 'متوسط',
      shape: 'كعكة',
      icon: '🎂'
    },
    {
      id: 6,
      question: 'لوّن ⅝ (خمسة أثمان) البيتزا',
      fraction: { numerator: 5, denominator: 8 },
      pieces: 8,
      difficulty: 'صعب',
      shape: 'بيتزا',
      icon: '🍕'
    },
    {
      id: 7,
      question: 'لوّن ⅚ (خمسة أسداس) الدونات',
      fraction: { numerator: 5, denominator: 6 },
      pieces: 6,
      difficulty: 'صعب',
      shape: 'دونات',
      icon: '🍩'
    },
    {
      id: 8,
      question: 'لوّن ⅞ (سبعة أثمان) الكعكة',
      fraction: { numerator: 7, denominator: 8 },
      pieces: 8,
      difficulty: 'صعب',
      shape: 'كعكة',
      icon: '🧁'
    }
  ]

  const exercise = exercises[currentExercise]

  const togglePiece = (index) => {
    const key = `${currentExercise}-${index}`
    setSelectedPieces({
      ...selectedPieces,
      [key]: !selectedPieces[key]
    })
    setShowFeedback(false)
  }

  const getSelectedCount = () => {
    return Object.keys(selectedPieces).filter(
      key => key.startsWith(`${currentExercise}-`) && selectedPieces[key]
    ).length
  }

  const checkAnswer = () => {
    setShowFeedback(true)
  }

  const isAnswerCorrect = () => {
    const selectedCount = getSelectedCount()
    return selectedCount === exercise.fraction.numerator
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setShowFeedback(false)
    }
  }

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setShowFeedback(false)
    }
  }

  const resetExercise = () => {
    // حذف اختيارات هذا التمرين فقط
    const newSelected = { ...selectedPieces }
    for (let i = 0; i < exercise.pieces; i++) {
      delete newSelected[`${currentExercise}-${i}`]
    }
    setSelectedPieces(newSelected)
    setShowFeedback(false)
  }

  const selectedCount = getSelectedCount()
  const isCorrect = showFeedback ? isAnswerCorrect() : false

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'سهل') return 'bg-green-100 text-green-700 border-green-500'
    if (difficulty === 'متوسط') return 'bg-yellow-100 text-yellow-700 border-yellow-500'
    return 'bg-red-100 text-red-700 border-red-500'
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-xl border-4 border-secondary mt-8">
      <h3 className="text-3xl font-bold text-purple-700 mb-6 text-center flex items-center justify-center gap-3">
        <span>🎨</span>
        تمارين تفاعلية - تلوين الكسور
      </h3>

      {/* Exercise Header */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className={`px-4 py-2 rounded-full border-2 ${getDifficultyColor(exercise.difficulty)} font-bold text-sm`}>
            {exercise.difficulty}
          </div>
          <div className="text-lg font-semibold text-gray-600">
            تمرين {currentExercise + 1} من {exercises.length}
          </div>
        </div>

        <h4 className="text-2xl font-bold text-gray-800 text-center mb-2">
          {exercise.icon} {exercise.question}
        </h4>
        
        <div className="text-center">
          <span className="text-5xl font-black text-primary">
            {exercise.fraction.numerator}/{exercise.fraction.denominator}
          </span>
        </div>
      </div>

      {/* Visual Shape */}
      <div className="bg-white rounded-xl p-8 mb-6 shadow-lg">
        <div className="flex justify-center items-center">
          <div className="relative" style={{ width: '300px', height: '300px' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* رسم القطع */}
              {Array.from({ length: exercise.pieces }).map((_, index) => {
                const angle = (360 / exercise.pieces) * index
                const nextAngle = (360 / exercise.pieces) * (index + 1)
                const key = `${currentExercise}-${index}`
                const isSelected = selectedPieces[key]

                // تحويل الزاوية إلى radians
                const startRad = (angle - 90) * (Math.PI / 180)
                const endRad = (nextAngle - 90) * (Math.PI / 180)

                // حساب نقاط القطعة
                const x1 = 50 + 45 * Math.cos(startRad)
                const y1 = 50 + 45 * Math.sin(startRad)
                const x2 = 50 + 45 * Math.cos(endRad)
                const y2 = 50 + 45 * Math.sin(endRad)

                const largeArc = exercise.pieces <= 2 ? 1 : 0

                return (
                  <g key={index}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={isSelected ? '#FBBF24' : '#E5E7EB'}
                      stroke="#374151"
                      strokeWidth="1"
                      className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      onClick={() => togglePiece(index)}
                    />
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-blue-100 px-6 py-3 rounded-full">
            <span className="text-xl font-bold text-blue-700">
              لونت {selectedCount} من {exercise.pieces} قطعة
            </span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-6 rounded-xl mb-6 text-center text-2xl font-bold animate-fadeIn ${
          isCorrect
            ? 'bg-green-100 text-green-700 border-4 border-green-500'
            : 'bg-red-100 text-red-700 border-4 border-red-500'
        }`}>
          {isCorrect ? (
            <div>
              <div className="text-6xl mb-2">🎉</div>
              <p>ممتاز! لونت الكسر بشكل صحيح! ✨</p>
              <p className="text-lg mt-2">
                {exercise.fraction.numerator}/{exercise.fraction.denominator} = {selectedCount} من {exercise.pieces} قطعة
              </p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-2">💭</div>
              <p>حاول مرة أخرى!</p>
              <p className="text-lg mt-2">
                يجب تلوين {exercise.fraction.numerator} من {exercise.pieces} قطعة
              </p>
              <p className="text-sm mt-2">
                لونت {selectedCount} قطعة (يجب {exercise.fraction.numerator})
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={checkAnswer}
          className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          ✅ تحقق من الإجابة
        </button>

        <button
          onClick={resetExercise}
          className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🔄 إعادة التلوين
        </button>
      </div>

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
          ⬅️ السابق
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
          التالي ➡️
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
        <p className="text-gray-700">
          <strong>💡 كيف تلعب:</strong><br />
          اضغط على القطع لتلوينها أو إلغاء التلوين. اختر العدد الصحيح من القطع حسب الكسر المطلوب، ثم اضغط "تحقق من الإجابة".
        </p>
      </div>
    </div>
  )
}

export default FractionVisualizer

