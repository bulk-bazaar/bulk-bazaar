import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import {Product} from "../../components1/redux/interfaces";

const TaskOnly: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const tasks = useAppSelector((store) => store.tasks.tasks);

  const [matchedProduct, setMatchedProduct] = useState<Product[]>([]);

  useEffect(() => {
    const taskId = params.taskId;
    const filteredTask = tasks.filter((task: Task) => taskId === task.id);
    if (!filteredTask.length) {
      navigate("/");
    }
    setMatchedProduct(filteredTask);
  }, [navigate, params.taskId, tasks]);

  const title = matchedProduct.length ? matchedProduct[0].title : "";

  useDescriptionTitle(`Searching for ${title}`, "Task " + title);

  return <LayoutRoutes title={title} products={matchedProduct} />;
};

export default TaskOnly;
