import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaExclamationTriangle } from 'react-icons/fa';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  // Extract video ID from YouTube URL with improved regex
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1` : null;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4 lg:p-6"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotateX: 15 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.5
            }}
            className="relative w-full max-w-7xl h-[70vh] md:h-[80vh] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50"
            style={{ perspective: '1000px' }}
          >
            {/* Enhanced Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-red-500/20 hover:bg-red-500/40 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-red-500/30 hover:border-red-500/60"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="text-xl" />
            </motion.button>

            {/* Loading/Error State */}
            {!videoId && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center text-white p-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-4 text-red-400"
                  >
                    <FaExclamationTriangle className="w-full h-full" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Không thể tải video</h3>
                  <p className="text-gray-300">URL video không hợp lệ hoặc video không tồn tại</p>
                </div>
              </div>
            )}

            {/* Video iframe with enhanced styling */}
            {videoId && embedUrl && (
              <div className="relative w-full h-full">
                {/* Video container with loading state */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full h-full"
                >
                  <iframe
                    src={embedUrl}
                    title="HUTECH Video Giới Thiệu"
                    className="w-full h-full rounded-3xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </motion.div>

                {/* Video overlay with play button (shown before autoplay) */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
                  >
                    <FaPlay className="text-white text-2xl ml-1" />
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-500"></div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center"
          >
            <p>Nhấn ESC hoặc click bên ngoài để đóng</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal; 