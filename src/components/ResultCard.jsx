function ResultCard({ score, total, answers, lessonTitle, onRestart, onHome }) {
  const percentage = Math.round((score / total) * 100)
  
  let message = ''
  let emoji = ''
  let bgColor = ''

  if (percentage === 100) {
    message = 'ممتاز! أنت بطل الرياضيات! 🏆'
    emoji = '🌟🎉🏆'
    bgColor = 'from-green-400 to-emerald-500'
  } else if (percentage >= 80) {
    message = 'رائع! أداء ممتاز! 👏'
    emoji = '⭐🎊✨'
    bgColor = 'from-blue-400 to-cyan-500'
  } else if (percentage >= 60) {
    message = 'جيد! واصل التدريب! 💪'
    emoji = '👍📚💡'
    bgColor = 'from-yellow-400 to-orange-500'
  } else {
    message = 'لا بأس! حاول مرة أخرى! 🚀'
    emoji = '📖💪🎯'
    bgColor = 'from-purple-400 to-pink-500'
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Card */}
        <div className="card animate-fadeIn">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${bgColor} rounded-t-xl -mt-6 -mx-6 p-12 text-white text-center mb-8`}>
            <div className="text-7xl mb-4">{emoji}</div>
            <h1 className="text-5xl font-black mb-4">نتائج الاختبار</h1>
            <h2 className="text-3xl font-bold">{lessonTitle}</h2>
          </div>

          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-8 shadow-2xl mb-6">
              <div className="text-8xl font-black text-white">
                {score}/{total}
              </div>
              <div className="text-3xl font-bold text-white mt-2">
                {percentage}%
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">{message}</h3>
            <div className="text-6xl">
              {"⭐".repeat(score)}
            </div>
          </div>

          {/* Answers Review */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              📋 مراجعة الإجابات
            </h3>
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-r-8 ${
                    answer.isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">
                      {answer.isCorrect ? '✅' : '❌'}
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-gray-800 mb-2">
                        السؤال {index + 1}: {answer.question}
                      </p>
                      <p className={`text-lg ${
                        answer.isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {answer.isCorrect ? 'إجابة صحيحة! 🎉' : 'إجابة خاطئة 💭'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onRestart}
              className="btn-secondary text-xl"
            >
              🔄 إعادة الاختبار
            </button>
            <button
              onClick={onHome}
              className="btn-primary text-xl"
            >
              🏠 العودة للرئيسية
            </button>
          </div>

          {/* Motivational Message */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl text-center">
            <p className="text-2xl font-bold text-purple-700">
              {score === total 
                ? '🎊 ممتاز! أكملت جميع الأسئلة بنجاح!'
                : '💪 استمر في التعلم وستصبح أفضل!'}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              "النجاح يحتاج إلى تدريب مستمر" ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultCard

