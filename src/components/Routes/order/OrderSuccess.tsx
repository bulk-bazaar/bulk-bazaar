import React from "react";
import {useNavigate} from "react-router-dom";

const OrderSuccess: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            {/* Success Checkmark */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6 text-center">
                Thank you for your purchase. You will receive an order confirmation email shortly.
            </p>

            {/* Action Button */}
            <button
                onClick={() => navigate('/orders')}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
                View My Orders
            </button>
        </div>
    );
};

export default OrderSuccess;
