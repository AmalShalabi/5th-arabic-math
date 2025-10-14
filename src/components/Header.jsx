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
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 max-w-7xl mx-auto w-full">
          
          {/* Left Side - Home Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-50 hover:bg-blue-100 rounded-lg px-2 sm:px-3 py-1.5 flex items-center gap-1 sm:gap-2 transition-all duration-300 border border-blue-200"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md">
                <span className="text-sm sm:text-lg">🏠</span>
              </div>
              <div className="text-left hidden md:block">
                <div className="font-bold text-gray-800 text-xs sm:text-sm">الصفحة الرئيسية</div>
              </div>
            </button>
          </div>

          {/* Center - Visitor Counter - Hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-green-50 rounded-lg px-2 sm:px-3 py-1.5 border border-green-200 mx-2">
            <span className="text-lg sm:text-2xl">👥</span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-semibold leading-none whitespace-nowrap">زوار الموقع</span>
              <span className="text-sm sm:text-lg font-black text-green-600 leading-none">{visitors}</span>
            </div>
          </div>

          {/* Mobile Visitor Counter - Visible only on small screens */}
          <div className="sm:hidden flex items-center gap-1 bg-green-50 rounded-lg px-2 py-1 border border-green-200">
            <span className="text-sm">👥</span>
            <span className="text-xs font-bold text-green-600">{visitors}</span>
          </div>

          {/* Right Side - Stars */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2 bg-yellow-50 rounded-lg px-2 sm:px-3 py-1.5 border border-yellow-200">
              <span className="text-lg sm:text-2xl">⭐</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 font-semibold leading-none hidden sm:block">النجوم</span>
                <span className="text-sm sm:text-lg font-black text-yellow-600 leading-none">{stars}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl text-center transform animate-bounce max-w-sm sm:max-w-md mx-4">
            <div className="text-4xl sm:text-7xl mb-4">🎉🌟🎊</div>
            <h2 className="text-xl sm:text-4xl font-bold text-blue-600 mb-4 leading-tight">
              أحسنت! أنت نجم الرياضيات! 
            </h2>
            <p className="text-lg sm:text-2xl text-gray-700">
              حصلت على {stars} نجمة! 
            </p>
            <div className="mt-4 sm:mt-6 text-3xl sm:text-6xl">
              {"⭐".repeat(Math.min(5, stars / 10))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
