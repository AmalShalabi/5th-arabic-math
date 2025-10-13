import { useState, useEffect } from 'react'
import { GOOGLE_AUTH_CONFIG, IS_DEMO_MODE } from '../config/googleAuth.js'

function GoogleAuthDebug() {
  const [debugInfo, setDebugInfo] = useState({})

  useEffect(() => {
    const checkGoogleStatus = () => {
      const info = {
        timestamp: new Date().toLocaleString('ar'),
        currentUrl: window.location.href,
        clientId: GOOGLE_AUTH_CONFIG.CLIENT_ID,
        isDemoMode: IS_DEMO_MODE,
        googleApiLoaded: !!window.google,
        googleIdentityLoaded: !!window.google?.accounts?.id,
        browserUserAgent: navigator.userAgent,
        isLocalhost: window.location.hostname === 'localhost',
        port: window.location.port,
        protocol: window.location.protocol,
      }
      setDebugInfo(info)
    }

    checkGoogleStatus()
    
    // Check every 2 seconds for the first 10 seconds
    const interval = setInterval(checkGoogleStatus, 2000)
    setTimeout(() => clearInterval(interval), 10000)
  }, [])

  const testGoogleApi = () => {
    console.log('🧪 Testing Google API manually...')
    
    if (!window.google?.accounts?.id) {
      alert('❌ Google Identity Services غير محمل')
      return
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_AUTH_CONFIG.CLIENT_ID,
        callback: (response) => {
          console.log('✅ Manual test successful:', response)
          alert('✅ Google API يعمل! تحقق من Console للتفاصيل')
        }
      })
      
      window.google.accounts.id.prompt((notification) => {
        console.log('Manual test notification:', notification)
        if (notification.isNotDisplayed()) {
          alert('❌ لم تظهر نافذة Google - مشكلة في Client ID أو النطاق')
        }
      })
    } catch (error) {
      console.error('Manual test error:', error)
      alert(`❌ خطأ في الاختبار: ${error.message}`)
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 text-sm" dir="ltr">
      <h3 className="font-bold text-lg mb-3 text-center" dir="rtl">🔍 معلومات تشخيص Google Auth</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">الإعدادات الأساسية:</h4>
          <ul className="space-y-1 text-xs">
            <li>وقت الفحص: {debugInfo.timestamp}</li>
            <li>الرابط الحالي: {debugInfo.currentUrl}</li>
            <li>Client ID: {debugInfo.clientId?.substring(0, 20)}...</li>
            <li>وضع العرض: {debugInfo.isDemoMode ? '✅ نعم' : '❌ لا'}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">حالة Google API:</h4>
          <ul className="space-y-1 text-xs">
            <li>Google API محمل: {debugInfo.googleApiLoaded ? '✅ نعم' : '❌ لا'}</li>
            <li>Google Identity محمل: {debugInfo.googleIdentityLoaded ? '✅ نعم' : '❌ لا'}</li>
            <li>Localhost: {debugInfo.isLocalhost ? '✅ نعم' : '❌ لا'}</li>
            <li>المنفذ: {debugInfo.port}</li>
            <li>البروتوكول: {debugInfo.protocol}</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={testGoogleApi}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          🧪 اختبار Google API يدوياً
        </button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded border-r-4 border-yellow-400 text-xs" dir="rtl">
        <strong>💡 للمطورين:</strong> افتح Developer Tools (F12) واذهب لـ Console لرؤية رسائل التشخيص المفصلة
      </div>
    </div>
  )
}

export default GoogleAuthDebug
