import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Header({ user, onLogout, stars, visitors }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const navigate = useNavigate()

  // Celebration effect when reaching star milestones
  useEffect(() => {
    if (stars > 0 && stars % 10 === 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [stars])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    onLogout()
    navigate('/login')
  }

  return (
    <>
      {/* Backdrop overlay for menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-[90] bg-black/10"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Thin Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
          
          {/* Left Side - User Info */}
          <div className="flex-1">
            <div className="relative inline-block">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-all duration-300 border border-blue-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-gray-800 text-sm max-w-[120px] truncate">{user.name}</div>
              </div>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn border-2 border-gray-200 z-50">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-4 text-white">
                  <p className="text-xs opacity-90 mb-1">مرحباً،</p>
                  <p className="font-bold text-xl mb-1 break-words">{user.name}</p>
                  <p className="text-xs opacity-80 break-all" dir="ltr">{user.email}</p>
                </div>
                
                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate('/')
                      setShowMenu(false)
                    }}
                    className="w-full text-right px-5 py-3 hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200 border-b border-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🏠</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-800 font-bold text-sm">الصفحة الرئيسية</div>
                      <div className="text-gray-500 text-xs">عرض جميع المواضيع</div>
                    </div>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-right px-5 py-3 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🚪</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-red-600 font-bold text-sm">تسجيل الخروج</div>
                      <div className="text-red-400 text-xs">إنهاء الجلسة</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>

          {/* Center - Visitor Counter */}
          <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-1.5 border border-green-200">
            <span className="text-2xl">👥</span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-semibold leading-none">الزوار</span>
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
