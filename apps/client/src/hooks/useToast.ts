import { toast as sonnerToast, type ExternalToast } from 'sonner';

/**
 * Custom toast hook wrapping Sonner
 * Provides a consistent API for showing toast notifications
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * toast.success('Operation successful!');
 * toast.error('Something went wrong');
 * toast.info('Information message');
 * toast.warning('Warning message');
 * toast.message('Custom message');
 *
 * // With description
 * toast.success('Title', {
 *   description: 'More details here'
 * });
 *
 * // With action button
 * toast.success('File uploaded', {
 *   action: {
 *     label: 'View',
 *     onClick: () => console.log('View clicked')
 *   }
 * });
 * ```
 */
export function useToast() {
    return {
        toast: sonnerToast,
        success: (message: string, options?: ExternalToast) => {
            return sonnerToast.success(message, options);
        },
        error: (message: string, options?: ExternalToast) => {
            return sonnerToast.error(message, options);
        },
        warning: (message: string, options?: ExternalToast) => {
            return sonnerToast.warning(message, options);
        },
        info: (message: string, options?: ExternalToast) => {
            return sonnerToast.info(message, options);
        },
        message: (message: string, options?: ExternalToast) => {
            return sonnerToast(message, options);
        },
        promise: sonnerToast.promise,
        loading: sonnerToast.loading,
        dismiss: sonnerToast.dismiss,
    };
}
