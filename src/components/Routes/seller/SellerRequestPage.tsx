import React, {useState} from 'react';

const SellerRequestPage: React.FC = () => {
    const [pancard, setPancard] = useState('');
    const [amount, setAmount] = useState('5000'); // Example security amount
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (termsAccepted && pancard) {
            setSubmitted(true);
        } else {
            alert('Please fill in all details and accept the terms.');
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold mb-4">Request Submitted Successfully!</h2>
                <p className="mb-6">Thank you for your request. We will process it shortly.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 border border-gray-500 rounded-md focus:outline-none"
                >
                    Raise Another Request
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Request to Become a Seller</h1>

            <form onSubmit={handleSubmit} className="flex flex-col stylesInputsField">
                {/* Security Amount */}
                <div className="text-xl font-bold">
                    <label>
                        Security Amount
                        <input
                            type="text"
                            readOnly
                            value={`₹${amount}`}
                            className="w-full"
                        />
                    </label>
                </div>

                {/* PAN Card Details */}
                <div className="mb-4">
                    <label>
                        PAN Card Number
                        <input
                            type="text"
                            value={pancard}
                            onChange={(e) => setPancard(e.target.value)}
                            placeholder="Enter your PAN Card number"
                            className="w-full"
                        />
                    </label>
                </div>

                {/* Accept Terms and Conditions */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="w-full"
                        />
                        <span className="ml-2">
                            I accept the <a href="#" className="underline">Terms and Conditions</a>
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellerRequestPage;
