export function CampaignManagementPage() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Welcome back! Here's an overview of your campaigns.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Campaigns"
                    value="24"
                    change="+12%"
                    isPositive={true}
                    icon={
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    }
                />
                <StatCard
                    title="Active Links"
                    value="156"
                    change="+8%"
                    isPositive={true}
                    icon={
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Clicks"
                    value="12.5K"
                    change="+23%"
                    isPositive={true}
                    icon={
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                        </svg>
                    }
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.2%"
                    change="-2%"
                    isPositive={false}
                    icon={
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Campaigns */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Campaigns</h2>
                    <div className="space-y-4">
                        <CampaignItem
                            name="Summer Sale 2024"
                            status="Active"
                            clicks="2,345"
                            date="2 days ago"
                        />
                        <CampaignItem
                            name="Product Launch"
                            status="Active"
                            clicks="1,823"
                            date="5 days ago"
                        />
                        <CampaignItem
                            name="Holiday Promo"
                            status="Paused"
                            clicks="892"
                            date="1 week ago"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <QuickActionButton
                            label="Create Campaign"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            }
                        />
                        <QuickActionButton
                            label="Generate Link"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                    />
                                </svg>
                            }
                        />
                        <QuickActionButton
                            label="View Analytics"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            }
                        />
                        <QuickActionButton
                            label="Manage Users"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactElement;
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
                <span
                    className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                >
                    {change}
                </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
    );
}

interface CampaignItemProps {
    name: string;
    status: string;
    clicks: string;
    date: string;
}

function CampaignItem({ name, status, clicks, date }: CampaignItemProps) {
    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-1">
                <h4 className="font-medium text-gray-900">{name}</h4>
                <p className="text-sm text-gray-500">{date}</p>
            </div>
            <div className="text-right mr-4">
                <p className="text-sm font-medium text-gray-900">{clicks} clicks</p>
                <span
                    className={`text-xs px-2 py-1 rounded-full ${
                        status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}

interface QuickActionButtonProps {
    label: string;
    icon: React.ReactElement;
}

function QuickActionButton({ label, icon }: QuickActionButtonProps) {
    return (
        <button className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-lg transition-all group">
            <div className="text-gray-600 group-hover:text-blue-600 mb-2">{icon}</div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {label}
            </span>
        </button>
    );
}
