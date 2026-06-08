// ============================================
// SP3 CONECTORES — Home Page
// ============================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Headphones, Star, Plug, Zap, Cable, Lightbulb } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/product/ProductCard';
import { useFeaturedProducts, useCategories } from '../../hooks/useProducts';
import { COMPANY } from '../../utils/constants';
import { getWhatsAppGenericUrl } from '../../services/whatsapp';
import './Home.css';

// Category icon map
const categoryIcons = {
  Plug: Plug,
  Zap: Zap,
  Cable: Cable,
  Lightbulb: Lightbulb,
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function Home() {
  const { data: featuredProducts = [], isLoading: loadingProducts } = useFeaturedProducts();
  const { data: categories = [] } = useCategories();

  return (
    <>
      <SEO />

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <div className="hero__grid-pattern" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </div>

        <div className="container hero__container">
          <motion.div
            className="hero__content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero__badge" variants={fadeInUp}>
              ⚡ Conectores e Terminais para Motocicletas
            </motion.span>

            <motion.h1 className="hero__title" variants={fadeInUp}>
              <span className="hero__title-line">Conectores que</span>
              <span className="hero__title-highlight">movem você</span>
            </motion.h1>

            <motion.p className="hero__subtitle" variants={fadeInUp}>
              {COMPANY.description}
            </motion.p>

            <motion.div className="hero__actions" variants={fadeInUp}>
              <Link to="/catalogo">
                <Button variant="primary" size="lg" iconRight={<ArrowRight size={20} />}>
                  Ver Catálogo
                </Button>
              </Link>
              <a href={getWhatsAppGenericUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Solicitar Orçamento
                </Button>
              </a>
            </motion.div>

            <motion.div className="hero__stats" variants={fadeInUp}>
              <div className="hero__stat">
                <span className="hero__stat-number">500+</span>
                <span className="hero__stat-label">Produtos</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">10+</span>
                <span className="hero__stat-label">Anos no mercado</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">1000+</span>
                <span className="hero__stat-label">Clientes</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CATEGORIES SECTION ══════════ */}
      <section className="section section--gray" id="categories">
        <div className="container">
          <div className="section__header">
            <motion.h2
              className="section__title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Nossas Categorias
            </motion.h2>
            <motion.p
              className="section__subtitle"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Encontre o produto ideal para sua necessidade
            </motion.p>
          </div>

          <motion.div
            className="categories-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {categories.map((cat) => {
              const IconComponent = categoryIcons[cat.icone] || Plug;
              return (
                <motion.div key={cat.id} variants={fadeInUp}>
                  <Link
                    to={`/catalogo?categoria=${cat.nome}`}
                    className="category-card"
                    id={`category-${cat.slug}`}
                  >
                    <div className="category-card__icon">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="category-card__name">{cat.nome}</h3>
                    <p className="category-card__description">{cat.descricao}</p>
                    <span className="category-card__link">
                      Ver produtos <ArrowRight size={16} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <section className="section" id="featured-products">
        <div className="container">
          <div className="section__header">
            <motion.h2
              className="section__title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Produtos em Destaque
            </motion.h2>
            <motion.p
              className="section__subtitle"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Os mais procurados pelos nossos clientes
            </motion.p>
          </div>

          {!loadingProducts && (
            <div className="featured-grid">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <motion.div
            className="featured-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link to="/catalogo">
              <Button variant="primary" size="lg" iconRight={<ArrowRight size={20} />}>
                Ver Todos os Produtos
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="section section--dark" id="why-us">
        <div className="container">
          <div className="section__header">
            <motion.h2
              className="section__title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Por que escolher a SP3?
            </motion.h2>
            <motion.p
              className="section__subtitle"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Compromisso com qualidade e satisfação do cliente
            </motion.p>
          </div>

          <motion.div
            className="benefits-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-card__icon">
                <ShieldCheck size={32} />
              </div>
              <h3>Qualidade Garantida</h3>
              <p>Produtos testados e aprovados com materiais de primeira linha.</p>
            </motion.div>

            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-card__icon">
                <Truck size={32} />
              </div>
              <h3>Entrega Rápida</h3>
              <p>Envio ágil para todo o Brasil com rastreamento completo.</p>
            </motion.div>

            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-card__icon">
                <Headphones size={32} />
              </div>
              <h3>Suporte Técnico</h3>
              <p>Equipe especializada pronta para ajudar na escolha certa.</p>
            </motion.div>

            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-card__icon">
                <Star size={32} />
              </div>
              <h3>Melhor Custo-Benefício</h3>
              <p>Preços competitivos sem abrir mão da qualidade.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CTA SECTION ══════════ */}
      <section className="cta-section" id="cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Precisa de um orçamento?</h2>
            <p>
              Entre em contato conosco pelo WhatsApp e receba um atendimento
              personalizado para sua oficina ou projeto.
            </p>
            <div className="cta-card__actions">
              <a href={getWhatsAppGenericUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg">
                  Falar pelo WhatsApp
                </Button>
              </a>
              <Link to="/contato">
                <Button variant="outline" size="lg">
                  Formulário de Contato
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
