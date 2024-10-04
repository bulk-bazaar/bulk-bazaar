import React from "react";

const EmptyMessageView: React.FC<{
    title: string,
    actionName?: string,
    description?: string,
    onClick?: () => void
}> = ({title, actionName, description, onClick}: {
    title: string,
    actionName?: string,
    description?: string,
    onClick?: () => void
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-slate-800 my-8">
            {/* Empty State Illustration (optional) */}
            <div className="mb-6">
                <svg
                    className="w-24 h-24 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h18M9 3v4h6V3M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                    ></path>
                </svg>
            </div>

            {/* Empty Orders Message */}
            <h2 className="text-2xl font-bold mb-2">
                {title}
            </h2>
            <p className="mb-6 text-center">
                {description}
            </p>

            {actionName &&
                <button
                    onClick={onClick}
                    className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {actionName}
                </button>
            }
        </div>
    );
};

export default EmptyMessageView;
