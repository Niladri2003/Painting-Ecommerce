import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASEAPI } from "../../utils/BASEAPI.js";
import axios from "axios"; // Ensure axios is imported for making HTTP requests

const AdminOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const params = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));

    // Function to load all orders for admin
    const loadOrders = async () => {
        try {
            const { data } = await axios.get(`${BASEAPI}/v1/get-all-orders-admin`, {
                headers: {
                    Authorization: `${token}`, // Add 'Bearer ' prefix if required by your backend
                },
            });
            setOrders(data);
            console.log(data); // Log the data to see the response structure
        } catch (error) {
            toast({
                title: "Error loading orders",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        loadOrders(); // Load orders when the component mounts
    }, []);

    useEffect(() => {
        if (orders.length > 0) { // Check if orders are loaded
            const filteredOrder = orders.find(
                (order) => order.order_id === parseInt(params.orderTrack) // Find the order matching the order_id in the URL
            );
            setCurrentOrder(filteredOrder);
            setOrderItems(filteredOrder?.order_items || []);
        }
    }, [orders, params.orderTrack]);

    if (!currentOrder) {
        return (
            <div className="h-[40rem] flex items-center justify-center">
                <p className="text-xl font-bold text-gray-500">Order not found.</p>
            </div>
        );
    }

    return (
        <div>
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="capitalize text-xl font-bold">Order Details</h2>
                    <button className="capitalize bg-black text-white p-2 rounded-sm md:px-3 md:py-2" onClick={() => navigate(-1)}>
                        Back to Orders
                    </button>
                </div>

                <hr className="my-7" />
                <div className="flex lg:flex-row flex-col md:items-center md:justify-between gap-5 md:gap-0">
                    <div className="flex flex-col gap-[1rem] md:gap-[1rem]">
                        <div className="flex gap-[1rem] items-center">
                            <p className="font-semibold w-max">Order ID</p>
                            <p className="text-[.85rem] md:text-[1rem]">{currentOrder.order_id}</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <p className="font-semibold">Order Date</p>
                            <p>{new Date(currentOrder.order_created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <p className="font-semibold">Customer Name</p>
                            <p>{`${currentOrder.addresses[0].first_name} ${currentOrder.addresses[0].last_name}`}</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <p className="font-semibold">Shipping Address</p>
                            <p>{`${currentOrder.addresses[0].street_address}, ${currentOrder.addresses[0].town_city}, ${currentOrder.addresses[0].state}, ${currentOrder.addresses[0].country}, ${currentOrder.addresses[0].pin_code}`}</p>
                        </div>
                    </div>
                    <button className="capitalize bg-black text-white p-1 rounded-sm md:px-3 md:py-2">
                        Cancel Order
                    </button>
                </div>
            </div>

            <div className="my-7 md:flex-row flex-col flex justify-between gap-10">
                <div className="my-5 w-full md:w-[65%]">
                    <h2 className="capitalize text-xl font-bold">Order Items</h2>
                    <hr className="mb-5 mt-2" />
                    <div>
                        {orderItems.map((item) => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-[8rem] overflow-hidden">
                                        <img
                                            className="w-full"
                                            src={item.product_image || "https://res.cloudinary.com/default.jpg"}
                                            alt={item.product_name}
                                        />
                                    </div>
                                    <p className="md:hidden w-[80%]">{item.description || "No description available"}</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                                    <Link className="text-blue-500 text-md font-medium md:text-center" to={`/product/${item.product_id}`}>
                                        {item.product_name}
                                    </Link>
                                    <p>₹{item.price}</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                                    <p className="md:text-center font-medium md:font-normal">Status</p>
                                    <p className="md:row-start-2">{item.status}</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                                    <p className="md:text-center">{item.quantity}</p>
                                    <p className="row-start-1 md:row-start-2 font-medium md:font-normal">Quantity</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                                    <p className="md:text-center">₹{item.quantity_price}</p>
                                    <p className="row-start-1 md:row-start-2 font-medium md:font-normal">Total Price</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 flex w-full">
                        <button className="capitalize bg-black text-white px-6 py-2 rounded-sm md:px-5 md:py-2">
                            Cancel Order
                        </button>
                    </div>
                </div>

                <div className="border-2 w-full md:w-[35%] p-5">
                    <h2 className="capitalize text-xl font-bold">Order Summary</h2>
                    <hr className="mb-5 mt-2" />
                    <div className="flex gap-[3rem] md:gap-[8rem] justify-between">
                        <div className="flex flex-col gap-[1rem]">
                            <p>Subtotal</p>
                            <p>Est. Sales Tax</p>
                            <p>Shipping & Handling</p>
                        </div>
                        <div className="flex flex-col gap-[1rem]">
                            <p className="font-semibold">₹{currentOrder.total}</p>
                            <p className="font-semibold flex justify-end">₹{currentOrder?.tax || 0}</p>
                            <p className="font-semibold flex justify-end">₹{currentOrder?.shipping || 0}</p>
                        </div>
                    </div>
                    <hr className="my-5" />
                    <div className="flex justify-between">
                        <p className="flex">Total</p>
                        <p className="font-semibold flex">₹{currentOrder.total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;
