import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Input = React.forwardRef(({
  className,
  type = "text",
  error,
  success,
  icon: Icon,
  ...props
}, ref) => {
  const inputClasses = clsx(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
      "border-red-500 focus-visible:ring-red-500": error,
      "border-green-500 focus-visible:ring-green-500": success && !error,
    },
    className
  );

  const containerClasses = clsx(
    "relative",
    {
      "animate-shake": error,
    }
  );

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <input
        type={type}
        className={clsx(inputClasses, {
          "pl-10": Icon,
        })}
        ref={ref}
        {...props}
      />
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-500"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {error}
        </motion.p>
      )}
      {success && !error && (
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
});

Input.displayName = "Input";

export default Input; 