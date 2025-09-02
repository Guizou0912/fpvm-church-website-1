"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navigationLinks = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'Présentation', href: '#presentation' },
  { name: 'Programmes', href: '#programmes' },
  { name: 'Construction', href: '#construction' },
  { name: 'Galerie', href: '#galerie' },
  { name: 'Contact', href: '#contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navigationLinks.map(link => link.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSmoothScroll(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      scrolled 
        ? 'bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Church Name */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleSmoothScroll('#accueil')}
              onKeyDown={(e) => handleKeyDown(e, '#accueil')}
              className="text-xl lg:text-2xl font-bold text-primary font-heading tracking-tight hover:text-primary/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
              aria-label="Retourner à l'accueil"
            >
              FPVM Franco-Malagasy
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleSmoothScroll(link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-foreground hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm'
                  }`}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen 
              ? 'max-h-96 opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-2'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg mt-2 shadow-lg">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleSmoothScroll(link.href)}
                onKeyDown={(e) => handleKeyDown(e, link.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary bg-primary/10 shadow-sm transform scale-105'
                    : 'text-foreground hover:text-primary hover:bg-white/10 hover:transform hover:scale-105'
                }`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}