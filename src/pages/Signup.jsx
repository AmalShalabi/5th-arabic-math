import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

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
          {error && (
            <div className="mb-6 bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg animate-fadeIn">
              <p className="font-bold">❌ {error}</p>
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
              ✨ إنشاء حساب
            </button>
          </form>

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
        </div>
      </div>
    </div>
  )
}

export default Signup

