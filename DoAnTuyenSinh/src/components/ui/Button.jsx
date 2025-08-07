import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const buttonVariants = {
  // Modern primary variants with better accessibility
  primary:
    "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98] dark:bg-primary-500 dark:hover:bg-primary-600",
  secondary:
    "bg-secondary-600 text-white shadow-soft hover:bg-secondary-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98] dark:bg-secondary-500 dark:hover:bg-secondary-600",
  accent:
    "bg-accent-600 text-white shadow-soft hover:bg-accent-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98] dark:bg-accent-500 dark:hover:bg-accent-600",

  // Outline variants with modern styling
  outline:
    "border-2 border-primary-200 text-primary-700 bg-white hover:bg-primary-50 hover:border-primary-300 hover:text-primary-800 hover:shadow-soft dark:border-primary-700 dark:text-primary-300 dark:bg-neutral-900 dark:hover:bg-primary-900/20",
  "outline-secondary":
    "border-2 border-secondary-200 text-secondary-700 bg-white hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-800 hover:shadow-soft dark:border-secondary-700 dark:text-secondary-300 dark:bg-neutral-900 dark:hover:bg-secondary-900/20",

  // Ghost variants
  ghost:
    "text-primary-700 bg-transparent hover:bg-primary-100 border-0 hover:text-primary-800 dark:text-primary-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-200",
  "ghost-secondary":
    "text-secondary-700 bg-transparent hover:bg-secondary-100 border-0 hover:text-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-900/20 dark:hover:text-secondary-200",

  // Glass morphism effect
  glass:
    "bg-white/80 backdrop-blur-md border border-white/20 text-neutral-800 hover:bg-white/90 hover:border-white/30 hover:shadow-glass dark:bg-neutral-900/80 dark:text-neutral-200 dark:border-neutral-700/50 dark:hover:bg-neutral-800/90",

  // Status variants with better contrast
  success:
    "bg-success-600 text-white shadow-soft hover:bg-success-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98] dark:bg-success-500 dark:hover:bg-success-600",
  warning:
    "bg-warning-600 text-white shadow-soft hover:bg-warning-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98] dark:bg-warning-500 dark:hover:bg-warning-600",
  error:
    "bg-error-600 text-white shadow-soft hover:bg-error-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98] dark:bg-error-500 dark:hover:bg-error-600",

  // Special gradient variants
  gradient:
    "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-soft hover:from-primary-700 hover:to-secondary-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98]",
  "gradient-accent":
    "bg-gradient-to-r from-accent-500 to-primary-600 text-white shadow-soft hover:from-accent-600 hover:to-primary-700 hover:shadow-medium border-0 hover:scale-[1.02] active:scale-[0.98]",

  // Link variant
  link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 bg-transparent border-0 p-0 h-auto dark:text-primary-400 dark:hover:text-primary-300",
};

const buttonSizes = {
  xs: "px-2 py-1 text-xs min-h-[28px] gap-1",
  sm: "px-3 py-1.5 text-sm min-h-[36px] gap-1.5",
  md: "px-4 py-2 text-sm min-h-[40px] gap-2",
  lg: "px-6 py-3 text-base min-h-[44px] gap-2",
  xl: "px-8 py-4 text-lg min-h-[52px] gap-2.5",
  "2xl": "px-10 py-5 text-xl min-h-[60px] gap-3",
  icon: "p-2 min-h-[40px] min-w-[40px]",
  "icon-sm": "p-1.5 min-h-[32px] min-w-[32px]",
  "icon-lg": "p-3 min-h-[48px] min-w-[48px]",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = "lg",
      as: Component = "button",
      asChild = false,
      animate = true,
      glow = false,
      shimmer = true,
      ripple = true,
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      // Modern base styles with better accessibility
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none",
      "disabled:transform-none disabled:hover:scale-100 disabled:shadow-none",
      "relative overflow-hidden group",
      "select-none whitespace-nowrap",
      "active:transition-none", // Faster active state

      // Variant styles
      buttonVariants[variant],

      // Size styles
      buttonSizes[size],

      // Border radius with modern defaults
      {
        "rounded-sm": rounded === "sm",
        "rounded-md": rounded === "md",
        "rounded-lg": rounded === "lg" || !rounded,
        "rounded-xl": rounded === "xl",
        "rounded-2xl": rounded === "2xl",
        "rounded-full": rounded === "full",
      },

      // Full width
      {
        "w-full": fullWidth,
      },

      // Enhanced effects
      {
        "animate-pulse-gentle": glow,
        "before:absolute before:inset-0 before:bg-shimmer before:bg-[length:200%_100%] before:animate-shimmer before:opacity-0 hover:before:opacity-100":
          shimmer && !loading,
      },

      // Loading state
      {
        "cursor-wait pointer-events-none": loading,
      },

      className
    );

    const motionProps = animate
      ? {
          whileHover: {
            scale: disabled || loading ? 1 : 1.02,
            transition: { type: "spring", stiffness: 400, damping: 17 },
          },
          whileTap: {
            scale: disabled || loading ? 1 : 0.98,
            transition: { type: "spring", stiffness: 400, damping: 17 },
          },
          initial: { scale: 1 },
        }
      : {};

    // Handle asChild prop
    if (asChild) {
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        className: clsx(baseClasses, child.props.className),
        ref,
        ...props,
      });
    }

    const content = (
      <>
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Content wrapper */}
        <div
          className={clsx(
            "flex items-center gap-2 relative z-10 transition-opacity duration-200",
            { "opacity-0": loading }
          )}
        >
          {leftIcon && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              {leftIcon}
            </span>
          )}
          <span className="font-medium">{children}</span>
          {rightIcon && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-1">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Shimmer effect */}
        {shimmer && !disabled && !loading && (
          <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        )}

        {/* Ripple effect background */}
        {ripple && !disabled && !loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </>
    );

    if (animate) {
      return (
        <motion.div {...motionProps} className="inline-block">
          <Component
            ref={ref}
            className={baseClasses}
            disabled={disabled || loading}
            {...props}
          >
            {content}
          </Component>
        </motion.div>
      );
    }

    return (
      <Component
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
