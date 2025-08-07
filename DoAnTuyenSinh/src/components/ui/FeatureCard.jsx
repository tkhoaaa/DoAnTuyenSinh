import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const cardVariants = {
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

const FeatureCard = React.forwardRef(({ 
  className, 
  children, 
  variant = "default",
  hover = true,
  animated = true,
  icon,
  title,
  description,
  ...props 
}, ref) => {
  const baseClasses = "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300";
  
  const variants = {
    default: "hover:shadow-lg hover:border-gray-300",
    elevated: "shadow-md hover:shadow-xl",
    minimal: "border-0 bg-gray-50 hover:bg-white hover:shadow-md",
    gradient: "bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50"
  };

  const hoverClasses = hover ? "hover:-translate-y-1" : "";

  const Component = animated ? motion.div : 'div';
  const motionProps = animated ? {
    variants: cardVariants,
    whileHover: hover ? { y: -4 } : undefined
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(baseClasses, variants[variant], hoverClasses, className)}
      {...motionProps}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>
      )}

      {/* Title */}
      {title && (
        <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      )}

      {/* Custom Content */}
      {children}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Component>
  );
});

FeatureCard.displayName = "FeatureCard";

const FeatureGrid = React.forwardRef(({ 
  className, 
  children, 
  cols = 3,
  ...props 
}, ref) => {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <motion.div
      ref={ref}
      className={cn("grid gap-6", colsMap[cols], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

FeatureGrid.displayName = "FeatureGrid";

export { FeatureCard, FeatureGrid };