import { apiClient } from '@/libs/api/client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken?: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export const userApi = {
    login: (data: LoginRequest) => {
        return apiClient.post<LoginResponse>('/auth/login', data);
    },

    logout: () => {
        return apiClient.post('/auth/logout');
    },

    getCurrentUser: () => {
        return apiClient.get<User>('/auth/me');
    },

    refreshToken: (refreshToken: string) => {
        return apiClient.post<{ token: string }>('/auth/refresh', { refreshToken });
    },
};
