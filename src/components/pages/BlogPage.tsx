import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { BlogArticles } from '@/entities';

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticles[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticles[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { items } = await BaseCrudService.getAll<BlogArticles>('blogarticles');
      // Sort by publish date, newest first
      const sorted = items.sort((a, b) => {
        const dateA = new Date(a.publishDate || 0).getTime();
        const dateB = new Date(b.publishDate || 0).getTime();
        return dateB - dateA;
      });
      setArticles(sorted);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(sorted.map(article => article.category).filter(Boolean))
      ) as string[];
      setCategories(['All', ...uniqueCategories]);
      setFilteredArticles(sorted);
    };

    fetchArticles();
  }, []);

  // Filter articles based on category and search query
  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article =>
          article.title?.toLowerCase().includes(query) ||
          article.excerpt?.toLowerCase().includes(query) ||
          article.content?.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchQuery, articles]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary text-white py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Financial Insights & Tips
            </h1>
            <p className="font-paragraph text-xl text-gray-300 max-w-2xl mx-auto">
              Expert advice on loans, borrowing, and financial planning to help you make informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-light-gray py-12">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent font-paragraph"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-paragraph font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-white text-foreground border border-gray-200 hover:border-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${article.slug}`}>
                    <div className="group h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col">
                      {/* Featured Image */}
                      {article.featuredImage && (
                        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={article.featuredImage}
                            alt={article.title || 'Article image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Category Badge */}
                        {article.category && (
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase tracking-wider">
                              {article.category}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-paragraph text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-paragraph mb-4 pt-4 border-t border-gray-100">
                          {article.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                          )}
                          {article.publishDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(article.publishDate)}</span>
                            </div>
                          )}
                        </div>

                        {/* Read More Button */}
                        <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-gray-500 mb-4">
                No articles found matching your search.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-accent text-white rounded-full px-8 py-3"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
