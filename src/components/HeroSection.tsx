"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms with different speeds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.9]);
  
  // Spring physics for smooth animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const backgroundYSpring = useSpring(backgroundY, springConfig);
  const textYSpring = useSpring(textY, springConfig);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsLoaded(true), 100);
    
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
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Animated Celestial Background with advanced parallax */}
      <motion.div 
        className="absolute inset-0 celestial-background"
        style={{ y: backgroundYSpring }}
      >
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </motion.div>
      
      {/* Parallax Pastor Image with multiple layers - Updated with your pastor on celestial background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundYSpring, scale: useTransform(scrollYProgress, [0, 1], [1.1, 1.3]) }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/f295b977-6afb-40e7-ac5c-8f643cd4748d/generated_images/ultra-high-resolution-8k-photorealistic--46b60aed-20250904131650.jpg')",
          }}
          role="img"
          aria-label="Portrait 8K du pasteur sur fond céleste harmonisé au design du site"
        />
      </motion.div>
      
      {/* Dynamic gradient overlays - Reduced to let celestial background show through */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-slate-900/50" 
        style={{ opacity: overlayOpacity }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.1, 0.4]) }}
      />
      
      {/* Enhanced Floating Light Particles - Updated for celestial theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <motion.div 
              key={i}
              className="particle celestial-particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                y: [typeof window !== 'undefined' ? window.innerHeight : 1000, -100],
                x: [0, Math.sin(i) * 150]
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? 'radial-gradient(circle, #ffd700 0%, transparent 70%)' :
                           i % 3 === 1 ? 'radial-gradient(circle, #87ceeb 0%, transparent 70%)' :
                           'radial-gradient(circle, #f0f8ff 0%, transparent 70%)',
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                borderRadius: '50%',
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content Container with advanced parallax */}
      <motion.div 
        ref={ref}
        className="relative z-10 flex items-center justify-center p-6 sm:p-8 lg:p-12 w-full"
        style={{ y: textYSpring }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main Title with staggered animations */}
          <div className="space-y-6">
            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] font-heading tracking-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              role="heading"
              aria-level={1}
            >
              Bienvenue
            </motion.h1>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl text-white/95 font-heading tracking-wide drop-shadow-lg"
                animate={inView ? {
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 4px 8px rgba(0,0,0,0.5)",
                    "0 6px 12px rgba(139,92,246,0.3)",
                    "0 4px 8px rgba(0,0,0,0.5)"
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                FPVM Franco-Malagasy
              </motion.h2>
              <motion.h3 
                className="text-lg sm:text-xl lg:text-2xl text-white/85 font-light drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Teny Fiainana Analamahitsy
              </motion.h3>
            </motion.div>
          </div>
          
          {/* Subtitle with typing animation effect */}
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          >
            Nouvelle Église Protestante de Madagascar<br />
            <motion.em 
              className="text-white/80"
              animate={inView ? { opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Fiangonana Protestanta Vaovao eto Madagasikara
            </motion.em>
          </motion.p>
          
          {/* Church Slogan with advanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
          >
            <motion.div 
              className="max-w-4xl mx-auto space-y-4 py-8 px-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl transition-all duration-500"
              whileHover={{ 
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)"
              }}
            >
              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-white font-light italic leading-relaxed drop-shadow-lg"
                animate={inView ? {
                  textShadow: [
                    "0 2px 4px rgba(0,0,0,0.4)",
                    "0 4px 8px rgba(59,130,246,0.3)",
                    "0 2px 4px rgba(0,0,0,0.4)"
                  ]
                } : {}}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              >
                "Tamin'ny voalohany ny Teny, ary ny Teny tao amin'Andriamanitra,<br />
                ary ny Teny dia Andriamanitra"
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg lg:text-xl text-white/90 font-light italic drop-shadow-lg"
                initial={{ opacity: 0.9 }}
                animate={inView ? { opacity: [0.9, 1, 0.9] } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                "Au commencement était la Parole, et la Parole était avec Dieu,<br />
                et la Parole était Dieu."
              </motion.p>
              <motion.p 
                className="text-sm sm:text-base text-white/70 not-italic font-medium tracking-wider drop-shadow-lg"
                animate={inView ? { 
                  letterSpacing: ["0.1em", "0.15em", "0.1em"],
                  opacity: [0.7, 1, 0.7]
                } : {}}
                transition={{ duration: 5, repeat: Infinity }}
              >
                JAONA 1:1
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Call to Action Buttons with advanced hover effects */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={scrollToPresentation}
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-slate-900 border-0 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full shadow-2xl hover:shadow-white/30"
                aria-label="Découvrir notre église et nos services"
              >
                <motion.span
                  animate={inView ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Découvrir notre église
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={scrollToConstruction}
                variant="outline"
                className="w-full sm:w-auto bg-transparent hover:bg-white/15 text-white border-white/40 hover:border-white/60 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full backdrop-blur-md shadow-2xl"
                aria-label="Faire un don pour soutenir notre projet de construction"
              >
                <motion.span
                  animate={inView ? { 
                    color: ["rgba(255,255,255,1)", "rgba(139,92,246,1)", "rgba(255,255,255,1)"]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Faire un don
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
        }}
      >
        <motion.button
          onClick={scrollToPresentation}
          className="text-white/70 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-4 backdrop-blur-sm bg-white/5 border border-white/20"
          aria-label="Faire défiler vers le contenu suivant"
          animate={{
            y: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}