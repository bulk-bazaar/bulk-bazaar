import React from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ReactComponent as MenuIcon} from "../../../assets/Social.svg";
import {ReactComponent as EditIcon} from "../../../assets/edit.svg";
import {menusActions} from "../../../store/Menu.store";
import {modalActions} from "../../../store/Modal.store";
import CartIcon from "./CartIcon";
import {commonActions} from "../../../store/Common.store";

const Toolbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const addreses: any = useAppSelector((state) => state.address.addresess);
    const isSeller = useAppSelector((state) => state.user.user.isSeller);
    const openNewTaskHandler = () => {
        if (!addreses || addreses.length === 0){
            dispatch(modalActions.openModalAddress());
            dispatch(commonActions.showNotification({
                type:'Error',
                date: new Date(),
                message: "You need to add address before you want to create a product!"
            }))
        } else {
            dispatch(modalActions.openModalCreateTask());
        }
    };

    const openMenuHeaderHandler = () => {
        dispatch(menusActions.openMenuHeader());
    };
    const openMenuAddressHandler = () => {
        dispatch(modalActions.openModalAddress());
    };
    return (
        <header className="bg-white dark:bg-slate-800 px-4 py-8 pr-4 flex flex-row justify-between h-12 items-center">
            <div className={"flex flex-row items-center text-xl"}>
                <HeaderItem onClick={openMenuHeaderHandler} icon={MenuIcon}/>
                <section onClick={openMenuAddressHandler}>
                    {
                        addreses && addreses.length > 0 ? <h1 className={'underline font-bold'}>
                            {addreses[0].street_address} ({addreses[0].pincode})
                        </h1> : undefined
                    }
                </section>
            </div>
            <div className={"flex flex-row items-center"}>
                <CartIcon/>
                {isSeller === 'approved' ? <HeaderItem onClick={openNewTaskHandler} icon={EditIcon}/> : undefined}
            </div>
        </header>
    );
};

const HeaderItem = (props: { onClick: () => void, icon: React.ComponentType<any> }) => {
    const Icon = props.icon;  // Capitalize the component to treat it as a JSX component

    return (
        <button className="mr-4 w-6 h-6" onClick={props.onClick}>
            <Icon/>
        </button>
    );
}

export default Toolbar;
