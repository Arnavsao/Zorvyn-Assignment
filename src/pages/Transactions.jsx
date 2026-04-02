/**
 * Transactions.jsx
 * Transactions page — filterable, sortable table with Admin add/edit/delete.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, Search, Filter, Download, Trash2,
  Pencil, ChevronUp, ChevronDown, ChevronsUpDown,
  FileJson, FileText, ReceiptText,
} from 'lucide-react';
import useStore from '../store/useStore';
import TransactionModal from '../components/Transactions/TransactionModal';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import { formatCurrency, formatDate, exportToCSV, exportToJSON, MONTH_NAMES } from '../utils/formatters';
import '../components/Transactions/Transactions.css';

const PER_PAGE = 10;

function SortIcon({ col, sortBy, sortDir }) {
  if (sortBy !== col) return <ChevronsUpDown size={13} className="sort-icon" />;
  return sortDir === 'asc'
    ? <ChevronUp size={13} className="sort-icon active" />
    : <ChevronDown size={13} className="sort-icon active" />;
}

export default function Transactions() {
  const { role, filters, setFilter, resetFilters, deleteTransaction, showToast } = useStore((s) => ({
    role: s.role, filters: s.filters,
    setFilter: s.setFilter, resetFilters: s.resetFilters,
    deleteTransaction: s.deleteTransaction, showToast: s.showToast,
  }));
  const getFiltered = useStore((s) => s.getFilteredTransactions);

  const [page, setPage]         = useState(1);
  const [modal, setModal]       = useState(null); // null | 'add' | {edit txn}
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef(null);

  const all  = getFiltered();
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const rows = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [filters]);

  // Close export dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (exportRef.current && !exportRef.current.contains(e.target)) setExportOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleSort = (col) => {
    if (filters.sortBy === col) setFilter('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc');
    else { setFilter('sortBy', col); setFilter('sortDir', 'desc'); }
  };

  const handleDelete = (txn) => {
    if (window.confirm(`Delete "${txn.description}"?`)) {
      deleteTransaction(txn.id);
      showToast('Transaction deleted.', 'success');
    }
  };

  const anyFilters =
    filters.search || filters.category !== 'all' ||
    filters.type !== 'all' || filters.month !== 'all' || filters.year !== 'all';

  return (
    <div>
      {/* Page header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">{all.length} transaction{all.length !== 1 ? 's' : ''} found</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Export */}
          <div className="export-wrap" ref={exportRef}>
            <button className="btn btn-secondary" id="export-btn" onClick={() => setExportOpen((o) => !o)}>
              <Download size={15} /> Export
            </button>
            {exportOpen && (
              <div className="export-dropdown">
                <button className="export-btn-item" id="export-csv-btn" onClick={() => { exportToCSV(all); setExportOpen(false); showToast('Exported as CSV!'); }}>
                  <FileText size={14} /> Export CSV
                </button>
                <button className="export-btn-item" id="export-json-btn" onClick={() => { exportToJSON(all); setExportOpen(false); showToast('Exported as JSON!'); }}>
                  <FileJson size={14} /> Export JSON
                </button>
              </div>
            )}
          </div>
          {/* Add (Admin only) */}
          {role === 'admin' && (
            <button className="btn btn-primary" id="add-txn-btn" onClick={() => setModal('add')}>
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="txn-filters">
          {/* Search */}
          <div className="filter-group" style={{ flex: 2, minWidth: 200 }}>
            <label className="form-label">Search</label>
            <div className="input-group">
              <Search size={14} className="input-group-icon" />
              <input
                id="txn-search"
                className="input"
                placeholder="Search description or category…"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
              />
            </div>
          </div>
          {/* Category */}
          <div className="filter-group" style={{ minWidth: 150 }}>
            <label className="form-label">Category</label>
            <select
              id="filter-category"
              className="select"
              value={filters.category}
              onChange={(e) => setFilter('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {/* Type */}
          <div className="filter-group" style={{ minWidth: 130 }}>
            <label className="form-label">Type</label>
            <select id="filter-type" className="select" value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          {/* Month */}
          <div className="filter-group" style={{ minWidth: 130 }}>
            <label className="form-label">Month</label>
            <select id="filter-month" className="select" value={filters.month} onChange={(e) => setFilter('month', e.target.value)}>
              <option value="all">All Months</option>
              {MONTH_NAMES.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
            </select>
          </div>

          <div className="filter-spacer" />

          {anyFilters && (
            <div className="filter-group" style={{ justifyContent: 'flex-end' }}>
              <label className="form-label" style={{ opacity: 0 }}>Clear</label>
              <button className="btn btn-ghost btn-sm" id="clear-filters-btn" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card txn-table-wrapper">
        {rows.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><ReceiptText size={28} /></div>
            <p className="empty-state-title">No transactions found</p>
            <p className="empty-state-desc">
              {anyFilters ? 'Try adjusting your filters.' : 'Add your first transaction to get started.'}
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('date')}>
                    <div className="th-inner">Date <SortIcon col="date" sortBy={filters.sortBy} sortDir={filters.sortDir} /></div>
                  </th>
                  <th>Description</th>
                  <th onClick={() => handleSort('category')}>
                    <div className="th-inner">Category <SortIcon col="category" sortBy={filters.sortBy} sortDir={filters.sortDir} /></div>
                  </th>
                  <th>Type</th>
                  <th onClick={() => handleSort('amount')}>
                    <div className="th-inner">Amount <SortIcon col="amount" sortBy={filters.sortBy} sortDir={filters.sortDir} /></div>
                  </th>
                  {role === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((txn) => (
                  <tr key={txn.id}>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {formatDate(txn.date)}
                    </td>
                    <td style={{ fontWeight: 500 }}>{txn.description}</td>
                    <td>
                      <div className="cat-cell">
                        <span className="cat-dot" style={{ background: CATEGORY_COLORS[txn.category] || '#94a3b8' }} />
                        {txn.category}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${txn.type}`}>
                        {txn.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td>
                      <span className={txn.type === 'income' ? 'amount-positive' : 'amount-negative'}>
                        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td>
                        <div className="txn-actions">
                          <button
                            className="btn-icon"
                            id={`edit-txn-${txn.id}`}
                            onClick={() => setModal(txn)}
                            aria-label="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="btn-icon"
                            id={`delete-txn-${txn.id}`}
                            onClick={() => handleDelete(txn)}
                            aria-label="Delete"
                            style={{ color: 'var(--danger)' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer: count + pagination */}
        {rows.length > 0 && (
          <div className="txn-table-footer">
            <p className="txn-count">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, all.length)} of {all.length}
            </p>
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >←</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '…' ? (
                    <span key={`e-${i}`} className="page-btn" style={{ cursor: 'default' }}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`page-btn ${p === page ? 'active' : ''}`}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  )
                )}
              <button
                className="page-btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >→</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <TransactionModal
          existing={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
