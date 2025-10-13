/**
 * Application route paths configuration
 * Single source of truth for all route paths in the application
 *
 * This file contains ONLY path definitions - no React components or JSX
 * For navigation UI components (icons, labels), see the Sidebar component
 */

/**
 * Application route paths
 * Centralized path definitions for type-safe routing
 */
export const ROUTE_PATHS = {
    // Public routes
    HOME: '/',
    LOGIN: '/login',

    // Protected routes
    CAMPAIGN_MANAGEMENT: '/campaign-management',

    PAGE_MANAGEMENT: '/page-management',
    PAGE_BUILDER: '/page-builder',
    ASSET_UPLOADER: '/asset-uploader',
    REGISTER_FORM_MANAGEMENT: '/register-form-management',

    GENERATE_LINK: '/generate-link',
    LINK_MANAGEMENT: '/link-management',
    COMPONENTS_MANAGEMENT: '/components-management',
} as const;

/**
 * Default redirect path after successful login
 */
export const DEFAULT_REDIRECT_PATH = ROUTE_PATHS.CAMPAIGN_MANAGEMENT;

/**
 * Public route paths (don't require authentication)
 */
export const PUBLIC_PATHS = [ROUTE_PATHS.LOGIN] as const;

/**
 * Helper function to check if a path is public
 * @param path - The pathname to check
 * @returns true if the path is public (doesn't require authentication)
 */
export function isPublicPath(path: string): boolean {
    return PUBLIC_PATHS.some((publicPath) => path.toLowerCase() === publicPath.toLowerCase());
}
