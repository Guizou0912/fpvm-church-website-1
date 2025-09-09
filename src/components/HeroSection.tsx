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
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.0, 0.08]);
  
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
        animate={{ scale: [1, 1.03, 1], rotate: [0, 0.2, -0.2, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
        />
        <div className="stars opacity-5"></div>
        <div className="twinkling" style={{ opacity: 0.06 }}></div>
        <div
          className="clouds absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.07) 0%, rgba(139,92,246,0.09) 22%, rgba(255,255,255,0) 55%), radial-gradient(circle at 70% 40%, rgba(255,255,255,0.05) 0%, rgba(49,46,129,0.07) 20%, rgba(255,255,255,0) 52%), radial-gradient(circle at 40% 70%, rgba(255,255,255,0.05) 0%, rgba(139,92,246,0.07) 18%, rgba(255,255,255,0) 50%), radial-gradient(circle at 60% 20%, rgba(250,204,21,0.08) 0%, rgba(250,204,21,0.0) 50%)",
            filter: "blur(12px)",
            opacity: 0.85,
            mixBlendMode: "screen",
          }}
        />
        {/* Horizon cloud belt for subtle heaven clouds */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(80% 60% at 50% 100%, rgba(255,255,255,0.10) 0%, rgba(139,92,246,0.08) 30%, rgba(255,255,255,0.0) 70%)",
            filter: "blur(8px)",
            mixBlendMode: "screen",
            opacity: 0.75,
          }}
        />
        {/* Central heaven gate crown + soft shafts (harmonized with theme) */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: [
              // crown arch at top-center
              "radial-gradient(70% 55% at 50% 0%, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.0) 60%)",
              // inner ring hint
              "conic-gradient(from 200deg at 50% 0%, rgba(255,255,255,0.06), rgba(255,255,255,0.0) 140deg)",
              // light shafts left/right
              "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.0) 35%)",
              "linear-gradient(245deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.0) 35%)"
            ].join(', '),
            backgroundPosition: "50% 0, 50% 0, 0 0, 100% 0",
            backgroundSize: "120% 70%, 150% 65%, 100% 100%, 100% 100%",
            backgroundRepeat: "no-repeat",
            opacity: 0.75,
            filter: "blur(0.4px)",
          }}
        />
        {/* Heaven Gate portal (central oval door) */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: [
              // vertical oval glow as the celestial gate
              "radial-gradient(35% 60% at 50% 60%, rgba(255,255,255,0.18) 0%, rgba(139,92,246,0.16) 22%, rgba(139,92,246,0.0) 60%)",
              // thin inner highlight
              "radial-gradient(closest-side at 50% 60%, rgba(255,255,255,0.32), rgba(255,255,255,0) 72%)"
            ].join(', '),
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%, 100% 100%",
            opacity: 0.6,
            filter: "blur(0.5px)",
          }}
        />
        {/* Distant heavenly gates silhouette (barely visible) */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none mix-blend-soft-light"
          style={{
            backgroundImage: [
              // central gate bars
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 2px, rgba(255,255,255,0.0) 2px 12px)",
              // warm golden hint
              "linear-gradient(to top, rgba(250,204,21,0.10), rgba(250,204,21,0.0))",
              // subtle indigo depth
              "linear-gradient(to top, rgba(49,46,129,0.12), rgba(49,46,129,0.0))"
            ].join(', '),
            backgroundSize: "40% 100%, 100% 100%, 100% 100%",
            backgroundPosition: "50% 100%, 0 0, 0 0",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
            filter: "blur(2px)",
          }}
        />
      </motion.div>
      
      {/* Parallax Pastor Image with multiple layers - Updated with your uploaded pastor on celestial background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundYSpring, scale: useTransform(scrollYProgress, [0, 1], [1.1, 1.3]) }}
      >
        {/* subtle halo behind the person for better blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 85% 85%, rgba(2,6,23,0.25) 0%, rgba(2,6,23,0.12) 35%, rgba(2,6,23,0) 70%), radial-gradient(45% 35% at 85% 85%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757418644289-cp4y23qrvfa.png')",
            backgroundSize: "contain",
            backgroundPosition: "right bottom",
          }}
          role="img"
          aria-label="Portrait du pasteur de l'église FPVM Franco-Malagasy"
          initial={{ scale: 1.02, y: 0 }}
          animate={{ scale: [1.02, 1.08, 1.02], y: [0, -10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* gentle brand tint over subject to harmonize with theme */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 55% at 85% 85%, rgba(139,92,246,0.025) 0%, rgba(49,46,129,0.025) 40%, rgba(0,0,0,0) 75%)",
            mixBlendMode: "soft-light",
          }}
        />
        {/* Heaven Gate light arches and pillars (harmonized with theme) */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: [
              // Arch glow (outer)
              "radial-gradient(closest-side at 50% 0%, rgba(139,92,246,0.36), rgba(139,92,246,0.0) 78%)",
              // Inner arch ring 1
              "conic-gradient(from 200deg at 50% 0%, rgba(255,255,255,0.09), rgba(255,255,255,0.0) 120deg)",
              // Inner arch ring 2 (fainter, wider)
              "conic-gradient(from 210deg at 50% 0%, rgba(139,92,246,0.09), rgba(139,92,246,0.0) 140deg)",
              // Left pillar
              "linear-gradient(180deg, rgba(99,102,241,0.32) 0%, rgba(99,102,241,0.0) 68%)",
              // Right pillar
              "linear-gradient(180deg, rgba(139,92,246,0.32) 0%, rgba(139,92,246,0.0) 68%)",
              // Central vertical beam
              "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.0) 60%)"
            ].join(', '),
            backgroundPosition: "50% 0, 50% 0, 50% 0, 20% 0, 80% 0, 50% 0",
            backgroundSize: "140% 72%, 160% 70%, 180% 65%, 14% 100%, 14% 100%, 8% 100%",
            backgroundRepeat: "no-repeat",
            opacity: 0.55,
            filter: "blur(0.6px)",
          }}
        />
        {/* Gate steps / terrace hint at horizon */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(80% 50% at 50% 100%, rgba(255,255,255,0.10) 0%, rgba(139,92,246,0.09) 35%, rgba(255,255,255,0) 70%), repeating-linear-gradient(to top, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0) 6px)",
            filter: "blur(4px)",
            opacity: 0.4,
          }}
        />
        {/* Soft celestial rays */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(250,204,21,0.12) 0%, rgba(250,204,21,0.0) 55%), linear-gradient(115deg, rgba(255,255,255,0.12) 0%, transparent 40%), linear-gradient(245deg, rgba(255,255,255,0.11) 0%, transparent 45%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            opacity: 0.38,
          }}
        />
      </motion.div>
      
      {/* Dynamic gradient overlays - Reduced to let celestial background show through */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-slate-900/50" 
        style={{ opacity: overlayOpacity }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.0, 0.06]) }}
      />
      {/* subtle top vignette for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.10) 0%, rgba(2,6,23,0) 30%)",
        }}
      />
      {/* soft brand tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.03) 0%, rgba(49,46,129,0.03) 100%)",
          opacity: 0,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(2,6,23,0.5) 100%)",
          opacity: 0,
        }}
      />
      
      {/* Enhanced Floating Light Particles - Updated for celestial theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles">
          {[...Array(22)].map((_, i) => (
            <motion.div 
              key={i}
              className="particle celestial-particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [0, 1.3, 0],
                y: [typeof window !== 'undefined' ? window.innerHeight : 1000, -120],
                x: [0, Math.sin(i) * 120]
              }}
              transition={{
                duration: 16 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 18,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' 
                  : 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)',
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                borderRadius: '50%',
                filter: 'blur(0.8px)',
                boxShadow: i % 2 === 0 
                  ? '0 0 5px rgba(139,92,246,0.16)'
                  : '0 0 5px rgba(255,255,255,0.10)'
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