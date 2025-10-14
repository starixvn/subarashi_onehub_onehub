import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { env } from '@/configs/env';
import { useLogin } from './hooks';
import { loginSchema, type LoginFormData } from '@/libs/validators';
import logo from '@/assets/images/logo.svg';

export default function LoginPage() {
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            loginMutation.mutate({
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            // Error handling is done by the mutation
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                        <img src={logo} alt="ONEHub Logo" className="w-16 h-16" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{env.APP_NAME}</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {loginMutation.isError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">
                                {loginMutation.error instanceof Error
                                    ? loginMutation.error.message
                                    : 'Login failed. Please try again.'}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={loginMutation.isPending}
                            className="w-full"
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
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
