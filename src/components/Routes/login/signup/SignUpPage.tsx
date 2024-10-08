import React, {FormEvent, useState} from 'react';
import ApiService from "../../../../components1/network/ApiService";
import {useNavigate} from "react-router-dom";
import Loader from "../../../../components1/common/ui/Loader";
import LoginInterface from "./../LoginInterface";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: any) => {
        setError('')
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError(`Password doesn't match!`)
            return
        }
        setLoading(true);
        const apiService = new ApiService();
        const response1 = await apiService.post(`/api/users/signup`, {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            password: formData.password,
        });
        switch (response1?.data.code) {
            case LoginInterface.signup.SIGNED_UP:
                navigate(`/verifyOTP/${formData.email}`)
                break
            case LoginInterface.signup.USER_EXISTS:
                setError(response1.data.message)
                break
            default:
                setError(response1?.data.message);
                break
        }
        setLoading(false);
    };

    return isLoading ? <Loader/> : (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium">
                            First name
                            <label className={'text-red-400'}>*</label>
                        </label>
                        <input
                            type="firstName"
                            name="firstName"
                            id="firstName"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium">
                            Last name
                        </label>
                        <input
                            type="lastName"
                            name="lastName"
                            id="lastName"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email address
                            <label className={'text-red-400'}>*</label>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                            <label className={'text-red-400'}>*</label>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">
                            Confirm Password
                            <label className={'text-red-400'}>*</label>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm">
                    Already have an account?{' '}
                    <a href="#/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Log in
                    </a>
                </p>
                <p className="mt-6 text-center text-sm text-red-400">
                    {error}
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
