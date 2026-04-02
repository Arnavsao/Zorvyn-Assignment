/**
 * utils/formatters.js
 * Utility helpers for currency, dates, and exports.
 */

export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateInput(dateStr) {
  return dateStr?.split('T')[0] ?? '';
}

export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export const SHORT_MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
];

export function exportToCSV(transactions, filename = 'transactions.csv') {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (₹)'];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
  ]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToJSON(transactions, filename = 'transactions.json') {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function computeSummary(transactions) {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  const thisMonthTxns = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });
  const lastMonthTxns = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  const sum = (arr, type) =>
    arr.filter((t) => t.type === type).reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = transactions.reduce(
    (acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount),
    0
  );

  const thisIncome  = sum(thisMonthTxns, 'income');
  const thisExpense = sum(thisMonthTxns, 'expense');
  const lastIncome  = sum(lastMonthTxns, 'income');
  const lastExpense = sum(lastMonthTxns, 'expense');

  const pct = (curr, prev) =>
    prev === 0 ? 100 : Math.round(((curr - prev) / prev) * 100);

  const savingsRate =
    thisIncome > 0
      ? Math.round(((thisIncome - thisExpense) / thisIncome) * 100)
      : 0;

  return {
    totalBalance,
    thisIncome,
    thisExpense,
    savingsRate,
    incomeTrend:  pct(thisIncome,  lastIncome),
    expenseTrend: pct(thisExpense, lastExpense),
  };
}
