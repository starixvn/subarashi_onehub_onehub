import axios, {
    type AxiosInstance,
    type AxiosError,
    type InternalAxiosRequestConfig,
    type AxiosRequestConfig,
} from 'axios';
import { env } from '@/configs/env';
import { useAuthStore } from '@/stores';

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export class ApiClient {
    private axiosInstance: AxiosInstance;
    private isRefreshing: boolean = false;
    private refreshSubscribers: Array<(token: string) => void> = [];

    constructor(baseURL: string = env.API_BASE_URL) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Important: Send HTTP-only cookies with requests
        });

        this.setupInterceptors();
    }

    private subscribeTokenRefresh(callback: (token: string) => void) {
        this.refreshSubscribers.push(callback);
    }

    private onRefreshed(token: string) {
        this.refreshSubscribers.forEach((callback) => callback(token));
        this.refreshSubscribers = [];
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const { user } = useAuthStore.getState();

            if (!user?.userId) {
                return false;
            }

            const response = await axios.post(
                `${this.axiosInstance.defaults.baseURL}/auth/refresh`,
                { userId: user.userId },
                { withCredentials: true }
            );

            if (response.status === 200) {
                this.onRefreshed('refreshed');
                return true;
            }

            return false;
        } catch {
            return false;
        }
    }

    private setupInterceptors() {
        // Response interceptor for handling errors and token refresh
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & {
                    _retry?: boolean;
                };

                // Handle 401 Unauthorized - Try to refresh token
                if (
                    error.response?.status === 401 &&
                    originalRequest &&
                    !originalRequest.url?.toLowerCase().includes('/auth/login') &&
                    !originalRequest._retry
                ) {
                    if (this.isRefreshing) {
                        // Wait for the refresh to complete
                        return new Promise((resolve) => {
                            this.subscribeTokenRefresh(() => {
                                resolve(this.axiosInstance(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const refreshSuccess = await this.refreshToken();

                        if (refreshSuccess) {
                            this.isRefreshing = false;
                            // Retry the original request
                            return this.axiosInstance(originalRequest);
                        }

                        // Refresh failed, logout user
                        this.isRefreshing = false;
                        useAuthStore.getState().logout();

                        return Promise.reject({
                            message: 'Session expired. Please login again.',
                            status: 401,
                        } as ApiError);
                    } catch {
                        this.isRefreshing = false;
                        useAuthStore.getState().logout();

                        return Promise.reject({
                            message: 'Session expired. Please login again.',
                            status: 401,
                        } as ApiError);
                    }
                }

                // Handle other errors
                const apiError: ApiError = {
                    message: 'An error occurred',
                    status: error.response?.status || 0,
                };

                if (error.response?.data) {
                    const errorData = error.response.data as Record<string, unknown>;
                    apiError.message =
                        (errorData.message as string) ||
                        (errorData.errorMessage as string) ||
                        apiError.message;
                    apiError.errors = errorData.errors as Record<string, string[]>;
                } else if (error.message) {
                    apiError.message = error.message;
                }

                return Promise.reject(apiError);
            }
        );
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(endpoint, config);
        return response.data;
    }

    async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post<T>(endpoint, data, config);
        return response.data;
    }

    async put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.put<T>(endpoint, data, config);
        return response.data;
    }

    async patch<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.patch<T>(endpoint, data, config);
        return response.data;
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete<T>(endpoint, config);
        return response.data;
    }
}

export const apiClient = new ApiClient();
