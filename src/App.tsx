import React from "react";
import Menu from "./components/Menu/Menu";
import ProductsSection from "./components/TasksSection/ProductsSection";
import ModalCreateProduct from "./components/Utilities/ModalTask";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {modalActions} from "./store/Modal.store";
import {tasksActions} from "./store/Tasks.store";
import Toolbar from "./components1/common/ui/Toolbar";
import {Product} from "./components1/redux/interfaces";

const App: React.FC = () => {
    const modal = useAppSelector((state) => state.modal);

    const dispatch = useAppDispatch();

    const closeModalCreateTask = () => {
        dispatch(modalActions.closeModalCreateTask());
    };

    const createNewProductHandler = (product: Product) => {
        dispatch(tasksActions.addProducts([product]));
    };


    return (
        <div className="flex flex-col bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 min-h-screen">
            {modal.modalCreateTaskOpen && (
                <ModalCreateProduct
                    onClose={closeModalCreateTask}
                    nameForm="Add a product"
                    onConfirm={createNewProductHandler}
                />
            )}
            <Menu/>
            <div className={"p-4"}>
                <Toolbar/>
                <ProductsSection/>
            </div>
        </div>
    );
};

export default App;
