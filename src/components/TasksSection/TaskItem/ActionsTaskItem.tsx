import React from "react";
import { Task } from "../../../interfaces";
import BtnEditTask from "./BtnEditTask";
import BtnMarkAsImportant from "./BtnMarkAsImportant";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";
import {Product} from "../../../components1/redux/interfaces";

const ActionsTaskItem: React.FC<{ product: Product; isListInView1: boolean }> = ({
                                                                                     product,
  isListInView1,
}) => {
  return (
    <>
      <div
        className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
          isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
        }`}
      >
        <BtnToggleCompleted
          taskCompleted={product.title == 'completed'}
          taskId={'product.id'}
          isListInView1={isListInView1}
        />
        <BtnMarkAsImportant taskId={'task.id'} taskImportant={'task.important' == product.id} />
        <BtnDeleteTask taskId={'task.id'} />
        {/*<BtnEditTask product={task} />*/}
      </div>
    </>
  );
};

export default ActionsTaskItem;
