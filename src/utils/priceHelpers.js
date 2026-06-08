// ============================================
// SP3 CONECTORES — Price Display Helpers
// ============================================

import { formatCurrency } from './formatCurrency';

/**
 * Product IDs that are sold per unit (not kits/packs).
 * These need explicit "/unidade" labeling so customers
 * don't confuse the price with a kit price.
 */
const UNIT_PRICE_IDS = [7, 8, 9];

/**
 * Price threshold — products at or below this value are
 * assumed to be per-unit unless marked otherwise.
 */
const UNIT_PRICE_THRESHOLD = 5;

/**
 * Determines whether a product is sold per unit.
 * Uses explicit ID list + price heuristic as fallback.
 * @param {Object} product
 * @returns {boolean}
 */
export function isUnitPriced(product) {
  if (!product) return false;
  if (product.tipoPreco === 'unidade') return true;
  if (product.tipoPreco === 'kit' || product.tipoPreco === 'pacote') return false;
  // Fallback: check known IDs or low-price terminals
  if (UNIT_PRICE_IDS.includes(product.id)) return true;
  if (product.categoria === 'Terminais' && product.preco <= UNIT_PRICE_THRESHOLD) return true;
  return false;
}

/**
 * Formats a product price with appropriate unit label.
 * @param {Object} product
 * @returns {string} e.g. "R$ 1,80/unidade" or "R$ 58,00"
 */
export function formatPrice(product) {
  if (!product) return 'R$ 0,00';
  const base = formatCurrency(product.preco);
  if (isUnitPriced(product)) {
    return `${base}/unidade`;
  }
  return base;
}

/**
 * Returns a descriptive price label for the product.
 * @param {Object} product
 * @returns {string}
 */
export function getPriceLabel(product) {
  if (!product) return '';
  if (isUnitPriced(product)) return 'Preço por unidade';
  const desc = (product.descricao || '').toLowerCase();
  if (desc.includes('kit 100') || desc.includes('kit com 100')) return 'Preço do kit com 100 unidades';
  if (desc.includes('kit')) return 'Preço do kit';
  return 'Preço unitário';
}
