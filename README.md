# 💎 CommsFlow AI – Enterprise Business Communication Studio

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

CommsFlow AI is a premium, dark-themed enterprise SaaS application and visual editor that enables organizations to compose, manage, and audit all corporate communications (newsletters, HR announcements, changelogs, incident reports, invoices, and billing receipts) from a single on-brand studio workspace.

---

## 🚀 The Business Problem & Solution

### The Friction
Modern companies use fragmented tools across departments to compose team updates, client notices, invoices, and product releases. This results in inconsistent visual branding, repetitive developer hours coding raw HTML, and high delivery bounce rates.

### The Solution
CommsFlow AI centralizes the visual layout creation process. HR, Support, Operations, Developers, and Finance teams construct responsive, pixel-perfect, on-brand documents visually on a canvas with absolute brand kit lockdowns, then export directly to clean HTML/PDF code templates.

---

## ✨ Key Capabilities

### 🎨 Visual Layout Designer (Canva-like)
- **Three-Column Interface:** Left toolbox with draggable block templates, searchable Lucide icon catalogs, and locked color guidelines swatches. Center interactive canvas with live desktop/tablet/mobile width scaling. Right inspector panel modifying spacing, padding, borders, background hexes, and font sizes.
- **Top Toolbar controls:** Undo/Redo buffers, contributor sharing layouts, version timeline restore checkpoints, and instant responsive ZIP/PDF mock exports.

### 🧠 Sparkles AI Chatbot Assistant
- **Context-Aware Assistance:** Analyzes active document type (e.g. Incident Report) to suggest engaging subject lines, translate content, resolve grammar errors, summarize sections, or write custom layout blocks.
- **Typewriter Output Stream:** Simulates LLM processing with a fluid character-by-character typewriter effect and dot-bouncing loaders.

### 🔒 Enterprise Brand Guardrails & Settings
- **Palette Restrictions:** Admins toggle global brand locks to restrict collaborators from altering corporate colors or custom assets.
- **Team Seat Management:** Manage permissions and invite team members, editing roles (Owner, Admin, Member, Guest) dynamically.
- **Security & API Keys:** Generate, copy to clipboard, and audit custom webhook security hashes to connect external delivery loops.

### 📊 Analytics & Reporting Hub
- **Delivery Area Graphs:** Glowing SVG area charts tracking monthly delivery trends.
- **Department Donut Charts:** Allocate and display delivery distributions across HR, Marketing, Engineering, and Finance folders.
- **Timeline Logs:** Export logs to CSV/Excel reports and view chronological system audits.

### 🧭 Navigation & Interactive Modals
- **Zero-Hash Modals:** Legal policies (Privacy Policy, Terms of Service, GDPR) and resources open in responsive overlays.
- **Browser Back Button Popstates:** Intercepts browser/hardware back-actions to dismiss active modals or return to the previously active guide topic.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **CSS Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using `@import "tailwindcss"` and `@theme` variable utilities)
- **Transitions:** [Framer Motion](https://www.framer.com/motion/) (powering page fades, skeletons, and modal scales)
- **Vectors:** [Lucide React](https://lucide.dev/) (custom icons mapping)

---

## 📂 Codebase Directory Layout

```text
c:\CommsFlow
├── public/
│   ├── favicon.svg             # Custom CommsFlow brand logo SVG vector
│   └── icons.svg               # SVG resource markers
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthLayout.tsx  # Glassmorphism auth shell wrapper
│   │   │   ├── Login.tsx       # Sign-in form with validation & social SSO
│   │   │   ├── Register.tsx    # Signup with password strength gauge
│   │   │   ├── ForgotPassword.tsx # Recovery link triggers
│   │   │   ├── ResetPassword.tsx # Password change forms
│   │   │   └── VerifyEmail.tsx # 6-box OTP verify flow with resend timers
│   │   ├── dashboard/
│   │   │   ├── DashboardSidebar.tsx # Workspace switcher & sidebar selections
│   │   │   ├── DashboardHeader.tsx # Searches, notifications & user profile
│   │   │   ├── OverviewTab.tsx # Sparklines, quick tasks & active drafts
│   │   │   ├── TemplatesTab.tsx # 25 template cards with action menus
│   │   │   ├── AnalyticsTab.tsx # SVG metrics charts & CSV exporters
│   │   │   ├── ActivitiesTab.tsx # Audited transaction timeline logs
│   │   │   └── SettingsTab.tsx # Double-sidebar settings & API generators
│   │   ├── editor/
│   │   │   ├── DocumentEditor.tsx # Visual layout editing canvas
│   │   │   └── AIChatbot.tsx   # Sparkles AI chat assistant interface
│   │   ├── landing/
│   │   │   ├── AnimatedBackground.tsx # Grid pattern & floating lighting orbs
│   │   │   ├── Navbar.tsx      # Blurring sticky navbar with mobile drawer
│   │   │   ├── Hero.tsx        # CTA sections & editor dashboard mockup
│   │   │   ├── TrustedCompanies.tsx # SVGs company marquee ticker
│   │   │   ├── Features.tsx    # Grid highlighting visual builder features
│   │   │   ├── IndustrySolutions.tsx # Tabbed team workflow spotlights
│   │   │   ├── Testimonials.tsx # Star reviews & user comments
│   │   │   ├── Pricing.tsx     # Monthly/Annual fee calculator
│   │   │   ├── FAQ.tsx         # Frequently asked questions list
│   │   │   ├── CTA.tsx         # Final conversion banner card
│   │   │   ├── Footer.tsx      # Policy guides, resources & email newsletter
│   │   │   └── NotFound.tsx    # Space-themed 404 page with mockup terminal logs
│   │   └── ui/
│   │       ├── Button.tsx      # Reusable motion-wrapped button component
│   │       ├── Accordion.tsx   # Animating FAQ list accordion
│   │       └── Logo.tsx        # Custom premium SVG brand logo
│   ├── context/
│   │   └── NavigationContext.tsx # Context router managing client routes
│   ├── App.tsx                 # Root layout router
│   ├── index.css               # Tailwind imports, gradients, & scrollbar styling
│   └── main.tsx                # Mounting DOM entrypoint
```

---

## ⚙️ Local Development Setup

Follow these commands to clone, install dependencies, and launch the development studio:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Web Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 3. Build Production Bundle
```bash
npm run build
```
Generates minified assets in the `dist` folder, compiling cleanly with zero warnings or type mismatches.

---

## 🔑 Mock SSO Credentials for Sandbox Testing

To bypass standard auth checks and experience the workspace console:
- **Email Address:** `admin@commsflow.ai` (or any valid email structure)
- **Password:** `password123` (or any string matching `>= 6` characters)
- **Verify OTP Code:** Enter any 6 digits (e.g. `123456`)

---

## 👤 Developer Profile

Designed, developed, and maintained by **Vijayapandian T**.

* **GitHub:** [@VIJAYAPANDIANT](https://github.com/VIJAYAPANDIANT)
* **LinkedIn:** [Vijayapandian T](https://www.linkedin.com/in/vijayapandian-t)
* **X / Twitter:** [@Vijayapand33371](https://x.com/Vijayapand33371)
* **Support Email:** [vijayapandian112007@gmail.com](mailto:vijayapandian112007@gmail.com)
