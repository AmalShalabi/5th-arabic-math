# 🚀 Quick Deployment Guide - Netlify

## Step 1: Go to Netlify
Visit: https://www.netlify.com

## Step 2: Sign Up
- Click "Sign up"
- Use your GitHub account

## Step 3: Deploy
1. Click "Add new site"
2. Choose "Import an existing project"
3. Select "GitHub"
4. Choose: `AmalShalabi/5th-arabic-math`
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

## Step 4: Wait
- Deployment takes 2-3 minutes
- You'll get a URL like: `https://your-site.netlify.app`

## ✅ Done!

Your site is now live with:
- ✅ Student login/signup system
- ✅ Email authentication
- ✅ User name display
- ✅ Protected pages
- ✅ Automatic updates on every git push

---

## 🔐 Test Account

**Email:** demo@test.com  
**Password:** 123456

---

## 📝 Features

### Authentication System:
- `/login` - Login page
- `/signup` - Signup page
- User menu with name display
- Logout functionality
- Protected routes (requires login)

### Data Storage:
- Currently: localStorage (browser-based)
- Future: Can upgrade to Firebase/Supabase

---

## 🔄 Auto-Updates

Every time you push to GitHub:
```bash
git push
```

Netlify automatically:
1. Builds your app
2. Deploys new version
3. Updates live site (2-3 minutes)

---

## 📖 Full Documentation

See: `دليل-النشر-على-Netlify.md` (Arabic)

---

Made with ❤️ for 5th Grade Math Students

