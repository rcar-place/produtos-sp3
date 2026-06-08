// ============================================
// SP3 CONECTORES — App Context
// ============================================

import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

/**
 * App Context Provider
 */
export function AppProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeProductModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu: () => setMobileMenuOpen((prev) => !prev),
        closeMobileMenu: () => setMobileMenuOpen(false),
        selectedProduct,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook to use App Context
 * @returns {Object}
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
