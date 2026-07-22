# CommsFlow AI – Business Communication Studio

CommsFlow AI is a premium, dark-themed enterprise SaaS application that enables organizations to create, manage, and customize professional business communications (newsletters, HR documents, release notes, changelogs, incident reports, invoices, and receipts) visually from a single unified workspace.

---

## 🚀 Business Case

### The Problem
Modern companies use multiple fragmented tools to compose team updates, client notices, invoices, and releases. This results in inconsistent corporate branding, heavy duplicate work, slow communication cycles, and poor cross-department collaboration.

### The Solution
CommsFlow AI provides a centralized studio where every department (HR, Developers, Product, Support, Finance) can construct responsive, pixel-perfect, on-brand emails and documents visually using visual builders, lockable brand templates, and programmatic export interfaces.

---

## ✨ Features Implemented

### Phase 1: Project Foundation & Landing Page
- **Premium Dark Design:** Glassmorphism cards, glowing borders, custom scrolling bars, and metallic text gradients designed to resemble Stripe, Vercel, and Linear.
- **Ambient Canvas:** fixed fixed-grid backdrop featuring multiple floating glow spheres (violet, indigo, cyan) moving in the background.
- **Visual Studio Mockup:** An interactive Hero layout detailing visual template editing panels (Unlayer Elements selectors, central designing canvas, style editor inspector).
- **Infinite Logo Marquee:** Monochrome ticker representing client trust banners with faded edge overlays.
- **Tabbed Solution Selector:** Interactive selectors highlighting specific team problems, visual solutions, and custom document templates (HR updates, incident JSON logs, newsletters, billing tables).
- **Pricing Card Comparison:** Interactive Annual/Monthly billing toggles (saving 20% on annual billing).
- **Responsive Layout:** 100% mobile-friendly collapsing navigations and drawers.

### Phase 2: Client-side Authentication Module
- **Lightweight Navigation Router:** A global React Context managing views (`landing`, `login`, `register`, `forgot-password`, `reset-password`, `verify-email`, `dashboard`) with top-scroll actions and temp state caches.
- **Auth Shell Card:** Center-aligned, glassmorphic layout card with gradient overlays, logo triggers, and home navigation paths.
- **Login Form Page:** Form validation checks, social logins (Google, GitHub, Microsoft), and mock API loader button delay (1.5 seconds) leading to the console.
- **Register Form Page:** Name inputs, password complexity strength meters (Weak/Medium/Strong), password verification matches, and terms check triggers.
- **ForgotPassword & Reset Forms:** Form inputs, validation alerts, and a testing link to proceed to reset password.
- **Verify Email OTP Page:** 6-box OTP code entry with auto-tabbing focus management, backspace back-clear, paste integration, and countdown resend code timer.
- **Mock Console Dashboard:** Success alerts, profile badges, draft metrics summary, recent drafts listings with status pill badges (Draft, Locked, Sent), and a session log-out button.

---

## 🛠️ Tech Stack

- **Core:** React, Vite, TypeScript
- **Styling:** Tailwind CSS v4, PostCSS, Autoprefixer
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 📂 Project Directory Structure

```text
c:\CommsFlow
├── src
│   ├── components
│   │   ├── auth
│   │   │   ├── AuthLayout.tsx       # Glassmorphism auth shell wrapper
│   │   │   ├── Login.tsx            # Sign-in form with validation & social SSO
│   │   │   ├── Register.tsx         # Account signup with password strength meter
│   │   │   ├── ForgotPassword.tsx   # Recovery link triggers
│   │   │   ├── ResetPassword.tsx    # Password resets
│   │   │   ├── VerifyEmail.tsx      # 6-box OTP verify flow with timers
│   │   │   └── Dashboard.tsx        # Mock workspace dashboard after authentication
│   │   ├── landing
│   │   │   ├── AnimatedBackground.tsx # Grid pattern & floating ambient light orbs
│   │   │   ├── Navbar.tsx           # Sticky blurred header with mobile drawer
│   │   │   ├── Hero.tsx             # Headlines, action buttons, & editor mockup
│   │   │   ├── TrustedCompanies.tsx # Infinite marquee company tickers
│   │   │   ├── Features.tsx         # Grid showing visual builders, brand controls
│   │   │   ├── IndustrySolutions.tsx # Tabbed panels highlighting team workflows
│   │   │   ├── Testimonials.tsx     # Review cards & rating stars
│   │   │   ├── Pricing.tsx          # Monthly/Annual pricing comparisons
│   │   │   ├── FAQ.tsx              # Frequently asked questions list
│   │   │   ├── CTA.tsx              # Closing conversion glass card banner
│   │   │   └── Footer.tsx           # Multi-column indexes & newsletter form
│   │   └── ui
│   │       ├── Button.tsx           # Reusable Framer Motion buttons
│   │       └── Accordion.tsx        # Reusable height-animating FAQ accordion
│   ├── context
│   │   └── NavigationContext.tsx    # Global navigation state routing
│   ├── App.tsx                      # Root component routing
│   ├── index.css                    # Custom base variables, gradients, scrollbars
│   └── main.tsx                     # React mounting node
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## ⚙️ Quick Start

Follow these steps to run the studio workspace locally.

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to preview.

### 3. Build Production Bundle
```bash
npm run build
```
Verify the build compiles cleanly with zero compilation warnings or type-safety issues.

---

## 🔑 Mock Credentials for Testing

To login and inspect the workspace dashboard console:
- **Email:** `admin@commsflow.ai` (or any valid email format)
- **Password:** `password123` (or any password >= 6 characters)
- **OTP Code:** Any 6 digits (e.g., `123456`)
