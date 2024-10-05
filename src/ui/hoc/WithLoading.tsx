import React from "react";

const WithLoading = ({
                         centerInParent = false,
                         loading,
                         children
}: {
    centerInParent?: boolean,
    loading: boolean,
    children: any
}) => {
    let className = "absolute flex justify-center inset-0 items-center bg-opacity-50"
    if(centerInParent)  className = "absolute flex justify-center inset-0 items-center bg-opacity-50";
    else
        className = "absolute flex justify-center inset-0 pt-[50vh] bg-opacity-50";
    return (
        <div className="relative">
            {loading && (
                <div className={className}>
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
