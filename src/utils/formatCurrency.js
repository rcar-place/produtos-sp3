// ============================================
// SP3 CONECTORES — Currency Formatter
// ============================================

/**
 * Formats a number as Brazilian Real currency (BRL)
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string (e.g., "R$ 10,50")
 */
export function formatCurrency(value) {
  if (value == null || isNaN(value)) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a number as a compact currency for display
 * @param {number} value
 * @returns {string}
 */
export function formatCurrencyCompact(value) {
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(1)}k`;
  }
  return formatCurrency(value);
}
