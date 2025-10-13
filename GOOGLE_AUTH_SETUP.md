# Google Authentication Setup

## ⚠️ Current Status: Demo Mode

The app is currently running in **Demo Mode** with placeholder Google OAuth credentials. The Google login/signup buttons are visible but will show a helpful error message when clicked instead of attempting authentication.

## 🎯 Demo Mode Features

✅ **What Works:**
- Google buttons display with "🔧 (عرض توضيحي)" indicator
- Orange styling to indicate demo mode
- Clear error message in Arabic explaining setup is needed
- No malformed requests or authentication errors
- UI is fully functional and styled

❌ **What Doesn't Work (Until Setup):**
- Actual Google authentication
- Real Gmail account login/signup

## 🔧 Setup Instructions for Production

To enable **real** Google Gmail signup/login, follow these steps:

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Identity** API (not Google+ - that's deprecated)

### 2. Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**  
3. Choose **Web application**
4. Add authorized origins:
   - `http://localhost:5174` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:5174` (for development) 
   - `https://yourdomain.com` (for production)

### 3. Update Client ID
1. Copy your **real** Client ID from Google Cloud Console
2. Replace the placeholder in `src/hooks/useGoogleAuth.jsx`:
   ```javascript
   const GOOGLE_CLIENT_ID = "1234567890-abcdefghijklmnop.apps.googleusercontent.com"
   ```

### 4. Test Authentication
After updating with your real Client ID:
- Demo mode indicators will disappear
- Google buttons will show normal styling
- Real Gmail authentication will work
- Users can sign up/login with their Google accounts

## ✅ Features Implemented

- ✅ Google OAuth integration with Google Identity Services
- ✅ Seamless integration with existing localStorage user system
- ✅ Error handling and loading states
- ✅ Beautiful UI with Google branding
- ✅ Arabic language support
- ✅ Responsive design

## 🚀 How It Works

1. **New Users**: Google signup creates account in localStorage
2. **Existing Users**: Google login matches by email
3. **User Data**: Includes name, email, profile picture from Google
4. **Session Management**: Same localStorage system as regular users
5. **Profile Pictures**: Google profile images are preserved

## 🎨 UI Features

- **Google-styled buttons** with official Google colors
- **Loading states** with spinners
- **Error messages** in Arabic
- **Responsive design** works on all devices
- **Consistent styling** with app theme
