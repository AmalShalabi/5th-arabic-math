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
        {/* User Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-3 hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${showMenu ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 animate-fadeIn">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm text-gray-600">مرحباً،</p>
              <p className="font-bold text-gray-800 text-lg">{user.name}</p>
            </div>
            
            <button
              onClick={() => {
                navigate('/')
                setShowMenu(false)
              }}
              className="w-full text-right px-4 py-3 hover:bg-gray-100 flex items-center gap-3 transition-colors"
            >
              <span className="text-2xl">🏠</span>
              <span className="text-gray-700 font-semibold">الصفحة الرئيسية</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-right px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600"
            >
              <span className="text-2xl">🚪</span>
              <span className="font-semibold">تسجيل الخروج</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserMenu

