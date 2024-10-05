import React, {useEffect} from "react";
import WithLoading from "../hoc/WithLoading";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {tasksActions} from "../../store/Product.store";
import {addressActions} from "../../store/Address.store";
import useDescriptionTitle from "../../components/hooks/useDescriptionTitle";
import {Product} from "../../components1/redux/interfaces";
import TaskItem from "../../components/TasksSection/TaskItem/ProductItem";
import EmptyMessageView from "../../components/Routes/order/EmptyMessageView";
import {modalActions} from "../../store/Modal.store";

function HomePage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const isLoading = useAppSelector((state) => state.products.loading);
    const addreses: any = useAppSelector((state) => state.address.addresess);
    let isPinCodeChanged = ''
    if (addreses && addreses.length > 0)
        isPinCodeChanged = addreses[0].pincode
    const onEmptyAction = (!addreses || addreses.length === 0) ? () => {
        dispatch(modalActions.openModalAddress());
    } : undefined
    console.log('GAJENDRA pincode', isPinCodeChanged)
    useEffect(() => {
        dispatch(tasksActions.fetchProducts(''));
        dispatch(addressActions.fetchAddress(''))
    }, [isPinCodeChanged]);

    useDescriptionTitle("Organize your tasks", "All tasks");
    return <WithLoading loading={isLoading}>
        {products.length === 0 ?
            <EmptyMessageView
                title={'Empty products!'}
                actionName={onEmptyAction ? 'Add Address' : undefined}
                onClick={onEmptyAction}
                description={'You can become a seller or refer someone else to become a seller'}/> :
            <div>
                {/*<ul className={`tasksList mt-4 grid gap-4 sm:gap-4 xl:gap-6`}>*/}
                <ul>
                    {products.map((product: Product) => (
                        <TaskItem key={product.title} isListInView1={true} product={product}/>))}
                </ul>
            </div>}
    </WithLoading>
}

export default HomePage;
