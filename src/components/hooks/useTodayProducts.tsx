import {useEffect, useState} from "react";
import {Task} from "../../interfaces";
import {useAppSelector} from "../../store/hooks";
import {Product} from "../../components1/redux/interfaces";

const useTodayProducts = (): Product[] => {
  const products = useAppSelector((state) => state.products);
  const [todaysProducts, setTodaysProducts] = useState<Product[]>([]);

  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    let filteredProducts: Product[] = products.filter(
      (task: Task) => task.date === dateTimeFormat
    );
    setTodaysProducts(filteredProducts);
  }, [dateTimeFormat, products]);
  return todaysProducts;
};

export default useTodayProducts;
