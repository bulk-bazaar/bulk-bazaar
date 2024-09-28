// src/components/Settings.jsx
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useNavigate} from "react-router-dom";
import {persistor, resetStore} from "../../../store";
import useMode from "../../../components1/common/hooks/useMode";
import Address from './Address';
import {userActions} from "../../../store/User.store";
import {commonActions} from "../../../store/Common.store";

const SettingsPage = () => {
    const {isCurrentDarkmode, setIsCurrentDarkmode} = useMode()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
    });

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setPersonalInfo((prev) => ({...prev, [name]: value}));
    };

    const handlePasswordChange = (e: any) => {
        const {name, value} = e.target;
        setPassword((prev) => ({...prev, [name]: value}));
    };

    const handleSavePersonalInfo = () => {
        dispatch(userActions.updateInfo({
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            mobile: personalInfo.mobile,
        }))
    };


    const handleSavePassword = () => {
        if (password.newPassword !== password.confirmPassword) {
            dispatch(commonActions.showNotification({
                type: 'Error',
                visibility: true,
                message: "Password doesn't match!"
            }))
        } else {
            dispatch(userActions.changePassword({
                currentPassword: password.currentPassword,
                newPassword: password.confirmPassword,
            })).unwrap()
                .then((response: any) => {
                    dispatch(commonActions.showNotification({
                        type:'Notification',
                        visibility: true,
                        message: response.message
                    }))
                })
                .catch((error: any) => {
                    dispatch(commonActions.showNotification({
                        type:'Error',
                        visibility: true,
                        message: error.message
                    }))
                });
        }
    };

    const handleLogout = () => {
        dispatch(resetStore());
        persistor.purge();
        navigate("/login")
    };
    const toggleTheme = () => {
        setIsCurrentDarkmode(!isCurrentDarkmode);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-3xl font-bold text-center">Settings</h2>
            {/* Theme Toggle Section */}
            <div className="bg-white shadow-lg rounded-lg dark:bg-slate-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Theme</h3>
                <p className="mb-4">
                    Current Theme: <strong>{isCurrentDarkmode ? 'Dark' : 'Light'}</strong>
                </p>
                <p
                    onClick={toggleTheme}
                    className="text-blue-600 cursor-pointer hover:underline"
                >
                    Switch to {isCurrentDarkmode ? 'Light' : 'Dark'} Theme
                </p>
            </div>
            {/* Personal Information Section */}
            <div className="bg-white shadow-lg rounded-lg dark:bg-slate-800 p-4">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder={user.firstName || 'Enter first name'}
                        value={personalInfo.firstName}
                        onChange={handleChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder={user.lastName || 'Enter lastname'}
                        value={personalInfo.lastName}
                        onChange={handleChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={user.email || 'Enter email'}
                        value={personalInfo.email}
                        onChange={handleChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                    <input
                        type="tel"
                        name="mobile"
                        placeholder={user.mobile || "Enter mobile"}
                        value={personalInfo.mobile}
                        onChange={handleChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                </div>
                <p
                    onClick={handleSavePersonalInfo}
                    className="mt-4 text-blue-600 cursor-pointer hover:underline"
                >
                    Save Changes
                </p>
            </div>
            <Address/>
            {/* Change Password Section */}
            <div className="bg-white shadow-lg rounded-lg dark:bg-slate-800 p-4">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={password.currentPassword}
                        onChange={handlePasswordChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={password.newPassword}
                        onChange={handlePasswordChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={password.confirmPassword}
                        onChange={handlePasswordChange}
                        className="p-2 border bg-white dark:bg-slate-800 rounded-md"
                    />
                </div>
                <p
                    onClick={handleSavePassword}
                    className="mt-4 text-blue-600 cursor-pointer hover:underline"
                >
                    Save Changes
                </p>
            </div>

            {/* Logout Button */}
            <p
                onClick={handleLogout}
                className="w-full py-3 text-red-600 text-center cursor-pointer hover:underline"
            >
                Logout
            </p>
        </div>
    );
};

export default SettingsPage;
