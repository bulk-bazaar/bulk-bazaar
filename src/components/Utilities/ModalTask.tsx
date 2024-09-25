import React, {useState} from "react";
import Modal from "./Modal";
import {Product} from "../../components1/redux/interfaces";

const InputCheckbox: React.FC<{
    label: string;
    isChecked: boolean;
    setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({isChecked, setChecked, label}) => {
    return (
        <label className="mb-0 flex items-center cursor-pointer">
            <div
                className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                {isChecked && (
                    <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                )}
            </div>
            <span className="order-1 flex-1">{label}</span>
            <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => setChecked((prev: boolean) => !prev)}
            />
        </label>
    );
};

const ModalCreateProduct: React.FC<{
    onClose: () => void;
    product?: Product;
    nameForm: string;
    onConfirm: (product: Product) => void;
}> = ({onClose, product, nameForm, onConfirm}) => {

    const [title, setTitle] = useState<string>(product?.title || '');
    const [description, setDescription] = useState<string>(product?.description || '');
    const [minimumQuantity, setMinimumQuantity] = useState<number | undefined>(product?.minimumQuantity);
    const [maximumQuantity, setMaximumQuantity] = useState<number | undefined>(product?.maximumQuantity);
    const [soldQuantity, setSoldQuantity] = useState<number | undefined>(product?.soldQuantity);
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
            soldQuantity: soldQuantity || 0,
            mrp: mrp,
            price: price,
            units: units,
            sellerId: '2',
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
                            placeholder="e.g, 1, 2, 3.."
                            required
                            value={maximumQuantity}
                            onChange={({target}) => setMaximumQuantity(parseInt(target.value || '0'))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        Sold Quantity
                        <input
                            type="number"
                            placeholder="e.g, 1, 2, 3.."
                            required
                            value={soldQuantity}
                            onChange={({target}) => setSoldQuantity(parseInt(target.value || '0'))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        MRP
                        <input
                            type="text"
                            placeholder="ex: 2300"
                            required
                            value={mrp}
                            onChange={({target}) => setMrp(target.value)}
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
                            {['Kg', 'Liter', 'Dozne'].map((dir: string) => (
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
                    <label>
                        Price
                        <input
                            type="text"
                            placeholder="ex: 2300"
                            required
                            value={price}
                            onChange={({target}) => setPrice(target.value)}
                            className="w-full"
                        />
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
