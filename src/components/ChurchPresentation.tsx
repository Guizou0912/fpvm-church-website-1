"use client";

import { useState } from "react";
import { Church, Presentation, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChurchPresentationProps {
  className?: string;
}

export default function ChurchPresentation({ className = "" }: ChurchPresentationProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const activities = [
    { name: "Services en malgache", icon: Church },
    { name: "Services en français", icon: Presentation },
    { name: "Mpampianatra (Catéchisme)", icon: Presentation },
    { name: "Dinika (Étude biblique)", icon: Church },
    { name: "Asam-pifohazana (Réveil)", icon: Church }
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
    <section 
      id="presentation" 
      className={`py-16 sm:py-24 ${className}`}
      role="region"
      aria-labelledby="presentation-title"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="presentation-title"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Notre Église
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre histoire, nos activités et notre communauté de foi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Historique & Activités */}
          <Card className="backdrop-blur-md bg-white/6 border border-white/20 rounded-lg px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg group">
            <CardContent className="p-0 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Church className="h-5 w-5 text-primary" />
                  Notre Histoire
                </h3>
                <div className="space-y-3 text-base md:text-lg text-foreground leading-relaxed">
                  <p>
                    Fondée en <strong>2018</strong>, notre église a commencé son ministère avec seulement 10 familles unies par la foi et la vision commune de servir Dieu.
                  </p>
                  <p>
                    En <strong>2023</strong>, nous avons rejoint officiellement la paroisse <strong>FPVM</strong> (Fiangonana Protestanta eto Madagasikara), marquant une étape importante de notre développement spirituel.
                  </p>
                  <p>
                    Aujourd'hui, notre communauté a grandi pour accueillir près de <strong>300 membres</strong>, témoignant de la grâce de Dieu et de l'engagement de chacun.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-3">
                  Nos Activités
                </h4>
                <ul className="space-y-2" role="list">
                  {activities.map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <li 
                        key={index}
                        className="flex items-center gap-3 text-sm sm:text-base text-foreground"
                      >
                        <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                        {activity.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Pasteur & Portrait */}
          <Card className="backdrop-blur-md bg-white/6 border border-white/20 rounded-lg px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg group">
            <CardContent className="p-0 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Presentation className="h-5 w-5 text-primary" />
                  Notre Pasteur
                </h3>

                {/* Photo du pasteur */}
                <div className="relative mb-4">
                  {imageLoading && (
                    <div className="w-full h-48 sm:h-64 bg-muted rounded-lg animate-pulse flex items-center justify-center">
                      <Church className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  {imageError ? (
                    <div className="w-full h-48 sm:h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Church className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Photo non disponible</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={openImageModal}
                      className="block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                      aria-label="Agrandir la photo du pasteur"
                      tabIndex={0}
                    >
                      <img
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214400117-g3kayx38ydd.jpg"
                        alt="Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther"
                        className={`w-full h-48 sm:h-64 object-contain object-center rounded-lg transition-transform duration-300 group-hover:scale-105 ${imageLoading ? 'hidden' : 'block'}`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading text-lg sm:text-xl font-semibold text-foreground">
                    Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Ordonné en <strong>2021</strong>
                  </p>
                  <blockquote className="text-base md:text-lg text-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                    "Servir Dieu et Sa communauté est un privilège que je porte chaque jour avec humilité et reconnaissance. Ensemble, nous grandissons dans la foi et l'amour fraternel."
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal pour agrandir la photo */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div 
            className="relative max-w-2xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={closeImageModal}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-black/40 text-white"
              aria-label="Fermer la photo agrandie"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214400117-g3kayx38ydd.jpg"
              alt="Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther - Photo agrandie"
              className="w-full h-full object-contain object-center"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 id="modal-title" className="font-heading text-lg font-semibold text-white">
                Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther
              </h3>
              <p className="text-sm text-white/90">Ordonné en 2021</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}