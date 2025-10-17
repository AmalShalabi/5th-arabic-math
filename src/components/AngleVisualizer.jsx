import { useState } from 'react'
import soundManager from '../utils/soundEffects'

function AngleVisualizer() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [angleValue, setAngleValue] = useState(45)

  const exercises = [
    {
      id: 1,
      type: 'identification',
      question: 'ما نوع هذه الزاوية؟',
      angle: 45,
      correctAnswer: 'حادة',
      options: ['حادة', 'قائمة', 'منفرجة', 'مستقيمة'],
      explanation: 'الزاوية 45° أقل من 90° لذلك هي زاوية حادة',
      difficulty: 'سهل',
      icon: '📐'
    },
    {
      id: 2,
      type: 'identification',
      question: 'ما نوع هذه الزاوية؟',
      angle: 90,
      correctAnswer: 'قائمة',
      options: ['حادة', 'قائمة', 'منفرجة', 'مستقيمة'],
      explanation: 'الزاوية 90° تُسمى زاوية قائمة',
      difficulty: 'سهل',
      icon: '📐'
    },
    {
      id: 3,
      type: 'identification',
      question: 'ما نوع هذه الزاوية؟',
      angle: 135,
      correctAnswer: 'منفرجة',
      options: ['حادة', 'قائمة', 'منفرجة', 'مستقيمة'],
      explanation: 'الزاوية 135° أكبر من 90° وأقل من 180° لذلك هي زاوية منفرجة',
      difficulty: 'متوسط',
      icon: '📐'
    },
    {
      id: 4,
      type: 'identification',
      question: 'ما نوع هذه الزاوية؟',
      angle: 180,
      correctAnswer: 'مستقيمة',
      options: ['حادة', 'قائمة', 'منفرجة', 'مستقيمة'],
      explanation: 'الزاوية 180° تُسمى زاوية مستقيمة',
      difficulty: 'متوسط',
      icon: '📐'
    },
    {
      id: 5,
      type: 'complement',
      question: 'ما الزاوية المتممة للزاوية 60°؟',
      angle: 60,
      correctAnswer: '30',
      explanation: 'الزاوية المتممة = 90° - 60° = 30°',
      difficulty: 'متوسط',
      icon: '🔄'
    },
    {
      id: 6,
      type: 'supplement',
      question: 'ما الزاوية المكملة للزاوية 120°؟',
      angle: 120,
      correctAnswer: '60',
      explanation: 'الزاوية المكملة = 180° - 120° = 60°',
      difficulty: 'صعب',
      icon: '🔄'
    }
  ]

  const exercise = exercises[currentExercise]

  const checkAnswer = () => {
    setShowFeedback(true)
  }

  const isAnswerCorrect = () => {
    if (exercise.type === 'identification') {
      return userAnswer === exercise.correctAnswer
    } else {
      return parseInt(userAnswer) === parseInt(exercise.correctAnswer)
    }
  }

  const handleAnswer = (answer) => {
    setUserAnswer(answer)
    setShowFeedback(true)
    
    // Play sound effect based on correctness
    const isCorrect = answer === exercise.correctAnswer
    if (isCorrect) {
      soundManager.playCorrect()
    } else {
      soundManager.playIncorrect()
    }
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      soundManager.playClick()
      setCurrentExercise(currentExercise + 1)
      setUserAnswer('')
      setShowFeedback(false)
      setAngleValue(exercises[currentExercise + 1].angle || 45)
    }
  }

  const previousExercise = () => {
    if (currentExercise > 0) {
      soundManager.playClick()
      setCurrentExercise(currentExercise - 1)
      setUserAnswer('')
      setShowFeedback(false)
      setAngleValue(exercises[currentExercise - 1].angle || 45)
    }
  }

  const resetExercise = () => {
    soundManager.playClick()
    setUserAnswer('')
    setShowFeedback(false)
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'سهل') return 'bg-green-100 text-green-700 border-green-500'
    if (difficulty === 'متوسط') return 'bg-yellow-100 text-yellow-700 border-yellow-500'
    return 'bg-red-100 text-red-700 border-red-500'
  }

  const getAngleColor = (angle) => {
    if (angle < 90) return '#10B981' // green for acute
    if (angle === 90) return '#3B82F6' // blue for right
    if (angle < 180) return '#F59E0B' // yellow for obtuse
    return '#EF4444' // red for straight
  }

  const renderAngle = (angle) => {
    const radius = 80
    const centerX = 100
    const centerY = 100
    
    // Convert angle to radians for calculation
    const angleRad = (angle * Math.PI) / 180
    
    // Calculate end point of the angle arc
    const endX = centerX + radius * Math.cos(-angleRad)
    const endY = centerY + radius * Math.sin(-angleRad)
    
    // Create the path for the arc
    const largeArcFlag = angle > 180 ? 1 : 0
    const pathData = `M ${centerX} ${centerY} L ${centerX + radius} ${centerY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`
    
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs mx-auto">
        {/* Base line (horizontal) */}
        <line 
          x1={centerX - radius} 
          y1={centerY} 
          x2={centerX + radius} 
          y2={centerY} 
          stroke="#374151" 
          strokeWidth="3"
        />
        
        {/* Angle line */}
        <line 
          x1={centerX} 
          y1={centerY} 
          x2={endX} 
          y2={endY} 
          stroke="#374151" 
          strokeWidth="3"
        />
        
        {/* Angle arc */}
        <path
          d={`M ${centerX + 30} ${centerY} A 30 30 0 ${largeArcFlag} 0 ${centerX + 30 * Math.cos(-angleRad)} ${centerY + 30 * Math.sin(-angleRad)}`}
          fill="none"
          stroke={getAngleColor(angle)}
          strokeWidth="4"
        />
        
        {/* Angle fill */}
        <path
          d={pathData}
          fill={getAngleColor(angle)}
          fillOpacity="0.3"
        />
        
        {/* Center point */}
        <circle cx={centerX} cy={centerY} r="4" fill="#374151" />
        
        {/* Angle label */}
        <text 
          x={centerX + 40 * Math.cos(-angleRad / 2)} 
          y={centerY + 40 * Math.sin(-angleRad / 2)} 
          textAnchor="middle" 
          className="fill-current text-lg font-bold number-ltr"
          fill="#374151"
        >
          {angle}°
        </text>
        
        {/* Right angle marker if it's 90 degrees */}
        {angle === 90 && (
          <rect 
            x={centerX - 15} 
            y={centerY - 15} 
            width="15" 
            height="15" 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="2"
          />
        )}
      </svg>
    )
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 md:p-6 rounded-xl border-2 border-primary mt-4 sm:mt-6 overflow-hidden">
      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1">
            <span>📐</span>
            <span>مستكشف الزوايا</span>
            <span>📐</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg">التعرف على أنواع الزوايا</div>
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
      </div>

      {/* Angle Visualization */}
      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg">
        <div className="flex justify-center items-center mb-4">
          <div className="w-full max-w-sm">
            {renderAngle(exercise.angle)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg text-2xl font-bold text-gray-800 number-ltr">
            {exercise.angle}°
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        {exercise.type === 'identification' ? (
          /* Multiple Choice for Identification */
          <div>
            <h5 className="text-lg font-bold text-gray-700 mb-4 text-center">اختر النوع الصحيح:</h5>
            <div className="grid grid-cols-2 gap-3">
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`p-4 rounded-lg font-bold text-lg transition-all duration-300 relative z-10 ${
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
          /* Input Field for Calculations */
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              الإجابة بالدرجات:
            </label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value)
                // Check if answer is complete and play sound
                if (e.target.value && !isNaN(e.target.value)) {
                  const isCorrect = parseInt(e.target.value) === parseInt(exercise.correctAnswer)
                  if (isCorrect) {
                    soundManager.playCorrect()
                  } else if (parseInt(e.target.value) !== parseInt(exercise.correctAnswer)) {
                    soundManager.playIncorrect()
                  }
                }
              }}
              className="w-32 p-3 text-2xl font-bold text-center border-4 border-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 number-input"
              placeholder="؟"
            />
            <span className="text-xl font-bold text-gray-600 ml-2">°</span>
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

      {/* Types Reference */}
      <div className="mt-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
        <h5 className="font-bold text-gray-800 mb-2">📚 أنواع الزوايا:</h5>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span><strong>حادة:</strong> أقل من 90°</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span><strong>قائمة:</strong> تساوي 90°</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span><strong>منفرجة:</strong> بين 90° و 180°</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span><strong>مستقيمة:</strong> تساوي 180°</span>
          </div>
        </div>
        <div className="mt-3 text-sm">
          <p><strong>💡 تذكر:</strong></p>
          <p>• المتتامتان: مجموعهما 90°</p>
          <p>• المتكاملتان: مجموعهما 180°</p>
        </div>
      </div>
    </div>
  )
}

export default AngleVisualizer
