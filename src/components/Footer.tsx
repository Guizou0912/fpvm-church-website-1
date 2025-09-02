import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Présentation', href: '#presentation' },
    { name: 'Programmes', href: '#programmes' },
    { name: 'Construction', href: '#construction' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-400' }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/30" />
      <div className="absolute inset-0 backdrop-blur-xl" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-gentle-float" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '1s' }} />

      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Church Info */}
            <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <h3 className="font-heading text-xl font-bold text-white mb-4">
                  Église Évangélique
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Une communauté de foi vivante, dédiée à l'amour, au service et à la croissance spirituelle dans la grâce de Dieu.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
                  <span className="text-white/60 text-xs font-medium">Communauté Active</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <h4 className="font-heading text-lg font-semibold text-white mb-6">
                  Navigation
                </h4>
                <nav className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-white/70 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out hover:translate-x-2 hover:scale-105"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      aria-label={`Naviguer vers ${link.name}`}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <h4 className="font-heading text-lg font-semibold text-white mb-6">
                  Contact
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-4 h-4 text-white/80" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">+33 1 23 45 67 89</p>
                      <p className="text-white/70 text-sm">+33 6 12 34 56 78</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-4 h-4 text-white/80" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">contact@eglise.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-4 h-4 text-white/80" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">123 Rue de la Paix</p>
                      <p className="text-white/70 text-sm">75001 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <h4 className="font-heading text-lg font-semibold text-white mb-6">
                  Suivez-nous
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className={`group flex items-center justify-center w-full h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${social.color}`}
                        aria-label={`Suivre sur ${social.name}`}
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <IconComponent className="w-5 h-5 text-white/70 group-hover:text-current transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
                
                {/* Newsletter signup */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-xs mb-3">Restez informés</p>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300"
                      aria-label="Adresse email pour la newsletter"
                    />
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white text-sm font-medium rounded-lg hover:from-purple-600/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      aria-label="S'inscrire à la newsletter"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">Église Évangélique</span>
                </div>
                <span className="text-white/40 text-sm">
                  © {currentYear} Tous droits réservés
                </span>
              </div>

              {/* Legal links */}
              <div className="flex items-center space-x-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <a
                  href="#"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                  aria-label="Mentions légales"
                >
                  Mentions légales
                </a>
                <span className="text-white/30">•</span>
                <a
                  href="#"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                  aria-label="Politique de confidentialité"
                >
                  Politique de confidentialité
                </a>
              </div>
            </div>

            {/* Inspirational quote */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <blockquote className="text-white/60 text-sm italic font-light">
                "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux."
              </blockquote>
              <cite className="text-white/40 text-xs mt-2 block">Matthieu 18:20</cite>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}