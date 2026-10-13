import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PcpSearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/75 mb-3">Resources</p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">PCP Search</h1>
          <p className="font-paragraph text-lg text-white/90">Find a primary care provider.</p>
        </div>
      </section>
      <main className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <div className="rounded-2xl bg-secondary/40 border border-primary/10 p-8 md:p-10 text-center">
          <Search className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-heading text-2xl text-primary mb-3">Provider search coming soon</h2>
          <p className="font-paragraph text-base text-foreground/75 leading-relaxed mb-6">We’re preparing a directory link to help you look for a primary care provider. Please check back for updates.</p>
          <Link to="/resources/educational-handouts" className="text-primary font-semibold hover:underline">Explore educational handouts</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
