import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { env } from '@/configs/env';
import { router } from '@/routes';

import '@/styles/global.css';

/**
 * Default configuration for TanStack Query
 */
const queryConfig = {
    queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    },
} as const;

const queryClient = new QueryClient({
    defaultOptions: queryConfig,
});

/**
 * App component - the entry point for the application
 * Wraps the router with all necessary providers
 */
export function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster />
                {env.IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
        </StrictMode>
    );
}
