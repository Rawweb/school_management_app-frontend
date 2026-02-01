import spin from '../assets/spin.png';
import hero from '../assets/hero.jpg';
import { LuListTodo } from 'react-icons/lu';
import { PiBookOpenDuotone } from 'react-icons/pi';
import { motion } from 'framer-motion';

import {
  sectionContainer,
  fadeUp,
  imageReveal,
  cardReveal,
} from '../motion/variants';

const AboutSection = () => {
  const aboutUs = [
    {
      icon: <LuListTodo className="size-6 text-white" />,
      title: 'Task & Academic Planning',
      description:
        'Organize daily academic tasks, manage priorities, and stay on track throughout the semester with a structured to-do system.',
    },
    {
      icon: <PiBookOpenDuotone className="size-6 text-white" />,
      title: 'Course Registration',
      description:
        'View available courses, register or drop courses, and manage academic enrollment seamlessly from one central platform.',
    },
  ];

  return (
    <section id="about" className="container py-24">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }} // animate every time it enters
      >
        {/* left - image */}
        <motion.div
          variants={imageReveal}
          className="relative mx-auto w-70 sm:w-120 lg:h-132.5"
        >
          {/* spinning image */}
          <img
            src={spin}
            alt="Decorative Spin"
            className="w-full h-full animate-spin [animation-duration:20s]"
          />

          {/* centered image */}
          <img
            src={hero}
            alt="Students collaborating"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[70%] rounded-full object-cover border-4 border-white"
          />
        </motion.div>

        {/* right - card content */}
        <div className="w-full">
          <motion.span
            variants={fadeUp}
            className="inline-block bg-primary px-4 py-2 text-white mb-4 border-l-6 border-text"
          >
            About Us
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold max-w-xl mb-6"
          >
            Everything students need to stay organized and in control
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-text-muted max-w-xl mb-10"
          >
            CampusHub brings your academic life into one simple dashboard. No
            clutter, no confusion, just tools that help you focus and move
            forward.
          </motion.p>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-2">
            {aboutUs.map((item, index) => (
              <motion.div
                key={index}
                variants={cardReveal}
                className="group border border-primary p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 size-10 flex items-center justify-center rounded-xl bg-primary group-hover:bg-primary-hover transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-lg font-medium mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
