"use client";

import { useState, useEffect, useCallback } from "react";
import { HandHeart, CircleX, ArrowRight } from "lucide-react";
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
      
      toast.success(`Merci pour votre don de ${amount}€ !`, {
        description: 'Votre générosité aide notre communauté à grandir.'
      });
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
      <div
        className={`fixed bottom-6 right-6 ${className}`}
        style={{ zIndex }}
      >
        <button
          onClick={handlePrimaryClick}
          onContextMenu={(e) => {
            e.preventDefault();
            handleLongPress();
          }}
          className="group relative flex items-center gap-3 px-6 py-4 
                     bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600
                     text-white font-semibold rounded-2xl
                     shadow-xl hover:shadow-2xl hover:shadow-purple-500/25
                     transition-all duration-300 ease-in-out
                     hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 
                     focus:ring-purple-500/50 focus:ring-offset-2 
                     backdrop-blur-sm border border-white/10"
          aria-label="Faire un don - Cliquez pour accéder à la section donation ou maintenez enfoncé pour ouvrir le formulaire rapide"
          aria-controls={isModalOpen ? "donation-modal" : undefined}
        >
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 animate-ping opacity-20" />

          {/* Heart Icon */}
          <HandHeart 
            className="w-5 h-5 text-white relative z-10 group-hover:animate-pulse" 
            strokeWidth={2}
          />

          {/* Text */}
          <span className="text-sm font-bold text-white uppercase tracking-wider relative z-10">
            Faire un Don
          </span>

          {/* Arrow */}
          <ArrowRight className="w-4 h-4 text-white relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            data-modal
            id="donation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-md bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8 animate-fadeInUp"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
                  <HandHeart className="w-6 h-6 text-purple-600" />
                </div>
                <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                  Faire un Don
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                aria-label="Fermer le formulaire de don"
              >
                <CircleX className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleDonationSubmit} className="space-y-6">
              {/* Quick Amounts */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Montant suggéré
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                        selectedAmount === amount
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amount}€
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <label htmlFor="custom-amount" className="block text-sm font-semibold text-gray-700">
                  Ou montant personnalisé
                </label>
                <input
                  id="custom-amount"
                  type="number"
                  placeholder="Montant en €"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(""); 
                  }}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                  min="1"
                  step="1"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Mode de paiement
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "card", label: "Carte bancaire" },
                    { value: "paypal", label: "PayPal" }
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentMethod(method.value)}
                      className={`p-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                        paymentMethod === method.value
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting || (!selectedAmount && !customAmount)}
              >
                {isSubmitting ? "Traitement en cours..." : `Donner ${selectedAmount || customAmount || '0'}€`}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Vos données sont sécurisées et ne seront pas partagées.<br />
                Merci pour votre générosité envers notre communauté.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}