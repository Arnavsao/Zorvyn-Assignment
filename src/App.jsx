/**
 * App.jsx
 * Root component — sets up React Router with Layout and pages.
 */

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import useStore from './store/useStore';

export default function App() {
  const darkMode = useStore((s) => s.darkMode);

  // Sync dark mode attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="insights" element={<Insights />} />
      </Route>
    </Routes>
  );
}
