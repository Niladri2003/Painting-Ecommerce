import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from 'prop-types';

export const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
        // Here you might want to update the quantity in the backend or global state
    };

    const handleItemDelete = () => {
        // Handle item deletion here, possibly with a dispatch or API call
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-center p-5 border-b-2">
            <div className="flex items-center w-full md:w-auto">
                <div className="mr-8">
                    <h3 className="text-lg md:text-xl font-semibold">{item.product_name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <button className="text-blue-500 hover:underline mt-2 md:mt-0">More Details</button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0">
                <div className="flex items-center mb-4 md:mb-0 mr-0 md:mr-8">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        -
                    </button>
                    <span className="mx-4">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>
                </div>
                <p className="text-lg font-semibold mb-4 md:mb-0 mr-0 md:mr-8">₹{item.price * quantity}</p>
                <button
                    onClick={handleItemDelete}
                    className="text-red-500 text-xl"
                >
                    <RiDeleteBin6Line />
                </button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        product_name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartItem;
