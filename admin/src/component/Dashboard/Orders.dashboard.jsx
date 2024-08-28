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
    useToast,
} from "@chakra-ui/react";
import { BASEAPI } from "../../utils/BASEAPI";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [noOrdersMessage, setNoOrdersMessage] = useState(""); // State for no orders message
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (filterStatus) {
            const ordersForStatus = orders.filter(order => order.order_status === filterStatus);
            setFilteredOrders(ordersForStatus);
            setNoOrdersMessage(ordersForStatus.length === 0 ? `No ${filterStatus} orders available` : "");
        } else {
            setFilteredOrders(orders);
            setNoOrdersMessage(""); // Clear message if no filter is applied
        }
    }, [filterStatus, orders]);

    const fetchOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.get(`${BASEAPI}/v1/get-all-orders-admin`, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            setOrders(response.data.orders);
            setFilteredOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setStatus(order.order_status);
        onOpen();
    };

    const closeModal = () => {
        setSelectedOrder(null);
        onClose();
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const updateOrderStatus = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            if (!token) {
                throw new Error("No token found");
            }

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
                        Authorization: `${token}`,
                    },
                }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === selectedOrder.order_id
                        ? { ...order, order_status: status }
                        : order
                )
            );

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
            <div className="mb-4">
                <Select value={filterStatus} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Cancelled</option>
                </Select>
            </div>
            {noOrdersMessage && (
                <div className="mb-4">
                    <p className="text-lg text-red-500">{noOrdersMessage}</p>
                </div>
            )}
            <div className="overflow-x-auto">
                <Table variant="simple" bg="white" border="1px" borderColor="gray.300">
                    <Thead>
                        <Tr>
                            <Th>Product Name</Th>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>Total</Th>
                            <Th>Status</Th>
                            <Th>Updated At</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredOrders.map((order) => (
                            <Tr key={order.order_id} onClick={() => openModal(order)} cursor="pointer" _hover={{ bg: "gray.100" }}>
                                <Td>{order.order_items[0]?.product_name}</Td>
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
                                <Td>{dayjs(order.order_updated_at).format("DD-MM-YYYY HH:mm")}</Td>
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
