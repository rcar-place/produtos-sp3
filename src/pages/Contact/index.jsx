// ============================================
// SP3 CONECTORES — Contact Page
// ============================================

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import SEO from '../../components/common/SEO';
import ContactForm from '../../components/forms/ContactForm';
import Button from '../../components/ui/Button';
import { COMPANY, GOOGLE_MAPS_EMBED_URL } from '../../utils/constants';
import { getWhatsAppGenericUrl } from '../../services/whatsapp';
import './Contact.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <>
      <SEO
        title="Contato"
        description="Entre em contato com a SP3 Conectores. Envie uma mensagem, ligue ou visite-nos em Santo André - SP."
      />

      {/* Header */}
      <section className="contact-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="contact-header__title">Entre em Contato</h1>
            <p className="contact-header__subtitle">
              Tire suas dúvidas, solicite orçamentos ou faça uma visita
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content" id="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <motion.div
              className="contact-grid__form"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <h2 className="contact-grid__title">Envie sua mensagem</h2>
              <p className="contact-grid__description">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>
              <ContactForm />
            </motion.div>

            {/* Info */}
            <motion.div
              className="contact-grid__info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="contact-info-card">
                <h3>Informações de Contato</h3>
                <p>Estamos à disposição para atendê-lo.</p>

                <ul className="contact-info-list">
                  <li>
                    <div className="contact-info-list__icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong>Endereço</strong>
                      <span>{COMPANY.address.street}</span>
                      <span>{COMPANY.address.city} - {COMPANY.address.state}</span>
                    </div>
                  </li>
                  <li>
                    <div className="contact-info-list__icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <strong>Telefone / WhatsApp</strong>
                      <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
                    </div>
                  </li>
                  <li>
                    <div className="contact-info-list__icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong>E-mail</strong>
                      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                    </div>
                  </li>
                  <li>
                    <div className="contact-info-list__icon">
                      <Clock size={20} />
                    </div>
                    <div>
                      <strong>Horário</strong>
                      <span>{COMPANY.hours.weekdays}</span>
                      <span>{COMPANY.hours.saturday}</span>
                      <span>{COMPANY.hours.sunday}</span>
                    </div>
                  </li>
                </ul>

                <a href={getWhatsAppGenericUrl()} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                  <Button
                    variant="whatsapp"
                    size="lg"
                    icon={<MessageCircle size={20} />}
                    fullWidth
                  >
                    Falar pelo WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map" id="map">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="section__title text-center" style={{ marginBottom: 'var(--space-8)' }}>
              Nossa Localização
            </h2>
            <div className="contact-map__wrapper">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização SP3 Conectores - Santo André, SP"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
