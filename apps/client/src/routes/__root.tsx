import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { env } from '@/configs/env';
import { requireAuth } from '@/libs/guards';
import { isPublicPath } from '@/configs/routes';
import { AppLayout } from '@/components/layout/AppLayout';

/**
 * Root route component
 * This is the top-level route that wraps all other routes
 * Handles global authentication via beforeLoad
 * Conditionally applies AppLayout to protected routes
 *
 * Note: Child routes are automatically discovered by TanStack Router Plugin
 * No manual imports needed - the plugin generates the route tree from the routes/ folder
 */
export const Route = createRootRoute({
    beforeLoad: ({ location }) => {
        // Global auth guard - checks authentication for all routes
        // Public paths (login, not-found) are automatically excluded
        requireAuth(location.pathname);
    },
    component: RootComponent,
});

function RootComponent() {
    const location = useLocation();
    const isPublic = isPublicPath(location.pathname);

    return (
        <>
            {isPublic ? (
                // Public routes: render without AppLayout (no Header/Sidebar)
                <Outlet />
            ) : (
                // Protected routes: wrap with AppLayout (includes Header/Sidebar)
                <AppLayout>
                    <Outlet />
                </AppLayout>
            )}
            {env.IS_DEV && <TanStackRouterDevtools position="bottom-right" />}
        </>
    );
}
