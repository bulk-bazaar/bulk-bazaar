import React from "react";
import {Product} from "../../../components1/redux/interfaces";
import {tasksActions} from "../../../store/Product.store";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks";

const InfosTask: React.FC<{ product: Product; isListInView1: boolean }> =
    ({product, isListInView1}) => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch();
        const calculateProgress = () => {
            return Math.min(100, ((product.soldQuantity || 0) / product.maximumQuantity) * 100);
        };

        const progressPercentage = calculateProgress();

        return (
            <div className="mt-4 p-6 border rounded-lg bg-white dark:bg-slate-800 shadow-lg xl:mx-[25%]" onClick={() => {
                dispatch(tasksActions.addCurrentProduct(product))
                navigate("/product")
            }}>
                <div className="flex">
                    <img src={'https://m.media-amazon.com/images/I/51DJ-9xkuQL._AC_UF1000,1000_QL80_.jpg'}
                         alt={product.title} className="w-1/3 rounded-lg mr-4 h-32 object-cover"/>
                    <div className="flex flex-col w-2/3">
                        <h2 className="text-2xl font-bold mb-2 dark:text-slate-200">
                            {product.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {product.description}
                        </p>
                    </div>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Min: {product.minimumQuantity}
                </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                    Max: {product.maximumQuantity}
                </span>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                            ₹{product.price}
                        </p>
                        <p className="text-sm line-through text-gray-400 dark:text-gray-500">
                            ₹{product.mrp}
                        </p>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Sold: {product.soldQuantity || 0}
                </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                    {progressPercentage.toFixed(0)}%
                </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-600">
                        <div
                            className="bg-orange-500 h-2.5 rounded-full"
                            style={{width: `${progressPercentage}%`}}
                        ></div>
                    </div>
                </div>
                <div
                    className="pt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{new Date().toLocaleDateString()}</span>
                    {product.soldQuantity !== null && (
                        <span>Seller ID: {product.sellerId}</span>
                    )}
                </div>
                {/*<div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Seller ID: {product.sellerId}</span>
                    {product.approved === null ? (
                        <span className="text-yellow-500">Pending Approval</span>
                    ) : (
                        <span className="text-green-500">Approved</span>
                    )}
                </div>*/}
            </div>
        );
    };

export default InfosTask;
