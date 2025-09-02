"use client";

import { useState } from "react";
import { Church, Presentation, X, Users, Calendar, Heart } from "lucide-react";
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
    <section 
      id="presentation" 
      className={`py-20 sm:py-32 ${className}`}
      role="region"
      aria-labelledby="presentation-title"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Church className="h-8 w-8 text-primary" />
          </div>
          <h2 
            id="presentation-title"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Notre Église
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Découvrez notre histoire, notre communauté et notre mission de foi
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 font-heading">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content - Histoire & Activités */}
          <div className="space-y-10">
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-2 h-12 bg-primary rounded-full"></div>
                  Notre Histoire
                </h3>
                <div className="space-y-6 text-lg md:text-xl text-foreground leading-relaxed">
                  <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                    Fondée en <span className="font-semibold text-primary">2018</span>, notre église a commencé son ministère avec seulement 10 familles unies par la foi et la vision commune de servir Dieu.
                  </p>
                  <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                    En <span className="font-semibold text-primary">2023</span>, nous avons rejoint officiellement la paroisse <span className="font-semibold text-primary">FPVM</span> (Fiangonana Protestanta eto Madagasikara), marquant une étape importante de notre développement spirituel.
                  </p>
                  <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                    Aujourd'hui, notre communauté a grandi pour accueillir près de <span className="font-semibold text-primary">300 membres</span>, témoignant de la grâce de Dieu et de l'engagement de chacun.
                  </p>
                </div>
              </div>

              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                <h4 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Nos Activités
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activities.map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 glass-card rounded-xl hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-base sm:text-lg text-foreground font-medium">
                          {activity.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Pasteur & Portrait */}
          <div className="space-y-8">
            <div className="glass-card rounded-3xl p-8 lg:p-10 hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Presentation className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Notre Pasteur
                </h3>
              </div>

              {/* Photo du pasteur */}
              <div className="relative mb-8">
                {imageLoading && (
                  <div className="w-full h-80 bg-muted rounded-2xl animate-pulse flex items-center justify-center">
                    <Church className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                {imageError ? (
                  <div className="w-full h-80 bg-muted rounded-2xl flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Church className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">Photo non disponible</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={openImageModal}
                    className="block w-full focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 rounded-2xl overflow-hidden group"
                    aria-label="Agrandir la photo du pasteur"
                    tabIndex={0}
                  >
                    <img
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756214400117-g3kayx38ydd.jpg"
                      alt="Pasteur Iraka Rasamivelona Andrianjaka RAMAROMANOMPO Luther"
                      className={`w-full h-80 object-cover object-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${imageLoading ? 'hidden' : 'block'}`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  </button>
                )}
              </div>

              <div className="space-y-6 text-center">
                <h4 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                  Pasteur Iraka Rasamivelona<br />Andrianjaka RAMAROMANOMPO Luther
                </h4>
                <p className="text-lg text-primary font-semibold">
                  Ordonné en 2021
                </p>
                <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic p-6 glass-card rounded-xl">
                  "Servir Dieu et Sa communauté est un privilège que je porte chaque jour avec humilité et reconnaissance. Ensemble, nous grandissons dans la foi et l'amour fraternel."
                </blockquote>
              </div>
            </div>
          </div>
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
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
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
          </div>
        </div>
      )}
    </section>
  );
}