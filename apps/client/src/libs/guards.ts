import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores';
import { isPublicPath, ROUTE_PATHS } from '@/configs/routes';

/**
 * Auth guard that checks authentication before allowing route access
 * Automatically allows public paths (LOGIN, NOT_FOUND, etc.)
 * Redirects to /login if not authenticated
 *
 * @param pathname - Current route pathname
 * @throws redirect - Throws redirect to /login if auth fails
 *
 * @example
 * // In route configuration:
 * beforeLoad: ({ location }) => requireAuth(location.pathname)
 */
export const requireAuth = (pathname: string) => {
    // Skip auth check for public paths
    if (isPublicPath(pathname)) {
        return;
    }

    // Check authentication status
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
        throw redirect({
            to: ROUTE_PATHS.LOGIN,
        });
    }
};

// Re-export for convenience
export { isPublicPath };
