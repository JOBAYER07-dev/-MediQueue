# MediQueue — Tutor & Appointment Booking Platform

A full-stack appointment booking platform built with **Next.js**, **Express.js**, and **MongoDB**, featuring secure authentication via **Firebase** (Email/Password + Google OAuth) and **JWT**-protected private routes. Designed with an elegant dark-gold theme using the Playfair Display font.

🌐 **Live Site:** [https://mediqueue.vercel.app/](https://mediqueue.vercel.app/)

---

## Screenshot

![MediQueue Screenshot](./public/screenshot.png)

---

## About the Project

MediQueue is a course assignment project that allows users to browse, book, and manage tutor/doctor appointments online. It includes secure login, private dashboards, and real-time appointment management — built to simulate a production-ready booking system.

---

## Tech Stack

**Frontend**
- Next.js
- React
- Tailwind CSS
- Firebase Authentication (Email/Password + Google OAuth)

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) Authentication

**Deployment**
- Client → Vercel
- Server → Render

---

## Features

- 🔐 Secure login/signup with Firebase (Email/Password + Google OAuth)
- 🛡️ JWT-protected private routes for logged-in users only
- 📅 Book, view, and manage appointments
- 🎨 Custom dark-gold design system with Playfair Display typography
- 📱 Fully responsive across devices
- ⚡ Fast client-server communication via REST API
- 🔒 Protected backend routes with token verification middleware

---

## Dependencies

**Client**
- `next`
- `react` / `react-dom`
- `firebase`
- `axios`
- `tailwindcss`

**Server**
- `express`
- `mongodb`
- `jsonwebtoken`
- `cors`
- `dotenv`

---

## Getting Started (Run Locally)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project (for Auth keys)

### Client Setup

```bash
# 1. Clone the repository
git clone https://github.com/JOBAYER07-dev/-MediQueue.git

# 2. Navigate into the project
cd -MediQueue

# 3. Install dependencies
npm install

# 4. Create a .env.local file and add:
NEXT_PUBLIC_apiKey=your_firebase_api_key
NEXT_PUBLIC_authDomain=your_firebase_auth_domain
NEXT_PUBLIC_projectId=your_firebase_project_id
NEXT_PUBLIC_API_URL=your_backend_server_url

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Server Setup

```bash
# 1. Clone the server repository
git clone https://github.com/JOBAYER07-dev/MediQueue_Server.git

# 2. Navigate into the project
cd MediQueue_Server

# 3. Install dependencies
npm install

# 4. Create a .env file and add:
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret

# 5. Run the server
nodemon index.js
```

---

## Live & Repository Links

- 🌐 Live Site: [mediqueue.vercel.app](https://mediqueue.vercel.app/)
- 💻 Client Repo: [github.com/JOBAYER07-dev/-MediQueue](https://github.com/JOBAYER07-dev/-MediQueue)
- ⚙️ Server Repo: [github.com/JOBAYER07-dev/MediQueue_Server](https://github.com/JOBAYER07-dev/MediQueue_Server)

---

<p align="center">Designed & Built by <strong>Jobayer Hosen</strong> 🇧🇩</p>
