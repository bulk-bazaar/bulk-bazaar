import {useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {Product} from "../../components1/redux/interfaces";

const useSearchQuery = (searchQuery: string) => {
  const products = useAppSelector((state) => state.products);

  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredTasks = products.filter((product: Product) => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    if (searchQuery.trim().length) {
      setMatchedProducts(filteredTasks);
    } else {
      setMatchedProducts([]);
    }
  }, [searchQuery, products]);

  return matchedProducts;
};

export default useSearchQuery;
