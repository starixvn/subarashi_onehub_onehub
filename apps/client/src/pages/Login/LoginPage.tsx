import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { loginSchema, type LoginFormData } from '@/libs/form/schema/loginSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/providers/AuthProvider';
import { env } from '@/configs/env';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Mock login - in real app, call userApi.login(data)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock successful login
            const mockUser = {
                id: '1',
                email: data.email,
                name: 'Noah',
            };
            const mockToken = 'mock-jwt-token';

            login(mockUser, mockToken);
            navigate({ to: '/' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                        <span className="text-white font-bold text-2xl">OS</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{env.APP_NAME}</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-4 p-4 bg-white/50 backdrop-blur rounded-lg">
                    <p className="text-xs text-gray-600 text-center">
                        <strong>Demo:</strong> Use any email and password (min 6 chars) to login
                    </p>
                </div>
            </div>
        </div>
    );
}
