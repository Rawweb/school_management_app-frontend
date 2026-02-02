import logo from '../../assets/logo.png';
import { motion } from 'framer-motion';
import { fadeUp, imageReveal, slideX } from '../../motion/variants';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
];

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="container pt-20 text-center"
      >
        {/* Logo */}
        <motion.div
          variants={imageReveal}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <img src={logo} alt="CampusHub Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-primary">CampusHub</span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-text-muted max-w-md mx-auto mb-10"
        >
          A modern academic management platform built by Computer Science
          students to simplify learning and organization.
        </motion.p>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <motion.input
            variants={slideX('left')}
            type="email"
            placeholder="Your email"
            className="
              w-full sm:w-72
              px-4 py-3
              rounded-full
              bg-bg
              border border-border
              text-text
              placeholder:text-text-muted
              focus:outline-none
              focus:ring-2 focus:ring-primary/40
            "
          />
          <motion.button
            variants={slideX('right')}
            className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            Subscribe
          </motion.button>
        </div>

        {/* Links */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          {footerLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mb-6">
          <motion.a
            variants={slideX('left')}
            href="https://github.com/Rawweb"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <FaGithub size={18} />
          </motion.a>

          <motion.a
            variants={slideX('right')}
            href="https://www.linkedin.com/in/kingsleychibuikem/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <FaLinkedin size={18} />
          </motion.a>
        </div>

        {/* Copyright */}
        <hr className='border-border mb-10' />
        <p className="text-sm text-text-muted pb-10">
          © {new Date().getFullYear()} CampusHub. Built by Computer Science
          students.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
