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

  // Parallax transforms avec vitesses plus marquées (type Slider Revolution)
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 0.22]);
  
  // Spring physics
  const springConfig = { stiffness: 80, damping: 40, restDelta: 0.001 };
  const backgroundYSpring = useSpring(backgroundY, springConfig);
  const textYSpring = useSpring(textY, springConfig);

  // Mouse parallax (profondeur multi-couches)
  const mx = useSpring(0, { stiffness: 120, damping: 20 });
  const my = useSpring(0, { stiffness: 120, damping: 20 });
  const bgMouseX = useTransform(mx, (v) => v * -20);
  const fgMouseX = useTransform(mx, (v) => v * -10);
  const textMouseX = useTransform(mx, (v) => v * 6);
  const bgMouseY = useTransform(my, (v) => v * -10);
  const fgMouseY = useTransform(my, (v) => v * -6);
  const textMouseY = useTransform(my, (v) => v * 4);
  const bgY = useTransform([backgroundYSpring, bgMouseY], ([a, b]) => a + b);
  const fgY = useTransform([backgroundYSpring, fgMouseY], ([a, b]) => a + b);
  const textParallaxY = useTransform([textYSpring, textMouseY], ([a, b]) => a + b);
  // 3D tilt pour effet Slider Revolution
  const rotateY = useTransform(mx, (v) => v * 4);
  const rotateX = useTransform(my, (v) => v * -4);
  // Effets de texte au scroll
  const textOpacityMotion = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.85, 0.6]);
  const textScaleMotion = useTransform(scrollYProgress, [0, 1], [1.02, 0.96]);
  const textBlur = useTransform(scrollYProgress, [0, 1], ["0px", "2px"]);
  
  // Parallax façon snippet: translation + zoom de l'image principale
  const imgParallaxY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2); // -1..1
    const ny = (e.clientY - cy) / (rect.height / 2); // -1..1 (réservé si besoin)
    // Eviter l'effet sur mobile/touch
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;
    mx.set(Math.max(-1, Math.min(1, nx)));
    my.set(Math.max(-1, Math.min(1, ny)));
  };

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
      className="relative h-[100svh] min-h-[100svh] w-screen overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {/* Animated Celestial Background with advanced parallax */}
      <motion.div 
        className="absolute inset-0 celestial-background"
        style={{ willChange: "transform" }}
        animate={{ scale: [1.02, 1.08] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {/* Fixed background image (as requested) */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757526995673-4wvh272fb6s.png')",
            backgroundAttachment: "fixed",
          }}
        />
      </motion.div>
      
      {/* Parallax Pastor Image with multiple layers - Updated with your uploaded pastor on celestial background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgParallaxY, scale: imgScale }}
      >
        {/* subtle halo behind the person for better blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 85% 85%, rgba(2,6,23,0.25) 0%, rgba(2,6,23,0.12) 35%, rgba(2,6,23,0) 70%), radial-gradient(45% 35% at 85% 85%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)",
          }}
        />
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757526998775-tru8yvmlkl7.png')",
            backgroundSize: "contain",
            backgroundPosition: "bottom right",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Portrait du pasteur de l'église FPVM Franco-Malagasy"
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
            opacity: 0.28,
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
            opacity: 0.22,
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
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.02, 0.12]) }}
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
          opacity: 0.06,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(2,6,23,0.5) 100%)",
          opacity: 0.35,
        }}
      />
      {/* center scrim to improve text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 35% at 50% 45%, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.0) 60%)",
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
        style={{ y: textParallaxY, x: textMouseX, rotateX, rotateY, opacity: textOpacityMotion, scale: textScaleMotion, willChange: "transform, opacity, filter", filter: textBlur }}
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
              Bienvenue à la FPVM Franco-Malagasy
            </motion.h1>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl text-white/95 font-heading italic tracking-wide drop-shadow-lg"
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
                Teny Fiainana Andalamahitsy
              </motion.h2>
              {/* Optional mission line */}
              <motion.p 
                className="text-base sm:text-lg lg:text-xl text-white/90 font-light drop-shadow"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Une communauté vivante, enracinée dans la Parole de Dieu.
              </motion.p>
            </motion.div>
          </div>
          
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
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full shadow-2xl hover:shadow-violet-500/30"
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
                className="w-full sm:w-auto bg-white text-violet-700 hover:bg-white border-2 border-violet-500 hover:border-violet-600 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full shadow-2xl"
                aria-label="Faire un don pour soutenir notre projet de construction"
              >
                <motion.span
                  animate={inView ? { 
                    color: ["#6d28d9", "#2563eb", "#6d28d9"]
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
          className="text-white/80 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-4 backdrop-blur-md bg-black/30 border border-white/10"
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
          whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}