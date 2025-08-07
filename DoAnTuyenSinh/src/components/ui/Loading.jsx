import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// Spinner component
const Spinner = ({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'border-primary-600 border-t-transparent',
    secondary: 'border-secondary-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-600 border-t-transparent',
  };

  return (
    <div
      className={clsx(
        'border-2 rounded-full animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
};

// Dots loading animation
const Dots = ({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    white: 'bg-white',
    gray: 'bg-gray-600',
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  return (
    <div className={clsx('flex space-x-1', className)} {...props}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={clsx(
            'rounded-full',
            sizeClasses[size],
            colorClasses[color]
          )}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
};

// Pulse loading animation
const Pulse = ({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    white: 'bg-white',
    gray: 'bg-gray-600',
  };

  return (
    <div className={clsx('relative', sizeClasses[size], className)} {...props}>
      <div
        className={clsx(
          'absolute inset-0 rounded-full animate-ping',
          colorClasses[color],
          'opacity-75'
        )}
      />
      <div
        className={clsx(
          'relative rounded-full w-full h-full',
          colorClasses[color]
        )}
      />
    </div>
  );
};

// Skeleton loading component
const Skeleton = ({ 
  className = '',
  animate = true,
  ...props 
}) => {
  const baseClasses = clsx(
    'bg-gray-200 rounded',
    {
      'animate-pulse': animate,
    },
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        {...props}
      />
    );
  }

  return <div className={baseClasses} {...props} />;
};

// Card skeleton
const SkeletonCard = ({ className = '', ...props }) => (
  <div className={clsx('p-6 bg-white rounded-lg border border-gray-200', className)} {...props}>
    <div className="animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
);

// Table skeleton
const SkeletonTable = ({ rows = 5, cols = 4, className = '', ...props }) => (
  <div className={clsx('w-full', className)} {...props}>
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex space-x-4 mb-4 pb-2 border-b border-gray-200">
        {Array.from({ length: cols }).map((_, index) => (
          <Skeleton key={index} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 mb-3">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Text skeleton
const SkeletonText = ({ 
  lines = 3, 
  className = '',
  ...props 
}) => (
  <div className={clsx('space-y-2', className)} {...props}>
    <div className="animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton 
          key={index} 
          className={clsx(
            'h-4',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )} 
        />
      ))}
    </div>
  </div>
);

// Full page loading overlay
const LoadingOverlay = ({ 
  isLoading, 
  children, 
  spinner = 'spinner',
  size = 'lg',
  color = 'primary',
  message = 'Đang tải...',
  className = '',
  ...props 
}) => {
  if (!isLoading) return children;

  const renderSpinner = () => {
    switch (spinner) {
      case 'dots':
        return <Dots size={size} color={color} />;
      case 'pulse':
        return <Pulse size={size} color={color} />;
      default:
        return <Spinner size={size} color={color} />;
    }
  };

  return (
    <div className="relative">
      {children}
      <motion.div
        className={clsx(
          'absolute inset-0 bg-white/80 backdrop-blur-sm',
          'flex flex-col items-center justify-center',
          'z-50',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      >
        {renderSpinner()}
        {message && (
          <p className="mt-4 text-sm text-gray-600 font-medium">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

// Main Loading component
const Loading = ({ 
  type = 'spinner',
  size = 'md',
  color = 'primary',
  className = '',
  ...props 
}) => {
  switch (type) {
    case 'dots':
      return <Dots size={size} color={color} className={className} {...props} />;
    case 'pulse':
      return <Pulse size={size} color={color} className={className} {...props} />;
    case 'skeleton':
      return <Skeleton className={className} {...props} />;
    default:
      return <Spinner size={size} color={color} className={className} {...props} />;
  }
};

// Export all components
Loading.Spinner = Spinner;
Loading.Dots = Dots;
Loading.Pulse = Pulse;
Loading.Skeleton = Skeleton;
Loading.SkeletonCard = SkeletonCard;
Loading.SkeletonTable = SkeletonTable;
Loading.SkeletonText = SkeletonText;
Loading.Overlay = LoadingOverlay;

export { Loading };
export default Loading;
export { 
  Spinner, 
  Dots, 
  Pulse, 
  Skeleton, 
  SkeletonCard, 
  SkeletonTable, 
  SkeletonText, 
  LoadingOverlay 
}; 