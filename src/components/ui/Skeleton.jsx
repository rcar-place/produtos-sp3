// ============================================
// SP3 CONECTORES — Skeleton Component
// ============================================

import { memo } from 'react';
import './Skeleton.css';

/**
 * Loading skeleton component
 * @param {Object} props
 * @param {number|string} props.width
 * @param {number|string} props.height
 * @param {'rectangle'|'circle'|'text'} props.variant
 * @param {number} props.count - Number of skeleton lines
 */
function Skeleton({ width, height, variant = 'rectangle', count = 1, className = '' }) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (count > 1) {
    return (
      <div className="skeleton-group">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`skeleton skeleton--${variant} ${className}`}
            style={{
              ...style,
              width: i === count - 1 ? '60%' : style.width,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
    />
  );
}

/**
 * Product Card Skeleton
 */
export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <Skeleton height={220} className="skeleton-card__image" />
      <div className="skeleton-card__body">
        <Skeleton height={14} width="40%" />
        <Skeleton height={20} width="80%" />
        <Skeleton height={14} count={2} />
        <Skeleton height={24} width="30%" />
        <div className="skeleton-card__actions">
          <Skeleton height={40} width="48%" />
          <Skeleton height={40} width="48%" />
        </div>
      </div>
    </div>
  );
}

export default memo(Skeleton);
