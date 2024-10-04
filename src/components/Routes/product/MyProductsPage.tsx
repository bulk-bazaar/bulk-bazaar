import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Product} from "../../../components1/redux/interfaces";
import TaskItem from "../../TasksSection/TaskItem/ProductItem";
import {tasksActions} from "../../../store/Product.store";
import MessageTemplet from "../../../components1/common/ui/MessageTemplet";
import {ordersActions} from "../../../store/Order.store";
import {commonActions} from "../../../store/Common.store";
import WithLoading from "../../../ui/hoc/WithLoading"; // Assuming useAppSelector is from your store setup

const MyProductsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.products.loading);
    const products = useAppSelector((state) => state.products.myitems);
    useEffect(() => {
        dispatch(tasksActions.fetchMyProducts(''))
            .unwrap()
            .then((response: any) => {
                dispatch(ordersActions.clearCart())
            })
            .catch((error: any) => {
                dispatch(commonActions.showNotification({
                    type: 'Error',
                    date: new Date(),
                    message: error.message
                }))
            });
    }, []);
    // Fetch the current product from the Redux store

    return <WithLoading loading={loading}>
        {products.length === 0 ? <MessageTemplet title={"Empty products!"}
                                                 description={"You can become a seller or refer someone else to become a seller"}/> : (
            <div>
                {products.map((product: Product) => (
                    <TaskItem key={product.title} isListInView1={true} product={product}/>
                ))
                }
            </div>
        )}
    </WithLoading>
};

export default MyProductsPage;
