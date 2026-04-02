/**
 * TransactionModal.jsx
 * Add / Edit transaction modal (Admin role only).
 */

import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockData';
import { formatDateInput } from '../../utils/formatters';

const today = new Date().toISOString().split('T')[0];

const EMPTY_FORM = {
  description: '',
  amount: '',
  category: 'Salary',
  type: 'income',
  date: today,
};

export default function TransactionModal({ existing, onClose }) {
  const addTransaction  = useStore((s) => s.addTransaction);
  const editTransaction = useStore((s) => s.editTransaction);
  const showToast       = useStore((s) => s.showToast);

  const [form, setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(existing);

  useEffect(() => {
    if (existing) {
      setForm({
        description: existing.description,
        amount: String(existing.amount),
        category: existing.category,
        type: existing.type,
        date: formatDateInput(existing.date),
      });
    }
  }, [existing]);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      amount: Number(form.amount),
    };
    if (isEdit) {
      editTransaction(existing.id, payload);
      showToast('Transaction updated successfully!');
    } else {
      addTransaction(payload);
      showToast('Transaction added successfully!');
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Type toggle */}
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-toggle">
              <button
                type="button"
                id="type-income-btn"
                className={`type-btn ${form.type === 'income' ? 'active income' : ''}`}
                onClick={() => set('type', 'income')}
              >
                Income
              </button>
              <button
                type="button"
                id="type-expense-btn"
                className={`type-btn ${form.type === 'expense' ? 'active expense' : ''}`}
                onClick={() => set('type', 'expense')}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="txn-desc">Description</label>
            <input
              id="txn-desc"
              className={`input ${errors.description ? 'input-error' : ''}`}
              placeholder="e.g., Monthly Salary"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            {errors.description && <p className="field-error">{errors.description}</p>}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="txn-amount">Amount (₹)</label>
            <input
              id="txn-amount"
              type="number"
              min="1"
              className={`input ${errors.amount ? 'input-error' : ''}`}
              placeholder="0"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
            />
            {errors.amount && <p className="field-error">{errors.amount}</p>}
          </div>

          {/* Category & Date row */}
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label" htmlFor="txn-category">Category</label>
              <select
                id="txn-category"
                className="select"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label" htmlFor="txn-date">Date</label>
              <input
                id="txn-date"
                type="date"
                max={today}
                className={`input ${errors.date ? 'input-error' : ''}`}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
              {errors.date && <p className="field-error">{errors.date}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="txn-submit-btn">
              {isEdit ? <><Save size={15} /> Update</> : <><Plus size={15} /> Add Transaction</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
