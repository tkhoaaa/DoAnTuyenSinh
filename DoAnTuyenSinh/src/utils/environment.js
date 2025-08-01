// Environment detection utilities

/**
 * Check if the app is running on Vercel deployment
 * @returns {boolean} True if running on Vercel
 */
export const isVercelDeployment = () => {
    if (typeof window === 'undefined') return false;

    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // Check for Vercel domains
    const isVercelDomain = hostname.includes('vercel.app') || hostname.includes('vercel.com');

    // Check for HTTPS production (excluding localhost HTTPS)
    const isProductionHTTPS = protocol === 'https:' && !hostname.includes('localhost');

    const isVercel = isVercelDomain || isProductionHTTPS;

    // Debug logging in development
    if (hostname.includes('localhost')) {
        console.log('Environment Detection:', {
            hostname,
            protocol,
            isVercelDomain,
            isProductionHTTPS,
            isVercel,
            isDevelopment: true
        });
    }

    return isVercel;
};

/**
 * Check if the app is running in development mode
 * @returns {boolean} True if in development
 */
export const isDevelopment = () => {
    if (typeof window === 'undefined') return false;

    const hostname = window.location.hostname;
    return hostname.includes('localhost') || hostname.includes('127.0.0.1');
};

/**
 * Check if the app is running in production mode
 * @returns {boolean} True if in production
 */
export const isProduction = () => {
    return !isDevelopment();
};

/**
 * Get current environment name
 * @returns {string} 'development', 'vercel', or 'production'
 */
export const getEnvironment = () => {
    if (isDevelopment()) return 'development';
    if (isVercelDeployment()) return 'vercel';
    return 'production';
};

/**
 * Check if demo mode should be available
 * Demo mode should be available on Vercel deployment and localhost for testing
 * @returns {boolean} True if demo mode should be shown
 */
export const shouldShowDemoMode = () => {
    return isVercelDeployment() || isDevelopment();
};