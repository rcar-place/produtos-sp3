// ============================================
// SP3 CONECTORES — Product Detail Page
// ============================================

import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, ShoppingBag, Tag, Package } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Button from '../../components/ui/Button';
import ProductGallery from '../../components/product/ProductGallery';
import ProductSpecs from '../../components/product/ProductSpecs';
import ProductCard from '../../components/product/ProductCard';
import { useProduct, useProducts } from '../../hooks/useProducts';
import { formatPrice, getPriceLabel } from '../../utils/priceHelpers';
import { openWhatsApp } from '../../services/whatsapp';
import './Product.css';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);
  const { data: allProducts = [] } = useProducts();

  // Related products (same category, exclude current)
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) return [];
    return allProducts
      .filter((p) => p.categoria === product.categoria && p.id !== product.id)
      .slice(0, 3);
  }, [product, allProducts]);

  const handleQuote = () => {
    if (product) {
      openWhatsApp(product.nome, product.codigo);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-page__loading">
            <div className="animate-spin" style={{ width: 40, height: 40, border: '3px solid var(--color-gray-200)', borderTopColor: 'var(--color-accent-500)', borderRadius: '50%' }} />
            <p>Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-page__not-found">
            <Package size={64} strokeWidth={1.2} />
            <h2>Produto não encontrado</h2>
            <p>O produto que você procura não existe ou foi removido.</p>
            <Link to="/catalogo">
              <Button variant="primary" icon={<ArrowLeft size={18} />}>
                Voltar ao Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={product.nome}
        description={product.descricao}
        keywords={`${product.nome}, ${product.categoria}, conectores moto, SP3`}
      />

      {/* Breadcrumb */}
      <div className="product-page__breadcrumb">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to={`/catalogo?categoria=${product.categoria}`}>{product.categoria}</Link></li>
              <li aria-current="page">{product.nome}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <section className="product-page" id="product-detail">
        <div className="container">
          <div className="product-page__grid">
            {/* Gallery */}
            <motion.div
              className="product-page__gallery"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductGallery
                images={product.imagens}
                productName={product.nome}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              className="product-page__info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="product-page__badges">
                <span className="product-page__category">
                  <Tag size={14} />
                  {product.categoria}
                </span>
                {product.destaque && (
                  <span className="product-page__featured">Destaque</span>
                )}
              </div>

              <span className="product-page__code">{product.codigo}</span>
              <h1 className="product-page__name">{product.nome}</h1>

              <div className="product-page__price-wrapper">
                <span className="product-page__price">
                  {formatPrice(product)}
                </span>
                <span className="product-page__price-label">{getPriceLabel(product)}</span>
              </div>

              <p className="product-page__description">{product.descricao}</p>

              <div className="product-page__actions">
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon={<MessageCircle size={20} />}
                  onClick={handleQuote}
                  fullWidth
                >
                  Solicitar Orçamento
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<ArrowLeft size={20} />}
                  onClick={() => navigate('/catalogo')}
                  fullWidth
                >
                  Voltar ao Catálogo
                </Button>
              </div>

              {/* Specs */}
              <ProductSpecs specs={product.especificacoes} />
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="product-page__related" id="related-products">
              <h2 className="section__title">Produtos Relacionados</h2>
              <div className="product-page__related-grid">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
