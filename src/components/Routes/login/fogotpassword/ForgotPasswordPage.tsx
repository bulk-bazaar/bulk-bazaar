import React, { useState } from 'react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        // e.preventDefault();
        // Handle password reset logic here
        console.log('Password reset email sent to:', email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Your Password?</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter your email address and we’ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                        <button
                            type="submit"
                            className="btn"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <a href="/#/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Go back to Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
