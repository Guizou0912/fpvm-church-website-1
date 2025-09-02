"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
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
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[20000ms] ease-out"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg')"
        }}
        role="img"
        aria-label="Église avec architecture moderne et lumière naturelle"
      />
      
      {/* Enhanced Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      
      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center p-6 sm:p-8 lg:p-12 w-full">
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main Title with Animation */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] font-heading tracking-tight opacity-0 animate-[fadeInUp_1.2s_ease-out_0.3s_forwards]"
              role="heading"
              aria-level={1}
            >
              Bienvenue
            </h1>
            
            <div className="space-y-4 opacity-0 animate-[fadeInUp_1.2s_ease-out_0.6s_forwards]">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-heading tracking-wide">
                FPVM Franco-Malagasy
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl text-white/80 font-light">
                Teny Fiainana Analamahitsy
              </h3>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed opacity-0 animate-[fadeInUp_1.2s_ease-out_0.9s_forwards]">
            Nouvelle Église Protestante de Madagascar<br />
            <em className="text-white/70">Fiangonana Protestanta Vaovao eto Madagasikara</em>
          </p>
          
          {/* Church Slogan - Official Bible Verse */}
          <div className="opacity-0 animate-[fadeInUp_1.2s_ease-out_1.2s_forwards]">
            <div className="max-w-4xl mx-auto space-y-4 py-8 px-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-lg sm:text-xl lg:text-2xl text-white font-light italic leading-relaxed">
                "Tamin'ny voalohany ny Teny, ary ny Teny tao amin'Andriamanitra,<br />
                ary ny Teny dia Andriamanitra"
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light italic">
                "Au commencement était la Parole, et la Parole était avec Dieu,<br />
                et la Parole était Dieu."
              </p>
              <p className="text-sm sm:text-base text-white/60 not-italic font-medium tracking-wider">
                JAONA 1:1
              </p>
            </div>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 opacity-0 animate-[fadeInUp_1.2s_ease-out_1.5s_forwards]">
            <Button
              size="lg"
              onClick={scrollToPresentation}
              className="w-full sm:w-auto bg-white/90 hover:bg-white text-slate-900 border-0 hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full shadow-2xl hover:shadow-white/20"
              aria-label="Découvrir notre église et nos services"
            >
              Découvrir notre église
            </Button>
            
            <Button
              size="lg"
              onClick={scrollToConstruction}
              variant="outline"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full backdrop-blur-sm"
              aria-label="Faire un don pour soutenir notre projet de construction"
            >
              Faire un don
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-[fadeInUp_1.2s_ease-out_2s_forwards]">
        <button
          onClick={scrollToPresentation}
          className="text-white/60 hover:text-white transition-colors duration-300 animate-bounce focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-2"
          aria-label="Faire défiler vers le contenu suivant"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}