import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCart } from "../../slices/cartSlice";

export const CartItem = ({ item }) => {
    const { data, images } = item
    // console.log(data)

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(data.quantity);

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };
    useEffect(() => {
        const updatedData = { ...data, quantity: quantity }
        dispatch(updateCart(updatedData))
    }, [quantity]);


    return (
        <div className="w-full flex justify-between items-center  p-5 border-b-2">
            <div className="flex ">
                <img
                    src={images[0].image_url}
                    alt="Product"
                    className="w-24 h-24 object-cover mr-4"
                />
                <div className="mr-8">
                    <h3 className="text-lg font-semibold">{data.title}</h3>
                    <p className="text-gray-600">₹{data.price}</p>
                    {/* <p className="text-gray-500">Color: Light</p> */}
                    <button className="text-blue-500 hover:underline">More Details</button>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex items-center mr-8">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        -
                    </button>
                    <span className="mx-4">{data.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>
                </div>
                <p className="text-lg font-semibold mr-8">₹{(data.price * data.quantity)}</p>
                <button className="text-red-500 text-xl"><RiDeleteBin6Line /></button>
            </div>
        </div>
    )
}