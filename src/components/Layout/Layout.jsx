/**
 * Layout.jsx
 * Root layout wrapper — composes Sidebar, Topbar, and outlet for page content.
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from '../Common/Toast';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="main-content">
        <Topbar onMenuClick={() => setMobileOpen((o) => !o)} />
        <main>
          <div className="page-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      <Toast />
    </div>
  );
}
