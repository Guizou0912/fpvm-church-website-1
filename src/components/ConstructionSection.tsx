"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Blocks, Dam, ChartGantt, Workflow } from "lucide-react";
import { toast } from "sonner";

interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const DONATION_AMOUNTS = [
  { value: 50000, label: "50 000 Ar" },
  { value: 100000, label: "100 000 Ar" },
  { value: 500000, label: "500 000 Ar" },
  { value: 1000000, label: "1 000 000 Ar" }
];

const CONSTRUCTION_NEEDS = [
  { icon: Dam, title: "Fondations & Structure", status: "À venir", progress: 0 },
  { icon: Blocks, title: "Matériaux de Construction", status: "À venir", progress: 0 },
  { icon: ChartGantt, title: "Main-d'œuvre Spécialisée", status: "À venir", progress: 0 },
  { icon: Workflow, title: "Finitions & Équipements", status: "À venir", progress: 0 }
];

export default function ConstructionSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPastorImage, setShowPastorImage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("mobile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DonationFormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<DonationFormData>>({});

  const modalRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<DonationFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^(\+261|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getDonationAmount = (): number => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleDonateClick = () => {
    const amount = getDonationAmount();
    if (amount <= 0) {
      toast.error("Veuillez sélectionner un montant valide");
      return;
    }
    setShowDonationModal(true);
  };

  const handleSubmitDonation = async () => {
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Votre don a été enregistré avec succès ! Vous recevrez les instructions de paiement par email.");
      setShowDonationModal(false);
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedAmount(null);
      setCustomAmount("");
      setErrors({});
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && showDonationModal) {
      setShowDonationModal(false);
    }
  };

  return (
    <section 
      id="construction"
      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 sm:p-8 lg:p-12"
      onKeyDown={handleKeyDown}
    >
      {/* En-tête */}
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
          Ezaka Fananganana – Projet de Construction
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Le terrain a été acquis et les plans finalisés. Avec un budget total de 2 milliards d'Ariary, 
          les travaux débuteront en juin 2025 pour accueillir plus de 500 fidèles.
        </p>
      </div>

      {/* Barre de progression */}
      <div className="mb-8 lg:mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progression du financement</span>
          <span className="text-sm font-bold text-primary">0%</span>
        </div>
        <div 
          className="w-full bg-muted rounded-full h-3"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression du financement à 0%"
        >
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: "0%" }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          0 Ariary collecté sur 2 milliards d'Ariary - Nous commençons aujourd'hui !
        </p>
      </div>

      {/* Détails des besoins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 lg:mb-12">
        {CONSTRUCTION_NEEDS.map((need, index) => {
          const IconComponent = need.icon;
          return (
            <Card key={index} className="p-4 backdrop-blur-sm bg-white/5 border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <Badge 
                  variant={need.status === "En cours" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {need.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm mb-2">{need.title}</h3>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-chart-1 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${need.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{need.progress}% complété</p>
            </Card>
          );
        })}
      </div>

      {/* Options de donation */}
      <div className="mb-8">
        <h3 className="text-xl font-heading font-semibold mb-6 text-center">
          Participez à ce projet de foi
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {DONATION_AMOUNTS.map((amount) => (
            <Button
              key={amount.value}
              variant={selectedAmount === amount.value ? "default" : "outline"}
              className="h-16 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() => handleAmountSelect(amount.value)}
              aria-pressed={selectedAmount === amount.value}
            >
              {amount.label}
            </Button>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <Label htmlFor="custom-amount" className="text-sm font-medium mb-2 block">
            Autre montant (Ariary)
          </Label>
          <Input
            id="custom-amount"
            type="number"
            placeholder="Saisissez votre montant"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="text-center"
            min="1000"
          />
        </div>
      </div>

      {/* Bouton principal de donation */}
      <div className="text-center mb-12">
        <Button 
          size="lg"
          onClick={handleDonateClick}
          disabled={getDonationAmount() <= 0}
          className="px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out hover:scale-105"
        >
          Donner maintenant
        </Button>
      </div>

      {/* Verset & Vision */}
      <div className="text-center mb-12 space-y-6">
        <blockquote className="italic text-lg text-muted-foreground">
          "Si l'Éternel ne bâtit la maison, ceux qui la bâtissent travaillent en vain."
          <footer className="text-sm mt-2 font-medium">— Psaume 127:1</footer>
        </blockquote>
        
        <div className="flex justify-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">&gt;500</div>
            <div className="text-sm text-muted-foreground">Places assises</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">800m²</div>
            <div className="text-sm text-muted-foreground">Surface totale</div>
          </div>
        </div>
      </div>

      {/* Témoignage du pasteur */}
      <Card className="p-6 backdrop-blur-sm bg-white/5 border-white/20 mb-8">
        <blockquote className="text-lg mb-4">
          "Ce temple sera un phare de l'espoir pour notre communauté. Chaque pierre posée 
          est un acte de foi en l'avenir de notre église et en la grâce de Dieu."
        </blockquote>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPastorImage(true)}
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            aria-label="Voir la photo du pasteur"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
              alt="Photo du Pasteur Jean-Claude"
              className="w-12 h-12 rounded-full object-cover"
            />
          </button>
          <div>
            <div className="font-semibold">Pasteur Jean-Claude</div>
            <div className="text-sm text-muted-foreground">Dirigeant de la communauté</div>
          </div>
        </div>
      </Card>

      {/* Méthodes de paiement */}
      <div className="text-center">
        <h4 className="font-semibold mb-4">Méthodes de contribution</h4>
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-primary">MM</span>
            </div>
            <span className="text-sm">Mobile Money</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-primary">VB</span>
            </div>
            <span className="text-sm">Virement Bancaire</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Collectes "Fahafoizana" tous les dimanches après le culte
        </p>
      </div>

      {/* Modal de donation */}
      <Dialog open={showDonationModal} onOpenChange={setShowDonationModal}>
        <DialogContent 
          className="sm:max-w-md backdrop-blur-lg bg-white/95 border-white/20"
          ref={modalRef}
          aria-modal="true"
        >
          <DialogHeader>
            <DialogTitle>Finaliser votre don</DialogTitle>
            <DialogDescription>
              Montant: {getDonationAmount().toLocaleString()} Ariary
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Méthode de paiement */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Méthode de paiement
              </Label>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                  <Label
                    htmlFor="mobile"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">MM</span>
                    </div>
                    Mobile Money
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                  <Label
                    htmlFor="bank"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">VB</span>
                    </div>
                    Virement
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Formulaire */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="donor-name">Nom complet *</Label>
                <Input
                  id="donor-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Votre nom complet"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="donor-email">Email *</Label>
                <Input
                  id="donor-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="donor-phone">Téléphone *</Label>
                <Input
                  id="donor-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+261 XX XX XXX XX"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="donor-message">Message (optionnel)</Label>
                <Textarea
                  id="donor-message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Un message d'encouragement..."
                  rows={3}
                />
              </div>
            </div>

            <Button 
              onClick={handleSubmitDonation}
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Traitement en cours..." : "Confirmer le don"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal photo pasteur */}
      <Dialog open={showPastorImage} onOpenChange={setShowPastorImage}>
        <DialogContent className="sm:max-w-lg backdrop-blur-lg bg-white/95 border-white/20">
          <DialogHeader>
            <DialogTitle>Pasteur Jean-Claude</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Photo du Pasteur Jean-Claude"
              className="w-80 h-80 rounded-lg object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}