"use client";

import { useState, useRef } from 'react';
import { ChevronDown, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const programsData = [
  {
    id: 'sekoly-alahady',
    title: 'Sekoly Alahady',
    subtitle: 'École du Dimanche',
    description: 'Éducation spirituelle des enfants avec des activités adaptées à leur âge dans un environnement bienveillant.',
    schedule: 'Dimanches à 07h30',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214535596-qx8eczoj26n.jpg',
    icon: Users,
    details: {
      participants: '~60 enfants',  
      ageGroups: 'De 3 à 17 ans',
      activities: 'Chants, histoires bibliques, jeux éducatifs, bricolages',
      goals: 'Enseigner les valeurs chrétiennes et développer la foi des enfants'
    }
  },
  {
    id: 'fianarana-soratra',
    title: 'Fianarana Soratra Masina',
    subtitle: 'Étude des Écritures',
    description: 'Étude approfondie des Saintes Écritures pour tous les âges dans un cadre d\'apprentissage bienveillant.',
    schedule: 'Mercredis à 17h30',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: BookOpen,
    verse: '"Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu." - Jean 1:1',
    details: {
      duration: '1h30',
      format: 'Étude interactive et discussions de groupe',
      materials: 'Bible, cahier de notes fourni',
      focus: 'Compréhension contextuelle et application pratique'
    }
  },
  {
    id: 'fianarana-mpiandry',
    title: 'Fianarana Mpiandry sy Mpiomana',
    subtitle: 'Formation Pastorale',
    description: 'Formation pour les bergers et prédicateurs, développant les compétences pastorales et théologiques.',
    schedule: 'Mardis, samedis et 3e dimanche',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283388175-v2ax5zj598.jpg',
    icon: Star,
    details: {
      target: 'Leaders spirituels et futurs bergers',
      topics: 'Théologie, homilétique, counseling pastoral, administration',
      certification: 'Certificat de formation pastorale',
      mentorship: 'Accompagnement personnalisé par pasteurs expérimentés'
    }
  }
];

interface ProgramCardProps {
  program: typeof programsData[0];
  index: number;
  scrollYProgress: any;
}

function ProgramCard({ program, index, scrollYProgress }: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = program.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Individual parallax effects for each card
  const cardY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? "50px" : "-50px", index % 2 === 0 ? "-50px" : "50px"]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 2 : -2]);

  return (
    <motion.div 
      ref={cardRef}
      className="group h-full"
      style={{ y: cardY, rotateY: cardRotate }}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className="glass-card rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md h-full flex flex-col cursor-pointer"
        whileHover={{ 
          scale: 1.02,
          y: -10,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Image Header with advanced effects */}
        <motion.div 
          className="relative h-64 sm:h-72 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={program.image}
            alt={`${program.title} - Programme spirituel`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Gradient overlay with animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent, transparent)" }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating Icon with complex animation */}
          <motion.div 
            className="absolute top-6 left-6"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(255,255,255,0.1)",
                  "0 0 0 10px rgba(255,255,255,0.05)",
                  "0 0 0 0 rgba(255,255,255,0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <IconComponent className="h-7 w-7 text-white" />
            </motion.div>
          </motion.div>

          {/* Schedule Badge with reveal animation */}
          <motion.div 
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm"
              whileHover={{ 
                backgroundColor: "rgba(255,255,255,0.3)",
                scale: 1.05
              }}
            >
              {program.schedule}
            </motion.div>
          </motion.div>
        </motion.div>
        
        <div className="p-8 flex-1 flex flex-col">
          {/* Title & Subtitle with typewriter effect */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-white mb-2 font-heading"
              whileHover={{ 
                textShadow: "0 0 20px rgba(147,51,234,0.5)",
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              {program.title}
            </motion.h3>
            <motion.p 
              className="text-lg text-purple-300 font-semibold"
              whileHover={{ color: "rgba(196,181,253,1)" }}
            >
              {program.subtitle}
            </motion.p>
          </motion.div>

          {/* Description with reveal animation */}
          <motion.p 
            className="text-lg text-white/80 mb-6 leading-relaxed flex-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {program.description}
          </motion.p>

          {/* Bible Verse with special styling */}
          {program.verse && (
            <motion.blockquote 
              className="mb-6 p-4 glass-card rounded-xl border-l-4 border-purple-400 border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                backgroundColor: "rgba(255,255,255,0.1)",
                borderLeftColor: "rgba(196,181,253,1)"
              }}
            >
              <motion.p 
                className="italic text-white/80 text-sm leading-relaxed"
                whileHover={{ color: "rgba(255,255,255,1)" }}
              >
                {program.verse}
              </motion.p>
            </motion.blockquote>
          )}

          {/* Expand Button with advanced styling */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between mb-4 rounded-full border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300"
              aria-expanded={isExpanded}
              aria-controls={`${program.id}-details`}
            >
              <span className="font-medium">En savoir plus</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>

          {/* Expanded Details with smooth reveal */}
          <motion.div
            id={`${program.id}-details`}
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
            aria-hidden={!isExpanded}
          >
            <motion.div 
              className="glass-card rounded-xl p-6 space-y-4 border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ y: -20 }}
              animate={{ y: isExpanded ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {Object.entries(program.details).map(([key, value], detailIndex) => (
                <motion.div 
                  key={key} 
                  className="flex flex-col space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                  transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                >
                  <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <span className="text-base text-white/90 leading-relaxed">
                    {value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProgramsThreeCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for the entire section
  const sectionY = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);

  return (
    <motion.section 
      ref={containerRef}
      id="programmes" 
      className="relative py-20 sm:py-32 min-h-screen overflow-hidden"
      style={{ y: sectionY }}
    >
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-blue-900/20 rounded-3xl"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        className="absolute top-32 right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "100px"])
        }}
      />
      <motion.div 
        className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-2xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "150px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "-80px"])
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header with advanced animations */}
        <motion.div 
          className="text-center mb-20 space-y-6"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-6"
            whileHover={{ scale: 1.2, rotate: 360 }}
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
            <BookOpen className="h-8 w-8 text-blue-400" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nos <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Programmes</span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Découvrez nos différents programmes d'enseignement et de formation spirituelle 
            adaptés à tous les âges et niveaux de foi
          </motion.p>
        </motion.div>

        {/* Programs Grid with staggered animations */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {programsData.map((program, index) => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              index={index} 
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Call to Action with enhanced styling */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="glass-card rounded-3xl p-12 max-w-4xl mx-auto border border-white/10 bg-white/5 backdrop-blur-md"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-white mb-6 font-heading"
              whileHover={{ 
                textShadow: "0 0 20px rgba(147,51,234,0.5)"
              }}
            >
              Rejoignez notre communauté de foi
            </motion.h3>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0.8 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Tous nos programmes sont ouverts à chacun, quel que soit votre niveau spirituel. 
              Venez découvrir la richesse de la Parole de Dieu avec nous.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Nous contacter
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}