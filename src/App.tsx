import React from "react";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import {Task} from "./interfaces";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {modalActions} from "./store/Modal.store";
import {tasksActions} from "./store/Tasks.store";
import Toolbar from "./components1/common/ui/Toolbar";

const App: React.FC = () => {
    const modal = useAppSelector((state) => state.modal);

    const dispatch = useAppDispatch();

    const closeModalCreateTask = () => {
        dispatch(modalActions.closeModalCreateTask());
    };

    const createNewTaskHandler = (task: Task) => {
        dispatch(tasksActions.addNewTask(task));
    };


    return (
        <div className="flex flex-col bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 min-h-screen">
            {modal.modalCreateTaskOpen && (
                <ModalCreateTask
                    onClose={closeModalCreateTask}
                    nameForm="Add a task"
                    onConfirm={createNewTaskHandler}
                />
            )}
            <Menu/>
            <div className={"p-4"}>
                <Toolbar/>
                <TasksSection/>
            </div>
        </div>
    );
};

export default App;
