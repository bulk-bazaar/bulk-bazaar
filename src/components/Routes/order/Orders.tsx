import React from 'react';
import {CartItem} from "../../../components1/redux/interfaces";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ordersActions} from "../../../store/Order.store";
import {commonActions} from "../../../store/Common.store";

const CheckoutPage = () => {
  const cartItems: CartItem[] = useAppSelector((state) => state.orders.cartItems);
  const dispatch = useAppDispatch();
  const totalPrice = cartItems.reduce((total, cartItem) => total + parseInt(cartItem.product.price) * cartItem.quantity, 0);

  return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

          <div className="lg:flex lg:space-x-8">
            {/* Products List */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map((cartItem) => (
                  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                    <img
                        src={cartItem.product.title}
                        alt={cartItem.product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{cartItem.product.title}</h2>
                      <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                      <p className="text-gray-900 font-semibold">${cartItem.product.price}</p>
                    </div>
                    <p className="text-lg font-bold">
                      ₹{parseInt(cartItem.product.price) * cartItem.quantity}
                    </p>
                  </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 mt-8 lg:mt-0">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                {cartItems.map((cartItem) => (
                    <div className="flex justify-between">
                      <span>{cartItem.product.title} x{cartItem.quantity}</span>
                      <span>${(parseInt(cartItem.product.price) * cartItem.quantity).toFixed(2)}</span>
                    </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" onClick={() => {
                dispatch(ordersActions.placeOrder(''))
                    .unwrap()
                    .then((response: any) => {
                      dispatch(ordersActions.clearCart())
                    })
                    .catch((error: any) => {
                      dispatch(commonActions.showNotification({
                        type:'Error',
                        date: new Date(),
                        message: error.message
                      }))
                    });
              }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CheckoutPage;
