// ============================================
// SP3 CONECTORES — Footer Component
// ============================================

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '../../utils/constants';
import { getWhatsAppGenericUrl } from '../../services/whatsapp';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Company Info */}
            <div className="footer__col">
              <Link to="/" className="footer__logo">
                <div className="footer__logo-mark">
                  <span>SP3</span>
                </div>
                <div>
                  <span className="footer__logo-name">Conectores</span>
                  <span className="footer__logo-tagline">{COMPANY.slogan}</span>
                </div>
              </Link>
              <p className="footer__description">
                Especialistas em conectores, terminais, chicotes e soquetes para motocicletas.
                Qualidade e confiança para sua oficina.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h4 className="footer__title">Links Rápidos</h4>
              <ul className="footer__links">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">
                      <ChevronRight size={14} />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={getWhatsAppGenericUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                  >
                    <ChevronRight size={14} />
                    WhatsApp
                    <ExternalLink size={12} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__title">Contato</h4>
              <ul className="footer__contact">
                <li>
                  <MapPin size={16} />
                  <span>{COMPANY.address.full}</span>
                </li>
                <li>
                  <Phone size={16} />
                  <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="footer__col">
              <h4 className="footer__title">Horário</h4>
              <ul className="footer__hours">
                <li>
                  <Clock size={16} />
                  <div>
                    <span>{COMPANY.hours.weekdays}</span>
                    <span>{COMPANY.hours.saturday}</span>
                    <span>{COMPANY.hours.sunday}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container flex-between">
          <p>© {currentYear} {COMPANY.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
