import { useEffect } from 'react';
import { BlogArticles } from '@/entities';
import { getKeywordsForTopic } from '@/lib/blogKeywords';

interface BlogSEOProps {
  article: BlogArticles;
  isArticlePage?: boolean;
}

// Site-wide constants
const SITE_NAME = 'Nik Finance';
const SITE_URL = 'https://www.nik.finance';
const DEFAULT_IMAGE = 'https://static.wixstatic.com/media/e994c8_fe9aab1d39d448fb8e78e1ae53648c58~mv2.png';

export default function BlogSEO({ article, isArticlePage = false }: BlogSEOProps) {
  useEffect(() => {
    if (!article) return;

    // Get topic keywords for enhanced SEO
    const topicKeywords = article.category ? getKeywordsForTopic(article.category) : null;
    const keywords = topicKeywords?.primaryKeywords.slice(0, 5).join(', ') || '';

    // Set page title - optimized format for CTR
    const title = article.seoTitle || article.title || 'Blog Article';
    const pageTitle = `${title} | ${SITE_NAME}`;
    document.title = pageTitle;

    // Helper to set meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Set meta description - optimized for CTR
    const description = article.seoDescription || article.excerpt || '';
    setMeta('description', description);
    
    // Keywords meta (still useful for some search engines)
    if (keywords) {
      setMeta('keywords', keywords);
    }

    // Robots meta - ensure indexing
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Set canonical URL
    const canonicalUrl = `${SITE_URL}/blog/${article.slug}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Open Graph tags - comprehensive
    const ogImage = article.featuredImage || DEFAULT_IMAGE;
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_AU', true);
    
    // Article-specific OG tags
    if (article.publishDate) {
      setMeta('article:published_time', new Date(article.publishDate).toISOString(), true);
    }
    if (article._updatedDate) {
      setMeta('article:modified_time', new Date(article._updatedDate).toISOString(), true);
    }
    if (article.author) {
      setMeta('article:author', article.author, true);
    }
    if (article.category) {
      setMeta('article:section', article.category, true);
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:site', '@nikfinance');

    // Article structured data (JSON-LD) - Enhanced for AGI
    if (isArticlePage) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        image: {
          '@type': 'ImageObject',
          url: ogImage,
          width: 1200,
          height: 630
        },
        datePublished: article.publishDate ? new Date(article.publishDate).toISOString() : undefined,
        dateModified: article._updatedDate 
          ? new Date(article._updatedDate).toISOString() 
          : article.publishDate 
            ? new Date(article.publishDate).toISOString() 
            : undefined,
        author: {
          '@type': 'Person',
          name: article.author || 'Nik Finance Team',
          url: SITE_URL
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
            width: 200,
            height: 60
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        // AGI-friendly additions
        inLanguage: 'en-AU',
        isAccessibleForFree: true,
        ...(article.category && {
          articleSection: article.category,
          keywords: keywords
        }),
        // Speakable for voice search
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.tldr', '.key-takeaways']
        }
      };

      let scriptTag = document.getElementById('article-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'article-schema';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);

      // Add BreadcrumbList schema
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: canonicalUrl
          }
        ]
      };

      let breadcrumbScriptTag = document.getElementById('breadcrumb-schema');
      if (!breadcrumbScriptTag) {
        breadcrumbScriptTag = document.createElement('script');
        breadcrumbScriptTag.id = 'breadcrumb-schema';
        breadcrumbScriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScriptTag);
      }
      breadcrumbScriptTag.textContent = JSON.stringify(breadcrumbSchema);
    }

    // Cleanup function
    return () => {
      document.title = SITE_NAME;
      // Remove article-specific schemas on unmount
      document.getElementById('article-schema')?.remove();
      document.getElementById('breadcrumb-schema')?.remove();
    };
  }, [article, isArticlePage]);

  return null;
}
