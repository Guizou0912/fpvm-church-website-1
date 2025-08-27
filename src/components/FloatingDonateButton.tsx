"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface FloatingDonateButtonProps {
  zIndex?: number;
  className?: string;
}

export default function FloatingDonateButton({ 
  zIndex = 50, 
  className = "" 
}: FloatingDonateButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Initial bounce animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to construction section
  const handlePrimaryClick = useCallback((e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setIsModalOpen(true);
      return;
    }

    const constructionElement = document.getElementById("construction");
    if (constructionElement) {
      e.preventDefault();
      constructionElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, []);

  // Handle long press for modal
  const handleLongPress = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAmount("");
    setCustomAmount("");
    setPaymentMethod("card");
  }, []);

  // Handle donation submission
  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const amount = selectedAmount || customAmount;
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Veuillez sélectionner ou saisir un montant valide");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Merci pour votre don de ${amount}€ !`);
      closeModal();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick amount options
  const quickAmounts = ["10", "25", "50", "100"];

  // Focus trap for modal
  useEffect(() => {
    if (isModalOpen) {
      const focusableElements = document.querySelectorAll(
        '[data-modal] button, [data-modal] input, [data-modal] [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen, closeModal]);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className={`fixed bottom-4 right-4 ${className}`}
        style={{ zIndex }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: shouldAnimate ? 1 : 0.8, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          delay: shouldAnimate ? 0 : 0.5
        }}
      >
        <motion.button
          onClick={handlePrimaryClick}
          onContextMenu={(e) => {
            e.preventDefault();
            handleLongPress();
          }}
          className="group relative flex items-center gap-2 px-3 py-3 sm:px-4 sm:py-4 
                     backdrop-blur-md bg-white/10 border border-white/20 rounded-full
                     shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                     hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 
                     focus:ring-primary/50 focus:ring-offset-2 scale-90 sm:scale-100"
          aria-label="Faire un don - Cliquez pour accéder à la section donation ou maintenez enfoncé pour ouvrir le formulaire rapide"
          aria-controls={isModalOpen ? "donation-modal" : undefined}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              animationPlayState: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                ? 'paused' 
                : 'running'
            }}
          />

          {/* Heart Icon */}
          <HandHeart 
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] relative z-10" 
            strokeWidth={2}
          />

          {/* Text */}
          <span className="text-sm sm:text-base font-medium text-primary uppercase tracking-wide relative z-10">
            FAIRE UN DON
          </span>
        </motion.button>
      </motion.div>

      {/* Donation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              data-modal
              id="donation-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="backdrop-blur-md bg-white/95 border border-white/30 shadow-2xl">
                <CardHeader className="relative pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle id="modal-title" className="text-xl font-heading text-primary flex items-center gap-2">
                      <HandHeart className="w-5 h-5 text-[#8B5CF6]" />
                      Faire un don
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeModal}
                      className="h-8 w-8 p-0 hover:bg-muted/50"
                      aria-label="Fermer le formulaire de don"
                    >
                      <CircleX className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    {/* Quick Amounts */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">
                        Montant suggéré
                      </Label>
                      <div className="grid grid-cols-4 gap-2">
                        {quickAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                            }}
                            className="text-sm"
                          >
                            {amount}€
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount" className="text-sm font-medium text-foreground">
                        Ou montant personnalisé
                      </Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="0"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(""); 
                        }}
                        className="text-right"
                        min="1"
                        step="1"
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">
                        Mode de paiement
                      </Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="text-sm">Carte bancaire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="text-sm">PayPal</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                      disabled={isSubmitting || (!selectedAmount && !customAmount)}
                    >
                      {isSubmitting ? "Traitement..." : `Donner ${selectedAmount || customAmount || '0'}€`}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Vos données sont sécurisées et ne seront pas partagées.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}