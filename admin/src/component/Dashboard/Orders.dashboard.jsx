
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    useDisclosure,
    useToast, // Import useToast from Chakra UI
} from "@chakra-ui/react";
import { BASEAPI } from "../../utils/BASEAPI";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState(""); // State for tracking status change
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast(); // Initialize useToast

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token")); // Retrieve token from localStorage

            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.get(`${BASEAPI}/v1/get-all-orders-admin`, {
                headers: {
                    Authorization: `${token}`, // Add the Authorization header
                },
            });

            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setStatus(order.order_status); // Set the initial status
        onOpen();
    };

    const closeModal = () => {
        setSelectedOrder(null);
        onClose();
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const updateOrderStatus = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token")); // Retrieve token from localStorage

            if (!token) {
                throw new Error("No token found");
            }

            // Check if the order has been delivered or cancelled
            if (selectedOrder.order_status === "delivered") {
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

            if (selectedOrder.order_status === "cancelled") {
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

            if (selectedOrder.order_status === "shipped" && status === "cancelled") {
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

            switch (status) {
                case "shipped":
                    url = `${BASEAPI}/v1/status-shipped/${selectedOrder.order_id}`;
                    break;
                case "delivered":
                    url = `${BASEAPI}/v1/status-delivered/${selectedOrder.order_id}`;
                    break;
                case "cancelled":
                    url = `${BASEAPI}/v1/cancel-order/${selectedOrder.order_id}`;
                    break;
                default:
                    return;
            }

            await axios.post(
                url,
                {},
                {
                    headers: {
                        Authorization: `${token}`, // Add the Authorization header
                    },
                }
            );

            // Update the status in the local state
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === selectedOrder.order_id
                        ? { ...order, order_status: status }
                        : order
                )
            );

            // Show a success toast notification
            toast({
                title: `Order ${status}.`,
                description: `The order has been marked as ${status}.`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            closeModal();
        } catch (error) {
            console.error("Error updating order status:", error);
            // Show an error toast notification if the API call fails
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
        <div className="w-full p-5">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <div className="overflow-x-auto">
                <Table variant="simple" bg="white" border="1px" borderColor="gray.300">
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>Total</Th>
                            <Th>Status</Th>
                            <Th>Created At</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order.order_id} onClick={() => openModal(order)} cursor="pointer" _hover={{ bg: "gray.100" }}>
                                <Td>{order.order_id}</Td>
                                <Td>{order.addresses[0]?.first_name}</Td>
                                <Td>{order.addresses[0]?.last_name}</Td>
                                <Td>{order.total}</Td>
                                <Td color={
                                    order.order_status === "pending" ? "yellow.600" :
                                    order.order_status === "shipped" ? "blue.600" :
                                    order.order_status === "delivered" ? "green.600" :
                                    "red.600"
                                }>
                                    {order.order_status}
                                </Td>
                                <Td>{dayjs(order.order_created_at).format("DD-MM-YYYY HH:mm")}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedOrder && (
                            <>
                                <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                                <p><strong>User ID:</strong> {selectedOrder.user_id}</p>
                                <p><strong>Total:</strong> {selectedOrder.total}</p>
                                <p><strong>Status:</strong> {selectedOrder.order_status}</p>
                                <p><strong>Created At:</strong> {dayjs(selectedOrder.order_created_at).format("DD-MM-YYYY HH:mm")}</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">Address</h3>
                                {selectedOrder.addresses.map((address) => (
                                    <div key={address.id} className="mb-4">
                                        <p><strong>Name:</strong> {address.first_name} {address.last_name}</p>
                                        <p><strong>Country:</strong> {address.country}</p>
                                        <p><strong>Address:</strong> {address.street_address}, {address.town_city}, {address.state}, {address.pin_code}</p>
                                        <p><strong>Email:</strong> {address.email}</p>
                                        <p><strong>Phone:</strong> {address.mobile_number}</p>
                                    </div>
                                ))}

                                <h3 className="text-xl font-semibold mt-6 mb-2">Order Items</h3>
                                {selectedOrder.order_items.map((item) => (
                                    <div key={item.id} className="mb-4">
                                        <p><strong>Product Name:</strong> {item.product_name}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Price:</strong> {item.price}</p>
                                        <p><strong>Status:</strong> {item.status}</p>
                                    </div>
                                ))}

                                <h3 className="text-xl font-semibold mt-6 mb-2">Update Order Status</h3>
                                <Select value={status} onChange={handleStatusChange} mb={4}>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={updateOrderStatus} mr={3}>
                            Update Status
                        </Button>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default OrdersList;
