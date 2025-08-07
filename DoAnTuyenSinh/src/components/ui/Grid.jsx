import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Grid = React.forwardRef(({ 
  className, 
  children, 
  cols = 1,
  gap = 6,
  animated = true,
  ...props 
}, ref) => {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };

  const gapMap = {
    2: "gap-2",
    4: "gap-4", 
    6: "gap-6",
    8: "gap-8",
    12: "gap-12"
  };

  const Component = animated ? motion.div : 'div';
  const motionProps = animated ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-50px" },
    variants: gridVariants
  } : {};

  return (
    <Component
      ref={ref}
      className={cn("grid", colsMap[cols], gapMap[gap], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Grid.displayName = "Grid";

const GridItem = React.forwardRef(({ 
  className, 
  children, 
  animated = true,
  ...props 
}, ref) => {
  const Component = animated ? motion.div : 'div';
  const motionProps = animated ? {
    variants: itemVariants
  } : {};

  return (
    <Component
      ref={ref}
      className={cn("", className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

GridItem.displayName = "GridItem";

export { Grid, GridItem };