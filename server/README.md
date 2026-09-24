# Vedant Portfolio — Backend REST API (MERN Stack)

* ⚡ **Live Production API**: [https://vedant-portfolio-6twf.onrender.com](https://vedant-portfolio-6twf.onrender.com)
* 🩺 **Health Check**: [https://vedant-portfolio-6twf.onrender.com/api/health](https://vedant-portfolio-6twf.onrender.com/api/health)

High-performance, secure backend REST API built with **Node.js, Express, MongoDB Atlas, and Resend**.

## Features

- **Lean Aggregated Query**: `GET /api/portfolio` responds in `<30ms` using Mongoose `.lean()` to fetch all projects, skills, experience, and education in a single roundtrip.
- **Instant Email Notifications**: Uses Resend API for sub-second email dispatch directly to `igvedant01@gmail.com` when a contact form is submitted.
- **Privacy & Security**: Zero message content is logged to the server console. Messages are stored strictly in MongoDB Atlas.
- **Owner-Locked Admin**: Access to `/api/admin` is strictly guarded by JWT signed against credentials configured in `.env` (`ADMIN_EMAIL` and `ADMIN_PASSWORD`). No public registration route exists.
- **Production Hardened**: Equipped with `helmet` HTTP headers, `compression`, and `express-rate-limit`.
- **CORS Configured**: Pre-configured to accept requests from localhost and all Vercel domains (`*.vercel.app`).

---

## Directory Structure

```
server/
├── config/
│   └── db.js                    # MongoDB Atlas connection pooling + DNS resolver
├── controllers/
│   ├── portfolioController.js   # High-speed data delivery & filters
│   ├── contactController.js     # Form validation, DB save, and Resend mail dispatch
│   └── adminController.js       # Owner authentication & management
├── middleware/
│   └── auth.js                  # JWT authorization middleware
├── models/
│   ├── Project.js               # Lean Project schema with indexed ordering
│   ├── PortfolioData.js         # Unified profile schema (Skills, Experience, Education)
│   └── Message.js               # Contact form message schema
├── routes/
│   ├── portfolioRoutes.js       # GET /api/portfolio, GET /api/portfolio/projects
│   ├── contactRoutes.js         # POST /api/contact (rate-limited)
│   └── adminRoutes.js           # Protected owner endpoints
├── scripts/
│   └── seed.js                  # One-time resume data import to MongoDB Atlas
├── services/
│   └── emailService.js          # Resend API dispatcher to igvedant01@gmail.com
├── server.js                    # Express application entry point
├── .env.example                 # Configuration template
├── package.json
└── README.md
```

---

## Environment Variables Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set the following variables in `server/.env`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/vedant_portfolio` |
| `RESEND_API_KEY` | Resend API key for fast email notifications | `re_123456789...` |
| `ADMIN_EMAIL` | Owner email address | `igvedant01@gmail.com` |
| `ADMIN_PASSWORD` | Owner secret admin password | Secure custom password |
| `JWT_SECRET` | Secret token signing key | Random 32+ character string |
| `CLIENT_URL` | Frontend origin for CORS | `https://vedantis-dev.vercel.app` (or `http://localhost:5173`) |

---

## Local Development Scripts

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database with Resume Content
Populate your MongoDB Atlas cluster with all projects (TaxPal, Resumate, HavenKey, EventSphere, QuizMaster), skills, and experience:
```bash
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Production Server
```bash
npm start
```

---

## Production Deployment on [Render.com](https://render.com) (Free)

1. Create a **New Web Service** connected to your GitHub repository.
2. Set configuration:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
3. Add Environment Variables on Render dashboard:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = *(your MongoDB Atlas URI)*
   - `RESEND_API_KEY` = *(your Resend API key)*
   - `ADMIN_EMAIL` = `igvedant01@gmail.com`
   - `ADMIN_PASSWORD` = *(your admin password)*
   - `JWT_SECRET` = *(your JWT secret key)*
   - `CLIENT_URL` = `https://vedantis-dev.vercel.app`
4. Click **Deploy Web Service** and note your public Render URL.

---

## API Endpoints Reference

### Public Endpoints
* `GET /api/health` — Service health and uptime.
* `GET /api/portfolio` — Single aggregated payload with all portfolio data.
* `GET /api/portfolio/projects?category=MERN` — Filtered projects list.
* `POST /api/contact` — Submit a contact inquiry (Rate limited to 10 requests / 15 minutes).

### Protected Owner Endpoints (`Authorization: Bearer <token>`)
* `POST /api/admin/login` — Authenticate owner (`igvedant01@gmail.com`).
* `GET /api/admin/messages` — Review received contact messages.
* `DELETE /api/admin/messages/:id` — Delete a message.
* `POST /api/admin/projects` — Create a project.
* `PUT /api/admin/projects/:id` — Update project details.
* `DELETE /api/admin/projects/:id` — Remove a project.
