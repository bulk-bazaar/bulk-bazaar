import React, {FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ApiService from "../../../components1/network/ApiService";
import {userActions} from "../../../store/User.store";
import {useAppDispatch} from "../../../store/hooks";
import Loader from "../../../components1/common/ui/Loader";
import LoginInterface from "./LoginInterface";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const apiService = new ApiService();
        const response1 = await apiService.post(`/api/users/login`, {
            email: email,
            password: password,
        });
        switch (response1?.data.code) {
            case LoginInterface.login.LOGGED_IN:
                dispatch(userActions.setToken(response1.headers["authorization"]))
                dispatch(userActions.setUser(response1.data.data))
                navigate("/bulk-bazaar", {replace: true})
                break
            case LoginInterface.login.PENDING_OTP_VERIFICATION:
                break
            case LoginInterface.login.PASSWORD_INCORRECT:
                setError(response1.data.message)
                break
            case LoginInterface.login.NOT_REGISTERED:
                setError(response1.data.message)
                break
            default :
                setError(response1?.data?.message)
                break
        }
        setLoading(false);
    };

    return isLoading ? <Loader/> : (
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