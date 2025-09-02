"use client";

import { useState } from 'react';
import { ChevronDown, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

function ProgramCard({ program, index }: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = program.icon;

  return (
    <div className={`group opacity-0 animate-[fadeInUp_0.8s_ease-out_${index * 0.2}s_forwards]`}>
      <div className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-700 hover:shadow-2xl h-full flex flex-col">
        {/* Image Header */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <img
            src={program.image}
            alt={`${program.title} - Programme spirituel`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Icon Overlay */}
          <div className="absolute top-6 left-6">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <IconComponent className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Schedule Badge */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm">
              {program.schedule}
            </div>
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col">
          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 font-heading">
              {program.title}
            </h3>
            <p className="text-lg text-primary font-semibold">
              {program.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed flex-1">
            {program.description}
          </p>

          {/* Bible Verse */}
          {program.verse && (
            <blockquote className="mb-6 p-4 glass-card rounded-xl border-l-4 border-primary">
              <p className="italic text-muted-foreground text-sm leading-relaxed">
                {program.verse}
              </p>
            </blockquote>
          )}

          {/* Expand Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between mb-4 rounded-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            aria-expanded={isExpanded}
            aria-controls={`${program.id}-details`}
          >
            <span className="font-medium">En savoir plus</span>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {/* Expanded Details */}
          <div
            id={`${program.id}-details`}
            className={`overflow-hidden transition-all duration-500 ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={!isExpanded}
          >
            <div className="glass-card rounded-xl p-6 space-y-4">
              {Object.entries(program.details).map(([key, value]) => (
                <div key={key} className="flex flex-col space-y-1">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <span className="text-base text-foreground leading-relaxed">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsThreeCards() {
  return (
    <section id="programmes" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-heading leading-tight">
            Nos Programmes
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Découvrez nos différents programmes d'enseignement et de formation spirituelle 
            adaptés à tous les âges et niveaux de foi
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {programsData.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 font-heading">
              Rejoignez notre communauté de foi
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tous nos programmes sont ouverts à chacun, quel que soit votre niveau spirituel. 
              Venez découvrir la richesse de la Parole de Dieu avec nous.
            </p>
            <Button 
              size="lg" 
              className="rounded-full px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}