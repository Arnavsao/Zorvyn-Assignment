/**
 * Toast.jsx
 * Global toast notification component.
 */

import React from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import useStore from '../../store/useStore';

export default function Toast() {
  const toast = useStore((s) => s.toast);
  const showToast = useStore((s) => s.showToast);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`} role="alert">
      {toast.type === 'success' ? (
        <CheckCircle2 size={18} color="var(--success)" />
      ) : (
        <XCircle size={18} color="var(--danger)" />
      )}
      <span>{toast.message}</span>
      <button
        className="btn-icon"
        style={{ marginLeft: 'auto', padding: '2px' }}
        onClick={() => showToast(null)}
      >
        <X size={14} />
      </button>
    </div>
  );
}
