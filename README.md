# Zorvyn Finance Dashboard

A clean, interactive Finance Dashboard built with React and Vite. It allows users to track income, expenses, and spending patterns through a structured interface with data visualizations, transaction management, and role-based access control.

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat-square)](https://zustand-demo.pmnd.rs)

---

## Overview

This project was built as part of the Zorvyn Frontend Developer Internship assignment. The goal was to design and implement a realistic finance dashboard that demonstrates component architecture, state management, data visualization, and UI/UX thinking — without any backend dependency.

The entire application runs on static mock data generated in JavaScript. All state is managed on the client and persisted to `localStorage` so the experience feels continuous across page refreshes.

---

## Approach

### Starting Point

Rather than thinking about this as a "form with charts", I approached it as a product — something a user would actually open daily to understand their finances. That framing shaped every decision, from the layout hierarchy to what goes on the Insights page.

### Layout and Navigation

The layout uses a fixed sidebar and a topbar, giving users a persistent navigation anchor. The three pages — Dashboard, Transactions, Insights — are organised by user intent:

- **Dashboard** is for a quick overview at a glance.
- **Transactions** is for detailed investigation and record management.
- **Insights** is for understanding patterns and drawing conclusions.

This separation keeps each page focused rather than packing everything onto one screen.

### State Management

I chose **Zustand** over Redux or Context for a few reasons. The store is co-located in a single file, the API is minimal, and the `persist` middleware handles `localStorage` serialisation with no additional setup. The store manages:

- The transactions array (CRUD operations)
- Active filters (search, category, type, month, sort column, sort direction)
- The current role (admin or viewer)
- Dark mode preference
- A transient toast notification slot

A derived selector `getFilteredTransactions` runs the filter and sort logic in one place so no component needs to replicate it.

### Data and Computations

The mock dataset contains over 80 transactions across all 12 months of 2025, spread across 12 realistic categories. Two helper functions — `buildMonthlyData` and `buildCategoryBreakdown` — compute the aggregated data that the charts consume. Financial summaries (total balance, monthly income/expense, savings rate, month-over-month trend percentages) are derived freshly on each render from the live transactions array so they always reflect added or edited entries in real time.

### Role-Based UI

The RBAC requirement is handled purely at the UI layer. The Zustand store holds the current role as a string. Components read it and conditionally render action buttons. There is no routing guard or access token — the point is to demonstrate UI-level role differentiation with a visible switcher, not to simulate production authentication.

- **Admin**: can add, edit, and delete transactions.
- **Viewer**: sees all data but no mutation controls.

### Styling

The entire design system lives in `index.css` as CSS custom properties. Light and dark themes are two sets of variable values switched by a `data-theme` attribute on the document root. This means every component automatically reacts to theme changes without any JavaScript class toggling per element.

No utility framework was used. Every component has a dedicated stylesheet or shares a grouped one, keeping styles scoped without a build-time dependency.

### Component Design

Components are split by responsibility:

- **SummaryCard** is purely presentational — it receives props and animates to the target number using `requestAnimationFrame` with an easeOutExpo curve.
- **BalanceTrendChart** and **SpendingBreakdownChart** each own their data derivation and rendering.
- **TransactionModal** encapsulates all form state locally and calls store actions only on confirmed submit.
- **Topbar** owns the role switcher dropdown state locally (open/close) while reading and writing role from the global store.

This keeps the global store lean and puts ephemeral UI state where it belongs — closest to where it is used.

---

## Features

### Dashboard

- Four KPI cards: Total Balance, Monthly Income, Monthly Expenses, Savings Rate
- Numbers animate on mount using a custom count-up hook
- Trend badges on income and expense cards showing percentage change vs the previous month
- 12-month area chart (income, expenses, net balance) with gradient fills and a custom tooltip
- Interactive donut chart by spending category with active sector expansion on hover
- Recent transactions widget showing the latest five entries

### Transactions

- Searchable by description or category keyword
- Filterable by category, transaction type, and month
- Sortable by date, amount, or category with ascending/descending toggle
- Paginated at 10 rows per page with smart ellipsis rendering for large page sets
- Export the current filtered result set as CSV or JSON
- Admin role: Add transaction button, and per-row Edit and Delete actions
- Viewer role: All controls hidden, table is read-only
- Empty state UI when no transactions match the active filters

### Insights

- Top spending category with share percentage
- Savings rate progress bar with contextual colour (green above 20%, amber above 10%, red below)
- Average daily spend computed from the current month's data
- Best saving month across the full dataset
- Month-over-month alert: contextual banner indicating whether spending increased or decreased
- Six-month grouped bar chart comparing income and expenses side by side
- Category breakdown with relative progress bars showing each category's share of total expenses

### Additional

- Dark mode toggle persisted across sessions
- All transaction data, role, and theme preference stored in `localStorage` via Zustand's persist middleware
- Toast notifications for add, edit, delete, and export actions
- Fully responsive: sidebar collapses on mobile, grids reflow to single column

---

## Getting Started

**Prerequisites:** Node.js 18 or later

```bash
git clone https://github.com/Arnavsao/Zorvyn-Assignment.git
cd Zorvyn-Assignment
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Production build:**

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Common/
│   │   └── Toast.jsx                   # Global toast notification
│   ├── Dashboard/
│   │   ├── SummaryCard.jsx             # KPI card with count-up animation
│   │   ├── BalanceTrendChart.jsx       # 12-month area chart
│   │   └── SpendingBreakdownChart.jsx  # Donut chart by category
│   ├── Layout/
│   │   ├── Sidebar.jsx                 # Fixed navigation sidebar
│   │   ├── Topbar.jsx                  # Topbar with role switcher and dark mode toggle
│   │   └── Layout.jsx                  # Root shell wrapping Sidebar + Topbar + Outlet
│   └── Transactions/
│       ├── TransactionModal.jsx        # Add / Edit transaction form
│       └── Transactions.css            # Shared transaction component styles
├── data/
│   └── mockData.js                     # 80+ transactions, category colours, chart helpers
├── pages/
│   ├── Dashboard.jsx                   # Dashboard page
│   ├── Transactions.jsx                # Transactions list page
│   └── Insights.jsx                    # Insights and analytics page
├── store/
│   └── useStore.js                     # Zustand store with localStorage persistence
├── utils/
│   └── formatters.js                   # Currency formatting, date helpers, CSV/JSON export
├── App.jsx                             # Route definitions
├── main.jsx                            # React entry point
└── index.css                           # Design system: CSS variables, tokens, global styles
```

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite 5 | Fast HMR, modern build pipeline, minimal config |
| Routing | React Router v6 | Standard, nested route support for layout wrapping |
| State | Zustand | Minimal API, no boilerplate, built-in localStorage persist |
| Charts | Recharts | Composable React components, SVG-based, responsive |
| Icons | Lucide React | Consistent stroke-based icon set |
| Styling | Vanilla CSS | Full control, no build-time dependency, CSS variables for theming |
| Fonts | Inter via Google Fonts | Clean, legible, widely used in dashboards |

---

## Assignment Checklist

- [x] Dashboard overview with summary cards and two chart types (time-based and categorical)
- [x] Transactions section with date, amount, category, type — plus filter, sort, and search
- [x] Role-based UI simulation (Admin vs Viewer via dropdown switcher)
- [x] Insights section with top category, monthly comparison, savings rate, and daily spend
- [x] State management via Zustand covering transactions, filters, and role
- [x] Responsive layout — mobile sidebar, collapsing grids
- [x] Dark mode (optional)
- [x] Local storage persistence (optional)
- [x] Export as CSV and JSON (optional)
- [x] Animations and transitions (optional)

---

*Zorvyn Frontend Developer Internship Assignment — April 2026*
