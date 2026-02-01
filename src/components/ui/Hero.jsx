import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images
import hero1 from '../../assets/hero.jpg';
import hero2 from '../../assets/hero-2.jpg';
import hero3 from '../../assets/hero-3.jpg';

import { fadeUp, sectionContainer } from '../../motion/variants';

const slides = [
  {
    image: hero1,
    title: 'A Smarter Way to Manage Student Life',
    highlight: 'All Your Academics, One Portal',
    description:
      'Manage tasks, register courses, take quizzes, and track your academic progress in one simple and organized platform.',
  },
  {
    image: hero2,
    title: 'Stay Organized. Stay Ahead.',
    highlight: 'Learn Better With Structure',
    description:
      'Plan your daily tasks, keep track of your courses, and focus on what truly matters throughout the semester.',
  },
  {
    image: hero3,
    title: 'Take Control of Your Academic Journey',
    highlight: 'Track Progress. See Results.',
    description:
      'Access quizzes, view results, and monitor your performance as you work towards academic success.',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden h-125 sm:h-150 lg:h-187.5"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        variants={sectionContainer}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="text-center px-6 max-w-3xl text-white"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={sectionContainer}
          >
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/80 text-base md:text-lg mb-8"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex justify-center items-center gap-4"
            >
              <button className="bg-primary px-6 py-3 hover:bg-primary-hover transition-colors">
                Go to School Portal
              </button>

              <button className="hidden md:flex border-2 border-primary hover:text-primary px-6 py-3 transition-colors">
                Explore Gallery
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Hero;
