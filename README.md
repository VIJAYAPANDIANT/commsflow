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
- **Ambient Canvas:** Particle fixed-grid backdrop featuring multiple floating glow spheres (violet, indigo, cyan) moving in the background.
- **Visual Studio Mockup:** An interactive Hero layout detailing visual template editing panels.
- **Infinite Logo Marquee:** Monochrome ticker representing client trust banners with faded edge overlays.
- **Tabbed Solution Selector:** Interactive selectors highlighting specific team problems and visual templates.
- **Pricing Card Comparison:** Interactive Annual/Monthly billing toggles (saving 20% on annual billing).
- **Responsive Layout:** 100% mobile-friendly collapsing navigations and drawers.

### Phase 2: Client-side Authentication Module
- **Lightweight Navigation Router:** A global React Context managing views (`landing`, `login`, `register`, `forgot-password`, `reset-password`, `verify-email`, `dashboard`, `editor`, `404`) with top-scroll actions.
- **Login Form Page:** Form validation checks, social logins (Google, GitHub, Microsoft), and mock API loader button delay (1.2 seconds) leading to the console.
- **Register Form Page:** Name inputs, password complexity strength meters (Weak/Medium/Strong), password verification matches, and terms check triggers.
- **Verify Email OTP Page:** 6-box OTP code entry with auto-tabbing focus management, backspace back-clear, paste integration, and countdown resend code timer.

### Phase 3: Enterprise Dashboard Console
- **Professional Sidebar Navigation:** Sleek sidebar panel with workspace selector switch, user profile stats, active sub-tab toggles (Overview, Templates, Analytics Reports, Activity Logs, Studio Settings).
- **Workspace Switcher:** Modular department directory switcher swapping settings and assets.
- **Top Navigation Bar:** Integrated search inputs, notification alert counters, profile settings, and action options.

### Phase 4: Department Workspaces
- **Six Corporate Workspaces:** Divided workspaces covering Engineering Hub, HR & Legal, Finance & Billing, Marketing Hub, Customer Support, and Operations Reports.
- **25 Pre-loaded Templates:** Populated layout rows loaded with specific business templates (Incident reports, Quotations, Camapign emails, Apology letters, Meeting minutes).
- **Card Interactive Dropdowns:** Templates cards support modal configurations for Previews, Editors, Duplications, Favorites, Deletions, and Asset Exports.

### Phase 5: Canva-like Canvas Editor (Main Feature)
- **Three-Column layout:**
  - *Left Sidebar:* Draggable structural blocks, categories, assets uploader, searchable Lucide vector icon catalogs, and locked color guidelines swatches.
  - *Center Design Canvas:* Resizes width dynamically on viewport changes (Desktop, Tablet, Mobile grids) and renders typography padding offsets in real-time.
  - *Right Inspector:* Collapsible accordions modifying Typography (font sizes, heights), Colors (background, font hex), Spacing, and Button Radius.
- **Top Toolbar Panel:** Includes Undo/Redo buffers, Share contributor configurations, Version rollback log drawers, and ZIP/PDF mock exports.

### Phase 6: AI Chatbot Assistant
- **Floating AI Sparkle Bubble:** A persistent, glowing circular action button that rotates and reveals a floating chatbot pane.
- **Typewriter Output Stream:** Simulates LLM streaming output by printing responses character-by-character.
- **Typing Loader Animation:** Shows a bouncing three-dot bubble representing assistant processing latency.
- **Action Shortcuts:** Suggests email subjects, translates templates, summaries page features, polishes text blocks, and generates HTML grids.

### Phase 7: Analytics Center Reports
- **Secondary sub-tabs Navigation:** Toggle between five detailed metrics views.
- **SVG Area & Line Graphs:** Renders glowing Area charts showing monthly deliveries and line graph trends comparing click-through and open rate ratios.
- **Donut Chart:** Renders a circular donut allocation graph splitting workspace deliveries by department.
- **Activity Timeline & Exporters:** Connected chronological logs timeline and Excel CSV/PDF report download loaders.

### Phase 8: Settings Hub & UX Polish
- **Double Sidebar Settings console:** Houses User profiles, Workspace Details, Teammate lists (inviting members and changing roles), Appearance toggles, and push notification configurations.
- **Security & API Keys:** Generate custom security webhook keys, copy to clipboard (with checks), delete keys, and display clean empty state cards when empty.
- **Skeleton Loader Simulation:** Loading tabs display 450ms pulsing outline blocks before panels render.
- **Space-themed 404 Page:** Custom error layouts with stars backdrops, mock lookups code terminals, and home redirections.

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
│   │   │   ├── AuthLayout.tsx         # Glassmorphism auth shell wrapper
│   │   │   ├── Login.tsx              # Sign-in form with validation & social SSO
│   │   │   ├── Register.tsx           # Account signup with password strength meter
│   │   │   ├── ForgotPassword.tsx     # Recovery link triggers
│   │   │   ├── ResetPassword.tsx      # Password resets
│   │   │   ├── VerifyEmail.tsx        # 6-box OTP verify flow with timers
│   │   │   └── Dashboard.tsx          # Mock workspace dashboard after authentication
│   │   ├── dashboard
│   │   │   ├── DashboardSidebar.tsx   # Workspace switcher list & tab options
│   │   │   ├── DashboardHeader.tsx    # Search queries, notification logs & profiles
│   │   │   ├── OverviewTab.tsx        # Sparkline deliveries, quick actions, draft lists
│   │   │   ├── TemplatesTab.tsx       # 25 templates cards with dropdown Actions
│   │   │   ├── AnalyticsTab.tsx       # SVG donut graphs, timelines, CSV exporters
│   │   │   ├── ActivitiesTab.tsx      # Audits log database list
│   │   │   └── SettingsTab.tsx        # Profiles, Members editor, API keys, loaders
│   │   ├── editor
│   │   │   ├── DocumentEditor.tsx     # Canva-like visual builder workspace
│   │   │   └── AIChatbot.tsx          # Floating sparkles AI assistant chat panel
│   │   ├── landing
│   │   │   ├── AnimatedBackground.tsx # Grid pattern & floating ambient light orbs
│   │   │   ├── Navbar.tsx             # Sticky blurred header with mobile drawer
│   │   │   ├── Hero.tsx               # Headlines, action buttons, & editor mockup
│   │   │   ├── TrustedCompanies.tsx   # Infinite marquee company tickers
│   │   │   ├── Features.tsx           # Grid showing visual builders, brand controls
│   │   │   ├── IndustrySolutions.tsx  # Tabbed panels highlighting team workflows
│   │   │   ├── Testimonials.tsx       # Review cards & rating stars
│   │   │   ├── Pricing.tsx            # Monthly/Annual pricing comparisons
│   │   │   ├── FAQ.tsx                # Frequently asked questions list
│   │   │   ├── CTA.tsx                # Closing conversion glass card banner
│   │   │   ├── Footer.tsx             # Multi-column indexes & newsletter form
│   │   │   └── NotFound.tsx           # Space-themed 404 page layout with terminal logs
│   │   └── ui
│   │       ├── Button.tsx             # Reusable Framer Motion buttons
│   │       └── Accordion.tsx          # Reusable height-animating FAQ accordion
│   ├── context
│   │   └── NavigationContext.tsx      # Global navigation state routing
│   ├── App.tsx                        # Root component routing
│   ├── index.css                      # Custom base variables, gradients, scrollbars
│   └── main.tsx                       # React mounting node
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
