"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3x2, Images } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface GalleryGridProps {
  images?: GalleryImage[];
  className?: string;
}

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    alt: 'Église dans un paysage verdoyant',
    caption: 'Ny niorenany : 4 lieux depuis 2018'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    alt: 'Cérémonie religieuse communautaire',
    caption: 'Sampana FEFI et Fanantenana'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=800&h=600&fit=crop',
    alt: 'Communauté en prière',
    caption: 'Fiangonana sy ny fivorian-bahoaka'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
    alt: 'Architecture de l\'église moderne',
    caption: 'Fanorenana vaovao ho an\'ny fiangonana'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Service religieux du dimanche',
    caption: 'Fanompoam-pivavahana alahady'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop',
    alt: 'Groupe de jeunes de l\'église',
    caption: 'Sampana tanora sy fampandrosoana'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    alt: 'Événement caritatif de la communauté',
    caption: 'Asa soa sy fanampiana'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=600&fit=crop',
    alt: 'Baptême dans la rivière',
    caption: 'Batisa sy fanekena finoana'
  }
];

export default function GalleryGrid({ images = defaultImages, className = '' }: GalleryGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const lightboxRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const visibleImages = images.slice(0, visibleCount);
  const hasMoreImages = visibleCount < images.length;

  const handleImageLoad = useCallback((imageId: string) => {
    setImagesLoaded(prev => new Set(prev).add(imageId));
  }, []);

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = '';
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % visibleImages.length
      : selectedImageIndex === 0 
        ? visibleImages.length - 1 
        : selectedImageIndex - 1;
    
    setSelectedImageIndex(newIndex);
  }, [selectedImageIndex, visibleImages.length]);

  const loadMoreImages = useCallback(() => {
    const newCount = Math.min(visibleCount + 4, images.length);
    setVisibleCount(newCount);
  }, [visibleCount, images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, closeLightbox, navigateLightbox]);

  // Focus trap for lightbox
  useEffect(() => {
    if (selectedImageIndex !== null && lightboxRef.current) {
      const focusableElements = lightboxRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [selectedImageIndex]);

  return (
    <>
      <section id="gallery" className={`py-16 sm:py-20 lg:py-24 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Images className="h-8 w-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
                Galerie
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les moments forts de notre communauté à travers nos activités et événements
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-8">
            {visibleImages.map((image, index) => (
              <Card
                key={image.id}
                className="group overflow-hidden rounded-lg bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Ouvrir l'image: ${image.alt}`}
              >
                <div className={`relative overflow-hidden ${
                  index < 2 ? 'h-48 sm:h-64 lg:h-80' : 'h-48 sm:h-64 lg:h-80'
                } ${index === 0 ? 'aspect-square sm:aspect-auto' : ''}`}>
                  {/* Image Skeleton */}
                  {!imagesLoaded.has(image.id) && (
                    <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                      <Grid3x2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                      imagesLoaded.has(image.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(image.id)}
                    width={image.width || 800}
                    height={image.height || 600}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                  </div>
                </div>

                {/* Caption */}
                {image.caption && (
                  <div className="p-3 sm:p-4">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {image.caption}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreImages && (
            <div className="text-center">
              <Button
                onClick={loadMoreImages}
                variant="outline"
                size="lg"
                className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80"
              >
                Charger plus d'images
                <Grid3x2 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Navigation Controls */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="bg-black/20 hover:bg-black/40 text-white border-white/20"
              aria-label="Fermer la galerie"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {visibleImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-white/20 z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-white/20 z-10"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image Content */}
          <div className="max-w-6xl max-h-full flex flex-col items-center">
            <img
              src={visibleImages[selectedImageIndex].src}
              alt={visibleImages[selectedImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              id="lightbox-image"
            />
            
            {/* Caption in Lightbox */}
            {visibleImages[selectedImageIndex].caption && (
              <div className="mt-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 max-w-2xl">
                <p
                  className="text-white text-center font-medium"
                  id="lightbox-description"
                >
                  {visibleImages[selectedImageIndex].caption}
                </p>
              </div>
            )}

            {/* Image Counter */}
            {visibleImages.length > 1 && (
              <div className="mt-4 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-sm font-medium">
                  {selectedImageIndex + 1} / {visibleImages.length}
                </span>
              </div>
            )}
          </div>

          {/* Hidden title for screen readers */}
          <h2 id="lightbox-title" className="sr-only">
            Galerie d'images - {visibleImages[selectedImageIndex].alt}
          </h2>
        </div>
      )}
    </>
  );
}