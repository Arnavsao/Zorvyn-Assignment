/**
 * useStore.js
 * Zustand global store with localStorage persistence.
 * Manages: transactions, filters, role (admin/viewer), dark mode, toast notifications.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // ─── Transactions ────────────────────────────────────────────────
      transactions: INITIAL_TRANSACTIONS,

      addTransaction: (txn) =>
        set((s) => ({
          transactions: [
            { ...txn, id: `txn-${Date.now()}` },
            ...s.transactions,
          ],
        })),

      editTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // ─── Filters ─────────────────────────────────────────────────────
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        month: 'all',
        year: 'all',
        sortBy: 'date',
        sortDir: 'desc',
      },

      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),

      resetFilters: () =>
        set({
          filters: {
            search: '',
            category: 'all',
            type: 'all',
            month: 'all',
            year: 'all',
            sortBy: 'date',
            sortDir: 'desc',
          },
        }),

      // ─── Role ─────────────────────────────────────────────────────────
      role: 'admin', // 'admin' | 'viewer'
      setRole: (role) => set({ role }),

      // ─── Dark Mode ───────────────────────────────────────────────────
      darkMode: false,
      toggleDarkMode: () =>
        set((s) => {
          const next = !s.darkMode;
          document.documentElement.setAttribute(
            'data-theme',
            next ? 'dark' : 'light'
          );
          return { darkMode: next };
        }),

      // ─── Toast ───────────────────────────────────────────────────────
      toast: null,
      showToast: (message, type = 'success') => {
        set({ toast: { message, type } });
        setTimeout(() => set({ toast: null }), 3000);
      },

      // ─── Derived: filtered & sorted transactions ──────────────────────
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }
        if (filters.category !== 'all')
          result = result.filter((t) => t.category === filters.category);
        if (filters.type !== 'all')
          result = result.filter((t) => t.type === filters.type);
        if (filters.month !== 'all')
          result = result.filter(
            (t) => String(new Date(t.date).getMonth() + 1) === filters.month
          );
        if (filters.year !== 'all')
          result = result.filter(
            (t) => String(new Date(t.date).getFullYear()) === filters.year
          );

        result.sort((a, b) => {
          let valA, valB;
          if (filters.sortBy === 'date') {
            valA = new Date(a.date);
            valB = new Date(b.date);
          } else if (filters.sortBy === 'amount') {
            valA = a.amount;
            valB = b.amount;
          } else {
            valA = a[filters.sortBy];
            valB = b[filters.sortBy];
          }
          if (valA < valB) return filters.sortDir === 'asc' ? -1 : 1;
          if (valA > valB) return filters.sortDir === 'asc' ? 1 : -1;
          return 0;
        });

        return result;
      },
    }),
    {
      name: 'zorvyn-finance-storage',
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
        darkMode: s.darkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      },
    }
  )
);

export default useStore;
