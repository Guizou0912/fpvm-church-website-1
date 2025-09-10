import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ChurchPresentation from '@/components/ChurchPresentation';
import ProgramsThreeCards from '@/components/ProgramsThreeCards';
import ConstructionSection from '@/components/ConstructionSection';
import GalleryGrid from '@/components/GalleryGrid';
import ContactForm from '@/components/ContactForm';
import { FloatingDonateButton } from '@/components/FloatingDonateButton';
import Footer from '@/components/Footer';
import VerseSection from '@/components/VerseSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 font-inter overflow-x-hidden">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main content container */}
      <div className="w-full relative">
        {/* Hero Section - Full viewport */}
        <div id="accueil" className="relative">
          <HeroSection />
        </div>

        {/* Verse + Intro block directly under hero */}
        <div className="relative z-10">
          <VerseSection />
        </div>
        
        {/* Parallax Container for all sections */}
        <div className="relative">
          {/* Background layers for parallax */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-indigo-900/50" />
            <div className="stars opacity-20"></div>
            <div className="twinkling opacity-30"></div>
          </div>
          
          {/* Church Presentation with parallax */}
          <div id="presentation" className="relative z-10">
            <ChurchPresentation />
          </div>
          
          {/* Programs Section with parallax */}
          <div id="programmes" className="relative z-10">
            <ProgramsThreeCards />
          </div>
          
          {/* Construction Section with parallax */}
          <div id="construction" className="relative z-10">
            <ConstructionSection />
          </div>
          
          {/* Gallery Section with parallax */}
          <div id="galerie" className="relative z-10">
            <GalleryGrid />
          </div>
          
          {/* Contact Form with parallax */}
          <div id="contact" className="relative z-10">
            <ContactForm />
          </div>
        </div>
        
        {/* Footer - Full width */}
        <Footer />
      </div>
      
      {/* Floating Donate Button */}
      <FloatingDonateButton />
    </div>
  );
}