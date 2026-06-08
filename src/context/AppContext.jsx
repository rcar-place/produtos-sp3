// ============================================
// SP3 CONECTORES — App Context
// ============================================

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const AppContext = createContext(null);

/**
 * App Context Provider
 */
export function AppProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Ref para acessar o estado atualizado dentro do listener global de popstate
  const isModalOpenRef = useRef(false);

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
    isModalOpenRef.current = true;
    
    // Registra o estado no histórico para o botão voltar do celular funcionar
    window.history.pushState({ pmModal: true }, '');
  }, []);

  const closeProductModal = useCallback((fromPopState = false) => {
    setSelectedProduct(null);
    isModalOpenRef.current = false;
    
    // Se o modal foi fechado manualmente (ex: clique no X), 
    // precisamos remover o estado fantasma do histórico.
    // Verificamos estritamente === true pois eventos do React (onClick) passam um objeto.
    if (fromPopState !== true) {
      if (window.history.state?.pmModal) {
        window.history.back();
      }
    }
  }, []);

  // Intercepta o botão voltar do navegador / celular
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpenRef.current) {
        // Fecha o modal passando true para não disparar um double history.back()
        closeProductModal(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [closeProductModal]);

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
