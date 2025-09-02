"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
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
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg',
    alt: 'Pasteur prêchant dans l\'église',
  },
  {
    id: '2',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg',
    alt: 'Moment de culte communautaire',
  },
  {
    id: '3',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg',
    alt: 'Assemblée en prière',
  },
  {
    id: '4',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg',
    alt: 'Service religieux du dimanche',
  },
  {
    id: '5',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg',
    alt: 'Communauté de foi rassemblée',
  },
  {
    id: '6',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756283865599-pzldiz4tafo.jpg',
    alt: 'Moment de louange et d\'adoration',
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
    const newCount = Math.min(visibleCount + 3, images.length);
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
      <section className={`relative py-24 sm:py-32 lg:py-40 ${className}`}>
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-indigo-50/30 rounded-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6 animate-fadeInUp">
              <Images className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp animate-delay-100">
              Notre
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Galerie
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
              Découvrez les moments forts de notre communauté à travers nos célébrations et rassemblements
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 animate-fadeInUp animate-delay-300">
            {visibleImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl"
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
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Image Skeleton */}
                  {!imagesLoaded.has(image.id) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                      <Images className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      imagesLoaded.has(image.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(image.id)}
                    width={image.width || 800}
                    height={image.height || 600}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreImages && (
            <div className="text-center animate-fadeInUp animate-delay-400">
              <button
                onClick={loadMoreImages}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl text-gray-700 font-medium"
              >
                Voir plus d'images
                <Images className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Navigation Controls */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={closeLightbox}
              className="p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label="Fermer la galerie"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {visibleImages.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image Content */}
          <div className="max-w-6xl max-h-full flex flex-col items-center">
            <img
              src={visibleImages[selectedImageIndex].src}
              alt={visibleImages[selectedImageIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              id="lightbox-image"
            />

            {/* Image Counter */}
            {visibleImages.length > 1 && (
              <div className="mt-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
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