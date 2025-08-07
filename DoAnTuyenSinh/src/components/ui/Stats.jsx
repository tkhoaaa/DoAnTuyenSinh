import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../lib/utils';

const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isActive, end, duration, start]);

  return [count, setIsActive];
};

const StatItem = React.forwardRef(({ 
  className, 
  value, 
  label, 
  suffix = "",
  prefix = "",
  animated = true,
  ...props 
}, ref) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });
  const [count, setIsActive] = useCountUp(value, 2000);

  useEffect(() => {
    if (isInView && animated) {
      setIsActive(true);
    }
  }, [isInView, animated, setIsActive]);

  const displayValue = animated ? count : value;

  return (
    <motion.div
      ref={itemRef}
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  );
});

StatItem.displayName = "StatItem";

const StatsGrid = React.forwardRef(({ 
  className, 
  children, 
  cols = 4,
  ...props 
}, ref) => {
  const colsMap = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4"
  };

  return (
    <div
      ref={ref}
      className={cn("grid gap-8", colsMap[cols], className)}
      {...props}
    >
      {children}
    </div>
  );
});

StatsGrid.displayName = "StatsGrid";

const StatsSection = React.forwardRef(({ 
  className, 
  children, 
  background = "white",
  ...props 
}, ref) => {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    gradient: "bg-gradient-to-r from-blue-50 to-indigo-50"
  };

  return (
    <section
      ref={ref}
      className={cn("py-16 lg:py-24", backgrounds[background], className)}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export { StatItem, StatsGrid, StatsSection }; 