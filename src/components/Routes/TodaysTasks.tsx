import React from "react";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import useTodayProducts from "../hooks/useTodayProducts";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const TodaysTasks: React.FC = () => {
  const todaysProducts = useTodayProducts();

  useDescriptionTitle("Today's tasks", "Today's tasks");

  return (
    <LayoutRoutes title="Today's tasks" products={todaysProducts}></LayoutRoutes>
  );
};

export default TodaysTasks;
