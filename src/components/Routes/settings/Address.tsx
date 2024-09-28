import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {addressActions} from "../../../store/Address.store";

const Address = () => {
    const dispatch = useAppDispatch();
    const addresess: any = useAppSelector((state) => state.address.addresess);
    const [address, setAddress] = useState({
        address: addresess.length > 0 ? addresess[0].houseNumber : '',
        pincode: addresess.length > 0 ? addresess[0].pincode : '',
        streetAddress: addresess.length > 0 ? addresess[0].street_address : '',
    });

    const handleSaveAddress = () => {
        if( addresess.length > 0){
            dispatch(addressActions.updateAddress(
                {
                    id: addresess[0].id,
                    houseNumber: address.address,
                    street_address: address.streetAddress,
                    pincode: address.pincode,
                }
            ))
        }else{
            dispatch(addressActions.createAddress(
                {
                    houseNumber: address.address,
                    street_address: address.streetAddress,
                    pincode: address.pincode,
                }
            ))
        }

    };

    useEffect(() => {
        setAddress({
            address: addresess.length > 0 ? addresess[0].houseNumber : '',
            pincode: addresess.length > 0 ? addresess[0].pincode : '',
            streetAddress: addresess.length > 0 ? addresess[0].street_address : ''
        })
    }, [addresess]);

    useEffect(() => {
        dispatch(addressActions.fetchAddress(''))
    }, []);
    const handleAddressChange = (e: any) => {
        const {name, value} = e.target;
        setAddress((prev) => ({...prev, [name]: value}));
    };
    {/* Address Section */
    }
    return (<div className="bg-white shadow-lg rounded-lg dark:bg-slate-800 p-4">
        <h3 className="text-xl font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={handleAddressChange}
                className="p-2 border bg-white dark:bg-slate-800 rounded-md"
            />
            <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                className="p-2 border bg-white dark:bg-slate-800 rounded-md"
            />
        </div>
        <input
            type="text"
            name="streetAddress"
            placeholder="StreetAddress"
            value={address.streetAddress}
            onChange={handleAddressChange}
            className="p-2 border mt-4 w-full bg-white dark:bg-slate-800 rounded-md"
        />
        <p onClick={handleSaveAddress}
           className="mt-4 text-blue-600 cursor-pointer hover:underline">
            Save Changes
        </p>
    </div>)
}

export default Address;