import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/libs/utils';
import { env } from '@/configs/env';
import { ROUTE_PATHS } from '@/configs/routes';
import { useUIStore } from '@/stores';
import logo from '@/assets/images/logo.svg';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactElement;
    path?: string;
    children?: NavItem[];
}

/**
 * Navigation items configuration with icons and labels
 * Uses ROUTE_PATHS from configs/routes.ts for paths
 */
const navigationItems: NavItem[] = [
    {
        id: 'campaign',
        label: 'Campaign Management',
        path: ROUTE_PATHS.CAMPAIGN_MANAGEMENT,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
    },
    {
        id: 'landing-page',
        label: 'Landing Page CMS',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ),
        children: [
            {
                id: 'page-management',
                label: 'Page Management',
                icon: <></>,
                path: ROUTE_PATHS.PAGE_MANAGEMENT,
            },
            {
                id: 'page-builder',
                label: 'Page Builder',
                icon: <></>,
                path: ROUTE_PATHS.PAGE_BUILDER,
            },
            {
                id: 'asset-uploader',
                label: 'Asset Uploader',
                icon: <></>,
                path: ROUTE_PATHS.ASSET_UPLOADER,
            },
            {
                id: 'register-form-management',
                label: 'Register Form Management',
                icon: <></>,
                path: ROUTE_PATHS.REGISTER_FORM_MANAGEMENT,
            },
        ],
    },
    {
        id: 'link-generator',
        label: 'Link Generator',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
            </svg>
        ),
        children: [
            {
                id: 'generate-link',
                label: 'Generate Link',
                icon: <></>,
                path: ROUTE_PATHS.GENERATE_LINK,
            },
            {
                id: 'link-management',
                label: 'Link Management',
                icon: <></>,
                path: ROUTE_PATHS.LINK_MANAGEMENT,
            },
            {
                id: 'component-management',
                label: 'Component Management',
                icon: <></>,
                path: ROUTE_PATHS.COMPONENTS_MANAGEMENT,
            },
        ],
    },
];

export function Sidebar() {
    const location = useLocation();
    const { sidebarExpanded, toggleSidebarItem } = useUIStore();

    const toggleItem = (id: string) => {
        toggleSidebarItem(id);
    };

    const isActive = (path?: string) => {
        if (!path) return false;
        return location.pathname === path;
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="OneStop Logo" className="w-8 h-8" />
                    <span className="font-semibold text-lg">
                        {env.APP_NAME}{' '}
                        <span className="text-sm text-gray-500">{env.APP_VERSION}</span>
                    </span>
                </div>
            </div>

            {/* Search */}
            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 pl-9 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3">
                {navigationItems.map((item) => (
                    <div key={item.id} className="mb-1">
                        {item.children ? (
                            <>
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                    <svg
                                        className={cn(
                                            'w-4 h-4 transition-transform',
                                            sidebarExpanded.includes(item.id) && 'rotate-90'
                                        )}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                                {sidebarExpanded.includes(item.id) && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.id}
                                                to={child.path || '/'}
                                                className={cn(
                                                    'block px-3 py-2 text-sm rounded-lg',
                                                    isActive(child.path)
                                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                )}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                to={item.path || '/'}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2 text-sm rounded-lg',
                                    isActive(item.path)
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
