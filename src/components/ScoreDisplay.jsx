import { useEffect, useState } from 'react'

function ScoreDisplay({ stars }) {
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (stars > 0 && stars % 10 === 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [stars])

  return (
    <>
      <div className="fixed top-4 left-4 z-50 bg-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-3 animate-bounce">
        <span className="text-4xl">⭐</span>
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 font-semibold">نجومك</span>
          <span className="text-2xl font-bold text-yellow-500">{stars}</span>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center transform animate-bounce">
            <div className="text-7xl mb-4">🎉🌟🎊</div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              أحسنت! أنت نجم الرياضيات! 
            </h2>
            <p className="text-2xl text-gray-700">
              حصلت على {stars} نجمة! 
            </p>
            <div className="mt-6 text-6xl">
              {"⭐".repeat(Math.min(5, stars / 10))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ScoreDisplay

