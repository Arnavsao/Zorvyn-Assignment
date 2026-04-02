/**
 * Topbar.jsx
 * Top navigation bar with page title, role switcher, dark mode toggle, and mobile menu button.
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Moon,
  Sun,
  Shield,
  Eye,
  ChevronDown,
  Bell,
} from 'lucide-react';
import useStore from '../../store/useStore';
import './Topbar.css';

const PAGE_TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Financial overview at a glance' },
  '/transactions': { title: 'Transactions', subtitle: 'Browse and manage your transaction history' },
  '/insights': { title: 'Insights', subtitle: 'Understand your spending patterns' },
};

export default function Topbar({ onMenuClick }) {
  const location = useLocation();
  const { role, setRole, darkMode, toggleDarkMode } = useStore((s) => ({
    role: s.role,
    setRole: s.setRole,
    darkMode: s.darkMode,
    toggleDarkMode: s.toggleDarkMode,
  }));

  const pageInfo = PAGE_TITLES[location.pathname] || PAGE_TITLES['/'];
  const [roleOpen, setRoleOpen] = React.useState(false);
  const roleRef = React.useRef(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="topbar">
      {/* Left: Hamburger + Title */}
      <div className="topbar-left">
        <button
          className="btn-icon topbar-menu-btn"
          onClick={onMenuClick}
          id="topbar-menu-btn"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="topbar-title-group">
          <h1 className="topbar-title">{pageInfo.title}</h1>
          <p className="topbar-subtitle">{pageInfo.subtitle}</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="topbar-right">
        {/* Dark mode toggle */}
        <button
          className="topbar-icon-btn"
          onClick={toggleDarkMode}
          id="dark-mode-toggle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification bell (decorative) */}
        <button className="topbar-icon-btn" id="notification-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notif-dot" />
        </button>

        {/* Divider */}
        <div className="topbar-divider" />

        {/* Role Switcher */}
        <div className="role-switcher" ref={roleRef}>
          <button
            className="role-btn"
            onClick={() => setRoleOpen((o) => !o)}
            id="role-switcher-btn"
            aria-label="Switch role"
          >
            <div className={`role-avatar ${role}`}>
              {role === 'admin' ? <Shield size={13} /> : <Eye size={13} />}
            </div>
            <div className="role-info">
              <span className="role-label">Role</span>
              <span className="role-value">{role === 'admin' ? 'Admin' : 'Viewer'}</span>
            </div>
            <ChevronDown
              size={14}
              className={`role-chevron ${roleOpen ? 'open' : ''}`}
            />
          </button>

          {roleOpen && (
            <div className="role-dropdown" id="role-dropdown">
              <button
                className={`role-option ${role === 'admin' ? 'active' : ''}`}
                id="role-admin-btn"
                onClick={() => { setRole('admin'); setRoleOpen(false); }}
              >
                <Shield size={14} />
                <div>
                  <p className="role-option-name">Admin</p>
                  <p className="role-option-desc">Full access — add & edit</p>
                </div>
              </button>
              <button
                className={`role-option ${role === 'viewer' ? 'active' : ''}`}
                id="role-viewer-btn"
                onClick={() => { setRole('viewer'); setRoleOpen(false); }}
              >
                <Eye size={14} />
                <div>
                  <p className="role-option-name">Viewer</p>
                  <p className="role-option-desc">Read-only access</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
