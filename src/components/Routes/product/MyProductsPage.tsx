import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Product} from "../../../components1/redux/interfaces";
import TaskItem from "../../TasksSection/TaskItem/ProductItem";
import {tasksActions} from "../../../store/Product.store";
import MessageTemplet from "../../../components1/common/ui/MessageTemplet";
import {ordersActions} from "../../../store/Order.store";
import Loader from "../../../components1/common/ui/Loader";
import {commonActions} from "../../../store/Common.store"; // Assuming useAppSelector is from your store setup

const MyProductsPage: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const products = useAppSelector(
        (state) => state.products.myitems
    );
    useEffect(() => {
        dispatch(tasksActions.fetchMyProducts())
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
    // Fetch the current product from the Redux store

    return isLoading ? <Loader/> :
        products.length === 0 ? <MessageTemplet title={"Empty products!"}
                                                description={"You can become a seller or refer someone else to become a seller"}/> : (
            <div>
                {products.map((product: Product) => (
                    <TaskItem key={product.title} isListInView1={true} product={product}/>
                ))
                }
            </div>
        );
};

export default MyProductsPage;
