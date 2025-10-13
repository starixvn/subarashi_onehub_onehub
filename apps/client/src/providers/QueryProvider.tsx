import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';
import { queryClient } from '@/configs/query';
import { env } from '@/configs/env';

export function QueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {env.isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}
