// ============================================
// SP3 CONECTORES — WhatsApp Service
// ============================================

import { COMPANY, WHATSAPP_BASE_URL } from '../utils/constants';

/**
 * Generates a WhatsApp URL for product quote request
 * @param {string} productName - The name of the product
 * @param {string} productCode - The code of the product
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppUrl(productName, productCode = '') {
  const message = productCode
    ? `Olá, gostaria de solicitar um orçamento do produto: ${productName} (Código: ${productCode})`
    : `Olá, gostaria de solicitar um orçamento do produto: ${productName}`;

  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}${COMPANY.whatsapp.number}?text=${encodedMessage}`;
}

/**
 * Generates a generic WhatsApp URL (no product specified)
 * @param {string} customMessage - Optional custom message
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppGenericUrl(customMessage = '') {
  const message = customMessage || 'Olá, gostaria de mais informações sobre os produtos SP3 Conectores.';
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}${COMPANY.whatsapp.number}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with product quote request
 * @param {string} productName
 * @param {string} productCode
 */
export function openWhatsApp(productName, productCode = '') {
  const url = getWhatsAppUrl(productName, productCode);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Opens WhatsApp with generic message
 * @param {string} customMessage
 */
export function openWhatsAppGeneric(customMessage = '') {
  const url = getWhatsAppGenericUrl(customMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Formata os dados do formulário de contato e abre o WhatsApp
 * @param {Object} data - Dados do formulário (nome, empresa, telefone, email, mensagem)
 */
export function openWhatsAppContactForm(data) {
  const { nome, empresa, telefone, email, mensagem } = data;
  
  // Monta a mensagem formatada em negrito (*) e itálico (_) suportados pelo WhatsApp
  let text = `*Novo Contato via Site SP3 Conectores* 🔌\n\n`;
  text += `*👤 Nome:* ${nome}\n`;
  if (empresa) text += `*🏢 Empresa:* ${empresa}\n`;
  text += `*📱 Telefone:* ${telefone}\n`;
  text += `*✉️ E-mail:* ${email}\n\n`;
  text += `*📝 Mensagem:*\n_${mensagem}_`;

  const encodedMessage = encodeURIComponent(text);
  const url = `${WHATSAPP_BASE_URL}${COMPANY.whatsapp.number}?text=${encodedMessage}`;
  
  window.open(url, '_blank', 'noopener,noreferrer');
}
