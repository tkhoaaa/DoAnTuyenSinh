import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Section = React.forwardRef(({ 
  className, 
  children, 
  variant = "default",
  animated = true,
  ...props 
}, ref) => {
  const baseClasses = "relative";
  
  const variants = {
    default: "py-16 lg:py-24",
    compact: "py-8 lg:py-12",
    hero: "py-20 lg:py-32",
    none: ""
  };

  const Component = animated ? motion.section : 'section';
  const motionProps = animated ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: sectionVariants
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Section.displayName = "Section";

const Container = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
    {...props}
  />
));

Container.displayName = "Container";

export { Section, Container }; 