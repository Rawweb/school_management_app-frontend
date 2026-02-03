import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { team } from '../constants/teamData';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeUp,
  slideX,
  imageReveal,
  sectionContainer,
} from '../motion/variants';
import { Link } from 'react-router-dom';

const TeamSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(prev => (prev + 1) % team.length);
  };

  const prev = () => {
    setCurrent(prev => (prev === 0 ? team.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % team.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const person = team[current];

  return (
    <section id="team" className="py-24 border-b-2 border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start container">
        {/* LEFT CONTENT */}
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={slideX('right')}
            className="inline-block bg-primary px-4 py-2 text-white mb-4 border-l-6 border-text"
          >
            Team
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
          >
            Meet the Team Behind <span className="text-primary">CampusHub</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-text-muted mb-8">
            CampusHub was developed by a team of Computer Science students,
            combining design, development, analysis, and testing to deliver a
            complete academic management platform.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-text-muted bg-surface px-4 py-2 border border-border mb-4"
          >
            Use the arrows to learn about each team member and their role in the
            project.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-text-muted inline-flex items-center gap-1 mb-3"
          >
            Wanna join the team{' '}
            <span className="text-primary font-semibold text-2xl">?</span>{' '}
            contact us
          </motion.p>
          <Link to="/dashboard">
            <motion.div
              variants={fadeUp}
              className="border w-fit px-4 py-2 rounded-full border-primary hover:bg-primary-hover hover:text-white transition-colors cursor-pointer"
            >
              Join the team
            </motion.div>
          </Link>
        </motion.div>

        {/* RIGHT SLIDER */}
        <div className="relative">
          {/* Profile Image + Controls */}
          <div className="relative overflow-hidden w-full max-w-sm mx-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={person.image}
                src={person.image}
                alt={person.name}
                className="w-full h-95 object-cover"
                variants={imageReveal}
                initial="hidden"
                animate="show"
                exit="hidden"
              />
            </AnimatePresence>

            {/* Previous button */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-bg/80 backdrop-blur border border-border p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <HiChevronLeft size={20} />
            </button>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-bg/80 backdrop-blur border border-border p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <HiChevronRight size={20} />
            </button>
          </div>

          {/* TeamCard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={person.name}
              variants={slideX('right')}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="bg-surface border-l-10 border-primary shadow-lg rounded-xl p-6 max-w-md mx-auto -mt-20 relative z-10"
            >
              <p className="text-text-muted mb-4 leading-relaxed">
                “{person.text}”
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{person.name}</h4>
                  <span className="text-xs text-text-muted">{person.role}</span>
                </div>

                <div className="flex gap-1 text-primary">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
