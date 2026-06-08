// ============================================
// SP3 CONECTORES — Constants
// ============================================

export const COMPANY = {
  name: 'SP3 Conectores LTDA',
  shortName: 'SP3 Conectores',
  slogan: 'Conexões que movem você',
  description: 'Especialistas em conectores e terminais para motocicletas. Qualidade, durabilidade e o melhor atendimento para sua oficina ou projeto.',
  address: {
    street: 'Av. Itamarati, 801',
    city: 'Santo André',
    state: 'SP',
    full: 'Av. Itamarati, 801 - Santo André, SP',
  },
  phone: '(11) 94706-7108',
  email: 'sp3comercioltda@gmail.com',
  whatsapp: {
    number: '5511947067108',
    displayNumber: '(11) 94706-7108',
  },
  social: {
    instagram: '#',
    facebook: '#',
  },
  hours: {
    weekdays: 'Segunda a Sexta: 8h às 18h',
    saturday: 'Sábado: 8h às 13h',
    sunday: 'Domingo: Fechado',
  },
};

export const WHATSAPP_BASE_URL = 'https://wa.me/';

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.5!2d-46.53!3d-23.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM5JzM2LjAiUyA0NsKwMzEnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr';

export const ITEMS_PER_PAGE = 9;

export const SORT_OPTIONS = [
  { value: 'default', label: 'Ordenar por' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'name_asc', label: 'A - Z' },
  { value: 'name_desc', label: 'Z - A' },
];

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/catalogo', label: 'Catálogo' },
  { path: '/contato', label: 'Contato' },
];

export const META = {
  title: 'SP3 Conectores | Conectores e Terminais para Motocicletas',
  description: 'Catálogo digital SP3 Conectores LTDA. Conectores, terminais, chicotes e soquetes para motocicletas. Qualidade e preço justo em Santo André - SP.',
  keywords: 'conectores moto, terminais motocicleta, chicote elétrico moto, soquete moto, SP3 conectores, peças elétricas moto',
  ogImage: '/og-image.jpg',
  url: 'https://sp3conectores.com.br',
};
