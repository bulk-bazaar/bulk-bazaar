import React from "react";
import Modal from "./Modal";
import Address from "../Routes/settings/Address";

const ModalAddress: React.FC<{
    onClose: () => void;
}> = ({onClose}) => {
    return (
        <Modal onClose={onClose} title={"Edit address"}>
            <div className="overflow-y-auto max-h-[600px] p-2">
                <Address onclose={onClose}/>
            </div>
        </Modal>
    );
};

export default ModalAddress;
