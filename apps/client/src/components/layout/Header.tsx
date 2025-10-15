import { useState } from 'react';
import { useAuth, useLogout } from '@/pages/login/hooks';

export function Header() {
    const { user } = useAuth();
    const logoutMutation = useLogout();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
            {/* User Section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </button>

                {/* User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <span className="text-sm text-gray-600">
                            Hello,{' '}
                            <span className="font-medium text-gray-900">
                                {user?.username || 'User'}
                            </span>
                        </span>
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.username || 'User'}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    // Handle profile navigation
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    // Handle settings navigation
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </button>
                            <button
                                onClick={() => {
                                    logoutMutation.mutate();
                                    setShowDropdown(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
