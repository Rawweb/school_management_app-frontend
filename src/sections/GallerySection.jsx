import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import {
  sectionContainer,
  fadeUp,
  imageReveal,
  cardReveal,
  slideX,
} from '../motion/variants';

import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import g6 from '../assets/g6.jpg';

const GALLERY_IMAGES = [
  {
    image: g1,
    title: 'Collaborative Learning',
    description: 'Students working together to solve problems and share ideas.',
  },
  {
    image: g2,
    title: 'Focused Individual Study',
    description: 'Personal study time to stay organized and productive.',
  },
  {
    image: g3,
    title: 'Group Discussions',
    description: 'Engaging discussions that encourage teamwork and learning.',
  },
  {
    image: g4,
    title: 'Classroom & Lab Sessions',
    description: 'Hands-on learning in structured academic environments.',
  },
  {
    image: g5,
    title: 'Online Learning',
    description: 'Accessing academic resources and activities digitally.',
  },
  {
    image: g6,
    title: 'Reviewing Academic Progress',
    description: 'Checking results and tracking academic performance.',
  },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 border-b-2 border-border">
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16"
        >
          <motion.span
            variants={slideX('right')}
            className="inline-block bg-primary px-4 py-2 text-white mb-4 border-l-6 border-text"
          >
            Gallery
          </motion.span>

          <motion.h2
            variants={imageReveal}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Learning in Action
          </motion.h2>

          <motion.p variants={fadeUp} className="text-text-muted max-w-2xl">
            A glimpse into collaborative learning, focused study, and the
            academic environments CampusHub is designed to support.
          </motion.p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionContainer}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div key={index} variants={cardReveal}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                transitionSpeed={1000}
                scale={1.03}
                className="group"
              >
                <div className="overflow-hidden border border-border bg-surface">
                  {/* Image */}
                  <motion.div
                    variants={imageReveal}
                    className="h-60 overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="p-4">
                    <motion.h3 variants={imageReveal} className="text-lg font-medium mb-1">{item.title}</motion.h3>
                    <motion.p variants={fadeUp} className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </motion.p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
