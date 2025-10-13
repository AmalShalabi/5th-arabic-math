import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="6 أحرف على الأقل"
                minLength="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
                dir="ltr"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-bold text-gray-700 mb-2">
                🔒 تأكيد كلمة المرور
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="أعد إدخال كلمة المرور"
                minLength="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
                dir="ltr"
              />
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

