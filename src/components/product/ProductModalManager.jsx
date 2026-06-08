// ============================================
// SP3 CONECTORES — ProductModalManager
// Single global mount point for the product modal.
// ============================================

import { useApp } from '../../context/AppContext';
import ProductModal from './ProductModal';

export default function ProductModalManager() {
  const { selectedProduct, closeProductModal } = useApp();

  return (
    <ProductModal
      product={selectedProduct}
      onClose={closeProductModal}
    />
  );
}
