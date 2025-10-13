import { apiClient } from '@/libs/apiClient';
import { type User } from '@/stores';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    // Note: Token is set as HTTP-only cookie by backend, not in response body
}

/**
 * Authentication API
 * Handles all auth-related API calls
 */
export const authApi = {
    login: (data: LoginRequest) => {
        return apiClient.post<LoginResponse>('/auth/login', data);
    },

    logout: () => {
        return apiClient.post('/auth/logout');
    },

    getCurrentUser: () => {
        return apiClient.get<User>('/auth/me');
    },

    refreshToken: () => {
        // HTTP-only cookie is sent automatically with credentials: 'include'
        return apiClient.post<{ success: boolean }>('/auth/refresh');
    },
};
