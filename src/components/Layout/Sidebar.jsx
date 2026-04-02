/**
 * Sidebar.jsx
 * Collapsible navigation sidebar with role indicator and nav links.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  Shield,
  Eye,
  X,
} from 'lucide-react';
import useStore from '../../store/useStore';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const role = useStore((s) => s.role);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <TrendingUp size={20} />
          </div>
          <span className="logo-text">Zorvyn</span>
          <button className="sidebar-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Role Badge */}
        <div className="sidebar-role">
          <div className={`role-pill ${role}`}>
            {role === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
            <span>{role === 'admin' ? 'Admin' : 'Viewer'}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <p className="nav-label">Menu</p>
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            <p className="footer-app">Zorvyn Finance</p>
            <p className="footer-version">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
