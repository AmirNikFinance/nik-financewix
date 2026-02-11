import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

// Default SEO values for Nik Finance
const defaults = {
  siteName: 'Nik Finance',
  title: 'Car Loans & Home Loans Australia | AI-Powered Finance Broker',
  description: 'Get matched with 130+ lenders in minutes. Car finance, home loans, refinancing & business loans. Free service, fast approval. Australia\'s smartest loan marketplace.',
  keywords: 'car loan, home loan, car finance, mortgage broker, refinance, personal loan, business loan, Australia, AI finance',
  ogImage: 'https://static.wixstatic.com/media/e994c8_fe9aab1d39d448fb8e78e1ae53648c58~mv2.png',
  siteUrl: 'https://www.nik.finance',
};

export default function SEO({ 
  title, 
  description, 
  keywords,
  canonical,
  ogImage,
  type = 'website',
  noindex = false
}: SEOProps) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${defaults.siteName}` : defaults.title;
    const pageDescription = description || defaults.description;
    const pageKeywords = keywords || defaults.keywords;
    const pageCanonical = canonical || window.location.href;
    const pageOgImage = ogImage || defaults.ogImage;

    // Set page title
    document.title = pageTitle;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('description', pageDescription);
    setMeta('keywords', pageKeywords);
    if (noindex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      setMeta('robots', 'index, follow');
    }

    // Open Graph tags
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDescription, true);
    setMeta('og:type', type, true);
    setMeta('og:url', pageCanonical, true);
    setMeta('og:image', pageOgImage, true);
    setMeta('og:site_name', defaults.siteName, true);
    setMeta('og:locale', 'en_AU', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDescription);
    setMeta('twitter:image', pageOgImage);

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', pageCanonical);

    // Cleanup on unmount
    return () => {
      document.title = defaults.title;
    };
  }, [title, description, keywords, canonical, ogImage, type, noindex]);

  return null;
}

// Schema markup components
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    let scriptTag = document.getElementById('faq-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      scriptTag?.remove();
    };
  }, [faqs]);

  return null;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  useEffect(() => {
    if (!items || items.length === 0) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };

    let scriptTag = document.getElementById('breadcrumb-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'breadcrumb-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      scriptTag?.remove();
    };
  }, [items]);

  return null;
}

export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'Nik Finance',
      url: 'https://www.nik.finance',
      description: defaults.description,
      image: defaults.ogImage,
      telephone: '1300 NIK FIN',
      email: 'hello@nik.finance',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AU',
        addressRegion: 'Australia',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
      priceRange: 'Free Service',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      founder: {
        '@type': 'Person',
        name: 'Amir Nikibin',
      },
      sameAs: [
        'https://www.tiktok.com/@nik.finance',
        'https://www.facebook.com/nikfinance.amir',
        'https://www.instagram.com/nik._.finance/',
        'https://www.linkedin.com/in/amir-nikibin/',
      ],
    };

    let scriptTag = document.getElementById('local-business-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'local-business-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      scriptTag?.remove();
    };
  }, []);

  return null;
}
