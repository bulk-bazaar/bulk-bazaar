import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import TaskItem from "../TasksSection/TaskItem/ProductItem";
import {Product} from "../../components1/redux/interfaces";
import {tasksActions} from "../../store/Product.store";
import Loader from "../../components1/common/ui/Loader";

const Home1: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const isLoading = useAppSelector((state) => state.products.loading);
    useEffect(() => {
        dispatch(tasksActions.fetchProducts());
    }, []);

    useDescriptionTitle("Organize your tasks", "All tasks");
    return isLoading ? <Loader/> : <section>
        <ul
            className={`tasksList mt-4 grid gap-4 sm:gap-4 xl:gap-6 ${
                true
                    ? "grid-cols-1"
                    : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
            }`}
        >
            {products.map((product: Product) => (
                <TaskItem key={product.title} isListInView1={true} product={product}/>
            ))}
        </ul>
    </section>
};

export default Home1;
