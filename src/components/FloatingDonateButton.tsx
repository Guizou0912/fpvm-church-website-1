"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

// Particle component for floating effects
const Particle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 40 - 20],
        y: [0, -Math.random() * 50 - 20],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2 + 1,
        ease: "easeOut"
      }}
    />
  );
};

export const FloatingDonateButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  // Track mouse position for magnetic effect (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate magnetic offset
  const calculateMagneticOffset = (buttonRef: HTMLElement | null) => {
    if (!buttonRef || !isHovered || typeof window === 'undefined') return { x: 0, y: 0 };

    const rect = buttonRef.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - buttonCenterX, 2) + 
      Math.pow(mousePosition.y - buttonCenterY, 2)
    );

    if (distance < 100) {
      const strength = Math.max(0, 1 - distance / 100);
      return {
        x: (mousePosition.x - buttonCenterX) * strength * 0.1,
        y: (mousePosition.y - buttonCenterY) * strength * 0.1,
      };
    }
    
    return { x: 0, y: 0 };
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    // Handle donation action here
    console.log('Donation button clicked');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      {/* Floating particles container */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Particle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Main button */}
      <motion.button
        className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-full"
        style={{
          filter: 'drop-shadow(0 8px 32px rgba(147, 51, 234, 0.3))',
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -8, 0],
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Faire un don à notre église"
      >
        {/* Gradient border animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-75"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            padding: '2px',
            background: 'conic-gradient(from 0deg, #a855f7, #3b82f6, #a855f7)',
          }}
        />

        {/* Glassmorphism background */}
        <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-full p-4 sm:p-5 border border-white/20 dark:border-white/10">
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Button content */}
          <div className="relative flex items-center gap-3 text-white dark:text-white">
            {/* Heart icon with animation */}
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Heart 
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current" 
                color="currentColor"
              />
            </motion.div>

            {/* Text with stagger animation */}
            <motion.span
              className="font-semibold text-sm sm:text-base whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Faire un Don
            </motion.span>
          </div>

          {/* Click ripple effect */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                className="absolute inset-0 rounded-full bg-white/30"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* Hover particles */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full"
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: (Math.random() - 0.5) * 60,
                      y: (Math.random() - 0.5) * 60,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Additional glow layers */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Floating accent elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`accent-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded-full blur-sm"
            animate={{
              x: [
                -20 + (i * 10), 
                20 + (i * 10), 
                -20 + (i * 10)
              ],
              y: [
                -30 + (i * 15), 
                -50 + (i * 15), 
                -30 + (i * 15)
              ],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            style={{
              left: '50%',
              top: '50%',
            }}
          />
        ))}
      </div>
    </div>
  );
};