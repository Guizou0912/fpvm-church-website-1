import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ChurchPresentation from '@/components/ChurchPresentation';
import ProgramsThreeCards from '@/components/ProgramsThreeCards';
import ConstructionSection from '@/components/ConstructionSection';
import GalleryGrid from '@/components/GalleryGrid';
import ContactForm from '@/components/ContactForm';
import FloatingDonateButton from '@/components/FloatingDonateButton';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-inter">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main content container */}
      <div className="w-full">
        {/* Hero Section - Full width */}
        <div id="accueil">
          <HeroSection />
        </div>
        
        {/* Centered content container for other sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <main className="space-y-32 sm:space-y-40 lg:space-y-48 py-20 sm:py-28 lg:py-36">
            {/* Church Presentation */}
            <div id="presentation">
              <ChurchPresentation />
            </div>
            
            {/* Programs Section */}
            <div id="programmes">
              <ProgramsThreeCards />
            </div>
            
            {/* Construction Section */}
            <div id="construction">
              <ConstructionSection />
            </div>
            
            {/* Gallery Section */}
            <div id="galerie">
              <GalleryGrid />
            </div>
            
            {/* Contact Form */}
            <div id="contact">
              <ContactForm />
            </div>
          </main>
        </div>
        
        {/* Footer - Full width */}
        <Footer />
      </div>
      
      {/* Floating Donate Button */}
      <FloatingDonateButton />
    </div>
  );
}