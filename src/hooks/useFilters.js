// ============================================
// SP3 CONECTORES — useFilters Hook
// ============================================

import { useState, useMemo, useCallback } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';

/**
 * Hook to manage product filtering, sorting, searching, and pagination
 * @param {Array} products - The full list of products
 * @returns {Object} Filter state and filtered products
 */
export function useFilters(products = []) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter (by name or code)
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.nome.toLowerCase().includes(searchLower) ||
          product.codigo.toLowerCase().includes(searchLower) ||
          product.descricao.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category) {
      result = result.filter(
        (product) => product.categoria.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.preco - b.preco);
        break;
      case 'price_desc':
        result.sort((a, b) => b.preco - a.preco);
        break;
      case 'name_asc':
        result.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        break;
      case 'name_desc':
        result.sort((a, b) => b.nome.localeCompare(a.nome, 'pt-BR'));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  const handleSearch = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleCategory = useCallback((value) => {
    setCategory(value);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((value) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setSortBy('default');
    setCurrentPage(1);
  }, []);

  return {
    // State
    search,
    category,
    sortBy,
    currentPage,

    // Setters
    setSearch: handleSearch,
    setCategory: handleCategory,
    setSortBy: handleSort,
    setCurrentPage,
    clearFilters,

    // Computed
    filteredProducts,
    paginatedProducts,
    totalPages,
    totalResults: filteredProducts.length,
    hasFilters: !!(search || category || sortBy !== 'default'),
  };
}
