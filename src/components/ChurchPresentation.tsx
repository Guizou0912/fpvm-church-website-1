"use client";

import { useState, useRef } from "react";
import { Church, Presentation, X, Users, Calendar, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ChurchPresentationProps {
  className?: string;
}

export default function ChurchPresentation({ className = "" }: ChurchPresentationProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const activities = [
    { name: "Services en malgache", icon: Church },
    { name: "Services en français", icon: Presentation },
    { name: "Mpampianatra (Catéchisme)", icon: Presentation },
    { name: "Dinika (Étude biblique)", icon: Church },
    { name: "Asam-pifohazana (Réveil)", icon: Church }
  ];

  const stats = [
    { number: "2018", label: "Année de fondation", icon: Calendar },
    { number: "300+", label: "Membres actifs", icon: Users },
    { number: "2023", label: "Rejointe FPVM", icon: Heart }
  ];

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <motion.section 
      ref={containerRef}
      id="presentation" 
      className={`relative py-20 sm:py-32 min-h-screen overflow-hidden ${className}`}
      style={{ opacity }}
      role="region"
      aria-labelledby="presentation-title"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20 rounded-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0px", "200px"]) }}
      />
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "50px"])
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "100px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "-80px"])
        }}
      />

      <motion.div 
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, scale }}
      >
        {/* Section Header with reveal animation */}
        <motion.div 
          className="text-center mb-20 space-y-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Church className="h-8 w-8 text-purple-400" />
          </motion.div>
          
          <motion.h2 
            id="presentation-title"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Notre <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Église</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Découvrez notre histoire, notre communauté et notre mission de foi
          </motion.p>
        </motion.div>

        {/* Stats Section with staggered animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="glass-card rounded-2xl p-8 hover:shadow-2xl cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  </motion.div>
                  <motion.div 
                    className="text-4xl sm:text-5xl font-bold text-white mb-2 font-heading"
                    whileHover={{ 
                      textShadow: "0 0 20px rgba(147,51,234,0.5)"
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg text-white/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content with advanced parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content - Histoire & Activités */}
          <motion.div 
            className="space-y-10"
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]) }}
          >
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div>
                <motion.h3 
                  className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6 flex items-center gap-3"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-2 h-12 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"
                    initial={{ height: 0 }}
                    whileInView={{ height: 48 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                  Notre Histoire
                </motion.h3>
                
                <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed">
                  {[
                    "Fondée en 2018, notre église a commencé son ministère avec seulement 10 familles unies par la foi et la vision commune de servir Dieu.",
                    "En 2023, nous avons rejoint officiellement la paroisse FPVM (Fiangonana Protestanta Vaovao eto Madagasikara), marquant une étape importante de notre développement spirituel.",
                    "Aujourd'hui, notre communauté a grandi pour accueillir près de 300 membres, témoignant de la grâce de Dieu et de l'engagement de chacun."
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                      whileHover={{ x: 10 }}
                    >
                      <span dangerouslySetInnerHTML={{ 
                        __html: text.replace(/(\d{4}|FPVM|300)/g, '<span class="font-semibold text-purple-300 group-hover:text-purple-200 transition-colors">$1</span>')
                      }} />
                    </motion.p>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.h4 
                  className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6"
                  whileHover={{ textShadow: "0 0 20px rgba(147,51,234,0.5)" }}
                >
                  Nos Activités
                </motion.h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activities.map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <motion.div 
                        key={index}
                        className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer group"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderColor: "rgba(255,255,255,0.2)"
                        }}
                      >
                        <motion.div 
                          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="h-6 w-6 text-purple-400" />
                        </motion.div>
                        <span className="text-base sm:text-lg text-white/90 font-medium group-hover:text-white transition-colors">
                          {activity.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Pasteur & Portrait */}
          <motion.div 
            className="space-y-8"
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0px", "50px"]) }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="glass-card rounded-3xl p-8 lg:p-10 border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Presentation className="h-8 w-8 text-purple-400" />
                </motion.div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                  Notre Pasteur
                </h3>
              </motion.div>

              {/* Photo du pasteur */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {imageLoading && (
                  <div className="w-full h-80 bg-white/10 rounded-2xl animate-pulse flex items-center justify-center backdrop-blur-sm">
                    <Church className="h-12 w-12 text-white/30" />
                  </div>
                )}
                
                {imageError ? (
                  <div className="w-full h-80 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white/60">
                      <Church className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">Photo non disponible</p>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    onClick={openImageModal}
                    className="block w-full focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:ring-offset-2 focus:ring-offset-transparent rounded-2xl overflow-hidden group"
                    aria-label="Agrandir la photo du pasteur"
                    tabIndex={0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.img
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214400117-g3kayx38ydd.jpg"
                      alt="Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther"
                      className={`w-full h-80 object-cover object-center rounded-2xl transition-all duration-500 ${imageLoading ? 'hidden' : 'block'}`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )}
              </motion.div>

              <motion.div 
                className="space-y-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.h4 
                  className="font-heading text-xl sm:text-2xl font-bold text-white"
                  whileHover={{ textShadow: "0 0 20px rgba(147,51,234,0.5)" }}
                >
                  Pasteur Iraka Rasamivelona<br />Andrianjaka RAMAROMANOMPO Luther
                </motion.h4>
                
                <motion.p 
                  className="text-lg text-purple-300 font-semibold"
                  whileHover={{ color: "rgba(196,181,253,1)" }}
                >
                  Ordonné en 2021
                </motion.p>
                
                <motion.blockquote 
                  className="text-lg md:text-xl text-white/80 leading-relaxed italic p-6 glass-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  whileHover={{ 
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.2)"
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  "Servir Dieu et Sa communauté est un privilège que je porte chaque jour avec humilité et reconnaissance. Ensemble, nous grandissons dans la foi et l'amour fraternel."
                </motion.blockquote>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal pour agrandir la photo */}
      {isImageModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={closeImageModal}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
              aria-label="Fermer la photo agrandie"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214400117-g3kayx38ydd.jpg"
              alt="Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther - Photo agrandie"
              className="w-full h-full object-contain object-center max-h-[80vh]"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
              <h3 id="modal-title" className="font-heading text-2xl font-bold text-white mb-2">
                Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther
              </h3>
              <p className="text-lg text-white/90">Ordonné en 2021</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}