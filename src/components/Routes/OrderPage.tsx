import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {ordersActions} from "../../store/Order.store";
import Loader from "../../components1/common/ui/Loader";
import {commonActions} from "../../store/Common.store";


// Function to group orders by date
const groupOrdersByDate = (orders: any) => {
    return orders.reduce((acc: any, order: any) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(order);
        return acc;
    }, {});
};

const OrderPage = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders.orders);
    const groupedOrders = groupOrdersByDate(orders);
    useEffect(() => {
        dispatch(ordersActions.fetchOrders(''))
            .unwrap()
            .then((response: any) => {
                setLoading(false)
                dispatch(ordersActions.clearCart())
            })
            .catch((error: any) => {

                dispatch(commonActions.showNotification({
                    type:'Error',
                    visibility: true,
                    message: error.message
                }))
            });
    }, []);
    return isLoading ? <Loader/> :(
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Order List</h1>

                {/* Displaying orders with date as separator */}
                <div className="flex flex-col space-y-4">
                    {Object.keys(groupedOrders).map((date) => (
                        <React.Fragment key={date}>
                            {/* Date Header */}
                            <h2 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-2">{date}</h2>

                            {/* Display each order separately */}
                            {groupedOrders[date].map((order: any) => (
                                <div className="bg-white shadow-lg rounded-lg dark:bg-slate-800 p-4" key={order.id}>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={'https://m.media-amazon.com/images/I/51DJ-9xkuQL._AC_UF1000,1000_QL80_.jpg'}
                                            alt={`Order ${order.id}`}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{order.title}</h3>
                                            <p className="text-gray-600">Quantity: {order.quantity}</p>
                                            {/* Highlighting the amount */}
                                            <p className="mt-1 text-2xl font-bold">
                                                ₹{order.price*order.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
