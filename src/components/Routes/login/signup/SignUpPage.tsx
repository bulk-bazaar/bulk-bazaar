import React, {FormEvent, useState} from 'react';
import ApiService from "../../../network/ApiService";
import {useNavigate} from "react-router-dom";
import _ from 'lodash';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e:any) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setError(`Password doesn't match!`)
            return
        }
        const apiService = new ApiService();
        const response1 = await apiService.get(`/api/users/${formData.email}`);
        if (response1?.status === 200) {
            if (response1?.data.length === 0){
                try {
                    const filteredformData = _.omitBy(
                        _.omit(formData, ['confirmPassword']),
                        (value) => value === null || value === undefined || value === ''  // Then remove empty values
                    );

                    await apiService.post(`/api/users`, filteredformData);
                    navigate("/login")
                }catch (e: any){
                    setError(e.response.data.details[0].message);
                }
            }else{
                setError("User already exist!");
            }
        } else {
            setError("Error occurred!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
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

                <p className="mt-6 text-center text-sm text-gray-600">
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
