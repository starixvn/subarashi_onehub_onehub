/**
 * Environment configuration
 * Safely access environment variables with fallbacks
 */

export const env = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
    APP_NAME: import.meta.env.VITE_APP_NAME || 'OneStop',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || 'v.01',
    NODE_ENV: import.meta.env.MODE,
    IS_DEV: import.meta.env.MODE === 'development',
} as const;
