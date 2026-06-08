// ============================================
// SP3 CONECTORES — Button Component
// ============================================

import { memo } from 'react';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Reusable Button component
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'whatsapp'|'ghost'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {React.ReactNode} props.icon
 * @param {boolean} props.fullWidth
 * @param {boolean} props.loading
 * @param {React.ReactNode} props.children
 */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${loading ? 'btn--loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn__spinner" />}
      {!loading && icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__text">{children}</span>}
      {!loading && iconRight && <span className="btn__icon">{iconRight}</span>}
    </motion.button>
  );
}

export default memo(Button);
