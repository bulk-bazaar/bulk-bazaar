import React, {useEffect, useState} from "react";
import {Drawer, IconButton, Typography} from "@mui/material";
import {AlertData} from "../../redux/interfaces";

export interface MessageAlertProps {
    alertData: AlertData;
}

const MessageAlert: React.FC<MessageAlertProps> = ({alertData}) => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const hideAfterSec = () => {
        setTimeout(() => {
            setShowDrawer(false);
        }, 5000); // Hide after 5 seconds
    };

    useEffect(() => {
        setShowDrawer(true);
        hideAfterSec();
    }, [alertData]);

    // Determine the background color based on the message type
    const backgroundColor = alertData.type === 'Error' ? 'bg-red-500' : 'bg-green-500';

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
                    {alertData.message}
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
