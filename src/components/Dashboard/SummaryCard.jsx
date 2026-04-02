/**
 * SummaryCard.jsx
 * KPI summary card with icon, label, value, and trend badge.
 */

import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import './SummaryCard.css';

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = Date.now();
    const startVal = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(startVal + (target - startVal) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

export default function SummaryCard({
  icon: Icon,
  label,
  value,
  prefix = '₹',
  trend,
  trendLabel,
  accentColor,
  isCurrency = true,
  isPercent = false,
}) {
  const animatedValue = useCountUp(value);
  const trendUp = trend >= 0;

  const displayValue = isPercent
    ? `${animatedValue}%`
    : isCurrency
    ? formatCurrency(animatedValue)
    : `${prefix}${animatedValue.toLocaleString('en-IN')}`;

  return (
    <div className="summary-card card">
      <div className="sc-header">
        <div
          className="sc-icon-wrap"
          style={{ '--card-color': accentColor }}
        >
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={`trend-badge ${trendUp ? 'up' : 'down'}`}>
            {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="sc-body">
        <p className="sc-label">{label}</p>
        <p className="sc-value">{displayValue}</p>
        {trendLabel && (
          <p className="sc-sub">{trendLabel}</p>
        )}
      </div>
    </div>
  );
}
