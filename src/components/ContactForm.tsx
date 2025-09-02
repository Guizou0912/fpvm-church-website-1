"use client";

import React, { useState } from 'react';
import { Phone, Send, Loader2, CheckCircle, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

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
    <section className="relative py-24 sm:py-32 lg:py-40">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-purple-50/30 to-blue-50/40 rounded-3xl" />
      
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6 animate-fadeInUp">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp animate-delay-100">
            Restons en
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
            N'hésitez pas à nous contacter pour toute question ou demande. Nous sommes là pour vous
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Contact Info */}
          <div className="space-y-8 animate-fadeInLeft">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Contactez-nous directement
              </h3>
              
              {contactInfo.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <div
                    key={contact.id}
                    className="group flex items-center gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900 mb-1">
                        {contact.label}
                      </p>
                      <a
                        href={`tel:${contact.number.replace(/\s/g, '')}`}
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
                        aria-label={`Appeler ${contact.label} au ${contact.number}`}
                      >
                        {contact.number}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional info */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Heures d'ouverture</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Lundi - Vendredi: 9h00 - 17h00</p>
                    <p>Dimanche: Service à 10h30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="animate-fadeInRight">
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 sm:p-10 hover:bg-white/70 transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Envoyez-nous un message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/50 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:bg-white'
                    }`}
                    placeholder="Votre nom complet"
                    required
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/50 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:bg-white'
                    }`}
                    placeholder="votre.email@exemple.com"
                    required
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                    Téléphone (optionnel)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white placeholder-gray-400"
                    placeholder="034 00 000 00"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/50 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 min-h-[120px] resize-y ${
                      errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:bg-white'
                    }`}
                    placeholder="Écrivez votre message ici..."
                    required
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  * Champs obligatoires. Vos données sont sécurisées et ne seront pas partagées.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}