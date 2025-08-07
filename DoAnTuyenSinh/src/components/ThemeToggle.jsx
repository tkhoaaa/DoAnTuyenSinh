import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ className = '' }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-in-out shadow-lg ${
        darkMode 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600' 
          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border border-yellow-200'
      } ${className}`}
      title={darkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        rotate: darkMode ? 180 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: darkMode ? 0 : 1,
            opacity: darkMode ? 0 : 1,
            rotate: darkMode ? 90 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaSun className="w-5 h-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: darkMode ? 1 : 0,
            opacity: darkMode ? 1 : 0,
            rotate: darkMode ? 0 : -90,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaMoon className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle; 