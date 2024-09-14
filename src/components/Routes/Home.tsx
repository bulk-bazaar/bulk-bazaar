import React from "react";
import {useAppSelector} from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import TaskItem from "../TasksSection/TaskItem/TaskItem";
import {Task} from "../../interfaces";

const Home: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  useDescriptionTitle("Organize your tasks", "All tasks");
  return <section>
    <ul
        className={`tasksList mt-4 grid gap-4 sm:gap-4 xl:gap-6 ${
            true
                ? "grid-cols-1"
                : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
        }`}
    >
      {tasks.map((task: Task) => (
          <TaskItem key={task.id} isListInView1={true} task={task}/>
      ))}
    </ul>
  </section>
};

export default Home;
