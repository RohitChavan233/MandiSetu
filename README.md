# 🌾 MandiSetu (मंडी सेतू)
### Market Intelligence & Transaction Platform for Farmers
**Government of Maharashtra · SIH Problem Statement SIH26132**

> *MandiSetu means "Bridge to the Mandi"* — connecting smallholder farmers and Farmer Producer Organizations (FPOs) with transparent prices, AI-powered sell decisions, and secure digital transactions.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Live Demo](#live-demo)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [User Roles](#user-roles)
6. [UI Walkthrough — Feature by Feature](#ui-walkthrough--feature-by-feature)
7. [Application Architecture](#application-architecture)
8. [Data Models](#data-models)
9. [Internationalization](#internationalization)
10. [Project Structure](#project-structure)
11. [Available Scripts](#available-scripts)

---

## Overview

MandiSetu is a **trilingual (Marathi / Hindi / English)**, mobile-first, installable PWA that gives smallholder farmers three things they currently lack:

| Pillar | What it does |
|--------|-------------|
| **See** | Real-time mandi prices, arrivals data, and weather across Maharashtra APMCs |
| **Decide** | 7–21 day price forecast with honest uncertainty bands + plain-language "Sell Now / Sell Later" verdict |
| **Transact** | Digital lot listing → buyer matching → escrow-backed payment → dispute resolution — end to end |

---

## Live Demo

Start the development server and open your browser:

```
http://localhost:5173/
```

A **Demo Banner** at the top of every page lets you instantly switch between roles (Farmer, FPO, Buyer, Officer) without needing real credentials.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 + TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Vanilla CSS (custom design system in `index.css`) |
| Icons | Lucide React |
| Maps | Leaflet.js |
| QR Codes | qrcode.react |
| Animations | canvas-confetti (payment celebration) |
| State Management | React Context API (`AppContext`) |
| Linting | oxlint |
| Routing | View-state routing (no external router) |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install & Run

```powershell
# 1. Navigate to the project
cd r:\MandiSetu

# 2. Install dependencies (skip if node_modules already exists)
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173/** in your browser.

### Other Commands

```powershell
npm run build     # Type-check + production build -> dist/
npm run preview   # Preview the production build locally
npm run lint      # Run oxlint static analysis
```

---

## User Roles

The app supports **four distinct roles**, each with a different navigation menu and feature set:

| Role | Who they are | Primary actions |
|------|-------------|----------------|
| **Farmer** | Individual smallholder | View prices, create lots, receive offers, track payments |
| **FPO** | Farmer Producer Organization | Same as farmer + bulk lot management for member farmers |
| **Buyer** | Trader / Processor / Exporter | Browse listed lots, submit offers, manage transactions |
| **Officer** | APMC / Govt. official | KYC verification, dispute mediation, analytics dashboard |

> **Demo Mode**: Use the colored role-switcher banner at the top to switch roles instantly. No login required in demo mode.

---

## UI Walkthrough — Feature by Feature

### 1. Header & Navigation

**File:** `src/components/Header.tsx`

The sticky top header contains:
- **MandiSetu logo** — clicking it returns to the Price Board
- **Language switcher** — toggle between Marathi, Hindi, and English; the entire UI re-renders in the chosen language instantly
- **Notification bell** — shows unread count badge; opens a dropdown of recent alerts (price spikes, new offers, escrow updates, KYC status)
- **Role-based nav menu** — navigation links change depending on your role:
  - *Farmer/FPO:* Prices → Price Advisor → My Lots → Buyer Matching → Transactions → Dispute Desk → Logistics
  - *Buyer:* Prices → Browse Lots → My Transactions → Disputes → Logistics
  - *Officer:* KYC Console → Disputes → Analytics → Pipeline
- **User avatar / Login button** — shows user name + role badge when logged in
- **Session info** — shows session expiry countdown for security compliance

---

### 2. Demo Banner

**File:** `src/components/DemoBanner.tsx`

A dismissible amber banner displayed below the header in demo mode:
- Shows the currently active demo role
- Provides **role-switch buttons** (Farmer, FPO, Buyer, Officer) to instantly swap context without logging in
- Warns that all data is simulated

---

### 3. Price Board

**File:** `src/components/PriceBoard.tsx`
**Route:** Default landing page

The main price discovery dashboard. Features:

#### Filters Bar
- **Commodity selector** — pick from 15+ Maharashtra crops (Onion, Tomato, Soybean, Cotton, Wheat, etc.)
- **Mandi selector** — filter by APMC market (Nashik, Pune, Nagpur, Lasalgaon, etc.)
- **Date picker** — view historical prices

#### Price Cards Grid
Each card shows for one mandi:
- Modal price (highlighted), min price, max price — all in Rs/quintal
- Arrivals in quintals
- 24-hour price change (green up / red down with percentage)
- MSP reference line
- Data source and last-updated timestamp
- Chart icon — opens Price Chart Modal
- Compare icon — opens Mandi Comparator

#### Weather Strip
**File:** `src/components/WeatherStrip.tsx`
Horizontally scrolling 7-day weather forecast pinned above the price grid. Each day shows temperature range, rainfall, humidity, and an agriculture alert (e.g., "Heavy rain — delay harvest").

#### Price Chart Modal
**File:** `src/components/PriceChartModal.tsx`
SVG line chart showing up to 30 days of historical modal price with min/max band shading. Includes arrivals bar chart overlay and MSP reference line.

#### Mandi Comparator
**File:** `src/components/MandiComparator.tsx`
Side-by-side comparison of the same commodity across multiple mandis — quickly see which mandi is offering the best price today.

#### Mandi Map Modal
**File:** `src/components/MandiMapModal.tsx`
Interactive Leaflet.js map pinning all APMCs in Maharashtra. Clicking a pin shows the current modal price for the selected commodity.

---

### 4. Price Forecast & Sell Advisor

**File:** `src/components/ForecastAdvisor.tsx`
**Routes:** `forecast` and `advisor`

A two-tab view combining the forecast chart and the sell decision engine.

#### Forecast Tab
- Select commodity + mandi + horizon (7, 14, or 21 days)
- Displays a **probability band chart** with three lines:
  - P10 — pessimistic (only 10% chance prices will be this low)
  - P50 — median expected price
  - P90 — optimistic (only 10% chance prices will be this high)
- Shows model accuracy metrics: MAPE (%), 80% coverage, confidence level

#### Sell Advisor Tab
The farmer inputs their quantity, current price, storage type, storage cost, spoilage rate, and optional cash urgency. The advisor returns a **verdict card**:

| Verdict | Meaning |
|---------|---------|
| `SELL NOW` | Expected gain from waiting does not cover storage costs |
| `SELL IN WINDOW` | Sell between day X–Y for best net return |
| `STORE PART, SELL PART` | Split recommendation with quantities |
| `NO CLEAR SIGNAL` | Uncertainty too high to advise |

Each verdict includes:
- Plain-language explanation in the user's chosen language
- Cost breakdown: storage cost, shrinkage loss, finance cost, gross gain, net gain
- P10 safe gain (conservative estimate)

---

### 5. Lot Creation

**File:** `src/components/LotCreationModal.tsx`
**Route:** `create_lot`

Farmers/FPOs list their produce as a digital lot. The multi-step form collects:

| Step | Fields |
|------|--------|
| Crop Details | Commodity, variety, grade, quantity, harvest date |
| Quality | Moisture %, size in mm, optional photo upload |
| Location | District, taluka, village (auto-geocoded) |
| Pricing | Asking price per quintal (optional — can leave open for bidding) |
| Voice Input | Optional voice transcript of description |
| Review | Summary of all entries before submission |

On submission a unique Lot ID and QR code are generated encoding the lot's digital signature.

---

### 6. My Lots

**File:** `src/components/FarmerLotsView.tsx`
**Route:** `lots`

A dashboard of all lots created by the logged-in farmer/FPO:
- Status badge for each lot (Draft, Listed, Offer Received, Sold, Delivered, Closed)
- Quantity, commodity, asking price
- Number of offers received
- Actions: View offers, Edit draft, Download certificate

---

### 7. Buyer Matching

**File:** `src/components/BuyerMatching.tsx`
**Route:** `offers`

For farmers: shows matched buyers for each listed lot.
For buyers: shows available lots matching their commodity/grade preferences.

Each matched buyer card shows:
- Buyer name, company, district, distance (km)
- **Trust Score** (0–100) with breakdown: completed transactions, on-time payment rate, quality acceptance rate, dispute-free rate, KYC tier (1–3)
- Bid price per quintal and demanded quantity
- Tags (e.g., "Pays Fast", "Local Buyer", "Quality Focused")
- Actions: Accept offer, Counter-offer, Decline

---

### 8. Offer & Transaction Workflow

**File:** `src/components/OfferTransactionWorkflow.tsx`
**Route:** `transactions`

Tracks the full lifecycle through 8 states:

```
Offer Accepted → Escrow Locked → Pickup Scheduled → In Transit
     → Delivered → Quality Confirmed → Payment Released → Closed
```

Each state is shown as a **timeline card** with timestamp, actor, and notes. Payment is only released after both parties confirm delivery and quality — protecting farmers from non-payment and buyers from quality fraud.

---

### 9. Dispute Desk

**File:** `src/components/DisputeDesk.tsx`
**Routes:** `disputes` (farmer/buyer) and `officer_disputes` (officer)

**Farmer/Buyer View:**
- List of disputes raised on their transactions
- Dispute reason, details, claim amount, current status
- Evidence photo upload option
- Status badges: Open, Under Review, Resolved
- Outcome display once resolved

**Officer View:**
Officers can mark disputes Under Review, enter resolution notes, select an outcome (release / partial / refund), and resolve the dispute.

---

### 10. Logistics Directory

**File:** `src/components/LogisticsDirectory.tsx`
**Route:** `logistics`

A searchable directory of:
- **Transporters** — name, district, taluka, rate, phone, rating, verified badge
- **Cold Storage facilities** — capacity, rate, location, rating

Filter by type and district. Each card has a **Call** button linking to the provider's phone number.

---

### 11. Officer Console

**File:** `src/components/OfficerConsole.tsx`
**Routes:** `officer_kyc`, `officer_analytics`, `officer_pipeline`

- **KYC Console** — Review and approve/reject KYC submissions from farmers and buyers
- **Analytics Dashboard** — Metrics: total active lots, transactions, disputes, average price trends, volume by commodity
- **Transaction Pipeline** — Kanban-style view of all active transactions grouped by state

---

### 12. Auth Modal

**File:** `src/components/AuthModal.tsx`

OTP-based phone login with role selection. If KYC is not completed, shows an inline prompt. Also shows active sessions with device/IP and option to revoke.

---

### 13. Idle Warning Modal

**File:** `src/components/IdleWarningModal.tsx`

After inactivity, a modal warns the user their session will expire in 60 seconds. "Stay Logged In" button resets the timer. If ignored, the user is redirected to the signed-out view.

---

### 14. Public Lot Verification

**File:** `src/components/PublicVerifyView.tsx`
**Route:** `verify_lot`

A public (no login required) page where anyone can enter a Lot ID or scan the QR code to verify farmer name, crop, quantity, grade, digital signature validity, and transaction history.

---

### 15. About Data Modal

**File:** `src/components/AboutDataModal.tsx`

Explains data sources, forecast methodology, model accuracy metrics, and data freshness policy. Sources include Agmarknet, eNAM, and APMC APIs.

---

### 16. Signed Out View

**File:** `src/components/SignedOutView.tsx`
**Routes:** `signed_out`, `session_expired`

Friendly landing page shown after manual logout or session expiry, with a call-to-action to log in again.

---

### 17. Footer

**File:** `src/components/Footer.tsx`

MandiSetu branding in all three languages, quick navigation links, data source attributions (Agmarknet, eNAM, IMD), Government of Maharashtra seal, and links to About, Privacy Policy, Grievance, and Contact.

---

## Application Architecture

```
src/
├── main.tsx               # React entry point
├── App.tsx                # Root component — view router
├── App.css                # Component-scoped styles
├── index.css              # Global design system (variables, typography, utilities)
│
├── context/
│   └── AppContext.tsx     # Global state: user, language, view, lots, prices, etc.
│
├── types/
│   └── index.ts           # All TypeScript interfaces and enums
│
├── i18n/
│   └── translations.ts    # All UI strings in mr / hi / en
│
├── data/
│   └── mockData.ts        # Realistic Maharashtra seed data
│
└── components/            # 22 UI components (see walkthrough above)
```

### State Flow

```
AppContext (global state)
    ├── currentUser: User | null
    ├── currentView: ViewName         <- drives which component renders
    ├── language: 'mr' | 'hi' | 'en' <- drives all translations
    ├── lots: Lot[]
    ├── transactions: Transaction[]
    ├── offers: Offer[]
    ├── disputes: Dispute[]
    ├── priceObservations: PriceObservation[]
    └── notifications: NotificationItem[]
```

`App.tsx` conditionally renders one top-level component based on `currentView`. Navigation links call `setCurrentView(...)` — no external router needed.

---

## Data Models

Key domain entities defined in `src/types/index.ts`:

| Model | Description |
|-------|-------------|
| `User` | Farmer / FPO / Buyer / Officer with KYC status, land size, crops |
| `Mandi` | APMC market with trilingual names and lat/lon |
| `Commodity` | Crop with MSP, grades, varieties, trilingual names |
| `PriceObservation` | Modal/min/max price per mandi per day with 24h change |
| `ForecastResult` | P10/P50/P90 bands for 7–21 day horizon with accuracy metrics |
| `AdvisorVerdict` | Sell decision with cost breakdown and plain-language explanation |
| `Lot` | Farmer's produce listing with QR, digital signature, geo-location |
| `MatchedBuyer` | Buyer with trust score breakdown matched to a lot |
| `Offer` | Buyer's bid on a lot with expiry and counter-price support |
| `Transaction` | Full lifecycle with 8-state audit trail and escrow status |
| `Dispute` | Dispute raised on a transaction with mediator and outcome |
| `LogisticsProvider` | Transporter or cold storage with rates and rating |

---

## Internationalization

All UI text lives in `src/i18n/translations.ts` as a nested object keyed by language code:

```typescript
translations['mr']['nav_prices']  // -> "भाव"
translations['hi']['nav_prices']  // -> "भाव"
translations['en']['nav_prices']  // -> "Prices"
```

The `useApp()` hook exposes a `t(key)` helper that returns the string in the currently selected language. Switching language re-renders the entire UI instantly — no page reload.

---

## Project Structure

```
r:\MandiSetu\
├── index.html             # PWA shell, meta tags
├── package.json
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── public/                # Static assets (icons, manifest)
├── dist/                  # Production build output
└── src/                   # All source code
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR on `http://localhost:5173/` |
| `npm run build` | Type-check + build production bundle to `dist/` |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run oxlint static analysis on all TypeScript files |

---

## Problem Statement

**SIH26132** · Organization: Government of Maharashtra (Maharashtra State Innovation Society, Dept. of Skills, Employment, Entrepreneurship and Innovation) · Theme: Agriculture, FoodTech & Rural Development

MandiSetu directly addresses the market information asymmetry faced by smallholder farmers who currently rely on middlemen for price information, leading to below-MSP sales and exploitative practices. The platform creates a transparent, digital bridge between farmers and buyers, backed by government data sources and an AI-powered decision engine.

---

*Built for Smart India Hackathon 2026 · MandiSetu v1.0*
