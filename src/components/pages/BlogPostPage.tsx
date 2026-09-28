import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug } from '@/lib/blog';

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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);

  // Compute read time (avg 200 words/min)
  const readingTime = useMemo(() => {
    if (!post) return '3 min read';
    const words = post.content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }, [post]);

  // Render markdown to HTML
  const parsedHtml = useMemo(() => {
    if (!post) return '';
    try {
      return marked.parse(post.content, {
        gfm: true,
        breaks: true,
      }) as string;
    } catch (e) {
      console.error('Error rendering markdown:', e);
      return post.content;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="max-w-md text-center bg-white border border-secondary rounded-2xl p-10 shadow-sm">
            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-primary mb-3">
              Article Not Found
            </h1>
            <p className="font-paragraph text-foreground/80 mb-8 leading-relaxed">
              The article you're looking for doesn't exist or may have been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs & Navigation Bar */}
        <section className="w-full bg-secondary/10 border-b border-secondary/40 py-4">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-paragraph text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>

            <nav className="hidden sm:flex items-center gap-2 text-xs font-paragraph text-foreground/60">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground/90 truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-paragraph text-foreground/70 mb-6">
              {post.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{formatDate(post.date)}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{readingTime}</span>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-[1.15]">
              {post.title}
            </h1>

            {/* Excerpt callout */}
            {post.excerpt && (
              <div className="border-l-4 border-primary bg-secondary/20 p-6 rounded-r-2xl mb-10 text-lg font-paragraph text-foreground/90 italic leading-relaxed">
                {post.excerpt}
              </div>
            )}

            {/* Cover Image if present */}
            {post.image && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-md border border-secondary/40 aspect-[16/9] bg-secondary/20">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Markdown Body Content */}
            <div
              className="prose prose-lg max-w-none font-paragraph text-foreground leading-relaxed
                prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
                prose-li:text-foreground/90 prose-li:mb-2
                prose-strong:text-foreground prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-secondary/20 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic
                prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
          </motion.div>

          {/* Post Footer & Next Steps Callout */}
          <div className="mt-16 pt-10 border-t border-secondary/50">
            <div className="bg-secondary/25 border border-secondary/60 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-2">
                  Take the Next Step for Your Heart Health
                </h3>
                <p className="font-paragraph text-sm md:text-base text-foreground/80 leading-relaxed max-w-xl">
                  DilSe provides free community heart and brain health screenings across the Dallas-Fort Worth area. Get tested and know your numbers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/get-screened"
                  className="bg-primary text-primary-foreground font-paragraph text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Get Screened
                </Link>
                <Link
                  to="/blog"
                  className="bg-white border border-secondary text-primary font-paragraph text-sm font-semibold px-6 py-3 rounded-full hover:bg-secondary/20 transition-colors"
                >
                  All Articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
