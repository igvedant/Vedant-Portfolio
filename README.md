# Vedant Singh — Full-Stack MERN Portfolio

A production-grade, ultra-responsive **MERN Stack (MongoDB Atlas, Express.js, React 18, Node.js)** portfolio engineered to showcase senior full-stack development capabilities while preserving the original minimalist dark/light design tokens, Inter & JetBrains Mono typography, sticky sidebar navigation, and `⌘K` command palette.

---

## Architecture Overview

```
Vedant-Portfolio/
├── client/                          # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/AdminModal.jsx # Owner-only message review modal (strictly locked)
│   │   │   ├── layout/              # Header, DevTabHeader, Sidebar, MobileDrawer
│   │   │   ├── sections/            # Intro, About, Projects, Skills, Experience, Education, Contact
│   │   │   └── ui/                  # CommandPalette (⌘K), Toast
│   │   ├── context/ThemeContext.jsx # Dark/Light mode manager
│   │   ├── services/api.js          # Environment-aware API client (local proxy + VITE_API_URL)
│   │   └── styles/theme.css         # Exact shadcn CSS custom properties
│   ├── vercel.json                  # SPA client-side route rewrites for Vercel
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── server/                          # Node.js + Express + MongoDB Atlas Backend
│   ├── config/db.js                 # MongoDB Atlas connection pooling + DNS resolver
│   ├── controllers/                 # Portfolio, Contact, and Admin controllers
│   ├── middleware/auth.js           # JWT verification for owner-only actions
│   ├── models/                      # Project, PortfolioData, Message schemas
│   ├── routes/                      # /api/portfolio, /api/contact, /api/admin
│   ├── scripts/seed.js              # One-time migration of resume content to MongoDB Atlas
│   ├── services/emailService.js     # Instant Resend API email dispatch
│   ├── server.js                    # Express application entry with CORS for Vercel
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── index.html                       # Original static portfolio (kept intact as reference)
├── package.json                     # Root orchestrator
└── README.md                        # Master documentation
```

---

## Key Full-Stack Features

1. **100% Public Access**: Visitors can browse the portfolio, filter projects, inspect skills, and submit contact messages without needing any login.
2. **Owner-Only Admin Control**: Message reviews and project management are strictly locked to `igvedant01@gmail.com` using JWT authentication against secure environment variables in `server/.env`.
3. **Sub-Second Email Delivery**: Contact submissions are saved to MongoDB Atlas and dispatched immediately to `igvedant01@gmail.com` via the Resend API with zero client delay.
4. **Lean Database Queries (<30ms)**: Data is fetched via a single aggregated `.lean()` query, preventing waterfall requests and eliminating layout shifts.
5. **Mobile-First Responsive Polish**: Smooth slide-in mobile navigation drawer, 44px+ touch targets, fluid card grids, and mobile-calibrated Command Palette.
6. **Command Palette (`⌘K` / `Ctrl+K`)**: Instant search and navigation overlay for quick access to all sections, social links, theme switching, and the owner panel.

---

## Quick Start (Local Development)

### 1. Configure Environment Variables
Navigate to `server/` and update `.env`:
```bash
# In server/.env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=igvedant01@gmail.com
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_secret_jwt_string
CLIENT_URL=http://localhost:5173
```

### 2. Seed Resume Data into MongoDB Atlas
Run the automated seed script to import all projects (TaxPal, Resumate, HavenKey, EventSphere, QuizMaster), skills, and experience into your cluster:
```bash
npm run seed
```

### 3. Launch Development Environment
Run both backend and frontend simultaneously with one command:
```bash
npm run dev
```

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000`
* **API Health Check**: `http://localhost:5000/api/health`

---

## Production Deployment Guide (Vercel + Render)

The portfolio is deployed using a split-architecture: **Vercel** for the high-performance React UI (global Edge CDN) and **Render** for the continuous Node.js / Express API.

### Step 1: Deploy Backend to [Render.com](https://render.com) (Free)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
2. Connect your GitHub repository (`Vedant-Portfolio`).
3. Fill in the build & run settings:
   * **Root Directory**: `server`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Instance Type**: `Free`
4. Under **Environment Variables**, add:
   * `NODE_ENV`: `production`
   * `MONGODB_URI`: *Your MongoDB Atlas connection URI*
   * `RESEND_API_KEY`: *Your Resend API key*
   * `ADMIN_EMAIL`: `igvedant01@gmail.com`
   * `ADMIN_PASSWORD`: *Your owner admin password*
   * `JWT_SECRET`: *Your JWT secret key*
   * `CLIENT_URL`: `https://vedantis-dev.vercel.app` *(or your Vercel production domain)*
5. Click **Deploy Web Service** and copy your generated Render URL (e.g. `https://vedant-portfolio-backend.onrender.com`).

---

### Step 2: Deploy Frontend to [Vercel](https://vercel.com)
1. Open your existing project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings** → **General**:
   * **Root Directory**: Click *Edit* and select **`client`** (save changes).
   * **Framework Preset**: **Vite**
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Go to **Settings** → **Environment Variables**:
   * Add: `VITE_API_URL` = `https://vedant-portfolio-backend.onrender.com` *(your Render URL from Step 1)*
4. Go to **Deployments** and click **Redeploy**.

---

## License
MIT © Vedant Singh
