import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
    theme: Theme;
    sidebarCollapsed: boolean;
    sidebarExpanded: string[]; // IDs of expanded sidebar items
}

interface UIActions {
    setTheme: (theme: Theme) => void;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    toggleSidebarItem: (itemId: string) => void;
    setSidebarExpanded: (itemIds: string[]) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            // State
            theme: 'light',
            sidebarCollapsed: false,
            sidebarExpanded: [],

            // Actions
            setTheme: (theme) => set({ theme }),

            toggleSidebar: () =>
                set((state) => ({
                    sidebarCollapsed: !state.sidebarCollapsed,
                })),

            setSidebarCollapsed: (collapsed) =>
                set({
                    sidebarCollapsed: collapsed,
                }),

            toggleSidebarItem: (itemId) =>
                set((state) => ({
                    sidebarExpanded: state.sidebarExpanded.includes(itemId)
                        ? state.sidebarExpanded.filter((id) => id !== itemId)
                        : [...state.sidebarExpanded, itemId],
                })),

            setSidebarExpanded: (itemIds) =>
                set({
                    sidebarExpanded: itemIds,
                }),
        }),
        {
            name: 'ui-storage',
        }
    )
);
