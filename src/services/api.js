// ============================================
// SP3 CONECTORES — API Service
// ============================================

import axios from 'axios';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

// Base API instance (prepared for future backend integration)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Future: Add auth token here
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Future: Handle 401, 403, 500 errors globally
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// ── Product Services (using local JSON for now) ──

/**
 * Fetches all products
 * @returns {Promise<Array>}
 */
export async function fetchProducts() {
  // Future: return api.get('/products').then(res => res.data);
  return new Promise((resolve) => {
    setTimeout(() => resolve(productsData), 300);
  });
}

/**
 * Fetches a single product by ID
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
export async function fetchProductById(id) {
  // Future: return api.get(`/products/${id}`).then(res => res.data);
  return new Promise((resolve) => {
    const product = productsData.find((p) => p.id === Number(id));
    setTimeout(() => resolve(product || null), 200);
  });
}

/**
 * Fetches all categories
 * @returns {Promise<Array>}
 */
export async function fetchCategories() {
  // Future: return api.get('/categories').then(res => res.data);
  return new Promise((resolve) => {
    setTimeout(() => resolve(categoriesData), 200);
  });
}

/**
 * Fetches products by category
 * @param {string} category
 * @returns {Promise<Array>}
 */
export async function fetchProductsByCategory(category) {
  // Future: return api.get(`/products?category=${category}`).then(res => res.data);
  return new Promise((resolve) => {
    const filtered = productsData.filter(
      (p) => p.categoria.toLowerCase() === category.toLowerCase()
    );
    setTimeout(() => resolve(filtered), 200);
  });
}

/**
 * Fetches featured products
 * @returns {Promise<Array>}
 */
export async function fetchFeaturedProducts() {
  return new Promise((resolve) => {
    const featured = productsData.filter((p) => p.destaque);
    setTimeout(() => resolve(featured), 200);
  });
}

/**
 * Sends contact form data
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function sendContactForm(data) {
  // Future: return api.post('/contact', data).then(res => res.data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Mensagem enviada com sucesso!' }), 1000);
  });
}

export default api;
