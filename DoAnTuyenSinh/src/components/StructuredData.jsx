import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_CONFIG, getFullUrl, getSocialLinks } from "../config/siteConfig";

const StructuredData = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

// Dữ liệu tổ chức (Organization)
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_CONFIG.siteName,
  alternateName: "HUTECHS",
  url: SITE_CONFIG.domain,
  logo: SITE_CONFIG.logo,
  description: SITE_CONFIG.siteDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: "475A Điện Biên Phủ",
    addressLocality: "Bình Thạnh",
    addressRegion: "TP.HCM",
    postalCode: "70000",
    addressCountry: "VN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONFIG.contact.phone,
    contactType: "Admissions",
    availableLanguage: "Vietnamese",
    email: SITE_CONFIG.contact.email,
  },
  sameAs: getSocialLinks(),
};

// Dữ liệu trang web (Website)
export const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_CONFIG.siteName} - Tuyển sinh`,
  url: SITE_CONFIG.domain,
  description: `Website tuyển sinh chính thức của ${SITE_CONFIG.siteName}`,
  publisher: {
    "@type": "EducationalOrganization",
    name: "HUTECHS",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_CONFIG.domain}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Dữ liệu FAQ
export const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "HUTECHS tuyển sinh những ngành nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trường tuyển sinh đa ngành với 61 ngành đào tạo từ trình độ đại học đến tiến sĩ, chi tiết xem tại mục Thông tin tuyển sinh.",
      },
    },
    {
      "@type": "Question",
      name: "Học phí năm 2025 là bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Học phí ổn định với nhiều chính sách học bổng hấp dẫn, tham khảo chi tiết tại website chính thức.",
      },
    },
    {
      "@type": "Question",
      name: "Có những loại học bổng nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HUTECHS có nhiều loại học bổng: học bổng tài năng, học bổng khuyến khích, học bổng hỗ trợ và các học bổng đặc biệt khác.",
      },
    },
  ],
};

export default StructuredData;
