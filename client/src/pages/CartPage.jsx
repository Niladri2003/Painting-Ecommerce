import React, { useState, useEffect } from "react";
import { SlTag } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { BASEAPI } from "../utils/BASE_API";
import { CartItem } from "../components/cart/CartItem";

const Cart = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [couponVis, setCouponVis] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [cartData, setCartData] = useState(null); // Holds the cart data
    const toast = useToast();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchCartDetails();
    }, []);

    const fetchCartDetails = async () => {
        try {
            const { data } = await axios.get(`${BASEAPI}/get-cart`, {
                headers: { Authorization: `${token}` }
            });
            setCartData(data.cart);
            toast({
                title: data.msg || "Cart item retrieved successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast({
                title: "Failed to fetch cart.",
                description: error.response?.data?.msg || 'Failed to fetch cart.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleInputChange = (e) => {
        setCoupon(e.target.value);
    };

    const handleCheckout = () => {
        navigate("/buynow"); // Redirect to the Buynow page
    };

    if (!cartData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <div className="w-11/12 mx-auto flex flex-col mt-16 lg:mt-36 mb-12">
                <div className="flex flex-col lg:flex-row w-full justify-between text-lg font-bold">
                    <div className="w-full lg:w-[70%] border-b-2 pb-3">My Cart</div>
                    <div className="hidden sm:block w-full lg:w-[25%] border-b-2 pb-3 mt-4 lg:mt-0">
                        Order Summary
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row mt-8">
                    <div className="w-full lg:w-[70%] flex flex-col mb-10">
                        {cartData.items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="w-full lg:w-[25%] pl-0 lg:pl-8">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Order summary</h3>
                            <p className="text-gray-600 mb-2">Total Items: {cartData.items.length}</p>
                            <h3 className="text-xl font-bold mb-4">Total: ₹{cartData.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                            <button className="w-full bg-black text-white py-2 rounded" onClick={handleCheckout}>
                                Checkout
                            </button>
                            <p className="text-gray-500 mt-2">🔒 Secure Checkout</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="mb-4">
                        <p
                            onClick={() => setCouponVis(!couponVis)}
                            className="flex items-center gap-2 cursor-pointer text-lg"
                        >
                            <SlTag /> <span>Enter a promo code</span>
                        </p>
                        <div className={`flex items-center ${couponVis ? "flex-row" : "hidden"} mt-2`}>
                            <input
                                type="text"
                                className="border outline-none w-full lg:w-1/4 px-4 py-2 rounded"
                                value={coupon}
                                onChange={handleInputChange}
                            />
                            <button
                                className="bg-black text-white py-2 px-4 rounded ml-2 flex-shrink-0 flex items-center justify-center"
                                disabled={!coupon}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
