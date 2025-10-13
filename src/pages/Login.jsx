import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // التحقق من البريد الإلكتروني وكلمة المرور
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      // حفظ بيانات المستخدم الحالي
      localStorage.setItem('currentUser', JSON.stringify({
        name: user.name,
        email: user.email
      }))
      
      // إبلاغ التطبيق بتسجيل الدخول
      onLogin(user)
      
      // الانتقال للصفحة الرئيسية
      navigate('/')
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-xl text-gray-600">
              تعلّم الرياضيات مع جمانة
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg animate-fadeIn">
              <p className="font-bold">❌ {error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all"
                dir="ltr"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary text-xl py-4"
            >
              🚀 دخول
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ليس لديك حساب؟{' '}
              <Link
                to="/signup"
                className="text-primary font-bold hover:underline"
              >
                سجّل الآن
              </Link>
            </p>
          </div>

          {/* Demo Account */}
          <div className="mt-6 bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 <strong>حساب تجريبي:</strong><br />
              البريد: demo@test.com<br />
              كلمة المرور: 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

