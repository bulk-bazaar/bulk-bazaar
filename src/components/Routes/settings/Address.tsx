import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {addressActions} from "../../../store/Address.store";
import WithLoading from "../../../ui/hoc/WithLoading";

const Address = ({onclose}: { onclose: () => void }) => {
    const dispatch = useAppDispatch();
    const addresess: any = useAppSelector((state) => state.address.addresess);
    const loading: any = useAppSelector((state) => state.address.loading);
    const [address, setAddress] = useState({
        address: addresess && addresess.length > 0 ? addresess[0].houseNumber : '',
        pincode: addresess && addresess.length > 0 ? addresess[0].pincode : '',
        streetAddress: addresess && addresess.length > 0 ? addresess[0].street_address : '',
    });

    const handleSaveAddress = () => {
        if (addresess && addresess.length > 0) {
            dispatch(addressActions.updateAddress(
                {
                    id: addresess[0].id,
                    houseNumber: address.address,
                    street_address: address.streetAddress,
                    pincode: address.pincode,
                }
            )).unwrap().then(onclose).catch(onclose)
        } else {
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
            address: addresess && addresess.length > 0 ? addresess[0].houseNumber : '',
            pincode: addresess && addresess.length > 0 ? addresess[0].pincode : '',
            streetAddress: addresess && addresess.length > 0 ? addresess[0].street_address : ''
        })
    }, [addresess && addresess]);

    // useEffect(() => {
    //     dispatch(addressActions.fetchAddress(''))
    // }, []);
    const handleAddressChange = (e: any) => {
        const {name, value} = e.target;
        setAddress((prev) => ({...prev, [name]: value}));
    };
    {/* Address Section */
    }
    return (
        <WithLoading centerInParent={true} loading={loading}>
            <div className="bg-white shadow-lg rounded-lg dark:bg-slate-800 p-4">
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
            </div>
        </WithLoading>
    )
}

export default Address;