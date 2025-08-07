import React from 'react';
import { motion } from 'framer-motion';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// Slide transition variants
const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const slideTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

// Fade transition variants
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const fadeTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2,
};

// Scale transition variants
const scaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.1,
  },
};

const scaleTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Main PageTransition component
const PageTransition = ({ 
  children, 
  type = 'default', 
  direction = 1,
  className = '',
  ...props 
}) => {
  const getVariants = () => {
    switch (type) {
      case 'slide':
        return slideVariants;
      case 'fade':
        return fadeVariants;
      case 'scale':
        return scaleVariants;
      default:
        return pageVariants;
    }
  };

  const getTransition = () => {
    switch (type) {
      case 'slide':
        return slideTransition;
      case 'fade':
        return fadeTransition;
      case 'scale':
        return scaleTransition;
      default:
        return pageTransition;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={getVariants()}
      transition={getTransition()}
      custom={direction}
      className={`w-full ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Section transition component for within-page animations
export const SectionTransition = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Loading transition
export const LoadingTransition = ({ isLoading, children, fallback }) => {
  return (
    <motion.div
      initial={false}
      animate={isLoading ? "loading" : "loaded"}
      variants={{
        loading: { opacity: 0.5, scale: 0.98 },
        loaded: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? fallback : children}
    </motion.div>
  );
};

export default PageTransition; 