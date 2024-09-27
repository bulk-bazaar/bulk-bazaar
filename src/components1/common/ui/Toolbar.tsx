import React from "react";
import {useAppDispatch} from "../../../store/hooks";
import {ReactComponent as MenuIcon} from "../../../assets/view-1.svg";
import {ReactComponent as EditIcon} from "../../../assets/edit.svg";
import {menusActions} from "../../../store/Menu.store";
import useMode from "../hooks/useMode";
import {Switch} from "@mui/material";
import {modalActions} from "../../../store/Modal.store";
import CartIcon from "./CartIcon";

const Toolbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const openNewTaskHandler = () => {
        dispatch(modalActions.openModalCreateTask());
    };

    const openMenuHeaderHandler = () => {
        dispatch(menusActions.openMenuHeader());
    };
    const {isCurrentDarkmode, setIsCurrentDarkmode} = useMode()

    return (
        <header className="flex flex-row justify-between h-12 items-center">
            <div className={"flex flex-row items-center text-xl"}>
                <HeaderItem onClick={openMenuHeaderHandler} icon={MenuIcon}/>
                <h1>Bulk Market</h1>
            </div>
            <div className={"flex flex-row items-center"}>
                <CartIcon />
                <HeaderItem onClick={openNewTaskHandler} icon={EditIcon}/>
                <Switch value={isCurrentDarkmode} onChange={e => setIsCurrentDarkmode(!isCurrentDarkmode)}/>
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
