import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGoogleAuth } from '../hooks/useGoogleAuth.jsx'
import GoogleAuthDebug from '../components/GoogleAuthDebug.jsx'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  // Google Authentication - for signup, we'll show success and redirect to login
  const { renderGoogleButton, error: googleError, setError: setGoogleError } = useGoogleAuth((user) => {
    // Show success message for Google signup
    setSuccess(true)
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setGoogleError('')

    // التحقق من البيانات
    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة')
      return
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    // الحصول على المستخدمين الحاليين
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // التحقق من وجود البريد الإلكتروني
    if (users.some(u => u.email === email)) {
      setError('البريد الإلكتروني مستخدم بالفعل')
      return
    }

    // إضافة المستخدم الجديد
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // عرض رسالة نجاح
    setSuccess(true)

    // الانتقال لصفحة تسجيل الدخول بعد ثانيتين
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card animate-fadeIn text-center">
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-4xl font-black text-green-600 mb-4">
              تم التسجيل بنجاح!
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              مرحباً {name}! 👋
            </p>
            <p className="text-lg text-gray-600">
              جاري تحويلك لصفحة تسجيل الدخول...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              إنشاء حساب جديد
            </h1>
            <p className="text-xl text-gray-600">
              انضم لمنصة تعلّم الرياضيات
            </p>
          </div>

          {/* Error Message */}
          {(error || googleError) && (
            <div className="mb-6 bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg animate-fadeIn">
              <p className="font-bold">❌ {error || googleError}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-lg font-bold text-gray-700 mb-2">
                👤 الاسم الكامل
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-2">
                📧 البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
                dir="ltr"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2">
                🔒 كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="6 أحرف على الأقل"
                  minLength="6"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-bold text-gray-700 mb-2">
                🔒 تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="أعد إدخال كلمة المرور"
                  minLength="6"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  title={showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showConfirmPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary text-xl py-4"
            >
              ✨ إنشاء حساب
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm font-semibold">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Signup Button */}
          <div className="mb-6">
            {renderGoogleButton("إنشاء حساب باستخدام Google")}
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                سجّل دخول
              </Link>
            </p>
          </div>

          {/* Google Auth Debug */}
          <GoogleAuthDebug />
        </div>
      </div>
    </div>
  )
}

export default Signup

