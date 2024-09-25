import React from "react";
import {ReactComponent as Calendar} from "../../../assets/date.svg";
import useDate from "../../hooks/useDate";
import {Product} from "../../../components1/redux/interfaces";

const InfosTask: React.FC<{ product: Product; isListInView1: boolean }> = ({
                                                                               product,
  isListInView1,
}) => {
  const productTitle = useDate(product.title);

  return (
    <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}>
      <div
        className={`flex items-center justify-between ${
          isListInView1 ? "mb-1" : "mb-2"
        }`}
      >
        <span className="block font-medium dark:text-slate-200">
          {product.title}
        </span>
      </div>
      <p
        title={product.description}
        className={`description mb-2 text-slate-500 dark:text-slate-500 ${
          isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
        }`}
      >
        {product.description}
      </p>
      <time className="mt-auto flex w-full">
        <Calendar className="mr-2 w-4 sm:w-5" /> {product.minimumQuantity}
      </time>
    </div>
  );
};

export default InfosTask;
