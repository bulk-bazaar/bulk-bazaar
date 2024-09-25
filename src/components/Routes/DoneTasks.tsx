import React from "react";
import {useAppSelector} from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const DoneTasks: React.FC<{ done: boolean; title: string }> = ({
  done,
  title,
}) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // const { tasks: productsFiltered } = useCompletedTasks({ tasks, done });

  useDescriptionTitle("All tasks done", title);

  return <LayoutRoutes title={title} products={[]}></LayoutRoutes>;
};

export default DoneTasks;
