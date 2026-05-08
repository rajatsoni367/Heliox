# ☀️ Heliox — Real-Time Space Weather Intelligence

> Track the Sun. Protect the Grid.

Heliox is a cinematic, real-time space weather monitoring platform that translates live solar activity data into infrastructure risk intelligence for power grids, aviation, GPS/GNSS systems, HF radio, and satellite operations. Built with React + Vite, it streams live data directly from NOAA's Space Weather Prediction Center with zero API keys required.

---

## 🌐 Live Demo

<p align="center">
  <a href="https://heliox-delta.vercel.app/" target="_blank" rel="noreferrer">
    <img
      src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"
      alt="Open Heliox on Vercel"
    />
  </a>
</p>

---

## 🚀 Features

- **Real-Time Kp Index Gauge** — Pure SVG arc gauge, color-coded from green to deep red, updating every 60 seconds
- **7 Live NOAA SWPC APIs** — Kp index, solar wind plasma, magnetic field (Bz), X-ray flux, active alerts, storm scales, and 3-day Kp forecast
- **Sector Risk Intelligence** — Computed risk levels from Low to Extreme for Power Grids, Aviation, GPS/GNSS, HF Radio, and Satellite Operations
- **Live Alerts Feed** — Filterable, expandable alert cards with severity color-coding for Warnings, Watches, Alerts, and Summaries
- **4-Panel Analytics Dashboard** — Recharts-powered views for Kp timeline, X-ray flux, solar wind speed, and Bz component
- **3-Day Kp Forecast Bar Chart** — Color-coded bars by storm intensity
- **Cinematic UI** — Liquid-glass design language, looping background motion, and blur-in text animations
- **Auto-Refresh with Countdown** — All data refreshes every 60 seconds, with a visible countdown timer in the navbar
- **Responsive + Mobile-First** — Hamburger navigation, touch-friendly layouts, and support from small phones to desktop screens
- **Dark Mode Default** — Respects `prefers-color-scheme` and includes a theme toggle
- **Skeleton Loaders + Empty & Error States** — Every data surface handles loading and failure states gracefully

---

## 🛰️ Data Sources

All data is free, public, CORS-enabled, and requires no API key.

| Endpoint | URL | Used For |
|---|---|---|
| Kp Index (1-min) | `services.swpc.noaa.gov/json/planetary_k_index_1m.json` | Kp gauge, charts, risk calc |
| Active Alerts | `services.swpc.noaa.gov/json/alerts.json` | Alerts page, badge count |
| X-Ray Flux (6hr) | `services.swpc.noaa.gov/json/goes/secondary/xrays-6-hour.json` | X-ray chart, HF radio risk |
| Solar Wind Mag (5-min) | `services.swpc.noaa.gov/json/solar-wind/mag-5-minute.json` | Bz chart, GPS risk |
| Solar Wind Plasma (5-min) | `services.swpc.noaa.gov/json/solar-wind/plasma-5-minute.json` | Speed and density chart |
| NOAA Storm Scales | `services.swpc.noaa.gov/products/noaa-scales.json` | G/S/R badges |
| 3-Day Kp Forecast | `services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json` | Forecast bar chart |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router DOM v7 |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | CSS with project-specific utility styling |
| Data | NOAA SWPC REST APIs (no key, CORS-enabled) |
| Deployment | Vercel |

---

## 📁 Project Structure

```text
heliox/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── assets/
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useSpaceWeather.js
│   ├── utils/
│   │   └── riskCalculator.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── StormBadge.jsx
│   │   ├── KpiCard.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── AlertCard.jsx
│   │   ├── BlurText.jsx
│   │   └── FadingVideo.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Alerts.jsx
│   │   ├── Impacts.jsx
│   │   ├── Forecast.jsx
│   │   ├── Learn.jsx
│   │   └── About.jsx
│   └── router/
│       └── AppRouter.jsx
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kavyanshops/Heliox.git
cd Heliox/heliox

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

No environment variables are required. All APIs are public and CORS-enabled.

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Cinematic hero, Kp gauge, storm scale cards, live stats |
| `/dashboard` | Dashboard | 4 live charts + KPI row |
| `/alerts` | Alerts | Filterable NOAA alerts feed |
| `/impacts` | Impacts | Sector-by-sector risk cards |
| `/forecast` | Forecast | 3-day Kp bar chart |
| `/learn` | Learn | Educational accordion for Kp, CMEs, and NOAA scales |
| `/about` | About | Mission, data credits, and NOAA SWPC links |

---

## 🧮 Risk Calculation Logic

Risk levels are derived from live Kp and Bz values in `src/utils/riskCalculator.js`.

| Kp Range | Risk Level | Color |
|---|---|---|
| 0 – 3 | Low | #3ddc84 |
| 4 | Moderate | #ffd166 |
| 5 – 6 | High | #ff9f40 |
| 7 | Severe | #ff4d4d |
| 8 – 9 | Extreme | #cc0000 |

GPS/GNSS risk is elevated to Severe when Bz < −10 nT and Kp ≥ 4, regardless of the base Kp risk level.

HF Radio risk is derived from live X-ray flux class independently of Kp.

---

## 🎨 Design System

Heliox uses a cinematic space-weather aesthetic:

- **Background**: Deep black surfaces with subtle atmospheric contrast
- **Typography**: Display-forward headings with a clean body type system
- **Surfaces**: Glass-like cards and layered panels for depth
- **Colors**: Neutral dark surfaces with data-driven green, yellow, orange, and red accents
- **Animations**: Motion-driven entrances and soft transitions for the hero and content blocks
- **Skeletons**: Shimmer loaders for all async data surfaces

---

## 🔄 Data Refresh Architecture

```text
useSpaceWeather.js
├── Promise.all([...fetch calls]) on mount
├── setInterval(fetchAll, 60_000)  ← refetch every 60s
├── setInterval(countdown, 1_000)  ← decrement secondsUntilRefresh
└── Exposes: kpData, alertsData, xrayData, magData,
    plasmaData, scalesData, forecastData,
    loading, error, secondsUntilRefresh
```

All data flows down from `src/router/AppRouter.jsx` into each page component.

---

## 📚 Learn: What Heliox Monitors

Space weather refers to environmental conditions in space driven by solar activity, including:

- **Solar Flares** — sudden X-ray and UV bursts that can cause HF radio blackouts on the dayside
- **CMEs (Coronal Mass Ejections)** — magnetized plasma clouds that drive geomagnetic storms 1 to 3 days after eruption
- **Geomagnetic Storms** — measured by the Kp index and rated G1 to G5 by NOAA
- **Solar Energetic Particles** — high-energy particles that affect polar aviation and satellite electronics
- **Solar Wind** — continuous plasma stream; southward Bz can intensify storm conditions

Heliox turns this science into plain-language risk levels for critical infrastructure sectors.

---

## 🗓️ Roadmap

- [x] Real-time NOAA data integration
- [x] Sector risk intelligence engine
- [x] Live alerts feed with filters
- [x] 3-day Kp forecast
- [x] Educational Learn page
- [ ] Push notifications for G3+ storm alerts
- [ ] Incident reporting for infrastructure anomalies
- [ ] India-specific regional impact mapping
- [ ] Low-cost magnetometer sensor network integration
- [ ] Historical event database
- [ ] B2B API for grid operators and telecoms
- [ ] Mobile app

---


## 🙏 Credits & Acknowledgements

- NOAA Space Weather Prediction Center — live data
- NASA DONKI — solar event catalog
- ESA Space Weather Service — European monitoring reference
- Recharts — charting library
- Framer Motion — animation engine
- Lucide React — icon system

---

<p align="center">
  Made with ☀️ and a healthy fear of solar flares
</p>