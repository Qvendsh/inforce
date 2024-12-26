import {FC} from "react";

interface ConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal:FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div>
            <h3>Are you sure you want to delete this product?</h3>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    );
};

export default ConfirmationModal;
