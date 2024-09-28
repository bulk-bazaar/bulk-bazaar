import React, {useState} from "react";
import Modal from "./Modal";
import {Product} from "../../components1/redux/interfaces";
import {useAppSelector} from "../../store/hooks";

const ModalCreateProduct: React.FC<{
    onClose: () => void;
    product?: Product;
    nameForm: string;
    onConfirm: (product: Product) => void;
}> = ({onClose, product, nameForm, onConfirm}) => {
    const user = useAppSelector((state) => state.user.user);
    const [title, setTitle] = useState<string>(product?.title || '');
    const [description, setDescription] = useState<string>(product?.description || '');
    const [minimumQuantity, setMinimumQuantity] = useState<number | undefined>(product?.minimumQuantity);
    const [maximumQuantity, setMaximumQuantity] = useState<number | undefined>(product?.maximumQuantity);
    const [mrp, setMrp] = useState<string>(product?.mrp || '');
    const [price, setPrice] = useState<string>(product?.price || '');
    const [units, setUnits] = useState<string>(product?.units || 'Kg');
    // const [sellerId, setSellerId] = useState<string>(product?.sellerId || '');
    // const [approved, setApproved] = useState<boolean>(product?.approved || false);
    const addNewProductHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        const newProduct: Product = {
            title: title,
            description: description,
            minimumQuantity: minimumQuantity || 0,
            maximumQuantity: maximumQuantity || 0,
            soldQuantity: 0,
            mrp: mrp,
            price: price,
            units: units,
            sellerId: user.id,
            approved: false,
        };
        onConfirm(newProduct);
        onClose();
    };
    return (
        <Modal onClose={onClose} title={nameForm}>
            <div className="overflow-y-auto max-h-[600px] p-2">
                <form
                    className="flex flex-col stylesInputsField"
                    onSubmit={addNewProductHandler}
                >
                    <label>
                        Title
                        <input
                            type="text"
                            placeholder="e.g, Want to sell 500kg totmato"
                            required
                            value={title}
                            onChange={({target}) => setTitle(target.value)}
                            className="w-full"
                        />
                    </label>
                    <label>
                        Description (optional)
                        <textarea
                            placeholder="e.g, study for the test"
                            className="w-full"
                            value={description}
                            onChange={({target}) => setDescription(target.value)}
                        ></textarea>
                    </label>
                    <label>
                        Minimum Quantity
                        <input
                            type="number"
                            maxLength={4}
                            min={1}
                            max={maximumQuantity || 1}
                            placeholder="e.g, 1, 2, 3.."
                            required
                            value={minimumQuantity}
                            onChange={({target}) => setMinimumQuantity(parseInt(target.value || '0'))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        Maximum Quantity
                        <input
                            type="number"
                            maxLength={4}
                            min={1}
                            placeholder="e.g, 1, 2, 3.."
                            required
                            value={maximumQuantity}
                            onChange={({target}) => setMaximumQuantity(parseInt(target.value || '0'))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        MRP
                        <input
                            type="number"
                            placeholder="ex: 2300"
                            min={1}
                            required
                            value={mrp}
                            onChange={({target}) => setMrp(target.value)}
                            className="w-full"
                        />
                    </label>
                    <label>
                        Price
                        <input
                            type="number"
                            placeholder="ex: 2300"
                            min={1}
                            max={mrp || 1}
                            required
                            value={price}
                            onChange={({target}) => setPrice(target.value)}
                            className="w-full"
                        />
                    </label>
                    <label>
                        Units
                        <select
                            className="block w-full"
                            value={units}
                            onChange={({target}) => setUnits(target.value)}
                        >
                            {['Kg', 'Pices', 'Liter', 'Dozne'].map((dir: string) => (
                                <option
                                    key={dir}
                                    value={dir}
                                    className="bg-slate-100 dark:bg-slate-800"
                                >
                                    {dir}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className="btn mt-5">
                        {nameForm}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalCreateProduct;
