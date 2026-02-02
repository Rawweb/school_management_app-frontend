import Hero from '../components/ui/Hero';
import AboutSection from '../sections/AboutSection';
import CTASection from '../sections/CTASection';
import FeaturesSection from '../sections/FeaturesSection';
import GallerySection from '../sections/GallerySection';
import TestimonialsSection from '../sections/TeamSection';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Home;
