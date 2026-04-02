/**
 * BalanceTrendChart.jsx
 * Area chart showing income, expense, and running balance over 12 months.
 */

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { buildMonthlyData } from '../../data/mockData';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/formatters';
import './Charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="chart-tooltip-row">
          <span
            className="chart-tooltip-dot"
            style={{ background: entry.color }}
          />
          <span className="chart-tooltip-name">{entry.name}</span>
          <span className="chart-tooltip-value">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrendChart() {
  const transactions = useStore((s) => s.transactions);
  const data = buildMonthlyData(transactions);

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="section-title" style={{ fontSize: 16 }}>Balance Trend</h3>
          <p className="section-subtitle">Monthly income vs expenses — 2025</p>
        </div>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6c63ff" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#6c63ff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#colorIncome)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#ef4444"
              strokeWidth={2.5}
              fill="url(#colorExpense)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              name="Net Balance"
              stroke="#6c63ff"
              strokeWidth={2.5}
              fill="url(#colorBalance)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
