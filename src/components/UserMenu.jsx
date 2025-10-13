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
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* User Button - Compact Design */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 hover:shadow-xl transition-all duration-300 hover:bg-white border-2 border-primary/20"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-right hidden md:block">
            <div className="font-bold text-gray-800 text-sm">{user.name}</div>
          </div>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${showMenu ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu - Improved Design */}
        {showMenu && (
          <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden animate-fadeIn border-2 border-gray-100">
            <div className="bg-gradient-to-r from-primary to-purple-500 px-4 py-3 text-white">
              <p className="text-xs opacity-90">مرحباً،</p>
              <p className="font-bold text-lg truncate">{user.name}</p>
              <p className="text-xs opacity-75 truncate" dir="ltr">{user.email}</p>
            </div>
            
            <button
              onClick={() => {
                navigate('/')
                setShowMenu(false)
              }}
              className="w-full text-right px-4 py-3 hover:bg-blue-50 flex items-center gap-3 transition-colors border-b border-gray-100"
            >
              <span className="text-xl">🏠</span>
              <span className="text-gray-700 font-semibold text-sm">الصفحة الرئيسية</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-right px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600"
            >
              <span className="text-xl">🚪</span>
              <span className="font-semibold text-sm">تسجيل الخروج</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserMenu

