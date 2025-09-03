"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter,
  ArrowRight,
  Heart,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface NewsletterFormData {
  email: string;
}

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [newsletterData, setNewsletterData] = useState<NewsletterFormData>({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const middleLayerY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Mouse parallax
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Initialize particles
  useEffect(() => {
    const newParticles: ParticleProps[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2 + 0.5
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed * 0.1) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.y) * 0.1
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 100);
    mouseY.set(y * 100);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterData.email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setNewsletterData({ email: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Events', href: '/events' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-400' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-300' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Layers */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-950"
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-blue-500/10 to-violet-600/20"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(139, 92, 246, 0.2) 100%)",
              "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.2) 100%)",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(147, 51, 234, 0.2) 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              x: useTransform(springX, [0, 100], [0, particle.size * 2]),
              y: useTransform(springY, [0, 100], [0, particle.size * 2])
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Container */}
      <motion.div
        style={{ y: middleLayerY }}
        className="relative backdrop-blur-xl bg-white/5 border-t border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
        
        <motion.div
          className="relative container mx-auto px-6 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Church Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <motion.h3 
                  className="text-2xl font-bold text-white flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Heart className="w-6 h-6 text-purple-400" />
                  Grace Chapel
                </motion.h3>
                <p className="text-gray-300 leading-relaxed">
                  A community of faith, hope, and love. Join us as we grow together in Christ and serve our community with compassion and grace.
                </p>
              </div>
              
              <motion.div
                className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-purple-300 font-medium text-sm mb-2">Our Mission</p>
                <p className="text-gray-300 text-sm">
                  "To know Christ and make Him known through worship, discipleship, and service."
                </p>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 8, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Contact Us</h4>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="w-5 h-5 text-purple-400 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-gray-300">123 Faith Street</p>
                    <p className="text-gray-300">Springfield, IL 62701</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    (555) 123-4567
                  </p>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    info@gracechapel.org
                  </p>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Clock className="w-5 h-5 text-purple-400 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-gray-300">Sunday Services:</p>
                    <p className="text-gray-300">9:00 AM & 11:00 AM</p>
                    <p className="text-gray-300 text-sm mt-1">Wednesday Prayer: 7:00 PM</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Stay Connected</h4>
              
              {/* Newsletter Signup */}
              <motion.div 
                className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-gray-300 text-sm mb-4">
                  Subscribe to our newsletter for updates and inspiration.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterData.email}
                      onChange={(e) => setNewsletterData({ email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      disabled={isSubmitting || submitStatus === 'success'}
                    />
                  </motion.div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success' || !newsletterData.email.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 disabled:opacity-50"
                  >
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : submitStatus === 'success' ? (
                        <>
                          <Heart className="w-4 h-4" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Subscribe
                        </>
                      )}
                    </motion.div>
                  </Button>
                </form>
              </motion.div>

              {/* Social Media Links */}
              <div>
                <p className="text-gray-300 text-sm mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg`}
                      whileHover={{ 
                        y: -5,
                        rotateY: 180,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-white/10"
          >
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center gap-4"
              style={{ y: foregroundY }}
            >
              <div className="text-gray-400 text-sm">
                <p>&copy; 2024 Grace Chapel. All rights reserved.</p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <motion.a 
                  href="/privacy" 
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a 
                  href="/terms" 
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Terms of Service
                </motion.a>
                <motion.a 
                  href="/accessibility" 
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Accessibility
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;