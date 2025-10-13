import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [validToken, setValidToken] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // التحقق من صلاحية الرمز
    if (!token) {
      setError('رابط غير صالح')
      return
    }

    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}')
    const tokenData = resetTokens[token]

    if (!tokenData) {
      setError('رابط غير صالح أو منتهي الصلاحية')
      return
    }

    // التحقق من انتهاء الصلاحية
    if (Date.now() > tokenData.expiry) {
      setError('انتهت صلاحية الرابط. يرجى طلب رابط جديد.')
      return
    }

    setValidToken(true)
    setUserEmail(tokenData.email)
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // التحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة')
      return
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    // تحديث كلمة المرور
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.email === userEmail)

    if (userIndex !== -1) {
      users[userIndex].password = password
      localStorage.setItem('users', JSON.stringify(users))

      // حذف الرمز المستخدم
      const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}')
      delete resetTokens[token]
      localStorage.setItem('resetTokens', JSON.stringify(resetTokens))

      setSuccess(true)

      // التحويل لصفحة تسجيل الدخول بعد 3 ثوان
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } else {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.')
    }
  }

  if (!validToken && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card animate-fadeIn text-center">
            <div className="text-8xl mb-6">❌</div>
            <h2 className="text-4xl font-black text-red-600 mb-4">
              رابط غير صالح
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              {error}
            </p>
            <Link
              to="/forgot-password"
              className="btn-primary inline-block"
            >
              طلب رابط جديد
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card animate-fadeIn text-center">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-4xl font-black text-green-600 mb-4">
              تم تغيير كلمة المرور!
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              تم تحديث كلمة المرور بنجاح 🎉
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
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              إعادة تعيين كلمة المرور
            </h1>
            <p className="text-xl text-gray-600">
              أدخل كلمة المرور الجديدة
            </p>
          </div>

          {/* User Email Display */}
          <div className="mb-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">الحساب:</p>
            <p className="text-lg font-bold text-primary" dir="ltr">
              {userEmail}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg animate-fadeIn">
              <p className="font-bold">❌ {error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div>
              <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2">
                🔒 كلمة المرور الجديدة
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
              ✅ تحديث كلمة المرور
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 bg-green-50 border-r-4 border-green-500 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              🔐 <strong>أمان:</strong><br />
              اختر كلمة مرور قوية وسهلة التذكر.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

