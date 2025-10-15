import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores';
import { authApi, type LoginRequest } from './api';
import { sessionManager } from '@/libs/storage';

/**
 * Hook to access auth state and actions
 */
export function useAuth() {
    const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();

    useEffect(() => {
        // Check if user exists in auth store
        if (!user && !isAuthenticated) {
            // In a real app, you'd validate the session with the backend
            // For now, we'll just check the persisted store
            const storedUserStr = localStorage.getItem('auth-storage');
            if (storedUserStr) {
                try {
                    const storedData = JSON.parse(storedUserStr);
                    if (storedData.state?.user && storedData.state?.isAuthenticated) {
                        setLoading(false);
                        return;
                    }
                } catch {
                    // Invalid storage, continue
                }
            }
        }
        setLoading(false);
    }, [user, isAuthenticated, setLoading]);

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout: () => {
            sessionManager.clearSession();
            logout();
        },
    };
}

/**
 * Hook for login mutation
 * @param path - Optional redirect path after successful login (defaults to '/')
 */
export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: (response) => {
            if (response.errorCode === 0 && response.result?.user) {
                // Token is automatically set as HTTP-only cookie by backend
                // We only need to update the client-side auth state
                login(response.result.user);
                navigate({ to: '/' });
            } else {
                throw new Error(response.errorMessage || 'Login failed');
            }
        },
    });
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            // Backend clears HTTP-only cookie
            // Clear client-side session data
            sessionManager.clearSession();
            logout();
            navigate({ to: '/login' as '/' });
        },
        onError: () => {
            // Even if API call fails, logout locally
            sessionManager.clearSession();
            logout();
            navigate({ to: '/login' as '/' });
        },
    });
}
