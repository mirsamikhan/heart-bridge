import { useState } from 'react';
import { Search, MapPin, Phone, Languages, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import physicians from '@/data/physicians.json';

const sorted = [...physicians].sort((a, b) => a.name.localeCompare(b.name));
const options = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
const specialties = options(sorted.map(p => p.specialty));
const cities = options(sorted.flatMap(p => p.city.split(' / ')));
const languages = options(sorted.flatMap(p => p.languages));

export default function PcpSearchPage() {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');
  const [limit, setLimit] = useState(24);
  const results = sorted.filter(p => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const text = [p.name, p.specialty, p.city, p.phone, ...p.languages, p.affiliation].join(' ').toLowerCase();
    return terms.every(term => text.includes(term)) && (!specialty || p.specialty === specialty)
      && (!city || p.city.split(' / ').includes(city)) && (!language || p.languages.includes(language));
  });
  const clear = () => { setQuery(''); setSpecialty(''); setCity(''); setLanguage(''); setLimit(24); };
  const control = 'w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary';
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/75 mb-3">Resources</p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Physician Finder</h1>
          <p className="font-paragraph text-lg text-white/90">Find primary care providers and specialists by specialty, location, and language.</p>
        </div>
      </section>
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-14 font-paragraph">
        <section aria-label="Search and filter providers" className="bg-secondary/30 border border-primary/10 rounded-2xl p-5 md:p-8 mb-8">
          <label htmlFor="physician-search" className="block font-semibold text-primary mb-2">Search the directory</label>
          <div className="relative mb-5">
            <Search aria-hidden="true" className="absolute left-4 top-3.5 w-5 h-5 text-primary/60" />
            <input id="physician-search" type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(24); }} placeholder="Name, specialty, language, or keyword" className={`${control} pl-12`} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { id: 'specialty', label: 'Specialty', value: specialty, values: specialties, set: setSpecialty },
              { id: 'city', label: 'City', value: city, values: cities, set: setCity },
              { id: 'language', label: 'Language', value: language, values: languages, set: setLanguage },
            ].map(filter => <div key={filter.id}>
              <label htmlFor={filter.id} className="block text-sm font-semibold text-primary mb-2">{filter.label}</label>
              <select id={filter.id} className={control} value={filter.value} onChange={e => { filter.set(e.target.value); setLimit(24); }}>
                <option value="">All {filter.id === 'specialty' ? 'specialties' : filter.id === 'city' ? 'cities' : 'languages'}</option>
                {filter.values.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>)}
          </div>
          <div className="flex items-center justify-between gap-4 mt-5">
            <p role="status" className="text-sm text-foreground/75">{results.length} {results.length === 1 ? 'provider' : 'providers'} found</p>
            <button type="button" onClick={clear} className="text-sm font-semibold text-primary underline underline-offset-4">Clear filters</button>
          </div>
        </section>
        <p className="text-sm text-foreground/75 leading-relaxed mb-8">Please confirm provider details, insurance coverage, and appointment availability directly with the practice. Inclusion in this directory does not imply endorsement by DilSe.</p>
        {results.length ? <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.slice(0, limit).map(provider => <article key={provider.id} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm flex flex-col">
              <p className="text-sm font-semibold text-primary/75 mb-2">{provider.specialty}</p>
              <h2 className="font-heading text-xl text-primary mb-5">{provider.name}</h2>
              <dl className="space-y-3 text-sm text-foreground/80 break-words">
                {provider.city && <div className="flex gap-3"><MapPin aria-hidden="true" className="w-4 h-4 shrink-0 mt-0.5" /><div><dt className="sr-only">City</dt><dd>{provider.city}</dd></div></div>}
                {!!provider.languages.length && <div className="flex gap-3"><Languages aria-hidden="true" className="w-4 h-4 shrink-0 mt-0.5" /><div><dt className="font-semibold text-primary">Languages</dt><dd>{provider.languages.join(', ')}</dd></div></div>}
                {provider.affiliation && <div className="flex gap-3"><Building2 aria-hidden="true" className="w-4 h-4 shrink-0 mt-0.5" /><div><dt className="font-semibold text-primary">Affiliation</dt><dd>{provider.affiliation}</dd></div></div>}
              </dl>
              {provider.phone && <a href={`tel:${provider.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 mt-5 pt-4 border-t border-primary/10 text-primary font-semibold text-sm hover:underline"><Phone aria-hidden="true" className="w-4 h-4" />{provider.phone}</a>}
            </article>)}
          </div>
          {results.length > limit && <div className="text-center mt-8"><button type="button" onClick={() => setLimit(limit + 24)} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold">Show more providers</button></div>}
          <p className="text-center text-sm text-foreground/60 mt-5">Showing {Math.min(limit, results.length)} of {results.length} providers</p>
        </> : <div className="text-center rounded-2xl border border-primary/10 p-10"><h2 className="font-heading text-2xl text-primary mb-3">No providers match your search</h2><p className="text-foreground/75 mb-4">Try another keyword or broaden your filters.</p><button type="button" onClick={clear} className="text-primary font-semibold underline">Reset search</button></div>}
      </main>
      <Footer />
    </div>
  );
}
