import React, { useEffect, useState } from "react";
import { Drawer, IconButton, Typography } from "@mui/material";

// Define the types for the props
export type MessageType = 'Error' | 'Notification';

export interface MessageAlertProps {
    visibility: boolean;
    message: string;
    type: MessageType;
}

const MessageAlert: React.FC<MessageAlertProps> = ({ visibility, message, type }) => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const hideAfterSec = () => {
        setTimeout(() => {
            setShowDrawer(false);
        }, 5000); // Hide after 5 seconds
    };

    useEffect(() => {
        if (visibility) {
            setShowDrawer(true);
            hideAfterSec();
        }
    }, [visibility, message, type]);

    // Determine the background color based on the message type
    const backgroundColor = type === 'Error' ? 'bg-red-500' : 'bg-green-500';

    return (
        <Drawer
            anchor="top"
            variant={'temporary'}
            open={showDrawer}
            onClose={() => {
                setShowDrawer(false);
            }}
        >
            <div className={`flex flex-row justify-between items-center p-2 ${backgroundColor}`}>
                <Typography color="white" className="mb-8 pr-4 font-normal">
                    {message}
                </Typography>

                <IconButton onClick={() => {
                    setShowDrawer(false);
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </div>
        </Drawer>
    );
};

export default MessageAlert;
