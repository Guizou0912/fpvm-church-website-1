"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToConstruction = () => {
    const element = document.getElementById('construction');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-64 sm:h-96 lg:h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        }}
        role="img"
        aria-label="Église avec architecture moderne et lumière naturelle"
      />
      
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Glassmorphism Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8 sm:p-12 lg:p-16 space-y-4 sm:space-y-6">
          {/* Main Title */}
          <h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-heading"
            role="heading"
            aria-level={1}
          >
            Bienvenue à la FPVM Franco-Malagasy Teny Fiainana Analamahitsy
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Nouvelle Église Protestante de Madagascar – Fiangonana Protestante Vaovao eto Madagasikara
          </p>
          
          {/* Church Slogan - Official Bible Verse */}
          <div className="text-md text-white/80 italic space-y-2 max-w-3xl mx-auto border-t border-white/20 pt-4">
            <p className="text-base sm:text-lg">"Tamin'ny voalohany ny Teny, ary ny Teny tao amin'Andriamanitra, ary ny Teny dia Andriamanitra"</p>
            <p className="text-base sm:text-lg">"Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu."</p>
            <p className="text-sm text-white/70 not-italic">Jaona 1:1</p>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground border border-white/30 hover:scale-105 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Découvrir notre église et nos services"
            >
              Découvrir notre église
            </Button>
            
            <Button
              size="lg"
              onClick={scrollToConstruction}
              className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white hover:scale-105 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Faire un don pour soutenir notre projet de construction"
            >
              Faire un don
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}