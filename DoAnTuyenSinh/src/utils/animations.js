// Optimized animation variants for better performance
export const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const cardHover = {
    hover: {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Reduced motion variants for accessibility
export const reducedMotionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 }
    }
};

// Performance optimized hover effects
export const optimizedHover = {
    scale: 1.05,
    transition: {
        duration: 0.2,
        ease: "easeOut",
        type: "tween" // Use tween instead of spring for better performance
    }
};

export const buttonHover = {
    scale: 1.02,
    y: -2,
    transition: {
        duration: 0.2,
        ease: "easeOut"
    }
};

// Optimized spring configurations
export const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.8
};

export const fastSpring = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.5
};

// Utility function to check if user prefers reduced motion
export const shouldReduceMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Conditional animation variants based on user preference
export const getAnimationVariants = (normalVariants, reducedVariants = reducedMotionVariants) => {
    return shouldReduceMotion() ? reducedVariants : normalVariants;
};