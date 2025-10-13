# 🔄 تحديث Google Client ID

## 📍 الملف المطلوب تعديله:
`src/config/googleAuth.js` **← ملف الإعدادات الجديد (أسهل!)**

## 📝 السطر المطلوب تغييره:
**السطر رقم 7:**

### ❌ قبل (الحالي):
```javascript
CLIENT_ID: "your-google-client-id.apps.googleusercontent.com",
```

### ✅ بعد (مع Client ID الحقيقي):
```javascript
CLIENT_ID: "ضع_هنا_Client_ID_الحقيقي_الخاص_بك.apps.googleusercontent.com",
```

## 💡 مثال حقيقي:
إذا كان Client ID الخاص بك هو: `123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com`

فسيصبح السطر:
```javascript
CLIENT_ID: "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com",
```

## 🚀 خطوات سريعة:
1. احصل على Client ID من Google Cloud Console
2. افتح `src/config/googleAuth.js` **← الملف الجديد**
3. استبدل السطر رقم 7
4. احفظ الملف  
5. جرب تسجيل الدخول بـ Gmail!

---

## 🎯 كيف تعرف أن التحديث نجح؟

### ✅ علامات النجاح:
- اختفاء كلمة "(عرض توضيحي)" من الأزرار
- تغير لون الأزرار من برتقالي إلى رمادي عادي  
- ظهور نافذة Google الحقيقية عند الضغط على الزر
- إمكانية تسجيل الدخول بحساب Gmail حقيقي

### ❌ علامات وجود مشكلة:
- استمرار ظهور "(عرض توضيحي)"
- رسالة خطأ "redirect_uri_mismatch"
- عدم ظهور نافذة Google

---

**💡 نصيحة:** تأكد من نسخ Client ID كاملاً بدون مسافات إضافية!
