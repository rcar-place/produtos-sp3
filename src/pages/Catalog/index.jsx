// ============================================
// SP3 CONECTORES — Catalog Page
// ============================================

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SEO from '../../components/common/SEO';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import ProductGrid from '../../components/product/ProductGrid';
import { useProducts, useCategories } from '../../hooks/useProducts';
import { useFilters } from '../../hooks/useFilters';
import { SORT_OPTIONS } from '../../utils/constants';
import './Catalog.css';

export default function Catalog() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize category from URL params
  const initialCategory = searchParams.get('categoria') || '';

  const {
    search,
    category,
    sortBy,
    currentPage,
    setSearch,
    setCategory,
    setSortBy,
    setCurrentPage,
    clearFilters,
    paginatedProducts,
    totalPages,
    totalResults,
    hasFilters,
  } = useFilters(products);

  // Sync URL category on first load
  useMemo(() => {
    if (initialCategory && !category) {
      setCategory(initialCategory);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value) {
      setSearchParams({ categoria: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <SEO
        title="Catálogo"
        description="Catálogo completo de conectores, terminais, chicotes e soquetes para motocicletas. Encontre o produto ideal para sua necessidade."
      />

      {/* Page Header */}
      <section className="catalog-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="catalog-header__title">Catálogo de Produtos</h1>
            <p className="catalog-header__subtitle">
              Encontre conectores, terminais, chicotes e soquetes para sua motocicleta
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="catalog-filters" id="catalog-filters">
        <div className="container">
          <motion.div
            className="catalog-filters__wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Search */}
            <div className="catalog-filters__search">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="catalog-filters__controls">
              {/* Category Filter */}
              <div className="catalog-filters__select-wrapper">
                <Filter size={18} className="catalog-filters__select-icon" />
                <select
                  className="catalog-filters__select"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  aria-label="Filtrar por categoria"
                  id="category-filter"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.nome}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="catalog-filters__select-wrapper">
                <SlidersHorizontal size={18} className="catalog-filters__select-icon" />
                <select
                  className="catalog-filters__select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Ordenar produtos"
                  id="sort-filter"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="catalog-filters__info">
              <span className="catalog-filters__count">
                {totalResults} produto{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
              </span>
              {hasFilters && (
                <button
                  className="catalog-filters__clear"
                  onClick={() => {
                    clearFilters();
                    setSearchParams({});
                  }}
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="catalog-products" id="catalog-products">
        <div className="container">
          <ProductGrid
            products={paginatedProducts}
            isLoading={isLoading}
            hasFilters={hasFilters}
            onClearFilters={() => {
              clearFilters();
              setSearchParams({});
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}
