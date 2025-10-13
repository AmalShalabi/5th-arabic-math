# 🔧 تعليمات إعداد Google OAuth - خطوة بخطوة

## ✅ الخطوات المطلوبة:

### 1️⃣ إنشاء مشروع Google Cloud
1. اذهب إلى: https://console.cloud.google.com/
2. سجل دخول بحساب Google
3. اضغط "New Project" 
4. أدخل اسم: "Math-5th-Grade-App"
5. اضغط "Create"

### 2️⃣ تفعيل Google Identity API
1. في Dashboard: "APIs & Services" > "Library"
2. ابحث عن: "Google Identity"
3. اضغط "Enable"

### 3️⃣ إعداد OAuth Consent Screen
1. "APIs & Services" > "OAuth consent screen"
2. اختر "External"
3. املأ البيانات:
   - **App name**: تعلم الرياضيات مع جمانة
   - **User support email**: بريدك الإلكتروني
   - **Developer contact**: بريدك الإلكتروني
4. اضغط "Save and Continue" للجميع

### 4️⃣ إنشاء OAuth Client ID
1. "APIs & Services" > "Credentials"
2. اضغط "+ CREATE CREDENTIALS"
3. اختر "OAuth client ID"
4. "Application type": **Web application**
5. "Name": Math App Web Client

### 5️⃣ إضافة Authorized Origins
في "Authorized JavaScript origins" أضف:
```
http://localhost:5174
http://localhost:5173
```

### 6️⃣ الحصول على Client ID
1. اضغط "Create"
2. **انسخ Client ID** (مثل: 123456789-abc123def456.apps.googleusercontent.com)

---

## 🔄 كيفية تحديث التطبيق:

بعد الحصول على Client ID الحقيقي، اتبع هذه الخطوات:

### الخطوة الأولى: تحديث الكود
1. افتح ملف: `src/hooks/useGoogleAuth.jsx`
2. ابحث عن السطر رقم 4:
```javascript
const GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com"
```

3. استبدله بـ Client ID الحقيقي الخاص بك:
```javascript
const GOOGLE_CLIENT_ID = "123456789-abc123def456.apps.googleusercontent.com"
```

### الخطوة الثانية: حفظ التغييرات
1. احفظ الملف (Ctrl + S)
2. أعد تشغيل الخادم إذا لزم الأمر

---

## ✅ النتيجة النهائية:

بعد التحديث ستحصل على:
- ✅ تسجيل دخول حقيقي بـ Gmail
- ✅ إنشاء حسابات جديدة بـ Google
- ✅ لا توجد رسائل "وضع العرض التوضيحي"
- ✅ أزرار Google بلون أزرق عادي

---

## 🆘 إذا واجهت مشاكل:

### مشكلة شائعة: "This app isn't verified"
- هذا طبيعي للتطبيقات الجديدة
- اضغط "Advanced" ثم "Go to [App Name] (unsafe)"
- أو أضف بريدك الإلكتروني في "Test users"

### مشكلة أخرى: "redirect_uri_mismatch"  
- تأكد من إضافة `http://localhost:5174` في Authorized Origins
- تأكد من عدم وجود slash إضافي في النهاية

---

## 📞 تحتاج مساعدة؟
أخبرني إذا واجهت أي مشكلة في أي خطوة!
