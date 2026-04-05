<div align="center">

# 🔍 CodeReview AI

### *Your personal AI-powered code reviewer — like having a senior dev on call 24/7*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-6c63ff?style=for-the-badge)](https://codereviewer-1-itxq.onrender.com)
[![Backend](https://img.shields.io/badge/⚙️_Backend-Render-00b4d8?style=for-the-badge)](https://codereviewer-ri4k.onrender.com)
[![Made with Love](https://img.shields.io/badge/Made_with-❤️-ff6b6b?style=for-the-badge)](#)

<br/>

![CodeReview AI Banner](https://via.placeholder.com/900x400/0d0d0d/6c63ff?text=CodeReview+AI+%E2%80%94+AI+Powered+Code+Reviewer)

<br/>

> Paste your code → Get instant AI feedback → Fix bugs faster 🚀

</div>

---

## ✨ What is CodeReview AI?

**CodeReview AI** is a full-stack web application that uses **Groq AI (LLaMA 3)** to review your code in real time. Paste any code snippet, select your language, and get back a detailed review with:

- 🔴 **Errors** — critical bugs that will break your code
- 🟡 **Warnings** — bad practices you should fix
- 🟢 **Good parts** — what you did right
- 🔵 **Info** — suggestions to improve code quality

Every review is saved to your personal history — so you can track your growth as a developer over time.

---

## 🎥 Demo

<div align="center">

| Editor | Review Panel | History |
|--------|-------------|---------|
| Monaco Editor (VS Code) | AI Issue Cards | Past Reviews |
| Syntax Highlighting | Score Bar | Delete Reviews |
| Auto Suggestions | Fixed Code Tab | Detail View |

</div>

---

## 🚀 Features

```
✅ AI Code Review        — Powered by Groq (LLaMA 3.3 70B)
✅ Monaco Editor         — Full VS Code experience in browser
✅ Syntax Highlighting   — For 7 programming languages
✅ Auto Suggestions      — IntelliSense for all languages
✅ Line Highlights       — Red/amber highlights on error lines
✅ Review History        — All reviews saved to MongoDB
✅ JWT Authentication    — Secure login with httpOnly cookies
✅ Protected Routes      — Auth middleware on all API endpoints
✅ Fully Responsive      — Works on mobile, tablet, desktop
✅ Dark Theme            — Easy on the eyes
```

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code-007acc?style=flat-square&logo=visualstudiocode)
![Axios](https://img.shields.io/badge/Axios-HTTP-5a29e4?style=flat-square)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=flat-square&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)

### AI & Deployment
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-f55036?style=flat-square)
![Render](https://img.shields.io/badge/Render-Deployed-46e3b7?style=flat-square&logo=render)

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                 │
│                                                          │
│   ┌──────────────┐          ┌─────────────────────┐     │
│   │ Monaco Editor│          │    Review Panel      │     │
│   │ (Left Panel) │          │ ScoreBar + IssueCards│     │
│   └──────┬───────┘          └──────────┬──────────┘     │
│          │                             │                  │
│          └──────────┬──────────────────┘                  │
│                     │ Axios (withCredentials)              │
└─────────────────────┼───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 SERVER (Express + Node.js)                │
│                                                          │
│   ┌────────────┐   ┌──────────────┐   ┌─────────────┐  │
│   │Auth Routes │   │Review Routes │   │   Protect   │  │
│   │/register   │   │POST /review  │   │  Middleware  │  │
│   │/login      │   │GET  /history │   │ (JWT verify) │  │
│   │/logout     │   │DELETE /:id   │   └─────────────┘  │
│   └────────────┘   └──────┬───────┘                     │
│                            │                             │
│              ┌─────────────┼─────────────┐               │
│              ▼             ▼             ▼               │
│        ┌──────────┐ ┌──────────┐ ┌───────────┐         │
│        │ MongoDB  │ │  Groq AI │ │   bcrypt  │         │
│        │  Atlas   │ │ LLaMA 3  │ │    JWT    │         │
│        └──────────┘ └──────────┘ └───────────┘         │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
CodeReviewer/
├── 📂 backend/
│   ├── 📂 controllers/
│   │   ├── authController.js      # register, login, logout
│   │   └── reviewController.js    # createReview, getHistory, delete
│   ├── 📂 middleware/
│   │   └── auth.js                # JWT protect middleware
│   ├── 📂 models/
│   │   ├── User.js                # Mongoose user schema
│   │   └── Review.js              # Mongoose review schema
│   ├── 📂 routes/
│   │   ├── auth.js                # /api/auth routes
│   │   └── review.js              # /api/review routes
│   ├── server.js                  # Express entry point
│   └── package.json
│
└── 📂 frontend/
    ├── 📂 src/
    │   ├── 📂 api/
    │   │   ├── axios.js           # Axios instance + interceptors
    │   │   └── review.js          # Review API calls
    │   ├── 📂 components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── 📂 review/
    │   │       ├── CodeEditor.jsx  # Monaco editor + highlights
    │   │       ├── ReviewPanel.jsx # Score + issue cards
    │   │       ├── IssueCard.jsx   # Single issue display
    │   │       ├── ScoreBar.jsx    # Animated score bar
    │   │       └── suggestions.js  # Language snippets
    │   ├── 📂 context/
    │   │   └── AuthContext.jsx    # Global auth state
    │   ├── 📂 pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Editor.jsx         # Main editor page
    │   │   └── HistoryPage.jsx    # Review history
    │   └── App.jsx                # Routes
    └── package.json
```

---

## ⚡ Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
MongoDB (local or Atlas)
Groq API Key (free at console.groq.com)
```

### 1. Clone the repo

```bash
git clone https://github.com/Harsh88-cmd/CodeReviewer.git
cd CodeReviewer
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/codereviewai
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

### 4. Open the app

```
http://localhost:5173
```

---

## 🔐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ❌ |
| POST | `/api/review` | Submit code for AI review | ✅ |
| GET | `/api/review/history` | Get user's review history | ✅ |
| GET | `/api/review/:id` | Get single review | ✅ |
| DELETE | `/api/review/:id` | Delete a review | ✅ |

---

## 🧠 How AI Review Works

```
1. User pastes code in Monaco Editor
         ↓
2. Clicks "Review →" button
         ↓
3. Frontend sends POST /api/review
         ↓
4. protect middleware verifies JWT cookie
         ↓
5. Backend sends code to Groq AI (LLaMA 3.3 70B)
   with a carefully engineered prompt
         ↓
6. Groq returns structured JSON:
   {
     score: 62,
     issues: [
       { type: "error", line: "Line 3", title: "...", fix: "..." },
       { type: "warning", line: "Line 2", ... }
     ]
   }
         ↓
7. Review saved to MongoDB with user ID
         ↓
8. Frontend shows:
   • Score bar (0-100)
   • Issue cards (error/warning/good/info)
   • Red/amber line highlights in editor
```

---

## 🌍 Supported Languages

| Language | Syntax Highlighting | AI Review | Auto Suggestions |
|----------|--------------------:|----------:|-----------------:|
| JavaScript | ✅ | ✅ | ✅ (built-in) |
| TypeScript | ✅ | ✅ | ✅ (built-in) |
| Python | ✅ | ✅ | ✅ (custom) |
| Java | ✅ | ✅ | ✅ (custom) |
| C++ | ✅ | ✅ | ✅ (custom) |
| Go | ✅ | ✅ | ✅ (custom) |
| Rust | ✅ | ✅ | ✅ (custom) |

---

## 🔒 Security Features

```
✅ JWT stored in httpOnly cookies    → XSS attacks can't steal tokens
✅ bcrypt password hashing           → passwords never stored plain
✅ Auth middleware on all routes     → unauthorized access blocked
✅ User-scoped data                  → users only see their own reviews
✅ CORS whitelist                    → only frontend can call backend
✅ Input validation                  → code length + language checks
✅ Error handling                    → no sensitive info leaked
```

---

## 📱 Responsive Design

```
Desktop  → Editor + Review panel side by side
Tablet   → Slightly narrower review panel
Mobile   → Tab switcher (Editor | Review)
           Tap "Review →" → auto switches to Review tab
```

---

## 🤝 What I Learned Building This

- Building a **production-ready MERN stack** app from scratch
- **JWT authentication** with httpOnly cookies
- **Prompt engineering** to get structured JSON from AI
- **Monaco Editor** integration and decorations API
- **React patterns** — lifting state, component composition, custom hooks
- **MongoDB** schema design — references vs embedded documents
- **Deployment** on Render with environment variables
- **Security** — CORS, auth middleware, input validation

---

## 👨‍💻 Author

<div align="center">

**Harsh**

[![GitHub](https://img.shields.io/badge/GitHub-Harsh88--cmd-181717?style=for-the-badge&logo=github)](https://github.com/Harsh88-cmd)

*Built from scratch as my first full-stack project 🚀*

</div>

---

<div align="center">

### ⭐ If you found this useful, please star the repo!

*It helps other developers discover the project*

</div>