import React from "react";
import {ReactComponent as Calendar} from "../../../assets/date.svg";
import {Product} from "../../../components1/redux/interfaces";

const InfosTask: React.FC<{ product: Product; isListInView1: boolean }> =
    ({product, isListInView1}) => {
        // Calculate the progress percentage based on soldQuantity and maximumQuantity
        const calculateProgress = () => {
            return Math.min(100, ((product.soldQuantity || 0) / product.maximumQuantity) * 100);
        };

        const progressPercentage = calculateProgress();

        return (
            <div className="mt-4 p-4 shadow-lg rounded-lg bg-white dark:bg-slate-800 flex flex-col w-full">
                {/* Product Title */}
                <h2 className="text-2xl font-semibold mb-2 dark:text-slate-200">
                    {product.title}
                </h2>

                {/* Product Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {product.description}
                </p>

                {/* Product Details */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Min Quantity: {product.minimumQuantity}
          </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
            Max Quantity: {product.maximumQuantity}
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

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Sold Quantity: {product.soldQuantity !== null ? product.soldQuantity : 0}
          </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
            {progressPercentage.toFixed(0)}%
          </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{width: `${progressPercentage}%`}}
                        ></div>
                    </div>
                </div>

                {/* Additional Information */}
                <div
                    className="border-t pt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <Calendar className="mr-2 w-4"/>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    {product.soldQuantity !== null && (
                        <span>Sold: {product.soldQuantity}</span>
                    )}
                </div>

                {/* Seller and Approval Info */}
                <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Seller ID: {product.sellerId}</span>
                    {product.approved === null ? (
                        <span className="text-yellow-500">Pending Approval</span>
                    ) : (
                        <span className="text-green-500">Approved</span>
                    )}
                </div>
            </div>
        );
    };

export default InfosTask;
