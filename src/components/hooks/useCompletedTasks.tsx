import {useEffect, useState} from "react";
import {Product} from "../../components1/redux/interfaces";

interface Props {
  products: Product[];
  done: boolean;
}

const useCompletedTasks = (props: Props): { products: Product[] } => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts: Product[] = props.products.filter((product: Product) => {
      if (props.done) {
        return product.title;
      } else {
        return !product.title;
      }
    });
    setProducts(filteredProducts);
  }, [props.products, props.done]);

  return { products };
};

export default useCompletedTasks;
