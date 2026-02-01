# 🗺️ Feature Location Guide

## Quick Reference: Where to Find Each Feature

### 🛡️ AI Fraud Alert System
**Location:** Report Issue Page
- **URL:** `http://localhost:8080/report`
- **How to Access:**
  1. Click "Report Issue" in navigation
  2. Scroll to "Evidence" section
  3. Upload an image
  4. Try uploading the same image again
  5. Fraud alert dialog will appear

**Visual Indicator:** Red alert dialog with warning icon

---

### 💬 AI Chatbot
**Location:** Floating Button (All Pages)
- **Position:** Bottom-right corner of screen
- **How to Access:**
  1. Look for blue circular button with message icon
  2. Click to open chat window
  3. Type your question
  4. Get instant response

**Visual Indicator:** Blue floating button with MessageCircle icon

**Try These Questions:**
- "How do I report an issue?"
- "What are rewards?"
- "Tell me about Aadhaar verification"
- "How do I track my issues?"

---

### 📊 Analytics Dashboard
**Location:** User Menu → Analytics
- **URL:** `http://localhost:8080/analytics`
- **How to Access:**
  1. Login to your account
  2. Click on your avatar (top-right)
  3. Select "Analytics" from dropdown menu

**Visual Indicator:** BarChart3 icon in menu

**What You'll See:**
- 4 stat cards (Total, Resolved, In Progress, Pending)
- Pie chart (Issues by Status)
- Bar chart (Issues by Category)
- Line chart (7-day Timeline)
- Resolution rate percentage

---

### 🌐 Language Toggle
**Location:** Header (Top Navigation)
- **Position:** Top-right, next to notifications bell
- **How to Access:**
  1. Look for button showing "हिंदी" or "English"
  2. Click to switch language
  3. All text changes instantly

**Visual Indicator:** Languages icon with text

**What Changes:**
- Navigation menu
- All buttons and labels
- Form fields
- Chatbot messages
- Analytics labels
- Alert messages

---

### 🔐 Aadhaar Verification
**Location:** Auth Page / Settings
- **URL:** `http://localhost:8080/auth` (during signup)
- **How to Access:**
  1. Go to Sign Up tab
  2. Look for "Verify Aadhaar" option
  3. Or access from Settings after login

**Visual Indicator:** Shield icon with verification dialog

**Test Flow:**
1. Enter any 12-digit number (e.g., 123456789012)
2. Click "Send OTP"
3. Enter any 6 digits
4. Click "Verify"
5. Success message appears

---

### 🔒 Privacy Features
**Location:** Throughout Platform
- **Report Issue Page:** Privacy notice card at top
- **Evidence Upload:** Auto-blur notice
- **Aadhaar Dialog:** Privacy information panel

**Visual Indicators:**
- Shield icons
- Blue information panels
- Privacy notices

---

## 🎯 Testing Each Feature

### 1. Test Fraud Detection (5 minutes)
```
1. Go to: http://localhost:8080/report
2. Select any category
3. Fill in title and description
4. Upload an image (any image)
5. Try uploading the SAME image again
6. ✅ Fraud alert should appear
```

### 2. Test Chatbot (3 minutes)
```
1. Click floating chat button (bottom-right)
2. Type: "How do I report an issue?"
3. ✅ Should get detailed response
4. Click language toggle
5. Type: "मदद" (help in Hindi)
6. ✅ Should get Hindi response
```

### 3. Test Analytics (2 minutes)
```
1. Login to your account
2. Click avatar → Analytics
3. ✅ Should see charts and statistics
4. Switch between tabs (Overview, Category, Timeline)
5. ✅ All charts should render
```

### 4. Test Language Toggle (1 minute)
```
1. Click language button in header
2. ✅ All text should change to Hindi
3. Click again
4. ✅ All text should change back to English
5. Refresh page
6. ✅ Language preference should persist
```

### 5. Test Aadhaar Verification (2 minutes)
```
1. Go to: http://localhost:8080/auth
2. Click "Sign Up" tab
3. Click "Verify Aadhaar" (if available)
4. Enter: 123456789012
5. Click "Send OTP"
6. Enter: 123456
7. Click "Verify"
8. ✅ Success message should appear
```

---

## 📱 Mobile Testing

All features are responsive. Test on mobile by:
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select mobile device (e.g., iPhone 12)
4. Test all features

**Mobile-Specific Features:**
- Hamburger menu for navigation
- Responsive chatbot window
- Touch-friendly analytics charts
- Mobile-optimized language toggle

---

## 🎨 Visual Guide

### Header Layout
```
[Logo] [Nagrik Samadhan]  [Browse] [Report] [Leaderboard] [About]  [Language] [🔔] [Avatar ▼]
```

### User Menu Dropdown
```
┌─────────────────────────┐
│ User Name               │
│ email@example.com       │
│ 🏆 1250 Points         │
├─────────────────────────┤
│ 📄 My Issues           │
│ 📊 Analytics           │ ← NEW!
│ 💰 Wallet & Rewards    │
│ ⚙️  Settings           │
├─────────────────────────┤
│ 🚪 Sign Out            │
└─────────────────────────┘
```

### Chatbot Window
```
┌─────────────────────────┐
│ 🤖 Support Assistant  ✕ │
├─────────────────────────┤
│                         │
│  🤖 Hello! How can I   │
│     help you today?     │
│                         │
│     How do I report? 👤 │
│                         │
│  🤖 To report an issue: │
│     1. Click Report...  │
│                         │
├─────────────────────────┤
│ [Type your question...] │
└─────────────────────────┘
```

### Analytics Dashboard Layout
```
┌─────────────────────────────────────┐
│ Analytics Dashboard                 │
├─────────────────────────────────────┤
│ [Total] [Resolved] [Progress] [Pend]│
├─────────────────────────────────────┤
│ [Overview] [Category] [Timeline]    │
│                                     │
│  📊 Charts and Graphs               │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### Feature Not Visible?
1. **Chatbot:** Check bottom-right corner, might be hidden by other elements
2. **Language Toggle:** Look in header, between navigation and notifications
3. **Analytics:** Must be logged in to see in user menu
4. **Fraud Alert:** Only appears when uploading duplicate images

### Feature Not Working?
1. **Clear browser cache:** Ctrl + Shift + Delete
2. **Check console:** F12 → Console tab for errors
3. **Verify login:** Some features require authentication
4. **Refresh page:** Ctrl + R or F5

### Build Issues?
```bash
# Clean install
rm -rf node_modules
npm install

# Rebuild
npm run build

# Restart dev server
npm run dev
```

---

## 📊 Feature Availability Matrix

| Feature | Guest User | Logged In | Mobile | Desktop |
|---------|-----------|-----------|--------|---------|
| Chatbot | ✅ | ✅ | ✅ | ✅ |
| Language Toggle | ✅ | ✅ | ✅ | ✅ |
| Fraud Detection | ✅ | ✅ | ✅ | ✅ |
| Analytics | ❌ | ✅ | ✅ | ✅ |
| Aadhaar Verify | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 Quick Start Checklist

- [ ] Server running on http://localhost:8080
- [ ] Open browser to localhost:8080
- [ ] Click chatbot button (bottom-right)
- [ ] Try language toggle (top-right)
- [ ] Login to test analytics
- [ ] Go to /report to test fraud detection
- [ ] Test Aadhaar verification in auth page

---

## 📞 Need Help?

**Documentation:**
- Full details: `AI_FEATURES.md`
- Summary: `IMPLEMENTATION_SUMMARY.md`
- This guide: `FEATURE_LOCATIONS.md`

**Common URLs:**
- Home: http://localhost:8080/
- Report: http://localhost:8080/report
- Analytics: http://localhost:8080/analytics
- Auth: http://localhost:8080/auth
- Issues: http://localhost:8080/issues

---

**Happy Testing! 🚀**
 
