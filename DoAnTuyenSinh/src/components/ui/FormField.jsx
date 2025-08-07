import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaExclamationTriangle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input } from './Input';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  validation,
  error,
  success,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  
  const hasError = error && hasBeenTouched;
  const hasSuccess = success && hasBeenTouched && !error;
  const isValid = validation ? validation(value) : !error;

  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasBeenTouched(true);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fieldVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const errorVariants = {
    initial: { opacity: 0, scale: 0.8, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -10 }
  };

  return (
    <motion.div
      variants={fieldVariants}
      initial="initial"
      animate="animate"
      className={`relative ${className}`}
    >
      {/* Label */}
      {label && (
        <motion.label
          htmlFor={name}
          className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
            hasError
              ? 'text-error-600 dark:text-error-400'
              : hasSuccess
              ? 'text-success-600 dark:text-success-400'
              : isFocused
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && (
            <span className="text-error-500 ml-1">*</span>
          )}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        <motion.div
          className={`relative rounded-xl transition-all duration-300 ${
            hasError
              ? 'ring-2 ring-error-500 dark:ring-error-400'
              : hasSuccess
              ? 'ring-2 ring-success-500 dark:ring-success-400'
              : isFocused
              ? 'ring-2 ring-primary-500 dark:ring-primary-400'
              : 'ring-1 ring-gray-300 dark:ring-gray-600'
          }`}
          whileHover={{ scale: 1.01 }}
          whileFocus={{ scale: 1.02 }}
        >
          <Input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full px-4 py-3 rounded-xl border-0 bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-0 transition-all duration-200
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon || isPassword || hasError || hasSuccess ? 'pr-12' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${inputClassName}
            `}
            {...props}
          />

          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}

          {/* Right Icons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {/* Password Toggle */}
            {isPassword && (
              <motion.button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            )}

            {/* Validation Icons */}
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="text-error-500 dark:text-error-400"
                >
                  <FaExclamationTriangle />
                </motion.div>
              )}
              {hasSuccess && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="text-success-500 dark:text-success-400"
                >
                  <FaCheck />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Right Icon */}
            {rightIcon && (
              <div className="text-gray-400 dark:text-gray-500">
                {rightIcon}
              </div>
            )}
          </div>
        </motion.div>

        {/* Progress Bar for Password Strength */}
        {isPassword && value && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mt-2"
          >
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full transition-all duration-300 ${
                  value.length < 6
                    ? 'bg-error-500 w-1/3'
                    : value.length < 8
                    ? 'bg-warning-500 w-2/3'
                    : 'bg-success-500 w-full'
                }`}
                initial={{ width: 0 }}
                animate={{ 
                  width: value.length < 6 ? '33%' : value.length < 8 ? '66%' : '100%' 
                }}
              />
            </div>
            <p className={`text-xs mt-1 ${
              value.length < 6
                ? 'text-error-600 dark:text-error-400'
                : value.length < 8
                ? 'text-warning-600 dark:text-warning-400'
                : 'text-success-600 dark:text-success-400'
            }`}>
              {value.length < 6 ? 'Yếu' : value.length < 8 ? 'Trung bình' : 'Mạnh'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            variants={errorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-2 flex items-center gap-2 text-error-600 dark:text-error-400 text-sm"
          >
            <FaExclamationTriangle className="flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
        {hasSuccess && success && (
          <motion.div
            variants={errorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-2 flex items-center gap-2 text-success-600 dark:text-success-400 text-sm"
          >
            <FaCheck className="flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Count */}
      {props.maxLength && (
        <div className="mt-1 text-right">
          <span className={`text-xs ${
            value.length > props.maxLength * 0.9
              ? 'text-warning-600 dark:text-warning-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {value.length}/{props.maxLength}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default FormField; 