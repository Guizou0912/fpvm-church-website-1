"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programsData = [
  {
    id: 'sekoly-alahady',
    title: 'Sekoly Alahady',
    description: 'École du dimanche dédiée à l\'éducation spirituelle des enfants avec des activités adaptées à leur âge.',
    schedule: 'Dimanches à 07h30',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214535596-qx8eczoj26n.jpg',
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
    description: 'Étude approfondie des Saintes Écritures pour tous les âges dans un cadre d\'apprentissage bienveillant.',
    schedule: 'Mercredis à 17h30',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    description: 'Formation pour les bergers et prédicateurs, développant les compétences pastorales et théologiques.',
    schedule: 'Mardis, samedis et 3e dimanche',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
}

function ProgramCard({ program }: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card/80 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:bg-card/90">
      <div className="w-full h-40 sm:h-48 mb-4 rounded-lg overflow-hidden">
        <img
          src={program.image}
          alt={`${program.title} - Programme spirituel`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2">
            {program.title}
          </h3>
          <p className="text-md lg:text-lg text-muted-foreground mb-3">
            {program.description}
          </p>
          <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            {program.schedule}
          </div>
        </div>

        {program.verse && (
          <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-muted-foreground">
            {program.verse}
          </blockquote>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
          aria-expanded={isExpanded}
          aria-controls={`${program.id}-details`}
        >
          En savoir +
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </Button>

        <div
          id={`${program.id}-details`}
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isExpanded}
        >
          <div className="pt-4 border-t border-border/50">
            <div className="space-y-3">
              {Object.entries(program.details).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-right sm:max-w-[60%]">
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
    <section id="programs" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos Programmes Spirituels
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos différents programmes d'enseignement et de formation spirituelle 
            adaptés à tous les âges et niveaux.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {programsData.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}