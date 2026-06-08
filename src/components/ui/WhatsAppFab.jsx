// ============================================
// SP3 CONECTORES — WhatsApp FAB
// ============================================

import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppGenericUrl } from '../../services/whatsapp';
import './WhatsAppFab.css';

/**
 * Floating WhatsApp button
 */
function WhatsAppFab() {
  return (
    <motion.a
      href={getWhatsAppGenericUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      id="whatsapp-fab"
      aria-label="Fale conosco pelo WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
      <span className="whatsapp-fab__tooltip">Fale conosco!</span>
    </motion.a>
  );
}

export default memo(WhatsAppFab);
