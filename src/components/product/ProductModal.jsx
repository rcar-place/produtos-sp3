// ============================================
// SP3 CONECTORES — ProductModal Component
// Built from scratch: single global modal, pure
// React state, CSS transitions, no Swiper.
// ============================================

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageCircle, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { formatPrice, getPriceLabel } from '../../utils/priceHelpers';
import { openWhatsApp } from '../../services/whatsapp';
import './ProductModal.css';

// ─── Spec label mapping ───
const SPEC_LABELS = {
  marca: 'Marca',
  codigo: 'Código',
  conector: 'Conector',
  terminais: 'Terminais',
  material: 'Material',
  cor: 'Cor',
  vias: 'Vias',
  aplicacao: 'Aplicação',
  tensao: 'Tensão',
  corrente_maxima: 'Corrente Máxima',
  tamanho: 'Tamanho',
  secao_fio: 'Seção do Fio',
  quantidade: 'Quantidade',
  comprimento: 'Comprimento',
  garantia: 'Garantia',
  tipo_lampada: 'Tipo de Lâmpada',
  temperatura_max: 'Temperatura Máx.',
  comprimento_fio: 'Comprimento do Fio',
  protecao: 'Proteção',
  tipos: 'Tipos Incluídos',
  embalagem: 'Embalagem',
  vedacao: 'Vedação',
};

/**
 * Global Product Modal — renders via React Portal.
 *
 * Architecture:
 *   product !== null  →  modal visible
 *   product === null  →  modal hidden
 *
 * No AnimatePresence, no Swiper — just CSS transitions
 * and a simple image index state.
 */
export default function ProductModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const overlayRef = useRef(null);

  // Reset image index when product changes
  useEffect(() => {
    setActiveImg(0);
    setImgLoaded(false);
  }, [product]);

  // Lock body scroll + ESC handler
  useEffect(() => {
    if (!product) return;

    const savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = savedOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [product, onClose]);

  // Don't render anything if no product
  if (!product) return null;

  const images = product.imagens?.length > 0
    ? product.imagens
    : [null]; // null = use placeholder

  const specs = Object.entries(product.especificacoes || {});

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handlePrev = () => {
    setImgLoaded(false);
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImgLoaded(false);
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuote = () => {
    openWhatsApp(product.nome, product.codigo);
  };

  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23E2E8F0' width='400' height='300'/%3E%3Ctext fill='%2394A3B8' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ESP3 Conectores%3C/text%3E%3C/svg%3E`;

  return createPortal(
    <div
      className="pm-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes: ${product.nome}`}
    >
      <div className="pm-dialog">
        {/* Close */}
        <button className="pm-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        <div className="pm-body">
          {/* ──── Gallery ──── */}
          <div className="pm-gallery">
            <div className="pm-gallery__main">
              {!imgLoaded && <div className="pm-gallery__placeholder" />}
              <img
                key={activeImg}
                src={images[activeImg] || placeholderSvg}
                alt={`${product.nome} - Imagem ${activeImg + 1}`}
                className={`pm-gallery__img ${imgLoaded ? 'pm-gallery__img--loaded' : ''}`}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  e.target.src = placeholderSvg;
                  setImgLoaded(true);
                }}
              />

              {images.length > 1 && (
                <>
                  <button className="pm-gallery__nav pm-gallery__nav--prev" onClick={handlePrev} aria-label="Imagem anterior">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="pm-gallery__nav pm-gallery__nav--next" onClick={handleNext} aria-label="Próxima imagem">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="pm-gallery__counter">
                  {activeImg + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="pm-gallery__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pm-gallery__thumb ${i === activeImg ? 'pm-gallery__thumb--active' : ''}`}
                    onClick={() => { setImgLoaded(false); setActiveImg(i); }}
                    aria-label={`Ver imagem ${i + 1}`}
                  >
                    <img
                      src={img || placeholderSvg}
                      alt=""
                      onError={(e) => { e.target.src = placeholderSvg; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ──── Info ──── */}
          <div className="pm-info">
            <div className="pm-info__badges">
              <span className="pm-info__category">
                <Tag size={14} />
                {product.categoria}
              </span>
              {product.destaque && (
                <span className="pm-info__featured">Destaque</span>
              )}
            </div>

            <span className="pm-info__code">{product.codigo}</span>
            <h2 className="pm-info__name">{product.nome}</h2>

            <div className="pm-info__price-block">
              <span className="pm-info__price">{formatPrice(product)}</span>
              <span className="pm-info__price-label">{getPriceLabel(product)}</span>
            </div>

            {product.descricao && (
              <p className="pm-info__description">{product.descricao}</p>
            )}

            {/* Specs */}
            {specs.length > 0 && (
              <div className="pm-specs">
                <h3 className="pm-specs__title">Especificações Técnicas</h3>
                <div className="pm-specs__table">
                  {specs.map(([key, value], idx) => (
                    <div key={key} className={`pm-specs__row ${idx % 2 === 0 ? 'pm-specs__row--even' : ''}`}>
                      <span className="pm-specs__label">{SPEC_LABELS[key] || key}</span>
                      <span className="pm-specs__value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pm-info__actions">
              <Button
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle size={20} />}
                onClick={handleQuote}
                fullWidth
              >
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
