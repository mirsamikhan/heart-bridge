import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts, type BlogPost } from '@/lib/blog';

function formatDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const allPosts = useMemo(() => getAllPosts(), []);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts;
    const query = searchQuery.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
    );
  }, [allPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-primary text-primary-foreground py-20 md:py-28">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block bg-white/20 text-white font-paragraph text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider backdrop-blur-sm">
                DilSe Health & Wellness Blog
              </span>
              <h1 className="font-heading text-4xl md:text-6xl mb-6">
                Insights, Research & Heart Health Stories
              </h1>
              <p className="font-paragraph text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
                Stay updated with the latest articles, physician-guided preventive insights, and culturally tailored wellness guidance for South Asian cardiovascular health.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="w-full py-8 border-b border-secondary/50 bg-secondary/10">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-secondary rounded-full font-paragraph text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-6">
            {filteredPosts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post: BlogPost, index: number) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-secondary/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
                  >
                    {/* Optional Cover Image */}
                    {post.image ? (
                      <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-secondary/30">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    ) : (
                      <div className="h-44 bg-gradient-to-br from-primary to-accent-darker-blue flex items-center justify-center p-6 text-white">
                        <BookOpen className="w-12 h-12 opacity-40" />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      {/* Meta: Date & Author */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-paragraph text-foreground/70 mb-4">
                        {post.date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        )}
                        {post.author && (
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-primary" />
                            <span>{post.author}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-2xl md:text-3xl text-secondary-foreground font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="font-paragraph text-sm md:text-base text-foreground/80 leading-relaxed mb-6 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read More Link */}
                      <div className="pt-4 border-t border-secondary/40 mt-auto">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 font-paragraph text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors"
                        >
                          Read Full Article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 max-w-md mx-auto">
                <div className="w-16 h-16 bg-secondary/40 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                  No articles found
                </h3>
                <p className="font-paragraph text-sm text-foreground/80 mb-6">
                  We couldn't find any articles matching "{searchQuery}". Try searching with different keywords.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-primary text-primary-foreground font-paragraph text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
