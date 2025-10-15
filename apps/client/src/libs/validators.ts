import { z } from 'zod';

/**
 * Validation schemas using Zod
 */

// Login schema
export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Add more schemas as needed
