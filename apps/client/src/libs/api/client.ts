import { env } from '@/configs/env';
import { tokenManager } from '@/libs/storage/tokenManager';

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = env.API_BASE_URL) {
        this.baseURL = baseURL;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = tokenManager.getToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const error: ApiError = {
                    message: 'An error occurred',
                    status: response.status,
                };

                try {
                    const errorData = await response.json();
                    error.message = errorData.message || error.message;
                    error.errors = errorData.errors;
                } catch {
                    error.message = response.statusText;
                }

                throw error;
            }

            // Handle 204 No Content
            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error && 'status' in error) {
                throw error;
            }
            throw {
                message: error instanceof Error ? error.message : 'Network error',
                status: 0,
            } as ApiError;
        }
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();
