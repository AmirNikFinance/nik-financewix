import { useEffect } from 'react';
import { BlogArticles } from '@/entities';

interface BlogSEOProps {
  article: BlogArticles;
  isArticlePage?: boolean;
}

export default function BlogSEO({ article, isArticlePage = false }: BlogSEOProps) {
  useEffect(() => {
    if (!article) return;

    // Set page title
    const title = article.seoTitle || article.title || 'Blog Article';
    document.title = `${title} | Mortgage Broker`;

    // Set meta description
    const description = article.seoDescription || article.excerpt || '';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set canonical URL
    const canonicalUrl = `${window.location.origin}/blog/${article.slug}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: article.featuredImage || '' },
      { property: 'og:site_name', content: 'Mortgage Broker' }
    ];

    ogTags.forEach(({ property, content }) => {
      if (!content) return;
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: article.featuredImage || '' }
    ];

    twitterTags.forEach(({ name, content }) => {
      if (!content) return;
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Article structured data (JSON-LD)
    if (isArticlePage) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.featuredImage,
        datePublished: article.publishDate,
        dateModified: article._updatedDate || article.publishDate,
        author: {
          '@type': 'Person',
          name: article.author || 'Mortgage Broker Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Mortgage Broker',
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Reset title on unmount
      document.title = 'Mortgage Broker';
    };
  }, [article, isArticlePage]);

  return null;
}
