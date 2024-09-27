import React, {useState} from 'react';
import {CartItem} from "../../../components1/redux/interfaces";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ordersActions} from "../../../store/Order.store";
import Loader from "../../../components1/common/ui/Loader";
import CheckoutDetail from "./CheckoutDetail";
import OrderSuccess from "./OrderSuccess";

const CheckoutPage = () => {
    const loading: CartItem[] = useAppSelector((state) => state.orders.loading);
    const dispatch = useAppDispatch();
    const [orderSuccessful, setOrderSuccessful] = useState(false);
    const handleOnCheckoutClick = () => {
        dispatch(ordersActions.placeOrder(''))
            .unwrap()
            .then((response: any) => {
                setOrderSuccessful(true)
                dispatch(ordersActions.clearCart())
            })
            .catch((error: any) => {
                console.log('GAJENDRA E', error)
            });
    }
    return loading ? <Loader/> :
        orderSuccessful ? <OrderSuccess/> : <CheckoutDetail handleOnCheckoutClick={handleOnCheckoutClick}/>;
};

export default CheckoutPage;
