# 🔐 AUTH — Full-Stack Auth System

A simple, clean authentication system with **Sign Up**, **Login**, **Email Verification (OTP)**, and **Password Reset**. Built with React + Vite on the frontend and Node + Express + MongoDB on the backend.

---

## What’s inside?

- **Sign Up / Login** — JWT in httpOnly cookies, so it’s secure.
- **Email verification** — OTP on email, verify account after signup.
- **Password reset** — Forgot password → OTP on email → set new password.
- **Protected routes** — Some APIs need login; frontend knows if user is logged in.
- **Welcome / OTP emails** — Nodemailer with HTML templates.

No fancy jargon — just sign up, log in, verify email, reset password. That’s it.

---

## Tech stack

| Part      | Stack |
|----------|--------|
| Frontend | React 19, Vite, Tailwind CSS, Motion, React Router, Axios, React Toastify |
| Backend  | Node.js, Express 5, MongoDB (Mongoose), JWT, bcrypt, Nodemailer |
| Auth     | JWT (httpOnly cookie), bcrypt for passwords, OTP for email & reset |

---

## Quick start (run on your machine)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd AUTH
```

Install dependencies for both client and server:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Environment variables

**Server** — inside `server/` create a `.env` file:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET_KEY=your-super-secret-key-change-in-production

# For emails (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SENDER=your-email@gmail.com
```

**Client** — inside `client/` create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

*(Use your real MongoDB URI, a strong JWT secret, and real SMTP credentials. For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your normal password.)*

### 3. Run the app

**Terminal 1 — backend**

```bash
cd server
npm run server
```

*(Or `npm start` — server runs on port 4000 by default.)*

**Terminal 2 — frontend**

```bash
cd client
npm run dev
```

Open the URL Vite shows (usually `http://localhost:5173`). You’re good to go.

---

## Project structure (in short)

```
AUTH/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Header, Navbar
│   │   ├── context/       # AppContext (auth state)
│   │   ├── pages/         # Home, Login, VerifyEmail, ResetPass
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # DB, Nodemailer, email templates
│   ├── controllers/       # authController, userController
│   ├── middleware/        # userAuth, optionalAuth
│   ├── models/            # userModel
│   ├── routes/            # authRoutes, userRoutes
│   └── server.js
└── README.md
```

- **Backend** handles: register, login, logout, send/verify OTP (email + reset), reset password, and “am I logged in?”.
- **Frontend** talks to these APIs, keeps auth state in context, and shows loading/toasts so it doesn’t feel slow or confusing.

---

## API overview (for humans)

| What you want to do   | Method | Endpoint | Notes |
|----------------------|--------|----------|--------|
| Sign up              | POST   | `/api/auth/register` | Body: name, email, password |
| Log in               | POST   | `/api/auth/login`    | Body: email, password |
| Log out              | POST   | `/api/auth/logout`   | Clears cookie |
| Am I logged in?      | GET    | `/api/auth/is-auth`  | Returns `{ success: true/false }` |
| Send verify OTP      | POST   | `/api/auth/send-verify-otp` | Needs auth |
| Verify account (OTP) | POST   | `/api/auth/verify-account` | Body: otp |
| Send reset OTP       | POST   | `/api/auth/send-reset-otp` | Body: email |
| Verify reset OTP     | POST   | `/api/auth/verify-reset-otp` | Body: email, otp |
| Reset password       | POST   | `/api/auth/reset-password`  | Body: email, otp, newPassword |
| Get my profile       | GET    | `/api/user/data`     | Needs auth |

All auth APIs use the same base URL you set in `VITE_BACKEND_URL` (e.g. `http://localhost:4000`).

---

## Scripts you’ll use

**Server**

- `npm start` — run server (node)
- `npm run server` — run with nodemon (auto-restart on file change)

**Client**

- `npm run dev` — start dev server (Vite)
- `npm run build` — production build
- `npm run preview` — preview production build locally

---

## One more thing

- Keep `.env` files **out of Git** (they’re in `.gitignore`). Never commit real DB URLs, JWT secrets, or SMTP passwords.
- For production, use a proper MongoDB (e.g. Atlas), a strong `JWT_SECRET_KEY`, and set `NODE_ENV=production`. Also point `VITE_BACKEND_URL` to your real backend URL.

If something doesn’t work, check: MongoDB running?, `.env` in both `client/` and `server/`?, and both servers running (4000 + 5173). Then try again — you’ve got this.

---

## Deploy kaise karein (Vercel + Render, free)

Pura app online lane ke liye teen cheezein chahiye: **database**, **backend**, **frontend**. Sab free tier pe ho sakta hai.

### Step 0: Code GitHub pe hona chahiye

Pehle repo GitHub pe push karo (neeche “Push this project to GitHub” section dekho). Render aur Vercel GitHub se hi connect karte hain.

---

### Step 1: Database — MongoDB Atlas (free)

1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) pe jao → **Sign up** / Login.
2. **Create** → **M0 Free** cluster choose karo → region select karo → Create.
3. **Database Access** → Add user → username/password banao (yaad rakhna) → Add User.
4. **Network Access** → Add IP → **Allow access from anywhere** (0.0.0.0/0) → Confirm.
5. **Database** → **Connect** → **Drivers** → copy **connection string**.  
   Example: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/`  
   Isme `<password>` ko apne user ka real password se replace karo.

Ye URL baad mein **backend** ke env mein use karenge.

---

### Step 2: Backend — Render pe deploy (free)

1. [render.com](https://render.com) pe jao → Sign up (GitHub se login best).
2. **Dashboard** → **New +** → **Web Service**.
3. **Connect** apna GitHub repo (AUTH) → select karo.
4. Settings aise set karo:

   | Field | Value |
   |-------|--------|
   | **Name** | `auth-api` (ya jo naam chaho) |
   | **Region** | Singapore / Oregon (jo pass ho) |
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance type** | Free |

5. **Environment** section mein ye variables add karo (key-value):

   | Key | Value |
   |-----|--------|
   | `NODE_ENV` | `production` |
   | `PORT` | `4000` (Render khud bhar deta hai, phir bhi daal do) |
   | `MONGODB_URI` | Atlas wala full URL (password replace karke) |
   | `JWT_SECRET_KEY` | koi strong random string (32+ chars) |
   | `FRONTEND_URL` | abhi blank chhod do, Step 3 ke baad daalenge |
   | `SMTP_HOST` | e.g. `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_USER` | tumhara email |
   | `SMTP_PASSWORD` | Gmail App Password |
   | `SMTP_SENDER` | same email |

6. **Create Web Service** click karo. Thodi der baad URL milega jaise:  
   `https://auth-api-xxxx.onrender.com`  
   **Ye URL copy karo** — ye tumhara backend URL hai.

7. Render dashboard mein jaake **Environment** edit karo → `FRONTEND_URL` add/update karo:  
   `https://tumhara-vercel-app.vercel.app`  
   (Step 3 ke baad Vercel jo URL dega woh daalna; pehle Vercel deploy karo, phir yahan paste karo.)

---

### Step 3: Frontend — Vercel pe deploy (free)

1. [vercel.com](https://vercel.com) pe jao → Sign up (GitHub se).
2. **Add New** → **Project** → GitHub repo (AUTH) select karo.
3. Settings aise:

   | Field | Value |
   |-------|--------|
   | **Framework Preset** | Vite |
   | **Root Directory** | `client` (click **Edit** → `client` set karo) |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   | **Install Command** | `npm install` |

4. **Environment Variables** add karo:

   | Name | Value |
   |------|--------|
   | `VITE_BACKEND_URL` | Render wala backend URL (e.g. `https://auth-api-xxxx.onrender.com`) |

5. **Deploy** click karo. Jab deploy ho jaye to URL milega jaise:  
   `https://auth-xxxx.vercel.app`

6. Ab **Render** pe jao → backend service → **Environment** → `FRONTEND_URL` = `https://auth-xxxx.vercel.app` (apna Vercel URL) set karo → Save. Thoda wait karo, service restart ho jayegi.

---

### Step 4: Test karo

- Vercel URL open karo → Sign up / Login try karo.
- Agar “Invalid credentials” ya network error aaye to:
  - Backend (Render) URL browser mein khol ke check karo: `https://your-backend.onrender.com` → “API is running...” aana chahiye.
  - CORS: Backend ke env mein `FRONTEND_URL` bilkul Vercel wala URL hona chahiye (https, no trailing slash).
  - Cookies: Production mein backend `sameSite: "none"` aur `secure: true` use karta hai (code mein already hai) — bas dono URLs **https** hon.

---

### Short checklist

| Step | Kya kiya |
|------|----------|
| 1 | MongoDB Atlas → cluster, user, connection string |
| 2 | Render → Web Service, root `server`, env vars (MONGODB_URI, JWT, SMTP, FRONTEND_URL) |
| 3 | Vercel → Project, root `client`, `VITE_BACKEND_URL` = Render URL |
| 4 | Render pe `FRONTEND_URL` = Vercel URL daalna, phir test |

Iske baad app live rahegi — frontend Vercel pe, backend Render pe, database Atlas pe. Sab free tier.

---

## Push this project to GitHub

### First time (repo abhi bana rahe ho)

1. **GitHub pe naya repo banao**  
   - [github.com/new](https://github.com/new) pe jao  
   - Repo name daalo (e.g. `AUTH` ya `mern-auth`)  
   - Public choose karo, “Create repository” click karo  
   - **“Add .gitignore” / “Add README” mat select karo** — hum already project mein daal chuke hain  

2. **Apne project folder mein terminal kholo** (AUTH folder, jahan README hai):

   ```bash
   cd C:\Users\HP\OneDrive\Desktop\AUTH
   ```

3. **Agar pehle se Git init nahi hai to:**

   ```bash
   git init
   ```

4. **Saari files add karo** (`.env` aur `node_modules` automatically ignore ho jayenge):

   ```bash
   git add .
   ```

5. **Pehla commit:**

   ```bash
   git commit -m "Initial commit: full auth system with login, signup, email verify, reset password"
   ```

6. **GitHub repo ko “remote” banao** — `<your-username>` aur `<repo-name>` apna daalna:

   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   ```

   Example: `git remote add origin https://github.com/rajkumar/AUTH.git`

7. **Branch name set karo (optional, agar main use karte ho):**

   ```bash
   git branch -M main
   ```

8. **Code push karo:**

   ```bash
   git push -u origin main
   ```

   Agar GitHub pe login nahi kiya hua hai to browser open hoga — login karo, phir push ho jayega.

---

### Baad mein changes push karne ke liye

Jab bhi kuch change karo, ye 3 commands chalao:

```bash
git add .
git commit -m "Short message: kya change kiya"
git push
```

Bas itna — pura code aur README GitHub pe rahega. `.env` files push nahi Hongi (security ke liye .gitignore mein hain).
