import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../components/ui/form';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LoginFormValues, loginSchema } from '../../lib/zod';
import { authenticate } from '../../lib/authenticate';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';

const Login = () => {
    const navigate = useNavigate();
    const { addAuthToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const mutation = useMutation({
        mutationFn: authenticate,
        onSuccess: (data) => {
            if (data.meta.token) {
                addAuthToken(data.meta.token); // Update the token in context and localStorage
                form.reset();
                navigate('/conversations');
            }
        },
        onError: (error) => {
            // Set different error messages for each field
            if (error.message.includes("username")) {
                form.setError('username', { message: error.message });
            } else {
                form.setError('password', { message: error.message });
            }
        }
    });

    const onSubmit = (data: LoginFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex items-center justify-center h-[50vh] bg-gray-100">
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">Welcome</h2>
                    <p className="text-gray-600 mt-1 lg:text-2xl">Please enter your credentials to login</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='lg:text-2xl'>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            aria-label="Username"
                                            aria-invalid={!!form.formState.errors.username}
                                            placeholder="Enter your username"
                                            {...field}
                                            className="mt-1 lg:text-xl"
                                            aria-describedby="username-error" // Link error message
                                        />
                                    </FormControl>
                                    <FormMessage id="username-error" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='lg:text-2xl'>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                aria-label="Password"
                                                aria-invalid={!!form.formState.errors.password}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                {...field}
                                                className="mt-1 lg:text-xl"
                                                aria-describedby="password-error" // Link error message
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage id="password-error" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 lg:text-xl"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>

                        {mutation.isError && (
                            <ErrorMessage className="mt-2" message={mutation.error.message} />
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login;
