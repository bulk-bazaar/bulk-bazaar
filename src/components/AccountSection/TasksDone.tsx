import React from "react";
import { useAppSelector } from "../../store/hooks";
import useCompletedTasks from "../hooks/useCompletedTasks";
import useTodayProducts from "../hooks/useTodayProducts";

const TasksDone: React.FC = () => {
  const todaysProducts = useTodayProducts();
  const tasks = useAppSelector((state) => state.products.tasks);
  const { products: todayTasksDone } = useCompletedTasks({
    products: todaysProducts,
    done: true,
  });
  const { products: allTasksDone } = useCompletedTasks({
    products: tasks,
    done: true,
  });

  const percentageTodayTasks =
    (todayTasksDone.length * 100) / todaysProducts.length;

  const percentageAllTasks = (allTasksDone.length * 100) / tasks.length;

  const todaysTasksToShow = todaysProducts.slice(0, 3);

  const showMore = todaysProducts.length > todaysTasksToShow.length;

  return (
    <>
      <div className="hidden lg:block">
      {todaysProducts.length !== 0 && (
        <div className="mb-8" >
          <span className="flex justify-between mb-5">
            <span>Tasks today</span> {todayTasksDone.length}/
            {todaysProducts.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageTodayTasks + "%" }}></div>
          </div>
        </div>
      )}
      {tasks.length !== 0 && (
        <div className="">
          <span className="flex justify-between mb-2">
            <span className="mr-28">All tasks </span> {allTasksDone.length}/{tasks.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageAllTasks + "%" }}></div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default React.memo(TasksDone);
