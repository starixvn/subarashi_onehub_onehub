import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/libs/utils';
import { env } from '@/configs/env';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactElement;
    path?: string;
    children?: NavItem[];
}

const navigationItems: NavItem[] = [
    {
        id: 'campaign',
        label: 'Campaign Management',
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
        path: '/campaign-management',
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
        path: '/landing-page',
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
                path: '/link-generator/generate',
            },
            {
                id: 'link-management',
                label: 'Link Management',
                icon: <></>,
                path: '/link-generator/manage',
            },
            {
                id: 'component-management',
                label: 'Component Management',
                icon: <></>,
                path: '/link-generator/components',
            },
        ],
    },
    {
        id: 'promotion',
        label: 'Promotion Management',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
            </svg>
        ),
        path: '/promotion',
    },
    {
        id: 'user-segmentation',
        label: 'User Segmentation',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
        path: '/user-segmentation',
    },
    {
        id: 'data-dashboard',
        label: 'Data Dashboard',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        path: '/data-dashboard',
    },
    {
        id: 'data-tracking',
        label: 'Data Tracking',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        path: '/data-tracking',
    },
    {
        id: 'marketing',
        label: 'Marketing Requirements',
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
        path: '/marketing',
    },
];

export function Sidebar() {
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
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
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">OS</span>
                    </div>
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
                                            expandedItems.includes(item.id) && 'rotate-90'
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
                                {expandedItems.includes(item.id) && (
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
