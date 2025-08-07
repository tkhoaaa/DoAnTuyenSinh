import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const cardVariants = {
  // Modern default variants with better accessibility
  default:
    "bg-white border border-neutral-200 shadow-soft hover:shadow-medium transition-all duration-200 dark:bg-neutral-900 dark:border-neutral-800",
  elevated:
    "bg-white border-0 shadow-medium hover:shadow-large transition-all duration-200 dark:bg-neutral-900",
  outlined:
    "bg-white border-2 border-neutral-200 hover:border-neutral-300 hover:shadow-soft transition-all duration-200 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600",

  // Glass morphism variants with better contrast
  glass:
    "bg-white/80 backdrop-blur-md border border-white/20 shadow-glass hover:bg-white/90 hover:border-white/30 transition-all duration-200 dark:bg-neutral-900/80 dark:border-neutral-700/50",
  "glass-strong":
    "bg-white/90 backdrop-blur-lg border border-white/30 shadow-glass hover:bg-white/95 hover:border-white/40 transition-all duration-200 dark:bg-neutral-900/90 dark:border-neutral-700/60",

  // Gradient variants with modern colors
  gradient:
    "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow hover:shadow-glow-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-200",
  "gradient-secondary":
    "bg-gradient-to-br from-secondary-500 to-secondary-700 text-white shadow-glow hover:shadow-glow-lg hover:from-secondary-600 hover:to-secondary-800 transition-all duration-200",
  "gradient-accent":
    "bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-glow hover:shadow-glow-lg hover:from-accent-600 hover:to-accent-800 transition-all duration-200",

  // Status variants with subtle backgrounds
  success:
    "bg-success-50 border border-success-200 text-success-900 hover:bg-success-100 hover:border-success-300 transition-all duration-200 dark:bg-success-900/20 dark:border-success-700 dark:text-success-100",
  warning:
    "bg-warning-50 border border-warning-200 text-warning-900 hover:bg-warning-100 hover:border-warning-300 transition-all duration-200 dark:bg-warning-900/20 dark:border-warning-700 dark:text-warning-100",
  error:
    "bg-error-50 border border-error-200 text-error-900 hover:bg-error-100 hover:border-error-300 transition-all duration-200 dark:bg-error-900/20 dark:border-error-700 dark:text-error-100",
  info: "bg-info-50 border border-info-200 text-info-900 hover:bg-info-100 hover:border-info-300 transition-all duration-200 dark:bg-info-900/20 dark:border-info-700 dark:text-info-100",

  // Interactive variants
  interactive:
    "bg-white border border-neutral-200 shadow-soft hover:shadow-medium hover:border-primary-300 hover:-translate-y-1 cursor-pointer transition-all duration-200 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-primary-600",
  clickable:
    "bg-white border border-neutral-200 shadow-soft hover:shadow-medium active:shadow-soft active:scale-[0.98] cursor-pointer transition-all duration-150 dark:bg-neutral-900 dark:border-neutral-800",
};

const cardSizes = {
  xs: "p-3",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
  "2xl": "p-12",
};

const Card = forwardRef(
  (
    {
      children,
      variant = "default",
      size = "md",
      className = "",
      rounded = "lg",
      hover = true,
      clickable = false,
      animate = true,
      glow = false,
      shimmer = false,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      // Base styles with enhanced transitions
      "transition-all duration-300 ease-out relative overflow-hidden group",

      // Variant styles
      cardVariants[variant],

      // Size styles
      cardSizes[size],

      // Border radius
      {
        "rounded-sm": rounded === "sm",
        rounded: rounded === "md",
        "rounded-lg": rounded === "lg",
        "rounded-xl": rounded === "xl",
        "rounded-2xl": rounded === "2xl",
        "rounded-3xl": rounded === "3xl",
      },

      // Hover effects with enhanced transforms
      {
        "hover:-translate-y-2 hover:scale-[1.02]": hover && !clickable,
      },

      // Clickable styles
      {
        "cursor-pointer": clickable,
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2":
          clickable,
        "active:scale-[0.98]": clickable,
      },

      // Glow effect
      {
        "animate-pulse-glow": glow,
      },

      className
    );

    const motionProps = animate
      ? {
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: {
            duration: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
          ...(hover && {
            whileHover: {
              y: -8,
              scale: 1.02,
              transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            },
          }),
          ...(clickable && {
            whileTap: {
              scale: 0.98,
              transition: { duration: 0.1 },
            },
          }),
        }
      : {};

    const content = (
      <>
        {children}

        {/* Shimmer effect */}
        {shimmer && (
          <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        )}

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-inherit" />
      </>
    );

    if (animate) {
      return (
        <motion.div {...motionProps}>
          <Component ref={ref} className={baseClasses} {...props}>
            {content}
          </Component>
        </motion.div>
      );
    }

    return (
      <Component ref={ref} className={baseClasses} {...props}>
        {content}
      </Component>
    );
  }
);

Card.displayName = "Card";

// Enhanced Card sub-components
const CardHeader = forwardRef(
  ({ children, className = "", gradient = false, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "mb-4 relative",
        {
          "bg-gradient-to-r from-primary-500/10 to-accent-500/10 -m-6 mb-4 p-6 rounded-t-inherit":
            gradient,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(
  (
    {
      children,
      className = "",
      as: Component = "h3",
      gradient = false,
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={clsx(
        "text-lg font-semibold",
        {
          "text-gray-900": !gradient,
          "bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent":
            gradient,
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(
  ({ children, className = "", muted = true, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx(
        "text-sm mt-1",
        {
          "text-gray-600": muted,
          "text-gray-800": !muted,
        },
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={clsx("relative z-10", className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef(
  ({ children, className = "", bordered = true, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "mt-4 pt-4",
        {
          "border-t border-gray-200": bordered,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
