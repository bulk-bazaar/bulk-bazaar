import React, {useEffect} from "react";
import WithLoading from "../hoc/WithLoading";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {tasksActions} from "../../store/Product.store";
import {addressActions} from "../../store/Address.store";
import useDescriptionTitle from "../../components/hooks/useDescriptionTitle";
import MessageTemplet from "../../components1/common/ui/MessageTemplet";
import {Product} from "../../components1/redux/interfaces";
import TaskItem from "../../components/TasksSection/TaskItem/ProductItem";

function HomePage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const isLoading = useAppSelector((state) => state.products.loading);
    useEffect(() => {
        dispatch(tasksActions.fetchProducts());
        dispatch(addressActions.fetchAddress(''))
    }, []);

    useDescriptionTitle("Organize your tasks", "All tasks");
    return <WithLoading loading={isLoading}>
        {products.length === 0 ? <MessageTemplet title={"Empty products!"}
                                                 description={"You can become a seller or refer someone else to become a seller"}/> :
            <section>
                <ul className={`tasksList mt-4 grid gap-4 sm:gap-4 xl:gap-6`}>
                    {products.map((product: Product) => (
                        <TaskItem key={product.title} isListInView1={true} product={product}/>))}
                </ul>
            </section>}
    </WithLoading>
}

export default HomePage;
