import { apiClient } from '@/libs/apiClient';
import { type User } from '@/stores';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    errorCode: number;
    errorMessage: string;
    result?: {
        user: User;
        accessToken: string; // Not used in client, stored as HTTP-only cookie
        refreshToken: string; // Not used in client, stored as HTTP-only cookie
    };
}

/**
 * Authentication API
 * Handles all auth-related API calls
 *
 * Note: Token refresh is automatically handled by apiClient on 401 errors
 */
export const authApi = {
    login: (data: LoginRequest) => {
        return apiClient.post<LoginResponse>('/auth/login', data);
    },

    logout: () => {
        return apiClient.post('/auth/logout');
    },
};
