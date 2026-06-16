import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};

export function AnimatedPage({ children, tabKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const itemVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const slideVariants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const fadeUpVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};
