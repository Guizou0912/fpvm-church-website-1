"use client";

import React, { useState, useRef } from 'react';
import { Phone, Send, Loader2, CheckCircle, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  {
    label: "Pasteur Principal",
    number: "034 54 208 72",
    id: "pasteur",
    icon: Phone
  },
  {
    label: "Tonia",
    number: "038 05 337 00", 
    id: "tonia",
    icon: Phone
  },
  {
    label: "Tonia Fifohazana",
    number: "034 04 029 58",
    id: "tonia-fifohazana",
    icon: Phone
  }
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0px", "250px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const formY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast.success('Message envoyé avec succès!', {
        description: 'Nous vous répondrons dans les plus brefs délais.'
      });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      toast.error('Erreur lors de l\'envoi', {
        description: 'Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 min-h-screen overflow-hidden"
    >
      {/* Parallax Background with advanced gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/15 to-blue-900/20 rounded-3xl"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Geometric Elements */}
      <motion.div 
        className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "-300px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "200px"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 180])
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-56 h-56 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["0px", "250px"]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]),
          rotate: useTransform(scrollYProgress, [0, 1], [180, 0])
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
            className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(99,102,241,0.1)",
                "0 0 0 20px rgba(99,102,241,0.05)",
                "0 0 0 0 rgba(99,102,241,0)"
              ]
            }}
            style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
          >
            <MessageSquare className="h-8 w-8 text-indigo-400" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Restons en
            <motion.span 
              className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ 
                backgroundImage: "linear-gradient(45deg, #818cf8, #a78bfa, #60a5fa, #818cf8)",
                backgroundSize: "300% 300%"
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Contact
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            N'hésitez pas à nous contacter pour toute question ou demande. Nous sommes là pour vous
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Contact Info with advanced animations */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold text-white mb-8"
                whileHover={{ 
                  textShadow: "0 0 20px rgba(99,102,241,0.5)"
                }}
              >
                Contactez-nous directement
              </motion.h3>
              
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <motion.div
                    key={contact.id}
                    className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 cursor-pointer"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 10,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.3)"
                    }}
                  >
                    <motion.div 
                      className="flex-shrink-0 p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-xl"
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="h-6 w-6 text-indigo-400" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.p 
                        className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {contact.label}
                      </motion.p>
                      <motion.a
                        href={`tel:${contact.number.replace(/\s/g, '')}`}
                        className="text-white/70 hover:text-indigo-300 transition-colors duration-300 font-medium"
                        aria-label={`Appeler ${contact.label} au ${contact.number}`}
                        whileHover={{ x: 5, color: "rgba(165,180,252,1)" }}
                      >
                        {contact.number}
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Additional info with reveal animation */}
            <motion.div 
              className="p-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-md rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                backgroundColor: "rgba(99,102,241,0.1)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-2 bg-indigo-500/20 backdrop-blur-sm border border-white/10 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Mail className="h-5 w-5 text-indigo-400" />
                </motion.div>
                <div>
                  <motion.h4 
                    className="font-semibold text-white mb-2"
                    whileHover={{ textShadow: "0 0 10px rgba(99,102,241,0.3)" }}
                  >
                    Heures d'ouverture
                  </motion.h4>
                  <div className="space-y-1 text-sm text-white/70">
                    <motion.p whileHover={{ x: 5 }}>Lundi - Vendredi: 9h00 - 17h00</motion.p>
                    <motion.p whileHover={{ x: 5 }}>Dimanche: Service à 10h30</motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Contact Form with advanced styling */}
          <motion.div
            style={{ y: formY }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10"
              whileHover={{ 
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  textShadow: "0 0 20px rgba(99,102,241,0.5)"
                }}
              >
                Envoyez-nous un message
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-white/90">
                    Nom complet *
                  </label>
                  <motion.input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-white/40 text-white ${
                      errors.name ? 'border-red-400 focus:ring-red-500' : 'border-white/30 focus:bg-white/15'
                    }`}
                    placeholder="Votre nom complet"
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.name && (
                    <motion.p 
                      className="text-sm text-red-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-white/90">
                    Email *
                  </label>
                  <motion.input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-white/40 text-white ${
                      errors.email ? 'border-red-400 focus:ring-red-500' : 'border-white/30 focus:bg-white/15'
                    }`}
                    placeholder="votre.email@exemple.com"
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.email && (
                    <motion.p 
                      className="text-sm text-red-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Phone Field */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="phone" className="block text-sm font-semibold text-white/90">
                    Téléphone (optionnel)
                  </label>
                  <motion.input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white/15 placeholder-white/40 text-white"
                    placeholder="034 00 000 00"
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90">
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-white/40 min-h-[120px] resize-y text-white ${
                      errors.message ? 'border-red-400 focus:ring-red-500' : 'border-white/30 focus:bg-white/15'
                    }`}
                    placeholder="Écrivez votre message ici..."
                    required
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.message && (
                    <motion.p 
                      className="text-sm text-red-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button with advanced effects */}
                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl border-0 cursor-pointer relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting && !isSuccess ? { 
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(99,102,241,0.25), 0 0 0 1px rgba(255,255,255,0.1)"
                    } : {}}
                    whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="relative z-10"
                        >
                          <Loader2 className="h-5 w-5" />
                        </motion.div>
                        <span className="relative z-10">Envoi en cours...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, type: "spring" }}
                          className="relative z-10"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </motion.div>
                        <span className="relative z-10">Message envoyé !</span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          className="relative z-10"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          whileHover={{ x: 10 }}
                        >
                          <Send className="h-5 w-5" />
                        </motion.div>
                        <span className="relative z-10">Envoyer le message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                <motion.p 
                  className="text-sm text-white/60 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  * Champs obligatoires. Vos données sont sécurisées et ne seront pas partagées.
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}