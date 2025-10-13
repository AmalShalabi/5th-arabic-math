import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserMenu({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    onLogout()
    navigate('/login')
  }

  return (
    <div className="fixed top-4 right-4 z-[100]">
      {/* Backdrop overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      <div className="relative z-50">
        {/* User Button - Compact Design */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 hover:shadow-xl transition-all duration-300 hover:bg-white border-2 border-primary/30"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-right hidden sm:block">
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

        {/* Dropdown Menu - Improved Design */}
        {showMenu && (
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn border-2 border-gray-200 z-50">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary to-purple-500 px-5 py-4 text-white">
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
  )
}

export default UserMenu

