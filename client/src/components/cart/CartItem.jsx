import  { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCart, removeFromCart } from "../../slices/cartSlice";
import PropTypes from 'prop-types';

export const CartItem = ({ item }) => {
    const { data, images } = item;
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(data.quantity);

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const handleItemDelete = () => {
        dispatch(removeFromCart(data.id));
    };

    useEffect(() => {
        const updatedData = { ...data, quantity: quantity };
        dispatch(updateCart(updatedData));
    }, [quantity]);

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-center p-5 border-b-2 max-sm:flex-row">
            <div className="flex items-center w-full md:w-auto">
                <img
                    src={images[0].image_url}
                    alt="Product"
                    className="w-24 h-24 md:w-32 md:h-32 object-cover mr-4"
                />
                <div className="mr-8">
                    <h3 className="text-lg md:text-xl font-semibold">{data.title}</h3>
                    <p className="text-gray-600">₹{data.price}</p>
                    <button className="text-blue-500 hover:underline mt-2 md:mt-0">More Details</button>
                </div>
            </div>
            <div className="max-sm:gap-3 flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0">
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
                <p className="text-lg font-semibold mb-4 md:mb-0 mr-0 md:mr-8">₹{data.price * quantity}</p>
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

// Add propTypes validation here
CartItem.propTypes = {
    item: PropTypes.shape({
        data: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        }).isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                image_url: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default CartItem;
