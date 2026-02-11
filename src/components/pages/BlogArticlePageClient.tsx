import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { BlogArticles } from '@/entities';
import BlogSEO from '@/components/blog/BlogSEO';
import ReadingTime from '@/components/blog/ReadingTime';
import TableOfContents from '@/components/blog/TableOfContents';
import SocialShare from '@/components/blog/SocialShare';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import AuthorProfile from '@/components/blog/AuthorProfile';

interface BlogArticlePageClientProps {
  article: BlogArticles;
}

export default function BlogArticlePageClient({ article: initialArticle }: BlogArticlePageClientProps) {
  const [article, setArticle] = useState<BlogArticles | null>(initialArticle);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticles[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogArticles>('blogarticles');
        
        // Get related articles (same category, excluding current article)
        const related = items
          .filter(
            item =>
              item.category === article.category &&
              item._id !== article._id
          )
          .slice(0, 3);
        setRelatedArticles(related);
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [article._id, article.category]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!article) {
    return (
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-20 text-center">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
          Article Not Found
        </h1>
        <p className="font-paragraph text-lg text-gray-600 mb-8">
          Sorry, the article you're looking for doesn't exist.
        </p>
        <a href="/blog">
          <Button className="bg-accent text-white rounded-full px-8 py-3">
            Back to Blog
          </Button>
        </a>
      </div>
    );
  }

  return (
    <>
      <BlogSEO article={article} isArticlePage={true} />

      {/* Article Header */}
      <section className="bg-secondary text-white py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: article.title || 'Article' }
                ]}
              />
            </div>

            {/* Category Badge */}
            {article.category && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-accent/20 text-accent text-sm font-bold rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 font-paragraph">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(article.publishDate)}</span>
                </div>
              )}
              {article.content && (
                <ReadingTime content={article.content} className="text-gray-300" />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-100">
          <Image
            src={article.featuredImage}
            alt={article.title || 'Article featured image'}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none font-paragraph text-foreground/80 space-y-6"
              >
                {article.content && (
                  <div className="whitespace-pre-wrap leading-relaxed text-lg">
                    {article.content}
                  </div>
                )}
              </motion.div>

              {/* Author Profile */}
              {article.author && (
                <div className="mt-12">
                  <AuthorProfile name={article.author} />
                </div>
              )}

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <SocialShare
                  title={article.title || ''}
                  excerpt={article.excerpt}
                />
              </div>

              {/* Newsletter Signup */}
              <div className="mt-12">
                <NewsletterSignup />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              {article.content && (
                <TableOfContents content={article.content} />
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a href={`/blog/${relatedArticle.slug}`}>
                    <div className="group h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col">
                      {/* Featured Image */}
                      {relatedArticle.featuredImage && (
                        <div className="relative w-full h-40 overflow-hidden bg-gray-100">
                          <Image
                            src={relatedArticle.featuredImage}
                            alt={relatedArticle.title || 'Article image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Title */}
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-paragraph text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-paragraph pt-4 border-t border-gray-100">
                          {relatedArticle.publishDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(relatedArticle.publishDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
