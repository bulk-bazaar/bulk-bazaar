import React from 'react';
import {ReactComponent as CartIcon1} from "../../../assets/cart.svg";
import {CartItem} from "../../redux/interfaces";
import {useAppSelector} from "../../../store/hooks";
import {useNavigate} from "react-router-dom";

const CartIcon = () => {
    const navigate = useNavigate();
    const cartItems: CartItem[] = useAppSelector((state) => state.orders.cartItems);
    const count = cartItems.length
    return (
        <div className={'px-4 pt-2'}>
            <div style={{position: 'relative', display: 'inline-block'}} onClick={
                () => navigate('/checkout')
            }>
                {/* SVG Cart Icon */}
                <CartIcon1/>

                {/* Badge Count */}
                {count > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-10px',
                            backgroundColor: '#ff6347', // Badge color (Tomato)
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '20px',
                            height: '20px',
                        }}
                    >
                        {count}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartIcon;
