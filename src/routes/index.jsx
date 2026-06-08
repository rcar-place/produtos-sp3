// ============================================
// SP3 CONECTORES — Routes
// ============================================

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Lazy loaded pages for code splitting
const Home = lazy(() => import('../pages/Home/index'));
const Catalog = lazy(() => import('../pages/Catalog/index'));
const Product = lazy(() => import('../pages/Product/index'));
const Contact = lazy(() => import('../pages/Contact/index'));
const NotFound = lazy(() => import('../pages/NotFound/index'));

// Loading fallback
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '12px',
      color: 'var(--color-gray-500)',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid var(--color-gray-200)',
        borderTopColor: 'var(--color-accent-500)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span>Carregando...</span>
    </div>
  );
}

/**
 * App routes configuration
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="produto/:id" element={<Product />} />
          <Route path="contato" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
