function ResultCard({ score, total, answers, lessonTitle, onRestart, onHome }) {
  const percentage = Math.round((score / total) * 100)
  
  let message = ''
  let emoji = ''
  let bgColor = ''
  
  // رسالة تحفيزية خاصة للدرس الأول
  const specialMessage = score >= 3 ? 'أحسنت! أنت نجم الرياضيات 🌟' : ''

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
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Results Card */}
        <div className="card animate-fadeIn">
          {/* Compact Header with gradient */}
          <div className={`bg-gradient-to-r ${bgColor} rounded-t-xl -mt-6 -mx-6 p-6 text-white text-center mb-4`}>
            <div className="text-4xl mb-2">{emoji}</div>
            <h1 className="text-2xl font-black mb-2">نتائج الاختبار</h1>
            <h2 className="text-lg font-bold">{lessonTitle}</h2>
          </div>

          {/* Compact Score Display */}
          <div className="text-center mb-4">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 shadow-2xl mb-3">
              <div className="text-4xl font-black text-white number-ltr">
                {score}/{total}
              </div>
              <div className="text-xl font-bold text-white mt-1 number-ltr">
                {percentage}%
              </div>
              <div className="text-sm font-bold text-white mt-1 bg-white bg-opacity-20 rounded-full px-3 py-1">
                الدرجة النهائية
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{message}</h3>
            
            {/* Compact Grade Badge */}
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg mb-2">
              <div className="text-xs font-semibold">تم حفظ درجتك</div>
              <div className="text-xl font-black number-ltr">{percentage}%</div>
              <div className="text-xs">يمكنك مراجعتها من سجل الدرجات</div>
            </div>
            
            <div className="text-3xl">
              {"⭐".repeat(Math.min(5, score))}
            </div>
          </div>

          {/* Compact Answers Review */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
              📋 مراجعة الإجابات
            </h3>
            <div className="space-y-2">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-r-4 ${
                    answer.isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {answer.isCorrect ? '✅' : '❌'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 mb-1">
                        السؤال <span className="number-ltr">{index + 1}</span>: {answer.question}
                      </p>
                      <p className={`text-sm ${
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

          {/* Compact Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap mb-3">
            <button
              onClick={onRestart}
              className="btn-secondary text-base px-4 py-2"
            >
              🔄 إعادة الاختبار
            </button>
            <button
              onClick={onHome}
              className="btn-primary text-base px-4 py-2"
            >
              🏠 العودة للرئيسية
            </button>
          </div>

          {/* Compact Motivational Message */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg text-center">
            <p className="text-base font-bold text-purple-700">
              {score === total 
                ? '🎊 ممتاز! أكملت جميع الأسئلة بنجاح!'
                : score >= 3
                ? '🌟 أحسنت! أجبت على 3 أسئلة صحيحة أو أكثر، أنت نجم الرياضيات!'
                : '💪 استمر في التعلم وستصبح أفضل!'}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              "النجاح يحتاج إلى تدريب مستمر" ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultCard

