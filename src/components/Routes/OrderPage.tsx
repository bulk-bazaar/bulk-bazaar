import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {ordersActions} from "../../store/Order.store";

// Sample order data (your data)
const ordersData = [
    {
        id: 11,
        userId: 1,
        totalAmount: 3300,
        status: "Completed",
        createdAt: "2024-09-26T15:13:03.000Z",
        updatedAt: "2024-09-26T15:13:21.000Z",
        imageUrl: 'https://via.placeholder.com/100' // Placeholder image URL
    },
    {
        id: 12,
        userId: 1,
        totalAmount: 3300,
        status: "Completed",
        createdAt: "2024-09-26T17:32:58.000Z",
        updatedAt: "2024-09-26T17:33:37.000Z",
        imageUrl: 'https://via.placeholder.com/100'
    },
    {
        id: 13,
        userId: 1,
        totalAmount: 8828,
        status: "Completed",
        createdAt: "2024-09-27T04:44:24.000Z",
        updatedAt: "2024-09-27T04:44:24.000Z",
        imageUrl: 'https://via.placeholder.com/100'
    },
    {
        id: 14,
        userId: 1,
        totalAmount: 7700,
        status: "Completed",
        createdAt: "2024-09-27T04:54:49.000Z",
        updatedAt: "2024-09-27T04:54:49.000Z",
        imageUrl: 'https://via.placeholder.com/100'
    },
    {
        id: 15,
        userId: 1,
        totalAmount: 1300,
        status: "Completed",
        createdAt: "2024-09-27T05:04:39.000Z",
        updatedAt: "2024-09-27T05:04:39.000Z",
        imageUrl: 'https://via.placeholder.com/100'
    }
];

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
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders.orders);
    const groupedOrders = groupOrdersByDate(orders);
    useEffect(() => {
        dispatch(ordersActions.fetchOrders(''))
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center">
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
                                            src={order.imageUrl}
                                            alt={`Order ${order.id}`}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                                            <p className="text-gray-600">User ID: {order.userId}</p>
                                            {/* Highlighting the amount */}
                                            <p className="mt-1 text-2xl font-bold">
                                                ${order.totalAmount}
                                            </p>
                                            {/* Highlighting the status */}
                                            <p className="mt-1 text-sm font-medium border border-gray-400 rounded px-2 py-1 inline-block">
                                                {order.status}
                                            </p>
                                        </div>
                                        {/* Date information */}
                                        <div className="text-right">
                                            <p className="text-xs font-semibold">Created At:</p>
                                            <p className="text-xs">{new Date(order.createdAt).toLocaleString()}</p>
                                            <p className="text-xs font-semibold">Updated At:</p>
                                            <p className="text-xs">{new Date(order.updatedAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    {/* Divider for each order */}
                                    <hr className="my-4 border-t border-gray-300" />
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
