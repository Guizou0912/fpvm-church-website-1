"use client";

import { ArrowRight, Building2, Heart, Users } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export default function ConstructionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0px", "300px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);

  return (
    <motion.section 
      ref={containerRef}
      id="construction"
      className="relative py-24 sm:py-32 lg:py-40 min-h-screen overflow-hidden"
    >
      {/* Parallax Background with enhanced gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 rounded-3xl"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Background Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "100px"]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "150px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.8])
        }}
      />
      
      <motion.div 
        className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 z-10"
        style={{ y: contentY }}
      >
        {/* Header with advanced animations */}
        <motion.div 
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(59,130,246,0.1)",
                "0 0 0 20px rgba(59,130,246,0.05)",
                "0 0 0 0 rgba(59,130,246,0)"
              ]
            }}
            style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
          >
            <Building2 className="h-8 w-8 text-blue-400" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Notre Projet de
            <motion.span 
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              whileHover={{ 
                backgroundImage: "linear-gradient(45deg, #60a5fa, #a78bfa, #818cf8, #60a5fa)",
                backgroundSize: "300% 300%"
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Construction
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Aidez-nous à construire un sanctuaire moderne où la communauté peut se rassembler dans la foi et l'amour
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image with advanced parallax */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ y: imageY }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-2xl blur-2xl opacity-75"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1]
                }}
                style={{ animationDuration: "4s", animationIterationCount: "infinite" }}
              />
              
              <motion.div 
                className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 shadow-2xl overflow-hidden"
                whileHover={{ 
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.3)"
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
                  alt="Projet de construction de l'église"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay with reveal animation */}
                <motion.div 
                  className="absolute inset-1.5 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div 
                    className="text-white"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h4 className="text-lg font-bold mb-2">Nouveau Sanctuaire</h4>
                    <p className="text-sm opacity-90">Architecture moderne et spirituelle</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Content with staggered animations */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Stats with enhanced animations */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { value: '75%', label: 'Complété', color: 'blue', delay: 0 },
                { value: '€250K', label: 'Objectif', color: 'purple', delay: 0.2 }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 cursor-pointer group"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderColor: "rgba(255,255,255,0.3)"
                  }}
                >
                  <motion.div 
                    className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}
                    whileHover={{ 
                      textShadow: `0 0 20px ${stat.color === 'blue' ? 'rgba(59,130,246,0.5)' : 'rgba(147,51,234,0.5)'}`
                    }}
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: stat.delay }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/70 font-medium group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features with complex animations */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Users,
                  title: 'Capacité 500 personnes',
                  description: 'Un espace moderne pour accueillir toute notre communauté',
                  color: 'blue'
                },
                {
                  icon: Heart,
                  title: 'Centre communautaire',
                  description: 'Espaces dédiés aux activités familiales et jeunesse',
                  color: 'purple'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 cursor-pointer group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.3)",
                      x: 10
                    }}
                  >
                    <motion.div 
                      className={`p-2 ${feature.color === 'blue' ? 'bg-blue-500/20' : 'bg-purple-500/20'} backdrop-blur-sm border border-white/10 rounded-lg`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={`h-5 w-5 ${feature.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`} />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h4 
                        className="font-semibold text-white mb-1 group-hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {feature.title}
                      </motion.h4>
                      <motion.p 
                        className="text-white/70 text-sm group-hover:text-white/90 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Button with advanced effects */}
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-2xl border-0 cursor-pointer relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(59,130,246,0.25), 0 0 0 1px rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10"
                >
                  <Heart className="h-5 w-5" />
                </motion.div>
                
                <span className="relative z-10">Faire un don</span>
                
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ x: 10 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}