import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ResourcesMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [location.pathname]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false;
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  return (
    <details ref={ref} className="relative group" onKeyDown={event => {
      if (event.key === 'Escape' && ref.current) { ref.current.open = false; ref.current.querySelector('summary')?.focus(); }
    }}>
      <summary className={`list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center gap-1.5 font-paragraph text-base ${location.pathname.startsWith('/resources') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
        Resources <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" aria-hidden="true" />
      </summary>
      <div className={mobile ? 'flex flex-col gap-3 pl-4 pt-3' : 'absolute top-full left-0 mt-3 w-60 rounded-xl border border-secondary bg-background shadow-lg p-2 flex flex-col gap-1'}>
        {[
          { to: '/resources/educational-handouts', label: 'Educational Handouts' },
          { to: '/resources/pcp-search', label: 'Physician Finder' },
        ].map(item => <Link key={item.to} to={item.to} onClick={onNavigate} aria-current={location.pathname === item.to ? 'page' : undefined} className="font-paragraph text-base text-primary px-3 py-2 rounded-lg hover:bg-secondary/40 focus-visible:bg-secondary/40">{item.label}</Link>)}
      </div>
    </details>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const primaryLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/get-screened', label: 'Get Screened' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/resources', label: 'Resources' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-secondary shadow-sm">
      <div className="max-w-[100rem] mx-auto px-5 sm:px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="DilSe Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-primary font-bold leading-tight">
                DilSe
              </h1>
              <p className="font-paragraph text-sm text-foreground hidden sm:block">
                South Asian Heart & Brain Program
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {primaryLinks.map((link) => link.path === '/resources' ? <ResourcesMenu key={link.path} /> : (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden xl:flex items-center gap-4">
            <Button 
              asChild 
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base h-10 px-4 rounded-lg"
            >
              <Link to="/donate">Donate</Link>
            </Button>
            <Button 
              asChild 
              size="sm"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 font-paragraph text-base h-10 px-4 rounded-lg"
            >
              <Link to="/contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-3 text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-6 pb-4 border-t border-secondary pt-4">
            <div className="flex flex-col gap-4">
              {primaryLinks.map((link) => link.path === '/resources' ? <ResourcesMenu key={link.path} mobile onNavigate={() => setIsMenuOpen(false)} /> : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-paragraph text-base transition-colors ${
                    isActive(link.path)
                      ? 'text-primary font-semibold'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button 
                  asChild 
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph rounded-lg w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/donate">Donate</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-paragraph rounded-lg w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
