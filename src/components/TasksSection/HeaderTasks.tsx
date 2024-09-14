import React, {useState} from "react";
import BtnAddTask from "../Utilities/BtnAddTask";
import {ReactComponent as MenuIcon} from "../../assets/view-1.svg";
import SearchField from "./SearchField";
import {useAppDispatch} from "../../store/hooks";
import {menusActions} from "../../store/Menu.store";
import Notification from "./Notification";
import DarkMode from "../AccountSection/DarkMode";
import {If} from "../Service/condition";
import {BackDrop} from "../hooks/useBackDrop";

const HeaderTasks: React.FC = () => {
    const dispatch = useAppDispatch();
    let [BackState, BackSet] = useState(false);

    const openMenuHeaderHandler = () => {
        dispatch(menusActions.openMenuHeader());
    };

    return (
        <header className="flex flex-row justify-between h-12 items-center">
            <button
                className="mr-6 w-8 h-8"
                onClick={openMenuHeaderHandler}
                title="open menu"
            >
                <MenuIcon/>
            </button>
            {/*<SearchField/>*/}
            <div className="flex">
                <Notification/>
                <DarkMode/>
                {/*<BtnAddTask className="xl:block shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent"/>*/}
                {/*<If condition={BackState}>*/}
                {/*    <BackDrop BackState={BackState} BackSet={BackSet}/>*/}
                {/*</If>*/}
            </div>
        </header>
    );
};

export default HeaderTasks;
