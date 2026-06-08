// ============================================
// SP3 CONECTORES — ProductGrid Component
// ============================================

import { memo } from 'react';
import { PackageSearch } from 'lucide-react';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import Button from '../ui/Button';
import './ProductGrid.css';

/**
 * Product grid with loading and empty states
 * @param {Object} props
 * @param {Array} props.products
 * @param {boolean} props.isLoading
 * @param {boolean} props.hasFilters
 * @param {Function} props.onClearFilters
 */
function ProductGrid({ products = [], isLoading = false, hasFilters = false, onClearFilters }) {
  // Loading state
  if (isLoading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <PackageSearch size={64} strokeWidth={1.2} />
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros ou realizar uma nova busca.</p>
        {hasFilters && onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Limpar filtros
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

export default memo(ProductGrid);
