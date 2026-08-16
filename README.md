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

**CodeReview AI** is a full-stack web application that uses **Groq AI (LLaMA 3.3 70B)** to review source code and provide detailed, actionable feedback.

Paste your code, select the programming language, and get a structured AI-powered review with:

- 🔴 **Errors** — critical bugs that may break your code
- 🟡 **Warnings** — bad practices and potential problems
- 🟢 **Good parts** — things implemented correctly
- 🔵 **Info** — suggestions to improve code quality

Every review is saved to your personal history so you can track your progress as a developer.

The application also includes an **AI Review Chatbot**, allowing users to ask follow-up questions about their generated review and understand the feedback in more detail.

---

## 🎥 Demo

<div align="center">

| Editor | Review Panel | AI Chat | History |
|--------|-------------|---------|---------|
| Monaco Editor | AI Issue Cards | Review Q&A | Past Reviews |
| Syntax Highlighting | Score Bar | Context-aware AI | Delete Reviews |
| Auto Suggestions | Fixed Code Tab | Follow-up Questions | Detail View |

</div>

---

## 🚀 Features

```text
✅ AI Code Review        — Powered by Groq (LLaMA 3.3 70B)
✅ AI Review Chat        — Ask questions about your generated review
✅ Review Context        — AI answers using the selected review context
✅ Monaco Editor         — Full VS Code experience in browser
✅ Syntax Highlighting   — For 7 programming languages
✅ Auto Suggestions      — IntelliSense for all languages
✅ Line Highlights       — Red/amber highlights on error lines
✅ Review History        — All reviews saved to MongoDB
✅ Hash-based Dedup      — Detect repeated review requests
✅ Redis Caching         — Avoid unnecessary AI API calls
✅ BullMQ Job Queue      — Asynchronous background processing
✅ JWT Authentication    — Secure login with httpOnly cookies
✅ Protected Routes      — Auth middleware on all API endpoints
✅ Fully Responsive      — Works on mobile, tablet, desktop
✅ Dark Theme            — Easy on the eyes

---

## 💬 AI Review Chatbot

CodeReview AI includes an **AI-powered chatbot for individual code reviews**.

After receiving a review, users can ask follow-up questions about the generated feedback without submitting the code again.

The chatbot uses the selected review as context to generate more relevant and personalized responses.

### Example Questions

```text
Why is this code inefficient?

How can I optimize this solution?

Can you explain the error on line 3?

Why did this code receive a low score?

How can I fix this issue?

Can you suggest a better approach?

Explain this problem in simple terms.

Can you rewrite this part of the code?
```

### Chat Flow

```text
User submits code
       ↓
AI generates code review
       ↓
Review saved to MongoDB
       ↓
User opens the review
       ↓
User asks a question
       ↓
Backend retrieves review context
       ↓
Review context + user question
       ↓
Groq AI / LLaMA 3.3 70B
       ↓
Context-aware AI response
       ↓
Response displayed in chat
```

### Example

```text
User:
Why is this solution inefficient?

AI:
The main issue is the nested loop, which results in
O(n²) time complexity. You can improve it by using
a HashMap and reduce the complexity to O(n).
```

This makes CodeReview AI more than a one-time code reviewer.

It works as an **interactive AI coding assistant** that helps developers understand, debug, optimize, and improve their code.

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

### AI & Backend Processing

![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-f55036?style=flat-square)
![Redis](https://img.shields.io/badge/Redis-Cache-dc382d?style=flat-square&logo=redis)
![BullMQ](https://img.shields.io/badge/BullMQ-Job_Queue-e53935?style=flat-square)

### Deployment

![Render](https://img.shields.io/badge/Render-Deployed-46e3b7?style=flat-square&logo=render)

</div>

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                    │
│                                                             │
│   ┌──────────────┐        ┌─────────────────────┐          │
│   │ Monaco Editor│        │    Review Panel      │          │
│   │              │        │ Score + Issue Cards │          │
│   └──────┬───────┘        └──────────┬──────────┘          │
│          │                           │                      │
│          │                  ┌────────▼─────────┐            │
│          │                  │  AI Review Chat  │            │
│          │                  │ Follow-up Q&A    │            │
│          │                  └────────┬─────────┘            │
│          │                           │                      │
│          └────────────┬──────────────┘                      │
│                       │ Axios                              │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                 SERVER (Express + Node.js)                  │
│                                                             │
│   ┌────────────┐   ┌──────────────┐   ┌─────────────┐     │
│   │Auth Routes │   │Review Routes │   │   Protect   │     │
│   │/register   │   │POST /review  │   │  Middleware │     │
│   │/login      │   │GET /history  │   │ JWT Verify  │     │
│   │/logout     │   │GET /:id      │   └─────────────┘     │
│   └────────────┘   │POST /:id/chat│                         │
│                    └──────┬───────┘                         │
│                           │                                 │
│                           ▼                                 │
│                  ┌──────────────────┐                       │
│                  │ Generate Hash    │                       │
│                  │ SHA-256 / Hash   │                       │
│                  └────────┬─────────┘                       │
│                           │                                 │
│                           ▼                                 │
│                  ┌──────────────────┐                       │
│                  │      Redis       │                       │
│                  │  Cache Lookup    │                       │
│                  └────────┬─────────┘                       │
│                           │                                 │
│                      Cache Miss                            │
│                           │                                 │
│                           ▼                                 │
│                  ┌──────────────────┐                       │
│                  │      BullMQ      │                       │
│                  │    Job Queue     │                       │
│                  └────────┬─────────┘                       │
│                           │                                 │
│                           ▼                                 │
│                  ┌──────────────────┐                       │
│                  │  Review Worker   │                       │
│                  └────────┬─────────┘                       │
│                           │                                 │
│                           ▼                                 │
│                  ┌──────────────────┐                       │
│                  │ Groq / LLaMA 3.3 │                       │
│                  │       70B        │                       │
│                  └────────┬─────────┘                       │
│                           │                                 │
│                    ┌──────┴───────┐                         │
│                    ▼              ▼                         │
│               ┌─────────┐   ┌──────────┐                    │
│               │ MongoDB │   │  Redis   │                    │
│               │ Reviews │   │  Cache   │                    │
│               └─────────┘   └──────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Hashing + Redis + BullMQ

To improve performance and avoid unnecessary AI API calls, CodeReview AI uses a combination of **hashing, Redis caching, and BullMQ background processing**.

### 1. 🔐 Hashing for Duplicate Detection

When code is submitted for review, the application generates a hash from the submitted code.

```text
User Code
    ↓
Generate Hash
    ↓
Unique Cache Key
```

A cache key can be generated using the hash:

```text
cache:review:<hash>
```

The hash allows the application to identify repeated review requests.

---

### 2. 🚀 Redis Caching

Redis is used as a fast cache for previously generated AI reviews.

```text
Code Submitted
      ↓
Generate Hash
      ↓
Check Redis
      │
      ├─────────────── Cache Hit
      │                      ↓
      │                Return Cached Review
      │
      └─────────────── Cache Miss
                             ↓
                       Create BullMQ Job
```

If the same code has already been reviewed and the result exists in Redis, the application can reuse the cached review instead of making another AI request.

This helps reduce:

- Unnecessary AI API calls
- AI processing time
- Response latency for repeated requests
- AI API usage/cost

---

### 3. 🔄 BullMQ Background Processing

When a review is not available in Redis, the application creates a **BullMQ job**.

The job is processed by a separate review worker.

```text
Client
  ↓
Express API
  ↓
Generate Hash
  ↓
Check Redis
  ↓
Cache Miss
  ↓
BullMQ Queue
  ↓
Review Worker
  ↓
Groq / LLaMA 3.3 70B
  ↓
Generate Review
  ↓
Store Review
  ↓
Cache Result in Redis
```

This separates potentially slower AI processing from the main API logic and provides a foundation for processing multiple review jobs asynchronously.

---

### 🧩 Why This Architecture?

```text
Hashing
   ↓
Identify repeated requests

Redis
   ↓
Fast access to cached reviews

BullMQ
   ↓
Asynchronous background processing

Worker
   ↓
Handles AI review jobs

LLM
   ↓
Generates intelligent code feedback
```

Together, these components create a more efficient architecture for an AI-powered code review system.

---

## 📁 Project Structure

```text
CodeReviewer/
├── 📂 backend/
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   └── reviewController.js
│   │
│   ├── 📂 middleware/
│   │   └── auth.js
│   │
│   ├── 📂 models/
│   │   ├── User.js
│   │   └── Review.js
│   │
│   ├── 📂 routes/
│   │   ├── auth.js
│   │   └── review.js
│   │
│   ├── 📂 workers/
│   │   └── reviewWorker.js
│   │
│   ├── 📂 queues/
│   │   └── reviewQueue.js
│   │
│   ├── server.js
│   └── package.json
│
└── 📂 frontend/
    ├── 📂 src/
    │   ├── 📂 api/
    │   │   ├── axios.js
    │   │   └── review.js
    │   │
    │   ├── 📂 components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── ChatBot.jsx
    │   │   └── 📂 review/
    │   │       ├── CodeEditor.jsx
    │   │       ├── ReviewPanel.jsx
    │   │       ├── IssueCard.jsx
    │   │       ├── ScoreBar.jsx
    │   │       └── suggestions.js
    │   │
    │   ├── 📂 context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── 📂 pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Editor.jsx
    │   │   └── HistoryPage.jsx
    │   │
    │   └── App.jsx
    │
    └── package.json
```

---

## ⚡ Getting Started

### Prerequisites

```text
Node.js >= 18
MongoDB
Redis
Groq API Key
```

### 1. Clone the Repository

```bash
git clone https://github.com/Harsh88-cmd/CodeReviewer.git
cd CodeReviewer
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key

CLIENT_URL=http://localhost:5173

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

Start the backend:

```bash
npm run dev
```

---

### 3. Start Redis

If Redis is installed locally, start your Redis server.

Or using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis
```

Test the connection:

```bash
docker exec -it redis redis-cli ping
```

Expected output:

```text
PONG
```

---

### 4. Start the Review Worker

Run the worker separately:

```bash
npm run worker
```

Use the actual worker script configured in your `package.json`.

---

### 5. Setup Frontend

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

---

### 6. Open the Application

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Never commit real API keys, database credentials, JWT secrets, or other private credentials to GitHub.

Add these to `.gitignore`:

```gitignore
node_modules/
.env
.env.local
dist/
```

Provide a safe `.env.example` instead:

```env
PORT=
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
CLIENT_URL=
REDIS_HOST=
REDIS_PORT=
```

---

## 🧠 How AI Review Works

```text
1. User pastes code in Monaco Editor
              ↓
2. User selects programming language
              ↓
3. User clicks "Review"
              ↓
4. Frontend sends POST /api/review
              ↓
5. JWT authentication is verified
              ↓
6. Backend generates a hash of the code
              ↓
7. Redis is checked using the hash
              ↓
       ┌──────┴──────┐
       │             │
    Cache Hit     Cache Miss
       │             │
       ▼             ▼
 Return cached    Create BullMQ Job
 review               ↓
                   Worker
                     ↓
                Groq AI
                     ↓
             LLaMA 3.3 70B
                     ↓
             Structured Review
                     ↓
              MongoDB + Redis
                     ↓
                 Response
```

The AI generates structured feedback such as:

```json
{
  "score": 62,
  "issues": [
    {
      "type": "error",
      "line": "Line 3",
      "title": "Potential bug",
      "fix": "..."
    },
    {
      "type": "warning",
      "line": "Line 2",
      "title": "Inefficient approach",
      "fix": "..."
    }
  ]
}
```

The frontend then displays:

- Score bar
- Error cards
- Warning cards
- Good parts
- Information cards
- Line highlights
- Fixed code suggestions

---

## 💬 How AI Review Chat Works

```text
1. User opens an existing review
              ↓
2. User asks a question
              ↓
3. Frontend sends:
   POST /api/review/:id/chat
              ↓
4. Backend verifies authenticated user
              ↓
5. Backend retrieves the selected review
              ↓
6. Review context + question
   are sent to Groq AI
              ↓
7. LLaMA 3.3 70B generates answer
              ↓
8. Response returned to frontend
              ↓
9. User can continue asking questions
```

The chatbot can answer questions such as:

```text
"Why is this approach slow?"

"Can you explain this error?"

"How can I optimize this code?"

"What is the time complexity?"

"Show me a better solution."

"Explain this issue like a beginner."
```

---

## 🌍 Supported Languages

| Language | Syntax Highlighting | AI Review | Auto Suggestions |
|----------|--------------------:|----------:|-----------------:|
| JavaScript | ✅ | ✅ | ✅ Built-in |
| TypeScript | ✅ | ✅ | ✅ Built-in |
| Python | ✅ | ✅ | ✅ Custom |
| Java | ✅ | ✅ | ✅ Custom |
| C++ | ✅ | ✅ | ✅ Custom |
| Go | ✅ | ✅ | ✅ Custom |
| Rust | ✅ | ✅ | ✅ Custom |

---

## 🔐 Security Features

```text
✅ JWT stored in httpOnly cookies
   → Helps protect tokens from client-side JavaScript access

✅ bcrypt password hashing
   → Passwords are never stored as plain text

✅ Auth middleware on protected routes
   → Unauthorized users cannot access protected resources

✅ User-scoped review data
   → Users can only access their own reviews

✅ CORS whitelist
   → Controls which frontend origins can access the backend

✅ Input validation
   → Validates code and language input

✅ Error handling
   → Prevents sensitive internal information from being exposed
```

---

## 📱 Responsive Design

```text
Desktop
→ Editor + Review panel side by side

Tablet
→ Responsive review panel

Mobile
→ Editor / Review tab switcher

AI Chat
→ Responsive chatbot interface
```

---

## 📸 Screenshots

Add screenshots of your application here.

### Code Editor

```markdown
![Code Editor](./screenshots/code-editor.png)
```

### AI Code Review

```markdown
![AI Review](./screenshots/ai-review.png)
```

### AI Review Chatbot

```markdown
![AI Review Chat](./screenshots/review-chat.png)
```

### Review History

```markdown
![Review History](./screenshots/review-history.png)
```

---

## 🌐 Live Demo

### Frontend

https://codereviewer-1-itxq.onrender.com

### Backend

https://codereviewer-ri4k.onrender.com

### GitHub

https://github.com/Harsh88-cmd/CodeReviewer

---

## 🤝 What I Learned Building This

Through this project, I learned and implemented:

- Building a full-stack MERN application
- JWT authentication with httpOnly cookies
- REST API development
- Prompt engineering for structured AI responses
- Groq AI / LLaMA 3.3 70B integration
- Building a context-aware AI chatbot
- Review-specific AI conversations
- Monaco Editor integration
- React component architecture
- MongoDB schema design
- User-specific data management
- Hash-based request deduplication
- Redis caching
- BullMQ job queues
- Background worker architecture
- Asynchronous AI processing
- API performance optimization
- CORS and backend security
- Deployment on Render
- Building scalable AI-powered workflows

---

## 🔮 Future Improvements

- Streaming AI responses
- More detailed code analysis
- Better security vulnerability detection
- Multi-file repository reviews
- GitHub repository integration
- Pull request review automation
- RAG-based coding knowledge
- Code execution in a secure sandbox
- Review comparison and analytics
- Persistent AI chat history
- Conversation history for each review
- More advanced AI debugging agents
- AI-powered refactoring
- AI-generated optimized code
- Repository-level code review

---

## 👨‍💻 Author

<div align="center">

**Harsh Maurya**

[![GitHub](https://img.shields.io/badge/GitHub-Harsh88--cmd-181717?style=for-the-badge&logo=github)](https://github.com/Harsh88-cmd)

*Built from scratch as a full-stack AI project 🚀*

</div>

---

<div align="center">

### ⭐ If you found this project useful, please star the repository!

*It helps other developers discover the project.*

</div>
