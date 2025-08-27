"use client";

import React, { useState } from 'react';
import { Phone, Send, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
    label: "Pasteur",
    number: "034 54 208 72",
    id: "pasteur"
  },
  {
    label: "Tonia",
    number: "038 05 337 00",
    id: "tonia"
  },
  {
    label: "Tonia Fifohazana",
    number: "034 04 029 58",
    id: "tonia-fifohazana"
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e as any);
    }
  };

  return (
    <section id="contact" className="w-full">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              Contactez-nous
            </h2>
            <p className="text-muted-foreground">
              N'hésitez pas à nous contacter pour toute question ou demande
            </p>
          </div>

          {/* Contact Info Grid */}
          <div role="contentinfo" aria-labelledby="contact-info-heading">
            <h3 id="contact-info-heading" className="sr-only">
              Informations de contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {contactInfo.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {contact.label}
                    </p>
                    <a
                      href={`tel:${contact.number.replace(/\s/g, '')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:underline"
                      aria-label={`Appeler ${contact.label} au ${contact.number}`}
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Envoyez-nous un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={handleKeyDown}>
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nom *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full transition-colors duration-300 focus:ring-2 focus:ring-ring ${
                    errors.name ? 'border-destructive focus:ring-destructive' : ''
                  }`}
                  placeholder="Votre nom complet"
                  required
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full transition-colors duration-300 focus:ring-2 focus:ring-ring ${
                    errors.email ? 'border-destructive focus:ring-destructive' : ''
                  }`}
                  placeholder="votre.email@exemple.com"
                  required
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Téléphone (optionnel)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full transition-colors duration-300 focus:ring-2 focus:ring-ring"
                  placeholder="034 00 000 00"
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full min-h-[120px] resize-y transition-colors duration-300 focus:ring-2 focus:ring-ring ${
                    errors.message ? 'border-destructive focus:ring-destructive' : ''
                  }`}
                  placeholder="Écrivez votre message ici..."
                  required
                  aria-describedby={errors.message ? "message-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-start">
                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full sm:w-auto min-w-[140px] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Envoi...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      Envoyé !
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                      Envoyer
                    </>
                  )}
                </Button>
              </div>

              {/* reCAPTCHA Note (visual comment) */}
              <p className="text-xs text-muted-foreground">
                {/* Note: reCAPTCHA integration can be added here for additional security */}
                * Champs obligatoires. Appuyez sur Ctrl+Entrée pour envoyer rapidement.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}