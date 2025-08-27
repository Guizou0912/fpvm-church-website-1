import HeroSection from '@/components/HeroSection';
import ChurchPresentation from '@/components/ChurchPresentation';
import ProgramsThreeCards from '@/components/ProgramsThreeCards';
import ConstructionSection from '@/components/ConstructionSection';
import GalleryGrid from '@/components/GalleryGrid';
import ContactForm from '@/components/ContactForm';
import FloatingDonateButton from '@/components/FloatingDonateButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-inter">
      {/* Main content container */}
      <div className="w-full">
        {/* Hero Section - Full width */}
        <HeroSection />
        
        {/* Centered content container for other sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <main className="space-y-16 sm:space-y-24 lg:space-y-32 py-16 sm:py-24 lg:py-32">
            {/* Church Presentation */}
            <ChurchPresentation />
            
            {/* Programs Section */}
            <ProgramsThreeCards />
            
            {/* Construction Section */}
            <ConstructionSection />
            
            {/* Gallery Section */}
            <GalleryGrid />
            
            {/* Contact Form */}
            <ContactForm />
          </main>
        </div>
      </div>
      
      {/* Floating Donate Button */}
      <FloatingDonateButton />
    </div>
  );
}