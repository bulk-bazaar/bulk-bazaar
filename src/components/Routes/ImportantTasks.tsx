import React, { useState, useEffect } from "react";
import { Task } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import {Product} from "../../components1/redux/interfaces";

const ImportantTasks: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [importantProducts, setImportantTasks] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts: Product[] = tasks.filter((product: Product) => product.minimumQuantity);
    setImportantTasks(filteredProducts);
  }, [tasks]);

  useDescriptionTitle("Tasks marked as important", "Important tasks");

  return (
    <LayoutRoutes title="Important tasks" products={importantProducts}></LayoutRoutes>
  );
};

export default ImportantTasks;
