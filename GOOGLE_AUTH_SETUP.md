# Google Authentication Setup

## 🔧 Setup Instructions

To enable Google Gmail signup/login, you need to get a Google OAuth Client ID:

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API

### 2. Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. Choose **Web application**
4. Add authorized origins:
   - `http://localhost:5174` (for development)
   - Your production domain (for deployment)

### 3. Update Client ID
1. Copy your Client ID from Google Cloud Console
2. Replace the placeholder in `src/hooks/useGoogleAuth.js`:
   ```javascript
   const GOOGLE_CLIENT_ID = "YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com"
   ```

## 🎯 Demo Mode

Currently, the app runs in demo mode with a placeholder Client ID. The Google login buttons are visible but will show an error when clicked.

To test the UI without setting up Google OAuth:
- The buttons are styled and functional
- Error handling is implemented
- Integration with localStorage is complete

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
