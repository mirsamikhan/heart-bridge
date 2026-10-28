import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const HANDOUTS = [
  { title: 'DilSe Patient & PCP Checklist', category: 'Care Visits', format: 'PNG', file: '/handouts/dilse-patient-pcp-checklist.png', pages: ['/handouts/dilse-patient-pcp-checklist.png'], description: 'A checklist to bring to your primary-care visit, with questions and topics to discuss.' },
  { title: 'Heart Healthy Recipe Ideas', category: 'Nutrition', format: 'PNG', file: '/handouts/heart-healthy-recipe-ideas.png', pages: ['/handouts/heart-healthy-recipe-ideas.png'], description: 'Ideas for breakfast, lunch, dinner, and snacks inspired by South Asian meals.' },
  { title: 'Heart Health Diet for South Asians', category: 'Nutrition', format: 'PDF', file: '/handouts/heart-health-diet.pdf', pages: ['/resource-previews/heart-health-diet.png'], description: 'An illustrated guide to food choices and everyday swaps for heart health.' },
  { title: 'Type 2 Diabetes in South Asians', category: 'Diabetes', format: 'PDF', file: '/handouts/type-2-diabetes.pdf', pages: ['/resource-previews/type-2-diabetes.png'], description: 'A one-page overview of type 2 diabetes, risk factors, and prevention topics.' },
  { title: 'SACH Diabetes Brochure', category: 'Diabetes', format: 'PDF', file: '/handouts/sach-diabetes-brochure.pdf', pages: ['/resource-previews/sach-diabetes-brochure-1.png', '/resource-previews/sach-diabetes-brochure-2.png'], description: 'A two-page brochure covering diabetes basics and South Asian community health.' },
];

export default function ResourcesPage() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<typeof HANDOUTS[number] | null>(null);
  const filtered = HANDOUTS.filter(item => category === 'All' || item.category === category);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/75 mb-3">Resources</p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Educational Handouts</h1>
          <p className="font-paragraph text-lg text-white/90 leading-relaxed">Explore practical heart health, nutrition, and diabetes resources for South Asian communities.</p>
        </div>
      </section>
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-wrap justify-center gap-3 mb-8" aria-label="Filter handouts">
          {['All', 'Care Visits', 'Nutrition', 'Diabetes'].map(value => (
            <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={`rounded-full px-5 py-2.5 font-paragraph text-sm ${category === value ? 'bg-primary text-white' : 'bg-secondary/50 text-primary hover:bg-secondary'}`}>{value}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <article key={item.file} className="rounded-2xl border border-primary/10 bg-white p-5 flex flex-col shadow-sm">
              <button type="button" onClick={() => setSelected(item)} aria-label={`Preview ${item.title}`} className="w-full h-64 mb-5 rounded-xl bg-secondary/20 p-3 hover:bg-secondary/40 focus-visible:ring-2 focus-visible:ring-primary">
                <img src={item.pages[0]} alt={`Preview of ${item.title}`} className="w-full h-full object-contain" loading="lazy" />
              </button>
              <p className="text-xs font-paragraph text-primary/70 mb-2">{item.category} · {item.format} · {item.pages.length} {item.pages.length === 1 ? 'page' : 'pages'}</p>
              <h2 className="font-heading text-xl text-primary leading-snug mb-3">{item.title}</h2>
              <p className="font-paragraph text-sm text-foreground/75 leading-relaxed mb-5 flex-1">{item.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => setSelected(item)} className="rounded-lg">View Handout</Button>
                <a href={item.file} download className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline underline-offset-4" aria-label={`Download ${item.title}`}><Download className="w-4 h-4" aria-hidden="true" />Download</a>
              </div>
            </article>
          ))}
        </div>
        <p className="font-paragraph text-sm text-foreground/60 mt-6 text-center">These materials support education and conversations with your healthcare provider.</p>
      </main>
      <section className="bg-secondary/40 py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <MessageSquare className="w-10 h-10 text-primary shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="font-heading text-2xl text-primary mb-2">Weekly health reminders</h2>
            <p className="font-paragraph text-base text-foreground/80">Text <strong>HEART</strong> to <strong>866-490-9361</strong> for weekly SMS heart health education and reminders.</p>
          </div>
          <Button asChild className="rounded-lg shrink-0"><a href="sms:+18664909361?&body=HEART">Text HEART</a></Button>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-6 py-8 text-center font-paragraph text-sm text-foreground/75">Looking for a healthcare provider? <Link to="/resources/pcp-search" className="text-primary font-semibold hover:underline">Visit Physician Finder</Link></div>
      <Footer />
      <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-xl">
          <DialogTitle className="font-heading text-xl pr-6">{selected?.title}</DialogTitle>
          <DialogDescription>Read the complete handout below, or download the original file.</DialogDescription>
          <div className="overflow-y-auto min-h-0 space-y-5">
            {selected?.pages.map((page, index) => <img key={page} src={page} alt={`${selected.title}, page ${index + 1} of ${selected.pages.length}`} className="w-full h-auto bg-white" />)}
          </div>
          {selected && <a href={selected.file} download className="text-primary font-semibold text-sm hover:underline" aria-label={`Download original ${selected.title}`}>Download original {selected.format}</a>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
