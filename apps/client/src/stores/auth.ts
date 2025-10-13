import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthActions {
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

/**
 * Auth store using Zustand
 * Note: Tokens are stored in HTTP-only cookies by the backend, not in client state
 * Only user data and auth status are persisted here
 */
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            // State
            user: null,
            isAuthenticated: false,
            isLoading: true,

            // Actions
            login: (user) =>
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                }),

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                }),

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            setLoading: (isLoading) =>
                set({
                    isLoading,
                }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
