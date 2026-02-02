import { motion } from 'framer-motion';
import { fadeUp, imageReveal, slideX } from '../motion/variants';

const CTASection = () => {
  return (
    <section className="container py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="bg-primary text-white px-8 py-16 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-10"
      >
        {/* Left content */}
        <div className="max-w-xl">
          <motion.h2 variants={imageReveal} className="text-3xl md:text-4xl font-bold mb-4">
            Ready to take control of your academic journey?
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/80 text-base md:text-lg">
            Manage tasks, courses, quizzes, and results in one simple platform
            designed to help students stay organized and focused.
          </motion.p>
        </div>

        {/* Right actions */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
          <motion.button variants={slideX('left')} className="bg-white text-primary px-6 py-3 font-semibold hover:bg-white/90 transition-colors">
            Go to School Portal
          </motion.button>

          <motion.button variants={fadeUp}
            id="about"
            className="border border-white px-6 py-3 hover:bg-white hover:text-primary transition-colors"
          >
            Join the team
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
