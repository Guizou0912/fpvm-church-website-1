"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";

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

  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: useTransform(backgroundOpacity, [0, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.1)"]),
        backdropFilter: useTransform(backdropBlur, blur => `blur(${blur}px)`)
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Advanced glassmorphism background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border-b border-white/10"
        style={{ opacity: backgroundOpacity }}
      />
      
      {/* Floating particles in header */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: '50%'
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Church Name with advanced animation */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => handleSmoothScroll('#accueil')}
              onKeyDown={(e) => handleKeyDown(e, '#accueil')}
              className="text-xl lg:text-2xl font-bold text-white font-heading tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2 py-1 relative overflow-hidden group"
              aria-label="Retourner à l'accueil"
              whileHover={{ 
                textShadow: "0 0 20px rgba(255,255,255,0.5)"
              }}
            >
              {/* Animated background for logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />
              
              <span className="relative z-10">
                FPVM <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Franco-Malagasy</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-baseline space-x-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {navigationLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleSmoothScroll(link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden group ${
                    activeSection === link.href.slice(1)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active indicator with animation */}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-sm rounded-xl border border-white/20"
                      layoutId="activeTab"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Floating underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full group-hover:w-3/4 transition-all duration-300"
                    style={{ x: "-50%" }}
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Mobile Menu Button with advanced animation */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation Menu with advanced animations */}
        <motion.div 
          id="mobile-menu"
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div 
            className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mt-2 shadow-2xl relative overflow-hidden"
            initial={{ y: -20 }}
            animate={{ y: isOpen ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Floating background particles in mobile menu */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + i * 10}%`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            {navigationLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => handleSmoothScroll(link.href)}
                onKeyDown={(e) => handleKeyDown(e, link.href)}
                className={`relative block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden group ${
                  activeSection === link.href.slice(1)
                    ? 'text-white bg-white/20 border border-white/30'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                initial={{ opacity: 0, x: -30 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -30
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator */}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-r-full"
                    style={{ y: "-50%" }}
                    layoutId="mobileActiveTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Hover background with gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                />
                
                <span className="relative z-10">{link.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  );
}