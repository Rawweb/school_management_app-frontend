// Container animation (stagger children)
export const sectionContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Text animation (slide up + fade)
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Text animation (slide left 0r right)
export const slideX = direction => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -40 : 40,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
});

// Image animation (scale + fade)
export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.2,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Card animation (slide + slight scale)
export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
