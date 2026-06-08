// ============================================
// SP3 CONECTORES — SEO Component
// ============================================

import { Helmet } from 'react-helmet-async';
import { META, COMPANY } from '../../utils/constants';

/**
 * SEO component for managing document head
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - SEO keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.canonical - Canonical URL
 */
export default function SEO({
  title,
  description = META.description,
  keywords = META.keywords,
  ogImage = META.ogImage,
  canonical,
}) {
  const fullTitle = title ? `${title} | ${COMPANY.shortName}` : META.title;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={COMPANY.name} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={COMPANY.shortName} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0F172A" />
    </Helmet>
  );
}
