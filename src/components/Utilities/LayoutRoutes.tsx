import React, { useState } from "react";
import { Task } from "../../interfaces";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import useSortTasks from "../hooks/useSortTasks";
import ButtonsSort from "../TasksSection/ButtonsSort";
import TaskItem from "../TasksSection/TaskItem/TaskItem";

type Props = {
  title: string;
  tasks: Task[] | [];
};

const LayoutRoutes: React.FC<Props> = ({ title, tasks }) => {
  const [isListInView1, setIsListInView1] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks(tasks);

  const openModalHandler = () => {
    dispatch(modalActions.openModalCreateTask());
  };

  const tasksTitle = `${title} (${tasks.length} ${
    tasks.length === 1 ? "task" : "tasks"
  })`;

  return (
    <section>
      <ul
        className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${
          isListInView1
            ? "grid-cols-1"
            : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
        }`}
      >
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} isListInView1={isListInView1} task={task} />
        ))}
      </ul>
    </section>
  );
};

export default React.memo(LayoutRoutes);
