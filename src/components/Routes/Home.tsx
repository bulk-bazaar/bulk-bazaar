import React from "react";
import {useAppSelector} from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import TaskItem from "../TasksSection/TaskItem/TaskItem";
import {Product} from "../../components1/redux/interfaces";

const Home: React.FC = () => {
  const products = useAppSelector((state) => state.products.items);

  useDescriptionTitle("Organize your tasks", "All tasks");
  return <section>
    <ul
        className={`tasksList mt-4 grid gap-4 sm:gap-4 xl:gap-6 ${
            true
                ? "grid-cols-1"
                : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
        }`}
    >
      {products.map((product: Product) => (
          <TaskItem key={product.title} isListInView1={true} product={product}/>
      ))}
    </ul>
  </section>
};

export default Home;
