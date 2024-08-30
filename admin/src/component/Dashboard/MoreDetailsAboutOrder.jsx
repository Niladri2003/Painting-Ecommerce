import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASEAPI } from "../../utils/BASEAPI.js";
import axios from "axios";
import dayjs from "dayjs";


const AdminOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const params = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));

    const loadOrders = async () => {
        try {
            const { data } = await axios.get(`${BASEAPI}/v1/get-all-orders-admin`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setOrders(data);
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
        loadOrders();
    }, []);

    useEffect(() => {
        let ordersData = orders?.orders;

        if (ordersData) {
            const filterOrder = ordersData.filter(
                (cur) => cur.order_id == params.orderTrack
            );

            setCurrentOrder(filterOrder[0]);
        }
    }, [orders, params.orderTrack]);

    useEffect(() => {
        if (currentOrder && currentOrder.order_items) {
            setOrderItems(currentOrder.order_items);
        }
    }, [currentOrder]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "text-green-500";
            case "shipped":
                return "text-blue-500";
            case "cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    if (!currentOrder) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-xl font-bold text-gray-500">Order not found.</p>
            </div>
        );
    }

    const updateOrderStatus = async () => {
        try {
            if (!token) {
                throw new Error("No token found");
            }

            if (currentOrder.order_status === "delivered") {
                toast({
                    title: "Action not allowed.",
                    description: "You cannot change the status of a delivered order.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            if (currentOrder.order_status === "cancelled") {
                toast({
                    title: "Action not allowed.",
                    description: "You cannot change the status of a cancelled order.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            if (currentOrder.order_status === "shipped" && selectedStatus === "cancelled") {
                toast({
                    title: "Action not allowed.",
                    description: "You cannot cancel an order that has been shipped.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            let url;

            switch (selectedStatus) {
                case "shipped":
                    url = `${BASEAPI}/v1/status-shipped/${currentOrder.order_id}`;
                    break;
                case "delivered":
                    url = `${BASEAPI}/v1/status-delivered/${currentOrder.order_id}`;
                    break;
                case "cancelled":
                    url = `${BASEAPI}/v1/cancel-order/${currentOrder.order_id}`;
                    break;
                default:
                    return;
            }

            await axios.post(
                url,
                {},
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            setOrders((prevOrders) => {
                // Ensure prevOrders is an array
                const ordersArray = Array.isArray(prevOrders) ? prevOrders : [];
                return ordersArray.map((order) =>
                    order.order_id === currentOrder.order_id
                        ? { ...order, order_status: selectedStatus }
                        : order
                );
            });

            toast({
                title: `Order ${selectedStatus}.`,
                description: `The order has been marked as ${selectedStatus}.`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            toast({
                title: "Error updating status.",
                description: "There was an issue updating the order status.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    };


    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <h2 className="text-2xl font-bold mb-4 lg:mb-0">Order Details</h2>
                <button
                    className="bg-black text-white p-2 rounded-md hover:bg-gray-800"
                    onClick={() => navigate(-1)}
                >
                    Back to Orders
                </button>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Order ID:</p>
                        <p>{currentOrder.order_id}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Order Date:</p>
                        <p>{new Date(currentOrder.order_updated_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Order Status:</p>
                        <p className={`${getStatusColor(currentOrder.order_status)} font-bold`}>
                            {currentOrder.order_status}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Order Status Updated At:</p>
                        <p>{new Date(currentOrder.order_updated_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Customer Name:</p>
                        <p>{`${currentOrder.addresses[0]?.first_name} ${currentOrder.addresses[0]?.last_name}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Customer Email:</p>
                        <p>{`${currentOrder.addresses[0]?.email}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Mobile Number: </p>
                        <p>{`${currentOrder.addresses[0]?.mobile_number}`}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Shipping Address:</p>
                        <p>{`${currentOrder.addresses[0].street_address}, ${currentOrder.addresses[0].town_city}, ${currentOrder.addresses[0].state}, ${currentOrder.addresses[0].country}, ${currentOrder.addresses[0].pin_code}`}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 lg:mt-0">
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md mb-2"
                    >
                        <option value="">Select Status</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                        className="bg-black text-white p-2 rounded-md hover:bg-gray-800"
                        onClick={updateOrderStatus}
                    >
                        Update Status
                    </button>
                </div>
            </div>

            <div className="my-6">
                <h2 className="text-2xl font-bold mb-4">Order Items</h2>
                <hr className="mb-4" />
                {orderItems?.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4 border-b-2"
                    >
                        <div className="flex items-center gap-2 col-span-2">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    src={item.product_image || "https://res.cloudinary.com/default.jpg"}
                                    alt={item.product_name}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-sm md:text-base">Size: {item.size}</p>
                            <p className="text-sm md:text-base">Subcategory: {item.subcategory}</p>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <Link
                                className="text-blue-500 font-medium text-sm md:text-base"
                                to={`/product/${item.product_id}`}
                            >
                                {item.product_name}
                            </Link>
                            <p className="text-gray-500 text-sm md:text-base">₹{item.price}</p>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-sm md:text-base">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-sm md:text-base">Total Price: ₹{item.quantity_price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-2 p-4 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <hr className="mb-4" />
                <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                    <div className="flex flex-col gap-1">
                        <p>Subtotal</p>
                        <p>Plartform Charges</p>
                        <p>Shipping & Handling</p>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="font-semibold">₹{currentOrder.total}</p>
                        <p className="font-semibold">₹{currentOrder?.tax || 0}</p>
                        <p className="font-semibold">₹{currentOrder?.shipping || 0}</p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">₹{currentOrder.total}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;
