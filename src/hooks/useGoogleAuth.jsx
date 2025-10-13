import { useState, useEffect } from 'react'
import { GOOGLE_AUTH_CONFIG, IS_DEMO_MODE } from '../config/googleAuth.js'

// Get Client ID from config file
const GOOGLE_CLIENT_ID = GOOGLE_AUTH_CONFIG.CLIENT_ID

export const useGoogleAuth = (onLogin) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Initialize Google Sign-In when component mounts
    if (window.google) {
      initializeGoogleSignIn()
    } else {
      // Wait for Google script to load
      const interval = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn()
          clearInterval(interval)
        }
      }, 100)
    }
  }, [])

  const initializeGoogleSignIn = () => {
    console.log('🔧 Initializing Google Sign-In...')
    console.log('- Demo Mode:', IS_DEMO_MODE)
    console.log('- Client ID:', GOOGLE_CLIENT_ID)
    console.log('- Google API:', !!window.google?.accounts?.id)
    
    // Don't initialize Google Sign-In in demo mode to prevent errors
    if (IS_DEMO_MODE) {
      console.log('⏭️ Skipping initialization - Demo mode active')
      return
    }
    
    if (!window.google?.accounts?.id) {
      console.log('⏭️ Skipping initialization - Google API not loaded')
      return
    }
    
    try {
      console.log('🚀 Calling google.accounts.id.initialize...')
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      console.log('✅ Google Sign-In initialized successfully')
    } catch (error) {
      console.error('❌ Google Sign-In initialization failed:', error)
      setError(`خطأ في تهيئة Google Sign-In: ${error.message}`)
    }
  }

  const handleGoogleSignIn = async (response) => {
    try {
      setIsLoading(true)
      setError('')

      // Decode the JWT token from Google
      const responsePayload = decodeJwtResponse(response.credential)
      
      if (!responsePayload) {
        throw new Error('فشل في التحقق من بيانات Google')
      }

      const googleUser = {
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
        isGoogleUser: true,
        createdAt: new Date().toISOString()
      }

      // Check if user already exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      let existingUser = users.find(u => u.email === googleUser.email)

      if (!existingUser) {
        // Create new user if doesn't exist
        users.push(googleUser)
        localStorage.setItem('users', JSON.stringify(users))
        existingUser = googleUser
      } else if (!existingUser.isGoogleUser) {
        // Update existing user to mark as Google user
        existingUser.isGoogleUser = true
        existingUser.picture = googleUser.picture
        localStorage.setItem('users', JSON.stringify(users))
      }

      // Save current user session
      localStorage.setItem('currentUser', JSON.stringify({
        name: existingUser.name,
        email: existingUser.email,
        picture: existingUser.picture,
        isGoogleUser: true
      }))

      // Call the onLogin callback
      if (onLogin) {
        onLogin(existingUser)
      }

    } catch (error) {
      console.error('Google Sign-In Error:', error)
      setError('فشل في تسجيل الدخول باستخدام Google. حاول مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = () => {
    setError('')
    console.log('🔍 Google Sign-In Debug Info:')
    console.log('- Client ID:', GOOGLE_CLIENT_ID)
    console.log('- Is Demo Mode:', IS_DEMO_MODE)
    console.log('- Google API Available:', !!window.google?.accounts?.id)
    console.log('- Current URL:', window.location.href)
    
    // Handle demo mode
    if (IS_DEMO_MODE) {
      setError('🔧 وضع العرض التوضيحي: يرجى إعداد Google OAuth Client ID الحقيقي أولاً. راجع ملف GOOGLE_AUTH_SETUP.md للتعليمات المفصلة.')
      return
    }

    if (!window.google?.accounts?.id) {
      setError('❌ Google Identity Services لم يتم تحميله. تحقق من الاتصال بالإنترنت وأعد تحميل الصفحة.')
      console.error('Google Identity Services not loaded')
      return
    }

    try {
      setIsLoading(true)
      console.log('🚀 Attempting Google Sign-In...')
      
      window.google.accounts.id.prompt((notification) => {
        console.log('📋 Google Prompt Notification:', notification)
        setIsLoading(false)
        
        if (notification.isNotDisplayed()) {
          setError('❌ لم تظهر نافذة Google. السبب المحتمل: تم حظر النوافذ المنبثقة أو مشكلة في Client ID.')
        } else if (notification.isSkippedMoment()) {
          setError('⏭️ تم تخطي تسجيل الدخول. جرب مرة أخرى.')
        } else if (notification.isDismissedMoment()) {
          setError('❌ تم إغلاق نافذة تسجيل الدخول.')
        }
      })
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      setError(`❌ خطأ في Google Sign-In: ${error.message}`)
      setIsLoading(false)
    }
  }

  const renderGoogleButton = (buttonText = "تسجيل الدخول باستخدام Google") => {
    // Add demo mode indicator to button text
    const displayText = IS_DEMO_MODE ? `🔧 ${buttonText} (عرض توضيحي)` : buttonText
    
    return (
      <button
        onClick={signInWithGoogle}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-3 bg-white border-2 rounded-lg px-4 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          IS_DEMO_MODE 
            ? 'border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400' 
            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>جاري التحميل...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{displayText}</span>
          </>
        )}
      </button>
    )
  }

  return {
    signInWithGoogle,
    renderGoogleButton,
    isLoading,
    error,
    setError
  }
}

// Helper function to decode JWT token from Google
function decodeJwtResponse(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}
