# Zorvyn Finance Dashboard

A clean, interactive, and beautifully designed **Finance Dashboard** built with React + Vite. Track income, expenses, spending patterns, and gain financial insights — all in one place.

[![Live Preview](https://img.shields.io/badge/Live-Preview-6c63ff?style=flat-square)](https://github.com/Arnavsao/Zorvyn-Assignment)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)](https://vitejs.dev)

---

## ✨ Features

### 📊 Dashboard Overview
- **4 KPI Summary Cards** — Total Balance, Monthly Income, Monthly Expenses, Savings Rate — with animated count-up
- **Balance Trend Chart** — 12-month area chart of income, expenses, and net balance (Recharts)
- **Spending Breakdown** — Interactive donut chart by category with active sector expansion
- **Recent Transactions** widget linking to full transaction list

### 💳 Transactions
- **Search** by description or category keyword
- **Filter** by category, type (income/expense), and month
- **Sort** by date, amount, or category (ascending/descending)
- **Pagination** — 10 rows per page with smart page number rendering
- **Export** transactions as **CSV** or **JSON**
- **Add / Edit / Delete** transactions (Admin role only) with form validation

### 🧠 Insights
- Highest spending category with percentage share
- Month-over-month spending comparison (bar chart — last 6 months)
- Category breakdown progress bars
- Savings rate gauge with contextual colour (healthy/warning/danger)
- Average daily spend this month
- Best saving month callout
- Smart MoM alert banner

### 🔐 Role-Based UI (RBAC)
| Role | Access |
|------|--------|
| **Admin** | View + Add / Edit / Delete transactions |
| **Viewer** | Read-only — no mutation actions visible |

Switch roles via the **Topbar dropdown** — no authentication required.

### 🌙 Dark Mode
Full dark theme support, toggled via the moon/sun icon in the Topbar. Preference persisted across sessions.

### 💾 Local Storage Persistence
Transaction data, selected role, and dark mode preference are automatically persisted using **Zustand's persist middleware**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Arnavsao/Zorvyn-Assignment.git
cd Zorvyn-Assignment
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Common/
│   │   └── Toast.jsx               # Global toast notifications
│   ├── Dashboard/
│   │   ├── SummaryCard.jsx         # KPI card with count-up animation
│   │   ├── BalanceTrendChart.jsx   # Monthly area chart (Recharts)
│   │   └── SpendingBreakdownChart.jsx  # Donut chart by category
│   ├── Layout/
│   │   ├── Sidebar.jsx             # Navigation sidebar
│   │   ├── Topbar.jsx              # Header with role switcher & dark mode
│   │   └── Layout.jsx              # Root shell component
│   └── Transactions/
│       ├── TransactionModal.jsx    # Add / Edit modal form
│       └── Transactions.css        # Shared transaction styles
├── data/
│   └── mockData.js                 # 80+ mock transactions + helpers
├── pages/
│   ├── Dashboard.jsx               # Dashboard page
│   ├── Transactions.jsx            # Transactions list page
│   └── Insights.jsx                # Insights & analytics page
├── store/
│   └── useStore.js                 # Zustand store with persistence
├── utils/
│   └── formatters.js               # Currency, date, export utilities
├── App.jsx                         # Root router
├── main.jsx                        # Entry point
└── index.css                       # Global design system (CSS variables, tokens)
```

---

## 🛠️ Tech Stack

| Concern | Library |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router v6 |
| State Management | Zustand (with persist middleware) |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | Vanilla CSS (custom design system) |
| Fonts | Inter (Google Fonts) |

---

## 🎨 Design Decisions

- **CSS Custom Properties** for a full light/dark theme system — no framework dependency
- **Glassmorphism** card style with subtle shadows for a premium feel
- **Animated count-up** on KPI cards for engaging data reveal
- **Recharts** chosen for its composable API and React-native SVG rendering
- **Zustand** over Redux for minimal boilerplate and built-in persistence
- **Role simulation** via a simple dropdown — no JWT/auth complexity needed for a UI demo

---

## 📋 Assignment Checklist

- [x] Dashboard Overview (summary cards + time-based + categorical visualizations)
- [x] Transactions Section (date, amount, category, type; filtering, sorting, search)
- [x] Basic Role-Based UI (Admin vs Viewer, dropdown switcher)
- [x] Insights Section (top category, MoM comparison, savings rate, daily spend)
- [x] State Management (Zustand — transactions, filters, role)
- [x] Responsive Design (mobile sidebar, collapsing grid)
- [x] Dark Mode (optional enhancement ✓)
- [x] Local Storage Persistence (optional enhancement ✓)
- [x] Export CSV / JSON (optional enhancement ✓)
- [x] Animations & Transitions (optional enhancement ✓)

---

## 📸 Screenshots

> Run `npm run dev` locally to see the full interactive dashboard.

---

*Built for the Zorvyn Frontend Developer Internship Assignment — April 2026*
