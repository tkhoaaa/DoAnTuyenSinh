import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({
  className,
  variant = "default",
  size = "default",
  children,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  const classes = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  const buttonContent = (
    <>
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {children}
    </>
  );

  return (
    <motion.button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button; 
