import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaTimesCircle,
  FaTimes 
} from 'react-icons/fa';

// Custom toast component with animations
const CustomToast = ({ t, type, title, message, icon: CustomIcon }) => {
  const icons = {
    success: FaCheckCircle,
    error: FaTimesCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle,
  };

  const colors = {
    success: 'from-success-500 to-success-600',
    error: 'from-error-500 to-error-600',
    warning: 'from-warning-500 to-warning-600',
    info: 'from-primary-500 to-primary-600',
  };

  const Icon = CustomIcon || icons[type] || FaInfoCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl pointer-events-auto 
        flex ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
        backdrop-blur-sm border border-gray-200 dark:border-gray-700
      `}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colors[type]} flex items-center justify-center shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {title}
              </p>
            )}
            <p className={`text-sm text-gray-600 dark:text-gray-300 ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Toast utility functions
export const showToast = {
  success: (message, title = 'Thành công') => {
    toast.custom((t) => (
      <CustomToast t={t} type="success" title={title} message={message} />
    ), {
      duration: 4000,
      position: 'top-right',
    });
  },
  
  error: (message, title = 'Lỗi') => {
    toast.custom((t) => (
      <CustomToast t={t} type="error" title={title} message={message} />
    ), {
      duration: 5000,
      position: 'top-right',
    });
  },
  
  warning: (message, title = 'Cảnh báo') => {
    toast.custom((t) => (
      <CustomToast t={t} type="warning" title={title} message={message} />
    ), {
      duration: 4000,
      position: 'top-right',
    });
  },
  
  info: (message, title = 'Thông tin') => {
    toast.custom((t) => (
      <CustomToast t={t} type="info" title={title} message={message} />
    ), {
      duration: 3000,
      position: 'top-right',
    });
  },
  
  loading: (message = 'Đang xử lý...') => {
    return toast.loading(message, {
      style: {
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#374151',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(229, 231, 235, 0.8)',
      },
    });
  },
  
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
  
  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Đang xử lý...',
      success: messages.success || 'Thành công!',
      error: messages.error || 'Có lỗi xảy ra!',
    }, {
      style: {
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(229, 231, 235, 0.8)',
      },
    });
  }
};

// Main Toaster component
export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: '',
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
        },
      }}
    />
  );
};

export default ToastProvider; 