// ============================================
// SP3 CONECTORES — useProducts Hook
// ============================================

import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchFeaturedProducts, fetchCategories } from '../services/api';

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to fetch a single product by ID
 * @param {number|string} id
 */
export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch featured products
 */
export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: fetchFeaturedProducts,
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30,
  });
}
