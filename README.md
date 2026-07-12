# 🇮🇳 BharatSetu (भारतसेतु) - Phase: Anti-Gravity

**BharatSetu** is a next-generation, hyper-modern digital state ecosystem designed for the future of Indian civic tech (2028 Blueprint). **Phase: Anti-Gravity** represents a complete architectural and UI/UX overhaul of the platform, stripping away flat, rigid components in favor of a spatial, weightless, and highly engineered aesthetic.

This repository contains the front-end architecture for the new OLED Cosmic Canvas login and dashboard experience, engineered for zero-latency, high-fidelity rendering, and extreme accessibility.

---

## ✨ Key Features & Aesthetic (The Anti-Gravity Philosophy)

* **OLED Cosmic Canvas:** Pure `#000000` backgrounds combined with shifting aurora mesh gradients and an SVG grain texture for a tactile, premium feel.
* **Spatial Glassmorphism:** Core terminals and bento-box modules utilize heavy `backdrop-filter: blur(32px)` with dynamic ambient lighting that reacts to cursor coordinates.
* **Fluid macOS-Style Dock:** A floating, physics-driven bottom navigation dock featuring 3D icons, bounce-up magnification, and frosted glass tooltips.
* **Ambient Orb Physics:** Grape, Cyan, and Pink ambient light orbs that drift lazily in the background and magnetically pull toward user interaction points.
* **Engineered Typography:** Utilizing **Space Grotesk** for primary cinematic headers (rendered at massive 7rem scales) and **JetBrains Mono** for all input fields, stats, and security data.
* **Hyper-Microinteractions:** Liquid CSS transitions, magnetic button pulls, OTP haptic visual feedback, and ⌘K (Cmd+K) global command palettes.
* **Zero-Latency Edge Architecture:** Built for the future with WebAssembly acceleration, strict code-splitting, and parallel CPU web worker threading.

---

## 🛠 Tech Stack

**Core Frameworks & Libraries:**

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Extended with custom safe-area variables and fluid typography plugins)
* **Physics & Animation:** [Framer Motion](https://www.framer.com/motion/) (For liquid spring transitions and layout shifts)
* **3D / Spatial Rendering:** [Three.js](https://threejs.org/) & React Three Fiber (For ambient orbs and dynamic background canvas)
* **Typography:** Space Grotesk & JetBrains Mono (Variable Web Fonts)

**Security & Auth (Mocked):**

* **Authentication:** OTP / DigiLocker OAuth integration flows
* **State Management:** Zustand (for lightweight, fluid state transitions)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

* Node.js (v18.0.0 or higher)
* npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/bharatsetu-antigravity.git
cd bharatsetu-antigravity

```


2. **Install dependencies:**
```bash
npm install
# or
yarn install

```


3. **Set up environment variables:**
Create a `.env.local` file in the root directory and add any necessary API keys (e.g., mock auth endpoints).
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api

```


4. **Run the development server:**
```bash
npm run dev
# or
yarn dev

```


5. **Experience the UI:**
Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to view the Anti-Gravity login portal.

---

## 📂 Project Structure

```text
bharatsetu-antigravity/
├── public/                 # Static assets (SVG noise textures, localized icons)
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── (auth)/         # Anti-Gravity Login & DigiLocker routes
│   │   ├── dashboard/      # The 13 Civic Modules (Bento-box layout)
│   │   └── globals.css     # Core Tailwind & custom OLED variables
│   ├── components/         # Reusable UI architecture
│   │   ├── canvas/         # Three.js ambient orbs and mesh gradients
│   │   ├── dock/           # macOS-style floating bottom dock
│   │   ├── glass/          # Reusable frosted glass cards & panels
│   │   └── typography/     # Fluid text components (JetBrains/Space Grotesk)
│   ├── hooks/              # Custom React hooks (useMousePosition, usePhysics)
│   └── lib/                # Utility functions, constants, and animation variants
├── tailwind.config.ts      # Custom theme, spacing, and plugin configurations
└── README.md

```

---

## 🛡 Performance & Accessibility Targets

This project is strictly audited to meet 2028 deployment standards:

* **Lighthouse Score Target:** 95+ (Performance, Accessibility, Best Practices, SEO)
* **Contrast Ratios:** Minimum WCAG 2.1 AA compliance across all frosted glass states against OLED backgrounds.
* **Keyboard Navigation:** Full support for `Tab` indexing, explicit `focus-visible` ring designs, and screen-reader ARIA landmarks.
* **FPS Target:** Locked 60fps animations via CSS hardware acceleration (`transform: translate3d`) and WebGL offloading.

---

## 🤝 Contributing

We welcome contributions to elevate the BharatSetu ecosystem. If you have ideas for new micro-interactions, accessibility improvements, or module integrations:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
