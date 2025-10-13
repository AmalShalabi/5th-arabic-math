import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // التحقق من وجود البريد الإلكتروني
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email)

    if (!user) {
      setError('البريد الإلكتروني غير مسجل في النظام')
      setLoading(false)
      return
    }

    // إنشاء رمز إعادة تعيين كلمة المرور (token)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiryTime = Date.now() + 3600000 // ساعة واحدة

    // حفظ الرمز في localStorage
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}')
    resetTokens[resetToken] = {
      email: email,
      expiry: expiryTime
    }
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens))

    // إنشاء رابط إعادة التعيين
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`

    // إرسال البريد الإلكتروني عبر EmailJS
    try {
      // معلومات EmailJS - يمكن تغييرها لاحقاً
      const serviceID = 'service_jumana_math' // يجب إنشاؤه في EmailJS
      const templateID = 'template_reset_password' // يجب إنشاؤه في EmailJS
      const publicKey = 'YOUR_PUBLIC_KEY' // يجب الحصول عليه من EmailJS

      const templateParams = {
        to_email: email,
        to_name: user.name,
        reset_link: resetLink,
        app_name: 'تطبيق جمانة للرياضيات'
      }

      // محاولة إرسال البريد
      // ملاحظة: في حالة عدم إعداد EmailJS، سنعرض الرابط مباشرة
      
      // للتطوير: عرض الرابط مباشرة
      console.log('رابط إعادة تعيين كلمة المرور:', resetLink)
      
      // في الإنتاج، استخدم:
      // await emailjs.send(serviceID, templateID, templateParams, publicKey)
      
      setSuccess(true)
      setLoading(false)
    } catch (err) {
      console.error('خطأ في إرسال البريد:', err)
      // عرض الرابط للمستخدم مباشرة
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card animate-fadeIn text-center">
            <div className="text-8xl mb-6">📧</div>
            <h2 className="text-4xl font-black text-green-600 mb-4">
              تم إرسال البريد!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              تم إرسال رابط إعادة تعيين كلمة المرور إلى:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-lg font-bold text-primary" dir="ltr">
                {email}
              </p>
            </div>
            <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                💡 <strong>ملاحظة للتطوير:</strong><br />
                افتح Console (F12) لرؤية رابط إعادة التعيين.
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              تحقق من بريدك الإلكتروني واضغط على الرابط لإعادة تعيين كلمة المرور.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              الرابط صالح لمدة ساعة واحدة فقط.
            </p>
            <Link
              to="/login"
              className="btn-primary inline-block"
            >
              العودة لتسجيل الدخول
            </Link>
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
            <div className="text-6xl mb-4">🔑</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              نسيت كلمة المرور؟
            </h1>
            <p className="text-xl text-gray-600">
              لا تقلق! سنساعدك على استعادة حسابك
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg animate-fadeIn">
              <p className="font-bold">❌ {error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-6 bg-blue-50 border-r-4 border-primary p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>📝 الخطوات:</strong><br />
              1. أدخل بريدك الإلكتروني<br />
              2. سنرسل لك رابط إعادة تعيين كلمة المرور<br />
              3. افتح البريد واضغط على الرابط<br />
              4. أدخل كلمة المرور الجديدة
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-2">
                📧 البريد الإلكتروني المسجل
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary text-xl py-4 ${loading ? 'opacity-50 cursor-wait' : ''}`}
            >
              {loading ? '⏳ جاري الإرسال...' : '📧 إرسال رابط إعادة التعيين'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              ← العودة لتسجيل الدخول
            </Link>
          </div>

          {/* EmailJS Setup Note */}
          <div className="mt-6 bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>⚙️ ملاحظة تقنية:</strong><br />
              لإرسال البريد فعلياً، يجب إعداد EmailJS.
              اقرأ <code>نظام-نسيت-كلمة-المرور.md</code> للتفاصيل.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

