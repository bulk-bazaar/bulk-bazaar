import React from "react";
import AccountData from "./components/AccountSection/AccountData";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { Task } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";

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
    <div className="flex flex-col bg-slate-200 text-black">
      {/*{modal.modalCreateTaskOpen && (*/}
      {/*  <ModalCreateTask*/}
      {/*    onClose={closeModalCreateTask}*/}
      {/*    nameForm="Add a task"*/}
      {/*    onConfirm={createNewTaskHandler}*/}
      {/*  />*/}
      {/*)}*/}
      {/*<Menu />*/}
      <TasksSection />
    </div>
  );
};

export default App;
