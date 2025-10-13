import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
    Navigate,
} from '@tanstack/react-router';
import { lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

const LoginPage = lazy(() => import('@/pages/Login').then((m) => ({ default: m.LoginPage })));

// Lazy load layout
const AppLayout = lazy(() =>
    import('@/components/layout/AppLayout').then((m) => ({ default: m.AppLayout }))
);

// Lazy load pages
const CampaignManagementPage = lazy(() =>
    import('@/pages/CampaignManagement').then((m) => ({ default: m.CampaignManagementPage }))
);

// ===================
// Constants
// ===================
const DEFAULT_REDIRECT_PATH = '/campaign-management';

// Root route
const rootRoute = createRootRoute({
    component: () => <Outlet />,
});

// ===================
// Auth Routes
// ===================
const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
});

// ===================
// Home Route (Redirect to default page)
// ===================
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
        <ProtectedRoute>
            <Navigate to={DEFAULT_REDIRECT_PATH} replace />
        </ProtectedRoute>
    ),
});

// ===================
// Campaign Management
// ===================
const campaignRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/campaign-management',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <CampaignManagementPage />
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Landing Page CMS
// ===================
const landingPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landing-page',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Landing Page CMS</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Landing page CMS content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Link Generator
// ===================
const linkGeneratorGenerateRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/link-generator/generate',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Generate Link</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Link generation form will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

const linkGeneratorManageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/link-generator/manage',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Link Management</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Link management content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

const linkGeneratorComponentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/link-generator/components',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Component Management</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Component management content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Promotion Management
// ===================
const promotionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/promotion',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Promotion Management</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Promotion management content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// User Segmentation
// ===================
const userSegmentationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/user-segmentation',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">User Segmentation</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">User segmentation content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Data Dashboard
// ===================
const dataDashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/data-dashboard',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Dashboard</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Data dashboard content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Data Tracking
// ===================
const dataTrackingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/data-tracking',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Tracking</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Data tracking content will go here.</p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Marketing Requirements
// ===================
const marketingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/marketing',
    component: () => (
        <ProtectedRoute>
            <AppLayout>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Marketing Requirements
                    </h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">
                            Marketing requirements content will go here.
                        </p>
                    </div>
                </div>
            </AppLayout>
        </ProtectedRoute>
    ),
});

// ===================
// Route Tree
// ===================
const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    campaignRoute,
    landingPageRoute,
    linkGeneratorGenerateRoute,
    linkGeneratorManageRoute,
    linkGeneratorComponentsRoute,
    promotionRoute,
    userSegmentationRoute,
    dataDashboardRoute,
    dataTrackingRoute,
    marketingRoute,
]);

// ===================
// Router Instance
// ===================
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
});

// Register router for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
