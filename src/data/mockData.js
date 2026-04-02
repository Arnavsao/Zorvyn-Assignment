/**
 * mockData.js
 * Static mock data for the Zorvyn Finance Dashboard.
 * Includes transactions, monthly aggregates, and category metadata.
 */

export const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Food & Dining',
  'Transport',
  'Shopping',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Other',
];

export const CATEGORY_COLORS = {
  'Salary':        '#6c63ff',
  'Freelance':     '#a193ff',
  'Investment':    '#3b82f6',
  'Food & Dining': '#f59e0b',
  'Transport':     '#10b981',
  'Shopping':      '#ef4444',
  'Entertainment': '#ec4899',
  'Utilities':     '#8b5cf6',
  'Healthcare':    '#14b8a6',
  'Travel':        '#f97316',
  'Education':     '#06b6d4',
  'Other':         '#94a3b8',
};

function mkDate(year, month, day) {
  return new Date(year, month - 1, day).toISOString().split('T')[0];
}

let _id = 1;
function nextId() { return `txn-${String(_id++).padStart(4, '0')}`; }

export const INITIAL_TRANSACTIONS = [
  // --- January 2025 ---
  { id: nextId(), date: mkDate(2025,1,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: nextId(), date: mkDate(2025,1,5),  description: 'Grocery Store',         category: 'Food & Dining', type: 'expense', amount: 3200 },
  { id: nextId(), date: mkDate(2025,1,8),  description: 'Uber Ride',             category: 'Transport',     type: 'expense', amount: 350 },
  { id: nextId(), date: mkDate(2025,1,12), description: 'Netflix Subscription',  category: 'Entertainment', type: 'expense', amount: 499 },
  { id: nextId(), date: mkDate(2025,1,15), description: 'Freelance Project - A', category: 'Freelance',     type: 'income',  amount: 18000 },
  { id: nextId(), date: mkDate(2025,1,18), description: 'Electricity Bill',      category: 'Utilities',     type: 'expense', amount: 1800 },
  { id: nextId(), date: mkDate(2025,1,20), description: 'Amazon Shopping',       category: 'Shopping',      type: 'expense', amount: 4500 },
  { id: nextId(), date: mkDate(2025,1,25), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  { id: nextId(), date: mkDate(2025,1,28), description: 'Doctor Consultation',   category: 'Healthcare',    type: 'expense', amount: 700 },
  // --- February 2025 ---
  { id: nextId(), date: mkDate(2025,2,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: nextId(), date: mkDate(2025,2,4),  description: 'Restaurant Dinner',     category: 'Food & Dining', type: 'expense', amount: 1800 },
  { id: nextId(), date: mkDate(2025,2,7),  description: 'Metro Card Recharge',   category: 'Transport',     type: 'expense', amount: 500 },
  { id: nextId(), date: mkDate(2025,2,10), description: 'Freelance Project - B', category: 'Freelance',     type: 'income',  amount: 22000 },
  { id: nextId(), date: mkDate(2025,2,14), description: 'Valentine Gift',        category: 'Shopping',      type: 'expense', amount: 3200 },
  { id: nextId(), date: mkDate(2025,2,18), description: 'Water Bill',            category: 'Utilities',     type: 'expense', amount: 600 },
  { id: nextId(), date: mkDate(2025,2,22), description: 'Spotify Premium',       category: 'Entertainment', type: 'expense', amount: 199 },
  { id: nextId(), date: mkDate(2025,2,25), description: 'Dividend Income',       category: 'Investment',    type: 'income',  amount: 3200 },
  // --- March 2025 ---
  { id: nextId(), date: mkDate(2025,3,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: nextId(), date: mkDate(2025,3,5),  description: 'Zomato Orders',         category: 'Food & Dining', type: 'expense', amount: 2600 },
  { id: nextId(), date: mkDate(2025,3,10), description: 'Petrol Fill-Up',        category: 'Transport',     type: 'expense', amount: 2800 },
  { id: nextId(), date: mkDate(2025,3,12), description: 'New Clothes',           category: 'Shopping',      type: 'expense', amount: 6200 },
  { id: nextId(), date: mkDate(2025,3,15), description: 'Freelance Project - C', category: 'Freelance',     type: 'income',  amount: 15000 },
  { id: nextId(), date: mkDate(2025,3,18), description: 'Online Course',         category: 'Education',     type: 'expense', amount: 2999 },
  { id: nextId(), date: mkDate(2025,3,22), description: 'Internet Bill',         category: 'Utilities',     type: 'expense', amount: 999 },
  { id: nextId(), date: mkDate(2025,3,25), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  { id: nextId(), date: mkDate(2025,3,28), description: 'Movie Night',           category: 'Entertainment', type: 'expense', amount: 600 },
  // --- April 2025 ---
  { id: nextId(), date: mkDate(2025,4,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: nextId(), date: mkDate(2025,4,6),  description: 'Swiggy Delivery',       category: 'Food & Dining', type: 'expense', amount: 1400 },
  { id: nextId(), date: mkDate(2025,4,10), description: 'Train Tickets',         category: 'Travel',        type: 'expense', amount: 3800 },
  { id: nextId(), date: mkDate(2025,4,14), description: 'Freelance Project - D', category: 'Freelance',     type: 'income',  amount: 25000 },
  { id: nextId(), date: mkDate(2025,4,18), description: 'Electricity Bill',      category: 'Utilities',     type: 'expense', amount: 1600 },
  { id: nextId(), date: mkDate(2025,4,22), description: 'Amazon Shopping',       category: 'Shopping',      type: 'expense', amount: 5800 },
  { id: nextId(), date: mkDate(2025,4,28), description: 'Gym Membership',        category: 'Healthcare',    type: 'expense', amount: 1200 },
  // --- May 2025 ---
  { id: nextId(), date: mkDate(2025,5,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: nextId(), date: mkDate(2025,5,5),  description: 'Restaurant Brunch',     category: 'Food & Dining', type: 'expense', amount: 2200 },
  { id: nextId(), date: mkDate(2025,5,8),  description: 'Uber Rides',            category: 'Transport',     type: 'expense', amount: 900 },
  { id: nextId(), date: mkDate(2025,5,15), description: 'Vacation Hotel',        category: 'Travel',        type: 'expense', amount: 12000 },
  { id: nextId(), date: mkDate(2025,5,18), description: 'Freelance Project - E', category: 'Freelance',     type: 'income',  amount: 18000 },
  { id: nextId(), date: mkDate(2025,5,22), description: 'Netflix + Prime',       category: 'Entertainment', type: 'expense', amount: 798 },
  { id: nextId(), date: mkDate(2025,5,25), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  // --- June 2025 ---
  { id: nextId(), date: mkDate(2025,6,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 90000 },
  { id: nextId(), date: mkDate(2025,6,5),  description: 'Grocery Shopping',      category: 'Food & Dining', type: 'expense', amount: 3800 },
  { id: nextId(), date: mkDate(2025,6,8),  description: 'Car Fuel',              category: 'Transport',     type: 'expense', amount: 3200 },
  { id: nextId(), date: mkDate(2025,6,12), description: 'Dividend Payout',       category: 'Investment',    type: 'income',  amount: 4800 },
  { id: nextId(), date: mkDate(2025,6,15), description: 'Freelance - Logo Design', category: 'Freelance',   type: 'income',  amount: 12000 },
  { id: nextId(), date: mkDate(2025,6,18), description: 'Water + Electricity',   category: 'Utilities',     type: 'expense', amount: 2400 },
  { id: nextId(), date: mkDate(2025,6,22), description: 'Birthday Gift',         category: 'Shopping',      type: 'expense', amount: 2500 },
  { id: nextId(), date: mkDate(2025,6,28), description: 'Dental Checkup',        category: 'Healthcare',    type: 'expense', amount: 1500 },
  // --- July 2025 ---
  { id: nextId(), date: mkDate(2025,7,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 90000 },
  { id: nextId(), date: mkDate(2025,7,5),  description: 'Food Delivery',         category: 'Food & Dining', type: 'expense', amount: 1800 },
  { id: nextId(), date: mkDate(2025,7,10), description: 'Bus Pass',              category: 'Transport',     type: 'expense', amount: 600 },
  { id: nextId(), date: mkDate(2025,7,14), description: 'Freelance - Web Dev',   category: 'Freelance',     type: 'income',  amount: 30000 },
  { id: nextId(), date: mkDate(2025,7,18), description: 'Shopping Mall',         category: 'Shopping',      type: 'expense', amount: 7200 },
  { id: nextId(), date: mkDate(2025,7,22), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  { id: nextId(), date: mkDate(2025,7,26), description: 'Concert Tickets',       category: 'Entertainment', type: 'expense', amount: 3200 },
  // --- August 2025 ---
  { id: nextId(), date: mkDate(2025,8,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 90000 },
  { id: nextId(), date: mkDate(2025,8,5),  description: 'Zomato + Swiggy',       category: 'Food & Dining', type: 'expense', amount: 2800 },
  { id: nextId(), date: mkDate(2025,8,10), description: 'Flight Tickets',        category: 'Travel',        type: 'expense', amount: 18000 },
  { id: nextId(), date: mkDate(2025,8,14), description: 'Side Project Income',   category: 'Freelance',     type: 'income',  amount: 20000 },
  { id: nextId(), date: mkDate(2025,8,18), description: 'Electricity Bill',      category: 'Utilities',     type: 'expense', amount: 1900 },
  { id: nextId(), date: mkDate(2025,8,22), description: 'Electronics Purchase',  category: 'Shopping',      type: 'expense', amount: 15000 },
  { id: nextId(), date: mkDate(2025,8,28), description: 'Gym + Supplements',     category: 'Healthcare',    type: 'expense', amount: 2200 },
  // --- September 2025 ---
  { id: nextId(), date: mkDate(2025,9,1),  description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 90000 },
  { id: nextId(), date: mkDate(2025,9,5),  description: 'Grocery Store',         category: 'Food & Dining', type: 'expense', amount: 3400 },
  { id: nextId(), date: mkDate(2025,9,8),  description: 'Petrol + Parking',      category: 'Transport',     type: 'expense', amount: 2200 },
  { id: nextId(), date: mkDate(2025,9,12), description: 'Online Course Bundle',  category: 'Education',     type: 'expense', amount: 4999 },
  { id: nextId(), date: mkDate(2025,9,15), description: 'Freelance - App Dev',   category: 'Freelance',     type: 'income',  amount: 35000 },
  { id: nextId(), date: mkDate(2025,9,20), description: 'Internet + Cable',      category: 'Utilities',     type: 'expense', amount: 1400 },
  { id: nextId(), date: mkDate(2025,9,25), description: 'Mutual Fund SIP',       category: 'Investment',    type: 'expense', amount: 5000 },
  // --- October 2025 ---
  { id: nextId(), date: mkDate(2025,10,1),  description: 'Monthly Salary',       category: 'Salary',        type: 'income',  amount: 90000 },
  { id: nextId(), date: mkDate(2025,10,5),  description: 'Dining Out',           category: 'Food & Dining', type: 'expense', amount: 2400 },
  { id: nextId(), date: mkDate(2025,10,10), description: 'Train + Metro',        category: 'Transport',     type: 'expense', amount: 1200 },
  { id: nextId(), date: mkDate(2025,10,14), description: 'Diwali Shopping',      category: 'Shopping',      type: 'expense', amount: 12000 },
  { id: nextId(), date: mkDate(2025,10,18), description: 'Freelance - UI Dev',   category: 'Freelance',     type: 'income',  amount: 28000 },
  { id: nextId(), date: mkDate(2025,10,22), description: 'Stock Dividend',       category: 'Investment',    type: 'income',  amount: 5500 },
  { id: nextId(), date: mkDate(2025,10,28), description: 'Movie + OTT',          category: 'Entertainment', type: 'expense', amount: 1200 },
  // --- November 2025 ---
  { id: nextId(), date: mkDate(2025,11,1),  description: 'Monthly Salary',       category: 'Salary',        type: 'income',  amount: 95000 },
  { id: nextId(), date: mkDate(2025,11,5),  description: 'Restaurant Visits',    category: 'Food & Dining', type: 'expense', amount: 3600 },
  { id: nextId(), date: mkDate(2025,11,8),  description: 'Fuel & Parking',       category: 'Transport',     type: 'expense', amount: 2800 },
  { id: nextId(), date: mkDate(2025,11,12), description: 'Online Shopping',      category: 'Shopping',      type: 'expense', amount: 8000 },
  { id: nextId(), date: mkDate(2025,11,15), description: 'Freelance - Backend',  category: 'Freelance',     type: 'income',  amount: 32000 },
  { id: nextId(), date: mkDate(2025,11,20), description: 'Utilities Bundle',     category: 'Utilities',     type: 'expense', amount: 2600 },
  { id: nextId(), date: mkDate(2025,11,25), description: 'Mutual Fund SIP',      category: 'Investment',    type: 'expense', amount: 8000 },
  { id: nextId(), date: mkDate(2025,11,28), description: 'Annual Checkup',       category: 'Healthcare',    type: 'expense', amount: 3500 },
  // --- December 2025 ---
  { id: nextId(), date: mkDate(2025,12,1),  description: 'Monthly Salary',       category: 'Salary',        type: 'income',  amount: 95000 },
  { id: nextId(), date: mkDate(2025,12,5),  description: 'Christmas Dinner',     category: 'Food & Dining', type: 'expense', amount: 4500 },
  { id: nextId(), date: mkDate(2025,12,10), description: 'Flight Home',          category: 'Travel',        type: 'expense', amount: 14000 },
  { id: nextId(), date: mkDate(2025,12,14), description: 'Freelance - Full Stack', category: 'Freelance',   type: 'income',  amount: 40000 },
  { id: nextId(), date: mkDate(2025,12,18), description: 'Year-End Shopping',    category: 'Shopping',      type: 'expense', amount: 18000 },
  { id: nextId(), date: mkDate(2025,12,22), description: 'Electricity + Water',  category: 'Utilities',     type: 'expense', amount: 2200 },
  { id: nextId(), date: mkDate(2025,12,28), description: 'Year-End Dividend',    category: 'Investment',    type: 'income',  amount: 8000 },
  { id: nextId(), date: mkDate(2025,12,31), description: 'NYE Party',            category: 'Entertainment', type: 'expense', amount: 5000 },
];

/** Pre-computed monthly summaries for charts */
export function buildMonthlyData(transactions) {
  const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  const data = months.map((month, idx) => ({
    month,
    income: 0,
    expense: 0,
  }));

  transactions.forEach(txn => {
    const d = new Date(txn.date);
    const m = d.getMonth(); // 0-indexed
    if (txn.type === 'income') data[m].income += txn.amount;
    else data[m].expense += txn.amount;
  });

  let runningBalance = 0;
  data.forEach(d => {
    runningBalance += d.income - d.expense;
    d.balance = runningBalance;
  });

  return data;
}

/** Category breakdown for expenses only */
export function buildCategoryBreakdown(transactions) {
  const map = {};
  transactions.forEach(txn => {
    if (txn.type === 'expense') {
      map[txn.category] = (map[txn.category] || 0) + txn.amount;
    }
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
