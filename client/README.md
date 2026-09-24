# Vedant Portfolio — Frontend Client (React + Vite)

* 🌐 **Live Website**: [https://vedantis-dev.vercel.app](https://vedantis-dev.vercel.app/)
* ⚡ **Connected API**: [https://vedant-portfolio-6twf.onrender.com](https://vedant-portfolio-6twf.onrender.com)

Modern, ultra-fast frontend built with **React 18 and Vite**, strictly preserving the shadcn/ui-inspired minimalism, typography (`Inter` and `JetBrains Mono`), dark/light theme, and mobile-first responsive design.

## Features

- **Mobile-First Responsive Polish**: Dedicated glassmorphism mobile topbar, smooth slide-in mobile navigation drawer, and calibrated 44px+ touch targets.
- **Pure Aesthetic Fidelity**: Seamless dark and light modes, smooth transitions, custom CSS variables, and zero visual jitter.
- **Dynamic Projects & Live Filtering**: Projects loaded from the MongoDB Atlas REST API with instant category filtering (All, MERN, AI, Full-Stack).
- **Environment-Aware API Layer**: Seamlessly proxies to local backend on port 5000 in development, and calls `VITE_API_URL` (Render backend) in production.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Rapid keyboard-accessible overlay for section navigation, theme toggling, email copying, and social links.
- **Live Contact Form**: Client-side validation, instant feedback, and direct API transmission to MongoDB Atlas and Resend email alerts.
- **Owner Control Center Modal**: Secretly accessible from ⌘K, allowing `igvedant01@gmail.com` to review submitted inquiries in real time.

---

## Directory Structure

```
client/
├── public/                 # Static assets & favicons
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminModal.jsx       # Owner-only message review modal
│   │   ├── layout/
│   │   │   ├── Header.jsx           # Top navbar with ⌘K search and theme toggle
│   │   │   ├── DevTabHeader.jsx     # Developer tab header
│   │   │   ├── Sidebar.jsx          # Desktop sticky sidebar with active link tracking
│   │   │   └── MobileDrawer.jsx     # Slide-out responsive mobile drawer
│   │   ├── sections/
│   │   │   ├── Intro.jsx            # Hero section with role badge and bio
│   │   │   ├── About.jsx            # About me & key metrics grid
│   │   │   ├── Projects.jsx         # Dynamic projects grid with category tabs
│   │   │   ├── Skills.jsx           # Colored SVGs & categorized skill pills
│   │   │   ├── Experience.jsx       # Career milestones and leadership timeline
│   │   │   ├── Education.jsx        # Bundelkhand University & Certifications
│   │   │   └── Contact.jsx          # Live interactive form & copy-to-clipboard
│   │   └── ui/
│   │       ├── CommandPalette.jsx   # ⌘K / Ctrl+K modal
│   │       └── Toast.jsx            # Toast alert notifications
│   ├── context/
│   │   └── ThemeContext.jsx         # Dark / Light theme provider
│   ├── services/
│   │   └── api.js                   # API client with instant zero-lag fallback
│   ├── styles/
│   │   └── theme.css                # Preserved design tokens and responsive styles
│   ├── App.jsx                      # Main composition layout
│   └── main.jsx                     # Application bootstrap
├── index.html                       # HTML template with Inter & JetBrains Mono
├── vercel.json                      # Vercel SPA route rewrite configuration
├── package.json
├── vite.config.js                   # Vite config with backend proxy
└── README.md
```

---

## Getting Started (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173` and proxy `/api` requests to the backend server running on port `5000`.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.

---

## Production Deployment to [Vercel](https://vercel.com)

1. Open your portfolio project in your [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings** → **General**:
   - **Root Directory**: Set to **`client`** (click Edit, type `client`, save).
   - **Framework Preset**: **Vite**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Go to **Settings** → **Environment Variables**:
   - Add: `VITE_API_URL` = `https://vedant-portfolio-6twf.onrender.com`
4. Go to **Deployments** and click **Redeploy**.
5. Your live frontend will be live at: [https://vedantis-dev.vercel.app](https://vedantis-dev.vercel.app/)
