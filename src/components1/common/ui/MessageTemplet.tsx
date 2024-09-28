import React from "react";

const MessageTemplet: React.FC<{ title: string, description: string }> = ({title, description}: {
    title: string,
    description: string
}) => {
    return <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg dark:bg-slate-800">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-base text-gray-700 dark:text-gray-300">
            {description}
        </p>
    </div>
};

export default MessageTemplet;
