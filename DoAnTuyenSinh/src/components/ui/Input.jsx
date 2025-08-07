import React, { forwardRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import {
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

const inputVariants = {
  default:
    "border-neutral-200 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-primary-400 dark:hover:border-neutral-600",
  error:
    "border-error-300 bg-white focus:border-error-500 focus:ring-2 focus:ring-error-500/10 hover:border-error-400 dark:border-error-700 dark:bg-neutral-900 dark:focus:border-error-400",
  success:
    "border-success-300 bg-white focus:border-success-500 focus:ring-2 focus:ring-success-500/10 hover:border-success-400 dark:border-success-700 dark:bg-neutral-900 dark:focus:border-success-400",
  glass:
    "border-white/20 bg-white/80 backdrop-blur-md focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 hover:border-white/30 dark:border-neutral-700/50 dark:bg-neutral-900/80",
  outlined:
    "border-2 border-neutral-300 bg-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 hover:border-neutral-400 dark:border-neutral-600 dark:focus:border-primary-400 dark:hover:border-neutral-500",
  filled:
    "border-0 bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-primary-500/10 hover:bg-neutral-50 dark:bg-neutral-800 dark:focus:bg-neutral-900 dark:hover:bg-neutral-700",
  underlined:
    "border-0 border-b-2 border-neutral-300 bg-transparent rounded-none focus:border-primary-500 focus:ring-0 hover:border-neutral-400 dark:border-neutral-600 dark:focus:border-primary-400",
};

const inputSizes = {
  sm: "px-3 py-2 text-sm min-h-[36px]",
  md: "px-4 py-2.5 text-sm min-h-[40px]",
  lg: "px-4 py-3 text-base min-h-[44px]",
  xl: "px-5 py-4 text-lg min-h-[52px]",
};

const Input = forwardRef(
  (
    {
      type = "text",
      variant = "default",
      size = "md",
      className = "",
      label,
      placeholder,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      disabled = false,
      required = false,
      fullWidth = false,
      rounded = "lg",
      animate = true,
      showPasswordToggle = false,
      floatingLabel = false,
      glow = false,
      icon, // Extract icon prop to prevent it from being passed to input
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );
    const inputId = useId();

    const actualType = type === "password" && showPassword ? "text" : type;
    const hasError = !!error;
    const hasSuccess = !!success;
    const currentVariant = hasError
      ? "error"
      : hasSuccess
      ? "success"
      : variant;

    const handleInputChange = (e) => {
      setHasValue(e.target.value.length > 0);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const inputClasses = clsx(
      // Base styles with enhanced transitions
      "w-full border transition-all duration-300 ease-out placeholder-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
      "peer", // For floating label functionality

      // Variant styles
      inputVariants[currentVariant],

      // Size styles
      inputSizes[size],

      // Border radius
      {
        "rounded-sm": rounded === "sm" && variant !== "underlined",
        rounded: rounded === "md" && variant !== "underlined",
        "rounded-lg": rounded === "lg" && variant !== "underlined",
        "rounded-xl": rounded === "xl" && variant !== "underlined",
        "rounded-2xl": rounded === "2xl" && variant !== "underlined",
      },

      // Floating label adjustments
      {
        "pt-6 pb-2": floatingLabel && size === "md",
        "pt-7 pb-3": floatingLabel && size === "lg",
        "pt-5 pb-1": floatingLabel && size === "sm",
      },

      // Icon padding adjustments
      {
        "pl-10": leftIcon && size === "sm",
        "pl-11": leftIcon && size === "md",
        "pl-12": leftIcon && size === "lg",
        "pr-10":
          (rightIcon || (type === "password" && showPasswordToggle)) &&
          size === "sm",
        "pr-11":
          (rightIcon || (type === "password" && showPasswordToggle)) &&
          size === "md",
        "pr-12":
          (rightIcon || (type === "password" && showPasswordToggle)) &&
          size === "lg",
      },

      // Glow effect
      {
        "shadow-glow": glow && isFocused,
      },

      className
    );

    const containerClasses = clsx("relative group", {
      "w-full": fullWidth,
    });

    const iconClasses = clsx(
      "absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-colors duration-200",
      "group-focus-within:text-primary-500",
      {
        "w-4 h-4": size === "sm",
        "w-5 h-5": size === "md",
        "w-6 h-6": size === "lg",
      }
    );

    const leftIconClasses = clsx(iconClasses, {
      "left-3": size === "sm",
      "left-3.5": size === "md",
      "left-4": size === "lg",
    });

    const rightIconClasses = clsx(iconClasses, {
      "right-3": size === "sm",
      "right-3.5": size === "md",
      "right-4": size === "lg",
    });

    const floatingLabelClasses = clsx(
      "absolute left-4 transition-all duration-200 pointer-events-none",
      "peer-focus:text-primary-500 peer-focus:text-sm",
      "peer-focus:-translate-y-2 peer-focus:scale-90",
      {
        // Default position
        "top-1/2 -translate-y-1/2 text-gray-500": !floatingLabel,

        // Floating label positions
        "top-3 text-sm text-primary-500 -translate-y-2 scale-90":
          floatingLabel && (isFocused || hasValue),
        "top-1/2 -translate-y-1/2 text-gray-500":
          floatingLabel && !isFocused && !hasValue,

        // Size adjustments for floating labels
        "text-sm": size === "sm",
        "text-base": size === "md",
        "text-lg": size === "lg",

        // Icon adjustments
        "left-11": leftIcon && size === "md",
        "left-12": leftIcon && size === "lg",
        "left-10": leftIcon && size === "sm",

        // Error/success states
        "text-error-500": hasError && (isFocused || hasValue),
        "text-success-500": hasSuccess && (isFocused || hasValue),
      }
    );

    const motionProps = animate
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, type: "spring", stiffness: 100 },
        }
      : {};

    const inputElement = (
      <div className={containerClasses}>
        {/* Traditional Label (non-floating) */}
        {label && !floatingLabel && (
          <motion.label
            htmlFor={inputId}
            className={clsx(
              "block text-sm font-medium mb-2 transition-colors duration-200 cursor-pointer",
              {
                "text-error-600": hasError,
                "text-success-600": hasSuccess,
                "text-gray-700": !hasError && !hasSuccess,
              }
            )}
            {...(animate
              ? {
                  initial: { opacity: 0, x: -10 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.2, delay: 0.1 },
                }
              : {})}
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </motion.label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && <div className={leftIconClasses}>{leftIcon}</div>}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={inputClasses}
            placeholder={floatingLabel ? "" : placeholder}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            {...props}
          />

          {/* Floating Label */}
          {floatingLabel && label && (
            <label htmlFor={inputId} className={floatingLabelClasses}>
              {label}
              {required && <span className="text-error-500 ml-1">*</span>}
            </label>
          )}

          {/* Right icon or password toggle */}
          {(rightIcon || (type === "password" && showPasswordToggle)) && (
            <div className={rightIconClasses}>
              {type === "password" && showPasswordToggle ? (
                <button
                  type="button"
                  className="pointer-events-auto hover:text-primary-500 transition-colors duration-200 p-1 rounded"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-full h-full" />
                  ) : (
                    <FaEye className="w-full h-full" />
                  )}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}

          {/* Status icon */}
          {(hasError || hasSuccess) && (
            <div
              className={clsx(rightIconClasses, {
                "right-10":
                  (rightIcon || (type === "password" && showPasswordToggle)) &&
                  size === "sm",
                "right-11":
                  (rightIcon || (type === "password" && showPasswordToggle)) &&
                  size === "md",
                "right-12":
                  (rightIcon || (type === "password" && showPasswordToggle)) &&
                  size === "lg",
              })}
            >
              {hasError ? (
                <FaExclamationCircle className="w-full h-full text-error-500" />
              ) : (
                <FaCheckCircle className="w-full h-full text-success-500" />
              )}
            </div>
          )}

          {/* Enhanced focus ring animation */}
          {animate && isFocused && (
            <motion.div
              className={clsx(
                "absolute inset-0 border-2 border-primary-500 pointer-events-none",
                {
                  "rounded-sm": rounded === "sm" && variant !== "underlined",
                  rounded: rounded === "md" && variant !== "underlined",
                  "rounded-lg": rounded === "lg" && variant !== "underlined",
                  "rounded-xl": rounded === "xl" && variant !== "underlined",
                  "rounded-2xl": rounded === "2xl" && variant !== "underlined",
                  "rounded-none border-b-2 border-t-0 border-x-0":
                    variant === "underlined",
                }
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            />
          )}

          {/* Subtle background glow on focus */}
          {animate && isFocused && variant === "glass" && (
            <motion.div
              className="absolute inset-0 bg-primary-500/5 pointer-events-none rounded-inherit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        {/* Helper text, error, or success message */}
        <AnimatePresence mode="wait">
          {(error || success || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -5, height: 0 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
              className={clsx(
                "mt-2 text-sm flex items-center gap-2 overflow-hidden",
                {
                  "text-error-600": hasError,
                  "text-success-600": hasSuccess,
                  "text-gray-500": !hasError && !hasSuccess,
                }
              )}
            >
              {hasError && (
                <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
              )}
              {hasSuccess && (
                <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="leading-tight">
                {error || success || helperText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

    if (animate) {
      return <motion.div {...motionProps}>{inputElement}</motion.div>;
    }

    return inputElement;
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
