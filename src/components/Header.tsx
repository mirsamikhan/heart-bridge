import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/get-screened', label: 'Get Screened' },
    { path: '/health-sites', label: 'Health Sites' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-secondary shadow-sm">
      <div className="max-w-[100rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="font-heading text-2xl text-primary-foreground font-bold">D</span>
            </div>
            <div>
              <h1 className="font-heading text-xl md:text-2xl text-primary font-bold leading-tight">
                DilSe
              </h1>
              <p className="font-paragraph text-xs text-foreground hidden sm:block">
                South Asian Heart & Brain Program
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
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
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              asChild 
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph rounded-lg"
            >
              <Link to="/get-screened">Get Screened</Link>
            </Button>
            <Button 
              asChild 
              size="sm"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 font-paragraph rounded-lg"
            >
              <Link to="/volunteer">Volunteer</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 border-t border-secondary pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
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
                  <Link to="/get-screened">Get Screened</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-paragraph rounded-lg w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/volunteer">Volunteer</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
