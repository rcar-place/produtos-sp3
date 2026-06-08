// ============================================
// SP3 CONECTORES — 404 Not Found Page
// ============================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Button from '../../components/ui/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <SEO title="Página não encontrada" />
      <div className="not-found" id="not-found-page">
        <motion.div
          className="not-found__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="not-found__code">
            <span className="not-found__4">4</span>
            <motion.div
              className="not-found__circle"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="not-found__circle-inner" />
            </motion.div>
            <span className="not-found__4">4</span>
          </div>

          <h1 className="not-found__title">Página não encontrada</h1>
          <p className="not-found__message">
            A página que você procura não existe ou foi movida.
          </p>

          <div className="not-found__actions">
            <Link to="/">
              <Button variant="primary" size="lg" icon={<Home size={20} />}>
                Ir para Home
              </Button>
            </Link>
            <Link to="/catalogo">
              <Button variant="outline" size="lg" icon={<ArrowLeft size={20} />}>
                Ver Catálogo
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
