import React, {useState} from "react";
import {useAppDispatch} from "../../store/hooks";
import TaskItem from "../TasksSection/TaskItem/TaskItem";
import {Product} from "../../components1/redux/interfaces";

type Props = {
    title: string;
    products: Product[] | [];
};

const LayoutRoutes: React.FC<Props> = ({title, products}) => {
    const [isListInView1, setIsListInView1] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={"search"}
                onChange={(e) => setIsListInView1(true)}
                className="w-full p-2 border border-gray-300 rounded-l mb-4"
            />
            <section>
                <ul
                    className={`tasksList mt-4 grid gap-4 sm:gap-4 xl:gap-6 ${
                        isListInView1
                            ? "grid-cols-1"
                            : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
                    }`}
                >
                    {products.map((product) => (
                        <TaskItem key={product.id} isListInView1={isListInView1} product={product}/>
                    ))}
                </ul>
            </section>

        </div>
    );
};

export default React.memo(LayoutRoutes);
