/**
 * Insights.jsx
 * Insights page — spending analytics, monthly comparison, savings gauge.
 */

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';
import {
  Trophy, TrendingUp, TrendingDown, Target,
  AlertCircle, CheckCircle2, Flame, CalendarDays,
} from 'lucide-react';
import useStore from '../store/useStore';
import { buildMonthlyData, buildCategoryBreakdown, CATEGORY_COLORS } from '../data/mockData';
import { formatCurrency, computeSummary, SHORT_MONTHS } from '../utils/formatters';
import './Insights.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip" style={{ padding: '10px 14px' }}>
      <p style={{ fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{label}</p>
      {payload.map((e) => (
        <div key={e.name} style={{ display: 'flex', gap: 8, fontSize: 13, marginTop: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: e.fill, display: 'inline-block', marginTop: 4 }} />
          <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{e.name}</span>
          <span style={{ fontWeight: 600 }}>{formatCurrency(e.value)}</span>
        </div>
      ))}
    </div>
  );
};

function InsightCard({ icon: Icon, label, value, sub, color, children }) {
  return (
    <div className="card insight-kpi-card">
      <div className="insight-kpi-top">
        <div className="insight-kpi-icon" style={{ '--ic': color }}>
          <Icon size={18} />
        </div>
        <div>
          <p className="insight-kpi-label">{label}</p>
          <p className="insight-kpi-value">{value}</p>
          {sub && <p className="insight-kpi-sub">{sub}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Insights() {
  const transactions = useStore((s) => s.transactions);
  const monthly = buildMonthlyData(transactions);
  const summary = computeSummary(transactions);
  const breakdown = buildCategoryBreakdown(transactions);

  // Monthly income vs expense comparison (last 6 months)
  const last6 = monthly.slice(-6);

  // Highest spending category
  const topCategory = breakdown[0] ?? { name: 'N/A', value: 0 };
  const totalExpense = breakdown.reduce((s, d) => s + d.value, 0);

  // Best saving month
  const bestSavingMonth = monthly.reduce(
    (best, m) => (m.income - m.expense > best.diff ? { ...m, diff: m.income - m.expense } : best),
    { ...monthly[0], diff: monthly[0]?.income - monthly[0]?.expense }
  );

  // Avg daily spend this month
  const now = new Date();
  const daysElapsed = now.getDate();
  const avgDaily = daysElapsed > 0 ? Math.round(summary.thisExpense / daysElapsed) : 0;

  // Month over month expense
  const expDiff = summary.thisExpense - (
    transactions.filter((t) => {
      const d = new Date(t.date);
      const lm = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const ly = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return t.type === 'expense' && d.getMonth() === lm && d.getFullYear() === ly;
    }).reduce((s, t) => s + t.amount, 0)
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Insights</h1>
        <p className="page-subtitle">Smart observations from your financial data</p>
      </div>

      {/* KPI row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <InsightCard
          icon={Trophy}
          label="Top Spending Category"
          value={topCategory.name}
          sub={`${formatCurrency(topCategory.value)} · ${((topCategory.value / totalExpense) * 100).toFixed(1)}% of expenses`}
          color="#f59e0b"
        />
        <InsightCard
          icon={Target}
          label="Savings Rate"
          value={`${summary.savingsRate}%`}
          sub="This month"
          color="#6c63ff"
        >
          <div style={{ marginTop: 12 }}>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${Math.min(100, Math.max(0, summary.savingsRate))}%`,
                  background: summary.savingsRate >= 20
                    ? 'var(--success)' : summary.savingsRate >= 10
                    ? 'var(--warning)' : 'var(--danger)',
                }}
              />
            </div>
          </div>
        </InsightCard>
        <InsightCard
          icon={CalendarDays}
          label="Avg Daily Spend"
          value={formatCurrency(avgDaily)}
          sub={`Based on ${daysElapsed} days this month`}
          color="#3b82f6"
        />
        <InsightCard
          icon={Flame}
          label="Best Saving Month"
          value={bestSavingMonth?.month ?? 'N/A'}
          sub={`Saved ${formatCurrency(Math.max(0, bestSavingMonth?.diff ?? 0))}`}
          color="#10b981"
        />
      </div>

      {/* MoM Alert */}
      <div className={`insight-alert card ${expDiff > 0 ? 'alert-warn' : 'alert-ok'}`} style={{ marginBottom: 24 }}>
        {expDiff > 0 ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
        <div>
          <p className="alert-title">
            {expDiff > 0
              ? `Spending is up ${formatCurrency(Math.abs(expDiff))} compared to last month`
              : `Great! You spent ${formatCurrency(Math.abs(expDiff))} less than last month`}
          </p>
          <p className="alert-sub">
            {expDiff > 0
              ? 'Review your expenses to find areas to cut back.'
              : 'Keep it up — you\'re trending in the right direction!'}
          </p>
        </div>
      </div>

      {/* Charts row */}
      <div className="insights-charts-row">
        {/* Monthly income vs expense */}
        <div className="card chart-card">
          <div className="chart-header">
            <div>
              <h3 className="section-title" style={{ fontSize: 16 }}>Monthly Comparison</h3>
              <p className="section-subtitle">Income vs expenses — last 6 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={last6} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="expense" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="card chart-card">
          <div className="chart-header">
            <div>
              <h3 className="section-title" style={{ fontSize: 16 }}>Category Breakdown</h3>
              <p className="section-subtitle">Top spending areas</p>
            </div>
          </div>
          <div className="category-bars">
            {breakdown.slice(0, 7).map((item) => (
              <div key={item.name} className="cat-bar-row">
                <div className="cat-bar-info">
                  <span className="cat-dot" style={{ background: CATEGORY_COLORS[item.name] || '#94a3b8', width: 10, height: 10, borderRadius: '50%', display: 'inline-block' }} />
                  <span className="cat-bar-name">{item.name}</span>
                  <span className="cat-bar-amount">{formatCurrency(item.value)}</span>
                  <span className="cat-bar-pct">{((item.value / totalExpense) * 100).toFixed(1)}%</span>
                </div>
                <div className="progress-bar-track" style={{ marginTop: 6 }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${(item.value / breakdown[0].value) * 100}%`,
                      background: CATEGORY_COLORS[item.name] || '#94a3b8',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
