/**
 * Manual Route Tree Configuration
 * This file manually defines the application's route tree structure
 * Routes are imported from the pages/ folder and registered here
 */
import { lazy } from 'react';
import { createRoute, redirect } from '@tanstack/react-router';
import { Route as RootRoute } from '@/routes/__root';
import { DEFAULT_REDIRECT_PATH, ROUTE_PATHS } from '@/configs/routes';

// Lazy-loaded page components for code splitting
const LoginPage = lazy(() => import('@/pages/login'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const CampaignManagementPage = lazy(() => import('@/pages/campaign-management'));
const AssetUploaderPage = lazy(() => import('@/pages/asset-uploader'));
const ComponentManagementPage = lazy(() => import('@/pages/component-management'));
const GenerateLinkPage = lazy(() => import('@/pages/generate-link'));
const LinkManagementPage = lazy(() => import('@/pages/link-management'));
const PageBuilderPage = lazy(() => import('@/pages/page-builder'));
const PageManagementPage = lazy(() => import('@/pages/page-management'));
const RegisterFormManagementPage = lazy(() => import('@/pages/register-form-management'));

/**
 * Index route - redirects "/" to the default page
 */
const IndexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/',
    beforeLoad: () => {
        throw redirect({ to: DEFAULT_REDIRECT_PATH });
    },
});

const NotFoundRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '*',
    component: NotFoundPage,
});

const LoginRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.LOGIN,
    component: LoginPage,
});

const CampaignManagementRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.CAMPAIGN_MANAGEMENT,
    component: CampaignManagementPage,
});

const AssetUploaderRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.ASSET_UPLOADER,
    component: AssetUploaderPage,
});

const ComponentManagementRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.COMPONENTS_MANAGEMENT,
    component: ComponentManagementPage,
});

const GenerateLinkRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.GENERATE_LINK,
    component: GenerateLinkPage,
});

const LinkManagementRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.LINK_MANAGEMENT,
    component: LinkManagementPage,
});

const PageBuilderRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.PAGE_BUILDER,
    component: PageBuilderPage,
});

const PageManagementRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.PAGE_MANAGEMENT,
    component: PageManagementPage,
});

const RegisterFormManagementRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: ROUTE_PATHS.REGISTER_FORM_MANAGEMENT,
    component: RegisterFormManagementPage,
});

/**
 * Route Tree
 * All child routes are registered under the root route
 */
export const routeTree = RootRoute.addChildren([
    IndexRoute,
    LoginRoute,
    CampaignManagementRoute,
    AssetUploaderRoute,
    ComponentManagementRoute,
    GenerateLinkRoute,
    LinkManagementRoute,
    PageBuilderRoute,
    PageManagementRoute,
    RegisterFormManagementRoute,
    NotFoundRoute,
]);
