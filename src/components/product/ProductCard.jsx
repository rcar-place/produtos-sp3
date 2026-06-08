// ============================================
// SP3 CONECTORES — ProductCard Component
// ============================================

import { memo } from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import LazyImage from '../common/LazyImage';
import Button from '../ui/Button';
import { formatPrice, getPriceLabel } from '../../utils/priceHelpers';
import { truncateText } from '../../utils/helpers';
import { openWhatsApp } from '../../services/whatsapp';
import './ProductCard.css';

/**
 * Product card component.
 * On "Detalhes" click → opens the global ProductModal via context.
 */
function ProductCard({ product, index = 0 }) {
  const { openProductModal } = useApp();

  const handleDetails = () => {
    openProductModal(product);
  };

  const handleQuote = (e) => {
    e.stopPropagation();
    openWhatsApp(product.nome, product.codigo);
  };

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      id={`product-card-${product.id}`}
    >
      <div className="product-card__image-wrapper" onClick={handleDetails}>
        <LazyImage
          src={product.imagens?.[0] || '/images/placeholder.jpg'}
          alt={product.nome}
          className="product-card__image"
        />
        <div className="product-card__badge">
          <span className="product-card__category">{product.categoria}</span>
        </div>
        {product.destaque && (
          <span className="product-card__featured">Destaque</span>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__code">{product.codigo}</span>
        <h3 className="product-card__name" onClick={handleDetails}>
          {product.nome}
        </h3>
        <p className="product-card__description">
          {truncateText(product.descricaoResumida || product.descricao, 80)}
        </p>
        <div className="product-card__price-block">
          <span className="product-card__price">{formatPrice(product)}</span>
          <span className="product-card__price-label">{getPriceLabel(product)}</span>
        </div>
        <div className="product-card__actions">
          <Button
            variant="outline"
            size="sm"
            icon={<Eye size={16} />}
            onClick={handleDetails}
          >
            Detalhes
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            icon={<MessageCircle size={16} />}
            onClick={handleQuote}
          >
            Orçamento
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
