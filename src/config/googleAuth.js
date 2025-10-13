// 🔧 إعدادات Google OAuth
// لتفعيل تسجيل الدخول بـ Gmail، ضع Client ID الحقيقي هنا

export const GOOGLE_AUTH_CONFIG = {
  // استبدل هذا بـ Client ID الحقيقي من Google Cloud Console
  CLIENT_ID: "your-google-client-id.apps.googleusercontent.com",
  
  // ⚠️ تعليمات مهمة:
  // 1. اذهب إلى: https://console.cloud.google.com/
  // 2. أنشئ مشروع جديد
  // 3. فعّل Google Identity API
  // 4. أنشئ OAuth 2.0 Client ID
  // 5. أضف http://localhost:5174 في Authorized Origins
  // 6. انسخ Client ID والصقه فوق
  
  // 💡 مثال للشكل الصحيح:
  // CLIENT_ID: "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com"
}

// فحص تلقائي لحالة العرض التوضيحي
export const IS_DEMO_MODE = GOOGLE_AUTH_CONFIG.CLIENT_ID.includes("your-google-client-id")
