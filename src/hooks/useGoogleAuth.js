import { useState, useEffect } from 'react'

// Demo Client ID - Replace with your actual Google OAuth Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com"

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
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true,
      })
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
    if (window.google?.accounts?.id) {
      setError('')
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Try alternative method if popup is blocked
          setError('تم حظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة والمحاولة مرة أخرى.')
        }
      })
    } else {
      setError('خدمة Google غير متاحة حالياً. حاول مرة أخرى لاحقاً.')
    }
  }

  const renderGoogleButton = (buttonText = "تسجيل الدخول باستخدام Google") => {
    return (
      <button
        onClick={signInWithGoogle}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <span>{buttonText}</span>
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
