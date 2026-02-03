import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaPenNib, FaChartLine } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

const floatingIcons = [FaBook, FaGraduationCap, FaPenNib, FaChartLine];

const FloatingIcon = ({ Icon, top, left, delay, size }) => {
  return (
    <motion.div
      className="absolute text-primary/50 pointer-events-none"
      style={{ top, left }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [20, -20, 20],
        scale: [0.95, 1.05, 0.95],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg flex items-center justify-center px-4 text-text">
      {/* ===== Floating background icons ===== */}
      <FloatingIcon Icon={FaBook} top="15%" left="10%" delay={0} size={50} />

      <FloatingIcon
        Icon={FaGraduationCap}
        top="25%"
        left="75%"
        delay={2}
        size={62}
      />

      <FloatingIcon Icon={FaPenNib} top="65%" left="20%" delay={4} size={46} />

      <FloatingIcon
        Icon={FaChartLine}
        top="70%"
        left="80%"
        delay={6}
        size={60}
      />

      {/* ===== Content (Login Card) ===== */}
      <div className="relative z-10 w-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
