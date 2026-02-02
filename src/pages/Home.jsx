import Hero from '../components/ui/Hero';
import ScrollToTop from '../components/ui/ScrollToTop';
import AboutSection from '../sections/AboutSection';
import CTASection from '../sections/CTASection';
import FeaturesSection from '../sections/FeaturesSection';
import GallerySection from '../sections/GallerySection';
import TestimonialsSection from '../sections/TeamSection';

const Home = () => {
  return (
    <main className="pt-24">
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <ScrollToTop />
    </main>
  );
};

export default Home;
