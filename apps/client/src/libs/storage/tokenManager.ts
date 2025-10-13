import { storage } from '@/libs/storage/localStorage';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
    getToken: (): string | null => {
        return storage.get<string>(TOKEN_KEY);
    },

    setToken: (token: string): void => {
        storage.set(TOKEN_KEY, token);
    },

    getRefreshToken: (): string | null => {
        return storage.get<string>(REFRESH_TOKEN_KEY);
    },

    setRefreshToken: (token: string): void => {
        storage.set(REFRESH_TOKEN_KEY, token);
    },

    clearTokens: (): void => {
        storage.remove(TOKEN_KEY);
        storage.remove(REFRESH_TOKEN_KEY);
    },

    hasToken: (): boolean => {
        return !!tokenManager.getToken();
    },
};
