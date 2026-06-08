// ============================================
// SP3 CONECTORES — LazyImage Component
// ============================================

import { useState, memo } from 'react';
import './LazyImage.css';

/**
 * Image component with lazy loading and placeholder
 * @param {Object} props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Alt text
 * @param {string} props.className - Additional CSS class
 * @param {string} props.fallback - Fallback image on error
 */
function LazyImage({ src, alt, className = '', fallback, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23E2E8F0' width='400' height='300'/%3E%3Ctext fill='%2394A3B8' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ESP3 Conectores%3C/text%3E%3C/svg%3E`;

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`lazy-image ${className}`}>
      {!loaded && !error && (
        <div className="lazy-image__placeholder animate-shimmer" />
      )}
      <img
        src={error ? (fallback || placeholderSvg) : src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`lazy-image__img ${loaded ? 'lazy-image__img--loaded' : ''}`}
        {...props}
      />
    </div>
  );
}

export default memo(LazyImage);
