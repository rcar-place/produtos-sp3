// ============================================
// SP3 CONECTORES — Layout Component
// ============================================

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFab from '../ui/WhatsAppFab';
import ScrollToTop from '../common/ScrollToTop';
import './Layout.css';

/**
 * Main layout wrapper with Header + Content + Footer
 */
export default function Layout() {
  return (
    <div className="layout">
      <ScrollToTop />
      <Header />
      <main className="layout__content" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
