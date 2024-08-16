// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import Modal from "react-modal"; // Ensure this is installed if not already
// import { BASEAPI } from "../../utils/BASEAPI";

// const OrdersList = () => {
//     const [orders, setOrders] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);


//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {

//         try {
//             const token = JSON.parse(localStorage.getItem('token')); // Retrieve token from localStorage
//             console.log(token)

//             if (!token) {
//                 throw new Error("No token found");
//             }

//             const response = await axios.get(`${BASEAPI}/v1/get-all-orders-admin`, {
//                 headers: {
//                     Authorization: `${token}`, // Add the Authorization header
//                 },
//             });

//             setOrders(response.data.orders);
//             console.log(response.data.orders); // Optional: Verify the data in the console
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//         }
//     };

//     const openModal = (order) => {
//         setSelectedOrder(order);
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setSelectedOrder(null);
//     };

//     return (
//         <div className="w-full p-5">
//             <h2 className="text-2xl font-semibold mb-4">Orders</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="px-6 py-3 border-b">Order ID</th>
//                             <th className="px-6 py-3 border-b">User ID</th>
//                             <th className="px-6 py-3 border-b">Total</th>
//                             <th className="px-6 py-3 border-b">Status</th>
//                             <th className="px-6 py-3 border-b">Created At</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order) => (
//                             <tr key={order.order_id} className="cursor-pointer hover:bg-gray-100" onClick={() => openModal(order)}>
//                                 <td className="px-6 py-4 border-b">{order.order_id}</td>
//                                 <td className="px-6 py-4 border-b">{order.user_id}</td>
//                                 <td className="px-6 py-4 border-b">{order.total}</td>
//                                 <td className={`px-6 py-4 border-b ${order.order_status === "pending" ? "text-yellow-600" : "text-green-600"}`}>{order.order_status}</td>
//                                 <td className="px-6 py-4 border-b">{dayjs(order.order_created_at).format("DD-MM-YYYY HH:mm")}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {selectedOrder && (
//                 <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Order Details" className="modal-class">
//                     <div className="bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
//                         <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
//                         <p><strong>User ID:</strong> {selectedOrder.user_id}</p>
//                         <p><strong>Total:</strong> {selectedOrder.total}</p>
//                         <p><strong>Status:</strong> {selectedOrder.order_status}</p>
//                         <p><strong>Created At:</strong> {dayjs(selectedOrder.order_created_at).format("DD-MM-YYYY HH:mm")}</p>

//                         <h3 className="text-xl font-semibold mt-6 mb-2">Address</h3>
//                         {selectedOrder.addresses.map((address) => (
//                             <div key={address.id} className="mb-4">
//                                 <p><strong>Name:</strong> {address.first_name} {address.last_name}</p>
//                                 <p><strong>Country:</strong> {address.country}</p>
//                                 <p><strong>Address:</strong> {address.street_address}, {address.town_city}, {address.state}, {address.pin_code}</p>
//                                 <p><strong>Email:</strong> {address.email}</p>
//                                 <p><strong>Phone:</strong> {address.mobile_number}</p>
//                             </div>
//                         ))}

//                         <h3 className="text-xl font-semibold mt-6 mb-2">Order Items</h3>
//                         {selectedOrder.order_items.map((item) => (
//                             <div key={item.id} className="mb-4">
//                                 <p><strong>Product Name:</strong> {item.product_name}</p>
//                                 <p><strong>Quantity:</strong> {item.quantity}</p>
//                                 <p><strong>Price:</strong> {item.price}</p>
//                                 <p><strong>Status:</strong> {item.status}</p>
//                             </div>
//                         ))}

//                         <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Close</button>
//                     </div>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default OrdersList;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import {
//     Button,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     useDisclosure,
// } from "@chakra-ui/react";
// import { BASEAPI } from "../../utils/BASEAPI";

// const OrdersList = () => {
//     const [orders, setOrders] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem("token")); // Retrieve token from localStorage

//             if (!token) {
//                 throw new Error("No token found");
//             }

//             const response = await axios.get(`${BASEAPI}/v1/get-all-orders-admin`, {
//                 headers: {
//                     Authorization: `${token}`, // Add the Authorization header
//                 },
//             });

//             setOrders(response.data.orders);
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//         }
//     };

//     const openModal = (order) => {
//         setSelectedOrder(order);
//         onOpen();
//     };

//     const closeModal = () => {
//         setSelectedOrder(null);
//         onClose();
//     };

//     return (
//         <div className="w-full p-5">
//             <h2 className="text-2xl font-semibold mb-4">Orders</h2>
//             <div className="overflow-x-auto">
//                 <Table variant="simple" bg="white" border="1px" borderColor="gray.300">
//                     <Thead>
//                         <Tr>
//                             <Th>Order ID</Th>
//                             <Th>First Name</Th>
//                             <Th>Last Name</Th>
//                             <Th>Total</Th>
//                             <Th>Status</Th>
//                             <Th>Created At</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {orders.map((order) => (
//                             <Tr key={order.order_id} onClick={() => openModal(order)} cursor="pointer" _hover={{ bg: "gray.100" }}>
//                                 <Td>{order.order_id}</Td>
//                                 <Td>{order.addresses[0]?.first_name}</Td>
//                                 <Td>{order.addresses[0]?.last_name}</Td>
//                                 <Td>{order.total}</Td>
//                                 <Td color={order.order_status === "pending" ? "yellow.600" : "green.600"}>{order.order_status}</Td>
//                                 <Td>{dayjs(order.order_created_at).format("DD-MM-YYYY HH:mm")}</Td>
//                             </Tr>
//                         ))}
//                     </Tbody>
//                 </Table>
//             </div>

//             <Modal isOpen={isOpen} onClose={closeModal} size="lg">
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Order Details</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         {selectedOrder && (
//                             <>
//                                 <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
//                                 <p><strong>User ID:</strong> {selectedOrder.user_id}</p>
//                                 <p><strong>Total:</strong> {selectedOrder.total}</p>
//                                 <p><strong>Status:</strong> {selectedOrder.order_status}</p>
//                                 <p><strong>Created At:</strong> {dayjs(selectedOrder.order_created_at).format("DD-MM-YYYY HH:mm")}</p>

//                                 <h3 className="text-xl font-semibold mt-6 mb-2">Address</h3>
//                                 {selectedOrder.addresses.map((address) => (
//                                     <div key={address.id} className="mb-4">
//                                         <p><strong>Name:</strong> {address.first_name} {address.last_name}</p>
//                                         <p><strong>Country:</strong> {address.country}</p>
//                                         <p><strong>Address:</strong> {address.street_address}, {address.town_city}, {address.state}, {address.pin_code}</p>
//                                         <p><strong>Email:</strong> {address.email}</p>
//                                         <p><strong>Phone:</strong> {address.mobile_number}</p>
//                                     </div>
//                                 ))}

//                                 <h3 className="text-xl font-semibold mt-6 mb-2">Order Items</h3>
//                                 {selectedOrder.order_items.map((item) => (
//                                     <div key={item.id} className="mb-4">
//                                         <p><strong>Product Name:</strong> {item.product_name}</p>
//                                         <p><strong>Quantity:</strong> {item.quantity}</p>
//                                         <p><strong>Price:</strong> {item.price}</p>
//                                         <p><strong>Status:</strong> {item.status}</p>
//                                     </div>
//                                 ))}
//                             </>
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="blue" onClick={closeModal}>
//                             Close
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </div>
//     );
// };

// export default OrdersList;



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

            const url =
                status === "shipped"
                    ? `${BASEAPI}/v1/status-shipped/${selectedOrder.order_id}`
                    : `${BASEAPI}/v1/status-delivered/${selectedOrder.order_id}`;

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
                title: "Order status updated.",
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
                                <Td color={order.order_status === "pending" ? "yellow.600" : "green.600"}>{order.order_status}</Td>
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
