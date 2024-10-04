import React from "react";

const WithLoading = ({ loading, children }: { loading: boolean, children: any }) => {
    return (
        <div className="relative">
            {loading && (
                <div className="absolute flex justify-center inset-0 pt-[50vh] bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            )}
            <div className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default WithLoading;
