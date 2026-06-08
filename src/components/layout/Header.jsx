// ============================================
// SP3 CONECTORES — Header Component
// ============================================

import { useState, useEffect, memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '../../utils/constants';
import { useApp } from '../../context/AppContext';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useApp();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="container flex-between">
          <div className="topbar__contact">
            <a href={`tel:${COMPANY.phone}`} className="topbar__link">
              <Phone size={14} />
              <span>{COMPANY.phone}</span>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="topbar__link">
              <Mail size={14} />
              <span>{COMPANY.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="main-header">
        <div className="container flex-between">
          {/* Logo */}
          <Link to="/" className="header__logo" aria-label="SP3 Conectores - Página Inicial">
            <div className="header__logo-mark">
              <span className="header__logo-sp3">SP3</span>
            </div>
            <div className="header__logo-text">
              <span className="header__logo-name">Conectores</span>
              <span className="header__logo-tagline">Conexões que movem você</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/catalogo" className="header__nav-cta">
              Ver Catálogo
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="header__menu-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="header__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <motion.nav
              className="header__mobile-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              aria-label="Menu mobile"
              id="mobile-menu"
            >
              <div className="header__mobile-header">
                <Link to="/" className="header__logo" onClick={closeMobileMenu}>
                  <div className="header__logo-mark">
                    <span className="header__logo-sp3">SP3</span>
                  </div>
                </Link>
                <button
                  className="header__menu-btn"
                  onClick={closeMobileMenu}
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="header__mobile-links">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `header__mobile-link ${isActive ? 'header__mobile-link--active' : ''}`
                      }
                      onClick={closeMobileMenu}
                      end={link.path === '/'}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="header__mobile-footer">
                <Link
                  to="/catalogo"
                  className="header__mobile-cta"
                  onClick={closeMobileMenu}
                >
                  Ver Catálogo
                </Link>
                <div className="header__mobile-contact">
                  <a href={`tel:${COMPANY.phone}`}>
                    <Phone size={16} />
                    {COMPANY.phone}
                  </a>
                  <a href={`mailto:${COMPANY.email}`}>
                    <Mail size={16} />
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Header);
