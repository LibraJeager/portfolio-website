# Thanh Cong — Personal Portfolio

[![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite_7-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> *Where numbers whisper, clearer meanings rise.*

A cinematic, dark-themed personal portfolio built with **React** and **Vite** — designed to showcase my projects, skills, and journey as a developer with a passion for data.

---

## ✦ Design Philosophy

Inspired by premium editorial portfolios with a focus on:

- **Dark-first aesthetic** — Deep blacks with carefully curated neutral tones
- **Minimalist typography** — Clean, thin-weight Inter font for an elegant editorial feel
- **Intentional whitespace** — Breathing room that draws attention to content
- **Subtle interactivity** — Custom cursor, mouse glow effects, and smooth reveal animations
- **Dark / Light mode** — Seamless theme switching with consistent design language

## ✦ Live Demo

🔗 *Coming soon — deployment in progress.*

---

## ✦ Features

| Feature | Description |
|---|---|
| **Hero Section** | Bold name display with tagline and scroll-driven intro |
| **About Section** | Personal bio with motivation and skill showcase |
| **Projects Showcase** | Curated grid of real-world projects with descriptions and tech tags |
| **Sidebar Navigation** | Fixed sidebar with nav links and social icons |
| **Theme Toggle** | Dark ↔ Light mode with smooth transitions |
| **Custom Cursor** | Interactive custom cursor that responds to hoverable elements |
| **Mouse Glow** | Ambient glow effect that follows the mouse pointer |
| **Scroll Reveal** | Elements fade-in on scroll for a polished reading experience |
| **Responsive Layout** | Fully responsive from mobile to desktop |

---

## ✦ Tech Stack

**Core**
- React 19 — UI library
- Vite 7 — Lightning-fast build tool & dev server

**Styling**
- Tailwind CSS 4 — Utility-first CSS framework
- Vanilla CSS — Custom animations & design tokens (`index.css`)

**UI Enhancements**
- Lucide React — Lightweight icon library
- Custom hooks (`useTheme`, `useReveal`) — Theme management & scroll animations

---

## ✦ Project Structure

```
my-portfolio/
├── public/                  # Static assets & favicon
├── src/
│   ├── assets/              # Images & media
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.jsx        # Fixed sidebar navigation
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # Landing hero section
│   │   │   ├── About.jsx          # About & skills section
│   │   │   └── Projects.jsx       # Projects showcase grid
│   │   └── ui/
│   │       ├── CustomCursor.jsx   # Interactive custom cursor
│   │       ├── MouseGlow.jsx      # Ambient mouse glow effect
│   │       └── ThemeToggle.jsx    # Dark/Light mode switch
│   ├── data/
│   │   └── projects.js           # Projects data source
│   ├── hooks/
│   │   ├── useTheme.js           # Theme state management
│   │   └── useReveal.js          # Scroll reveal animation hook
│   ├── lib/                      # Utility functions
│   ├── App.jsx                   # Root application component
│   ├── App.css                   # App-level styles
│   ├── index.css                 # Global design tokens & base styles
│   └── main.jsx                  # Application entry point
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
└── package.json
```

---

## ✦ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/LibraJeager/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✦ Design Reference

This portfolio draws inspiration from dark, editorial-style portfolios — featuring bold typography on deep backgrounds, masonry-style project grids, and premium micro-interactions. The goal is a cinematic, gallery-like experience rather than a traditional developer portfolio.

---

## ✦ License

© 2026 Thanh Cong. All rights reserved.
