import React, {FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ApiService from "../../network/ApiService";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const apiService = new ApiService();
        const response1 = await apiService.post(`/api/users/login`, {
            email: email,
            password: password,
        });
        if (response1?.status === 200) {
            switch (response1.data.type){
                case 'USER_LOGGED_IN':
                    navigate("/bulk-bazaar")
                    break
                case 'USER_PENDING_OTP_VERIFICATION':
                    break
                case 'USER_PASSWORD_INCORRECT':
                    setError(response1.data.message)
                    break
                case 'USER_DOES_NOT_EXISTS':
                    setError(response1.data.message)
                    break
                default :
                    setError(response1?.data?.message)
                    break
            }
        } else {
            setError(response1?.data?.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="h-4 w-4 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href={"#/forgotpassword"} className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm">
                    Don't have an account?{' '}
                    <a href={"#/signup"} className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up
                    </a>
                </p>
                <p className="mt-6 text-center text-sm text-red-400">
                    {error}
                </p>
            </div>
        </div>
    );
};

export default Login;