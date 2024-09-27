import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ordersActions} from "../../../store/Order.store";
import {CartItem} from "../../../components1/redux/interfaces"; // Assuming useAppSelector is from your store setup

const ProductDetailPage: React.FC = () => {
    const dispatch = useAppDispatch();
    // Fetch the current product from the Redux store
    const product = useAppSelector((state) => state.products.current);
    const cartItems: CartItem[] = useAppSelector((state) => state.orders.cartItems);
    const [quantity, setQuantity] = useState<number>(product.minimumQuantity);
    const [cartAdded, setCartAdded] = useState<boolean>(false);
    // Effect to check if the product is in the cart and update the state accordingly
    useEffect(() => {
        // Find the product in the cart by its productId
        const cartItem = cartItems.find(item => item.product.id === product.id);

        if (cartItem) {
            // If product is in the cart, set cartAdded to true and update the quantity to the cart item's quantity
            setCartAdded(true);
            setQuantity(cartItem.quantity);
        } else {
            // If product is not in the cart, reset the quantity to minimumQuantity and set cartAdded to false
            setCartAdded(false);
            setQuantity(product.minimumQuantity);
        }
    }, [cartItems, product]); // Re-run the effect if cartItems or product changes
    // Calculate total price
    const totalPrice = quantity * product.price;

    // Calculate progress percentage based on soldQuantity and maximumQuantity
    const progressPercentage =
        product.soldQuantity && product.maximumQuantity
            ? (product.soldQuantity / product.maximumQuantity) * 100
            : 0;

    // Increase quantity to buy
    const increaseQuantity = () => {
        if (quantity < product.maximumQuantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    // Decrease quantity to buy
    const decreaseQuantity = () => {
        if (quantity > product.minimumQuantity) {
            setQuantity((prev) => prev - 1);
        }
    };

    // Handle Add to Cart
    const handleAddToCart = () => {
        setCartAdded(true);
        dispatch(ordersActions.addToCart({ quantity: quantity, product: product}))
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-slate-800">
            {/* Main Product Information */}
            <div className="flex flex-col md:flex-row items-start md:space-x-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://via.placeholder.com/600"
                        alt={product.title}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-4 dark:text-slate-200">
                        {product.title}
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        {product.description}
                    </p>

                    {/* Price Information */}
                    <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              ₹{product.price}
            </span>
                        <span className="ml-4 text-xl line-through text-gray-500 dark:text-gray-400">
              ₹{product.mrp}
            </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={decreaseQuantity}
                            className="bg-gray-300 text-gray-800 w-10 h-10 rounded-full flex items-center justify-center dark:bg-gray-700 dark:text-gray-200"
                            disabled={quantity <= product.minimumQuantity}
                        >
                            -
                        </button>
                        <span className="px-6 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              {quantity}
            </span>
                        <button
                            onClick={increaseQuantity}
                            className="bg-gray-300 text-gray-800 w-10 h-10 rounded-full flex items-center justify-center dark:bg-gray-700 dark:text-gray-200"
                            disabled={quantity >= product.maximumQuantity}
                        >
                            +
                        </button>
                    </div>

                    {/* Total Price */}
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-200 mb-6">
                        Total: ₹{totalPrice}
                    </p>

                    {/* Add to Cart Button */}
                    <div className="mb-6">
                        {cartAdded ? (
                            <p className="text-green-600 font-semibold">Added to cart!</p>
                        ) : product.soldQuantity >= product.maximumQuantity ?
                            <p className="text-green-600 font-semibold">Out of stock!</p>  : (
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-blue-600 text-white py-3 px-6 font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                            )}
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold dark:text-slate-200 mb-4">
                    Product Status
                </h2>
                <div className="bg-gray-200 rounded-full h-6 mb-4 dark:bg-gray-600">
                    <div
                        className="bg-green-500 h-6 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Sold: {product.soldQuantity || 0} / {product.maximumQuantity} KG
                </p>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold dark:text-slate-200 mb-4">
                    Terms and Conditions
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    By purchasing this product, you agree to the terms and conditions set forth by the seller.
                    Please ensure that you read all product details carefully. Any discrepancies or issues
                    with the product will be resolved according to the seller's return and refund policy.
                </p>
            </div>

            {/* Additional Product Info */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>Seller ID: {product.sellerId}</p>
                <p>{product.approved === null ? "Pending Approval" : "Approved"}</p>
                <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default ProductDetailPage;
