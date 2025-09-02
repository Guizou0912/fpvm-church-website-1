"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);

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
      <motion.section 
        ref={containerRef}
        className={`relative py-24 sm:py-32 lg:py-40 min-h-screen overflow-hidden ${className}`}
      >
        {/* Parallax Background with advanced gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20 rounded-3xl"
          style={{ y: backgroundY }}
        />
        
        {/* Floating Geometric Elements */}
        <motion.div 
          className="absolute top-32 left-20 w-56 h-56 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0px", "-250px"]),
            x: useTransform(scrollYProgress, [0, 1], ["0px", "150px"]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
          }}
        />
        <motion.div 
          className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0px", "200px"]),
            x: useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]),
            rotate: useTransform(scrollYProgress, [0, 1], [360, 0])
          }}
        />
        
        <motion.div 
          className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 z-10"
          style={{ y: contentY }}
        >
          {/* Header with sophisticated animations */}
          <motion.div 
            className="text-center mb-16 sm:mb-20 lg:mb-24"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(147,51,234,0.1)",
                  "0 0 0 20px rgba(147,51,234,0.05)",
                  "0 0 0 0 rgba(147,51,234,0)"
                ]
              }}
              style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
            >
              <Images className="h-8 w-8 text-purple-400" />
            </motion.div>
            
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Notre
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
                whileHover={{ 
                  backgroundImage: "linear-gradient(45deg, #a78bfa, #60a5fa, #818cf8, #a78bfa)",
                  backgroundSize: "300% 300%"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Galerie
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Découvrez les moments forts de notre communauté à travers nos célébrations et rassemblements
            </motion.p>
          </motion.div>

          {/* Gallery Grid with masonry effect */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {visibleImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer"
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
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
                whileHover={{ 
                  scale: 1.03,
                  y: -10,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.3)"
                }}
                style={{
                  y: useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? "0px" : "20px", index % 2 === 0 ? "-20px" : "0px"])
                }}
              >
                <motion.div 
                  className="relative aspect-[4/3] overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Image Skeleton with pulse */}
                  {!imagesLoaded.has(image.id) && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Images className="h-12 w-12 text-white/30" />
                    </motion.div>
                  )}
                  
                  {/* Image with loading animation */}
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      imagesLoaded.has(image.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(image.id)}
                    width={image.width || 800}
                    height={image.height || 600}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Advanced gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                    whileHover={{ 
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(147,51,234,0.2), transparent)"
                    }}
                  />

                  {/* Zoom icon with complex animation */}
                  <motion.div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        rotate: [-180, 0, 0]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <ZoomIn className="h-6 w-6 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Floating particles on hover */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`
                        }}
                        animate={{
                          y: [-10, -30, -10],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button with enhanced styling */}
          {hasMoreImages && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={loadMoreImages}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-medium text-white cursor-pointer relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                
                <span className="relative z-10">Voir plus d'images</span>
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Images className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Enhanced Lightbox Modal */}
      {selectedImageIndex !== null && (
        <motion.div
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Navigation Controls with animations */}
          <motion.div 
            className="absolute top-6 right-6 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={closeLightbox}
              className="p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
              aria-label="Fermer la galerie"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </motion.div>

          {visibleImages.length > 1 && (
            <>
              <motion.button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
                aria-label="Image précédente"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <motion.button
                onClick={() => navigateLightbox('next')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
                aria-label="Image suivante"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </>
          )}

          {/* Image Content with reveal animation */}
          <motion.div 
            className="max-w-6xl max-h-full flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={visibleImages[selectedImageIndex].src}
              alt={visibleImages[selectedImageIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              id="lightbox-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            {/* Image Counter with animation */}
            {visibleImages.length > 1 && (
              <motion.div 
                className="mt-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-white text-sm font-medium">
                  {selectedImageIndex + 1} / {visibleImages.length}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Hidden title for screen readers */}
          <h2 id="lightbox-title" className="sr-only">
            Galerie d'images - {visibleImages[selectedImageIndex].alt}
          </h2>
        </motion.div>
      )}
    </>
  );
}