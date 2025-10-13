/**
 * Type-safe localStorage wrapper
 */

export const storage = {
    get: <T>(key: string, defaultValue?: T): T | null => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : (defaultValue ?? null);
        } catch (error) {
            console.error(`Error getting item ${key} from localStorage:`, error);
            return defaultValue ?? null;
        }
    },

    set: <T>(key: string, value: T): void => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item ${key} in localStorage:`, error);
        }
    },

    remove: (key: string): void => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item ${key} from localStorage:`, error);
        }
    },

    clear: (): void => {
        try {
            window.localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    },
};
