import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG, getFullUrl } from '../config/siteConfig';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage,
  type = "website"
}) => {
  const siteTitle = SITE_CONFIG.siteName;
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = SITE_CONFIG.siteDescription;
  const fullCanonical = canonical ? getFullUrl(canonical.replace(SITE_CONFIG.domain, '')) : null;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || SITE_CONFIG.defaultSEO.keywords} />
      <meta name="author" content={SITE_CONFIG.defaultSEO.author} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={type} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={ogImage || SITE_CONFIG.logo} />
      <meta property="og:locale" content={SITE_CONFIG.defaultSEO.locale} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || SITE_CONFIG.logo} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Vietnamese" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

export default SEO; 