"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToConstruction = () => {
    const element = document.getElementById('construction');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPresentation = () => {
    const element = document.getElementById('presentation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Animated Celestial Background */}
      <div className="absolute inset-0 celestial-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      
      {/* Parallax Pastor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756837630568-4fwb6vbeqeq.png')",
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
          transition: 'transform 0.1s ease-out'
        }}
        role="img"
        aria-label="Portrait du pasteur en tenue religieuse"
      />
      
      {/* Enhanced Gradient Overlays for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-slate-900/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      
      {/* Floating Light Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content Container */}
      <div 
        className="relative z-10 flex items-center justify-center p-6 sm:p-8 lg:p-12 w-full"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main Title with Animation */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] font-heading tracking-tight opacity-0 animate-[fadeInUp_1.2s_ease-out_0.3s_forwards] drop-shadow-2xl"
              role="heading"
              aria-level={1}
            >
              Bienvenue
            </h1>
            
            <div className="space-y-4 opacity-0 animate-[fadeInUp_1.2s_ease-out_0.6s_forwards]">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-white/95 font-heading tracking-wide drop-shadow-lg">
                FPVM Franco-Malagasy
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl text-white/85 font-light drop-shadow-lg">
                Teny Fiainana Analamahitsy
              </h3>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed opacity-0 animate-[fadeInUp_1.2s_ease-out_0.9s_forwards] drop-shadow-lg">
            Nouvelle Église Protestante de Madagascar<br />
            <em className="text-white/80">Fiangonana Protestanta Vaovao eto Madagasikara</em>
          </p>
          
          {/* Church Slogan - Official Bible Verse */}
          <div className="opacity-0 animate-[fadeInUp_1.2s_ease-out_1.2s_forwards]">
            <div className="max-w-4xl mx-auto space-y-4 py-8 px-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-500">
              <p className="text-lg sm:text-xl lg:text-2xl text-white font-light italic leading-relaxed drop-shadow-lg">
                "Tamin'ny voalohany ny Teny, ary ny Teny tao amin'Andriamanitra,<br />
                ary ny Teny dia Andriamanitra"
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light italic drop-shadow-lg">
                "Au commencement était la Parole, et la Parole était avec Dieu,<br />
                et la Parole était Dieu."
              </p>
              <p className="text-sm sm:text-base text-white/70 not-italic font-medium tracking-wider drop-shadow-lg">
                JAONA 1:1
              </p>
            </div>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 opacity-0 animate-[fadeInUp_1.2s_ease-out_1.5s_forwards]">
            <Button
              size="lg"
              onClick={scrollToPresentation}
              className="w-full sm:w-auto bg-white/95 hover:bg-white text-slate-900 border-0 hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full shadow-2xl hover:shadow-white/30"
              aria-label="Découvrir notre église et nos services"
            >
              Découvrir notre église
            </Button>
            
            <Button
              size="lg"
              onClick={scrollToConstruction}
              variant="outline"
              className="w-full sm:w-auto bg-transparent hover:bg-white/15 text-white border-white/40 hover:border-white/60 hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full backdrop-blur-md shadow-2xl"
              aria-label="Faire un don pour soutenir notre projet de construction"
            >
              Faire un don
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-[fadeInUp_1.2s_ease-out_2s_forwards]"
        style={{
          transform: `translateX(-50%) translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <button
          onClick={scrollToPresentation}
          className="text-white/70 hover:text-white transition-colors duration-300 animate-gentle-bounce focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-2 backdrop-blur-sm bg-white/5 border border-white/20"
          aria-label="Faire défiler vers le contenu suivant"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}