// API Configuration
const isDevelopment =
    import.meta.env.MODE === 'development';
const isProduction =
    import.meta.env.MODE === 'production';

// API Base URLs
export const API_CONFIG = {
    // Backend API URL
    BASE_URL: isDevelopment ?
        'http://localhost:3001' : import.meta.env.VITE_API_URL || 'http://localhost:3001',

    // API Endpoints
    ENDPOINTS: {
        AUTH: '/api/auth',
        ADMIN: '/api/admin',
        SCHOLARSHIP: '/api/scholarship',
        CONSULT: '/api/consult',
        HEALTH: '/health'
    }
};

// App URLs
export const APP_CONFIG = {
    // Frontend URL
    FRONTEND_URL: isDevelopment ?
        'http://localhost:5173' : 'https://do-an-tuyen-sinh.vercel.app',

    // Official website
    OFFICIAL_WEBSITE: 'https://hutech.edu.vn',

    // Support email
    SUPPORT_EMAIL: 'tuyensinh@hutech.edu.vn'
};

// Helper function to build API URL
export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Common API URLs
export const API_URLS = {
    // Auth endpoints
    LOGIN: buildApiUrl(`${API_CONFIG.ENDPOINTS.AUTH}/login`),
    REGISTER: buildApiUrl(`${API_CONFIG.ENDPOINTS.AUTH}/register`),
    REGISTER_ADMIN: buildApiUrl(`${API_CONFIG.ENDPOINTS.AUTH}/register-admin`),
    MAJORS: buildApiUrl(`${API_CONFIG.ENDPOINTS.AUTH}/majors`),
    EXAM_BLOCKS: buildApiUrl(`${API_CONFIG.ENDPOINTS.AUTH}/exam-blocks`),
    APPLY: buildApiUrl(`${API_CONFIG.ENDPOINTS.AUTH}/apply`),

    // Admin endpoints
    DASHBOARD_STATS: buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN}/dashboard-stats`),
    APPLICATIONS: buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN}/applications`),
    RECENT_APPLICATIONS: buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN}/recent-applications`),
    TOP_MAJORS: buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN}/top-majors`),
    SETUP_DB: buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN}/setup-db`),

    // Scholarship endpoints
    SCHOLARSHIP_APPLY: buildApiUrl(`${API_CONFIG.ENDPOINTS.SCHOLARSHIP}/apply`),
    SCHOLARSHIP_LIST: buildApiUrl(`${API_CONFIG.ENDPOINTS.SCHOLARSHIP}/list`),

    // Consultation endpoints
    CONSULT_APPLY: buildApiUrl(`${API_CONFIG.ENDPOINTS.CONSULT}/apply`),
    CONSULT_LIST: buildApiUrl(`${API_CONFIG.ENDPOINTS.CONSULT}/list`),

    // Health check
    HEALTH: buildApiUrl(API_CONFIG.ENDPOINTS.HEALTH)
};

export default API_CONFIG;