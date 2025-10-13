import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Header({ stars, visitors }) {
  const [showCelebration, setShowCelebration] = useState(false)
  const navigate = useNavigate()

  // Celebration effect when reaching star milestones
  useEffect(() => {
    if (stars > 0 && stars % 10 === 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [stars])

  return (
    <>
      {/* Thin Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
          
          {/* Left Side - Home Button */}
          <div className="flex-1">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-all duration-300 border border-blue-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                <span className="text-lg">🏠</span>
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-gray-800 text-sm">الصفحة الرئيسية</div>
              </div>
            </button>
          </div>

          {/* Center - Visitor Counter */}
          <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-1.5 border border-green-200">
            <span className="text-2xl">👥</span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-semibold leading-none">زوار الموقع</span>
              <span className="text-lg font-black text-green-600 leading-none">{visitors}</span>
            </div>
          </div>

          {/* Right Side - Stars */}
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2 bg-yellow-50 rounded-lg px-3 py-1.5 border border-yellow-200">
              <span className="text-2xl">⭐</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 font-semibold leading-none">النجوم</span>
                <span className="text-lg font-black text-yellow-600 leading-none">{stars}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center transform animate-bounce">
            <div className="text-7xl mb-4">🎉🌟🎊</div>
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
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

export default Header
