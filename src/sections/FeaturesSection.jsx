import { LuListTodo } from 'react-icons/lu';
import { PiBookOpenDuotone } from 'react-icons/pi';
import { MdQuiz } from 'react-icons/md';
import { FaChartLine } from 'react-icons/fa';

import { motion } from 'framer-motion';
import {
  sectionContainer,
  fadeUp,
  cardReveal,
  slideX,
  imageReveal,
} from '../motion/variants';

import feature1 from '../assets/features-todo.jpg';
import feature2 from '../assets/features-registration.jpg';
import feature3 from '../assets/features-quiz.jpg';
import feature4 from '../assets/features-result.jpg';

const features = [
  {
    image: feature1,
    icon: <LuListTodo className="size-7 text-white" />,
    title: 'Task Management',
    description:
      'Plan and manage daily academic tasks, set priorities, and stay organized throughout the semester.',
  },
  {
    image: feature2,
    icon: <PiBookOpenDuotone className="size-7 text-white" />,
    title: 'Course Registration',
    description:
      'View available courses, register or drop courses, and manage enrollment easily from one platform.',
  },
  {
    image: feature3,
    icon: <MdQuiz className="size-7 text-white" />,
    title: 'Online Quizzes',
    description:
      'Participate in online quizzes designed to test knowledge and improve learning outcomes.',
  },
  {
    image: feature4,
    icon: <FaChartLine className="size-7 text-white" />,
    title: 'Results & Progress',
    description:
      'Track quiz results and monitor academic progress to stay informed and motivated.',
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 border-t-2 border-b-2 border-border"
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={slideX('right')}
            className="inline-block bg-primary px-4 py-2 text-white mb-4 border-l-6 border-text"
          >
            Our Features
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Powerful Features for Students
          </motion.h2>

          <motion.p variants={fadeUp} className="text-text-muted max-w-2xl">
            Everything you need to manage your academic journey in one simple
            and organized platform.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={cardReveal}
              className="group overflow-hidden border border-border hover:border-primary-hover bg-surface hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 bg-primary p-3 rounded-xl shadow-md">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.h3
                  variants={fadeUp}
                  className="mt-2 text-lg font-semibold group-hover:text-primary"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  variants={fadeUp}
                  className="mt-3 text-sm text-text-muted leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
