import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/libs/utils';
import { env } from '@/configs/env';
import { ROUTE_PATHS } from '@/configs/routes';
import { useUIStore } from '@/stores';
import { useDebounce } from '@/hooks';
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
    const {
        sidebarExpanded,
        sidebarCollapsed,
        toggleSidebarItem,
        toggleSidebar,
        setSidebarExpanded,
    } = useUIStore();

    // State for search handling
    const [expandedViaSearch, setExpandedViaSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Debounce search query for better performance (300ms delay)
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const toggleItem = (id: string) => {
        toggleSidebarItem(id);
    };

    const isActive = (path?: string) => {
        if (!path) return false;
        return location.pathname === path;
    };

    // Filter menu items based on debounced search query
    const getFilteredItems = () => {
        if (!debouncedSearchQuery.trim()) {
            return navigationItems; // Return all if no search
        }

        const query = debouncedSearchQuery.toLowerCase();
        const filtered: NavItem[] = [];

        navigationItems.forEach((item) => {
            // Check if parent matches
            const parentMatches = item.label.toLowerCase().includes(query);

            // Check if any children match
            const matchingChildren = item.children?.filter((child) =>
                child.label.toLowerCase().includes(query)
            );

            // Add item if parent or children match
            if (parentMatches && item.children) {
                // Parent matches and has children - show all children
                filtered.push(item);
            } else if (matchingChildren && matchingChildren.length > 0) {
                // Only some children match - show only matching children
                filtered.push({
                    ...item,
                    children: matchingChildren,
                });
            } else if (parentMatches && !item.children) {
                // Single item with no children that matches
                filtered.push(item);
            }
        });

        return filtered;
    };

    const filteredItems = getFilteredItems();

    // Default collapse all parent menus on initial load
    useEffect(() => {
        setSidebarExpanded([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Auto-focus search input when expanded via search icon
    useEffect(() => {
        if (!sidebarCollapsed && expandedViaSearch && searchInputRef.current) {
            searchInputRef.current.focus();
            setExpandedViaSearch(false);
        }
    }, [sidebarCollapsed, expandedViaSearch]);

    // Auto-expand parent items that have matching children when searching
    useEffect(() => {
        if (debouncedSearchQuery.trim() && !sidebarCollapsed) {
            const parentsToExpand: string[] = [];

            navigationItems.forEach((item) => {
                if (item.children) {
                    const hasMatchingChild = item.children.some((child) =>
                        child.label.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                    );

                    if (hasMatchingChild && !sidebarExpanded.includes(item.id)) {
                        parentsToExpand.push(item.id);
                    }
                }
            });

            // Expand all parents with matching children
            parentsToExpand.forEach((id) => {
                if (!sidebarExpanded.includes(id)) {
                    toggleItem(id);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchQuery, sidebarCollapsed]);

    // Handle search icon click
    const handleSearchIconClick = () => {
        setExpandedViaSearch(true);
        toggleSidebar();
    };

    return (
        <aside
            className={cn(
                'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
                sidebarCollapsed ? 'w-16' : 'w-72'
            )}
        >
            {/* Logo and Toggle */}
            <div
                className={cn(
                    'h-16 flex items-center',
                    sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'
                )}
            >
                {!sidebarCollapsed ? (
                    <>
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="ONEHub Logo" className="w-8 h-8" />
                            <span className="font-semibold text-lg">
                                {env.APP_NAME}{' '}
                                <span className="text-sm text-gray-500">{env.APP_VERSION}</span>
                            </span>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            title="Collapse sidebar"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    </>
                ) : (
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Expand sidebar"
                    >
                        <svg
                            className="w-5 h-5"
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
                )}
            </div>

            {/* Search - Full search bar when expanded */}
            {!sidebarCollapsed && (
                <div className="p-4">
                    <div className="relative">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search menus..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 pl-9 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Clear search"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Search Icon - Only show when collapsed */}
            {sidebarCollapsed && (
                <div className="px-3 py-2">
                    <button
                        onClick={handleSearchIconClick}
                        className="w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Search"
                    >
                        <svg
                            className="w-5 h-5 mx-auto"
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
                    </button>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="mb-1 relative">
                            {item.children ? (
                                <>
                                    <button
                                        onClick={() => {
                                            if (sidebarCollapsed) {
                                                // Expand sidebar and expand this menu item
                                                toggleSidebar();
                                                if (!sidebarExpanded.includes(item.id)) {
                                                    toggleItem(item.id);
                                                }
                                            } else {
                                                // Toggle the submenu (expand if collapsed, collapse if expanded)
                                                toggleItem(item.id);
                                            }
                                        }}
                                        className={cn(
                                            'w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors',
                                            sidebarCollapsed ? 'justify-center' : 'justify-between'
                                        )}
                                        title={sidebarCollapsed ? item.label : ''}
                                    >
                                        <div
                                            className={cn(
                                                'flex items-center',
                                                !sidebarCollapsed && 'gap-3'
                                            )}
                                        >
                                            {item.icon}
                                            {!sidebarCollapsed && <span>{item.label}</span>}
                                        </div>
                                        {!sidebarCollapsed && (
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
                                        )}
                                    </button>

                                    {/* Submenu when expanded */}
                                    {!sidebarCollapsed && sidebarExpanded.includes(item.id) && (
                                        <div className="ml-8 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.id}
                                                    to={child.path || '/'}
                                                    className={cn(
                                                        'block px-3 py-2 text-sm rounded-lg transition-colors',
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
                                        'flex items-center py-2 text-sm rounded-lg transition-colors',
                                        sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3',
                                        isActive(item.path)
                                            ? 'bg-blue-50 text-blue-600 font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    )}
                                    title={sidebarCollapsed ? item.label : ''}
                                >
                                    {item.icon}
                                    {!sidebarCollapsed && <span>{item.label}</span>}
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    // No results message
                    <div className="px-3 py-8 text-center text-sm text-gray-500">
                        <svg
                            className="w-12 h-12 mx-auto mb-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="font-medium">No menu items found</p>
                        <p className="text-xs mt-1">Try different search terms</p>
                    </div>
                )}
            </nav>
        </aside>
    );
}
