/**
 * Dashboard.jsx
 * Main dashboard page — summary cards + trend chart + spending breakdown.
 */

import React from 'react';
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/Dashboard/SummaryCard';
import BalanceTrendChart from '../components/Dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/Dashboard/SpendingBreakdownChart';
import useStore from '../store/useStore';
import { computeSummary, formatCurrency, formatDate } from '../utils/formatters';
import './Dashboard.css';

export default function Dashboard() {
  const transactions = useStore((s) => s.transactions);
  const summary = computeSummary(transactions);

  const recentTxns = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const CARDS = [
    {
      icon: Wallet,
      label: 'Total Balance',
      value: summary.totalBalance,
      accentColor: '#6c63ff',
      trendLabel: 'Cumulative net worth',
    },
    {
      icon: TrendingUp,
      label: 'Monthly Income',
      value: summary.thisIncome,
      accentColor: '#10b981',
      trend: summary.incomeTrend,
      trendLabel: 'vs last month',
    },
    {
      icon: TrendingDown,
      label: 'Monthly Expenses',
      value: summary.thisExpense,
      accentColor: '#ef4444',
      trend: -summary.expenseTrend,
      trendLabel: 'vs last month',
    },
    {
      icon: PiggyBank,
      label: 'Savings Rate',
      value: summary.savingsRate,
      accentColor: '#f59e0b',
      isPercent: true,
      isCurrency: false,
      trendLabel: 'This month',
    },
  ];

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {CARDS.map((card, i) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="dashboard-charts-row">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      {/* Recent Transactions */}
      <div className="card recent-txns-card">
        <div className="section-header">
          <div>
            <h3 className="section-title">Recent Transactions</h3>
            <p className="section-subtitle">Your latest 5 entries</p>
          </div>
          <Link to="/transactions" className="btn btn-ghost btn-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="recent-txns-list">
          {recentTxns.map((txn) => (
            <div key={txn.id} className="recent-txn-row">
              <div className="recent-txn-info">
                <p className="recent-txn-desc">{txn.description}</p>
                <p className="recent-txn-meta">
                  {txn.category} · {formatDate(txn.date)}
                </p>
              </div>
              <span className={`recent-txn-amount ${txn.type === 'income' ? 'amount-positive' : 'amount-negative'}`}>
                {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
