import React, {useState} from 'react';
import ApiService from "../../../../components1/network/ApiService";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../../../components1/common/ui/Loader";
import LoginInterface from "./../LoginInterface";

const VerifyOTPPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [otp, setOTP] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        const apiService = new ApiService();
        const response1 = await apiService.post(`/api/users//otp/verify`, {
            email: params.email,
            otp: otp
        });
        switch (response1?.data.type) {
            case LoginInterface.verifyOTP.VERIFIED_OTP:
                navigate("/login")
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
                <h2 className="text-2xl font-bold mb-6 text-center">Verify</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter OTP received in your email address to verify your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            OTP
                        </label>
                        <input
                            type="number"
                            id="otp"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn"
                        >
                            Verify
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <a href="#/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Go back to Login
                    </a>
                </p>
            </div>

            <p className="mt-6 text-center text-sm text-red-400">
                {error}
            </p>
        </div>
    );
};

export default VerifyOTPPage;
