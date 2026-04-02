/**
 * SpendingBreakdownChart.jsx
 * Donut pie chart showing expense breakdown by category.
 */

import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Sector,
} from 'recharts';
import { buildCategoryBreakdown, CATEGORY_COLORS } from '../../data/mockData';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/formatters';
import './Charts.css';

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="var(--text-primary)"
        style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Inter' }}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--text-secondary)"
        style={{ fontSize: 12, fontFamily: 'Inter' }}>
        {formatCurrency(value)}
      </text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="var(--text-muted)"
        style={{ fontSize: 11, fontFamily: 'Inter' }}>
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function SpendingBreakdownChart() {
  const transactions = useStore((s) => s.transactions);
  const data = buildCategoryBreakdown(transactions).slice(0, 8);
  const [activeIdx, setActiveIdx] = useState(0);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h3 className="section-title" style={{ fontSize: 16 }}>Spending Breakdown</h3>
          <p className="section-subtitle">Expenses by category — all time</p>
        </div>
      </div>
      <div className="chart-body donut-layout">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              activeIndex={activeIdx}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={100}
              dataKey="value"
              onMouseEnter={(_, idx) => setActiveIdx(idx)}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(val) => [formatCurrency(val), 'Amount']}
              contentStyle={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="donut-legend">
          {data.map((item) => (
            <div key={item.name} className="donut-legend-item">
              <span
                className="donut-legend-dot"
                style={{ background: CATEGORY_COLORS[item.name] || '#94a3b8' }}
              />
              <span className="donut-legend-name">{item.name}</span>
              <span className="donut-legend-pct">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
