import  {useEffect, useState} from "react";
import { Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import {apiConnector} from "../../services/apiConnector.jsx";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const toast = useToast();

    const loadOrders = async () => {
        try {
            const {data} =await apiConnector('GET','/get-all-orders',null,null,null,true)
            await console.log("orders",data)
            setOrders(data);
            await console.log("orders",orders)
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

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    if (!orders || !Array.isArray(orders.data) || orders.data.length === 0) {
        return (
            <div className="h-[40rem] flex items-center justify-center">
                <p className="text-xl font-bold text-gray-500">No orders found.</p>
            </div>
        );
    }

    return (
        <div className="h-[40rem] overflow-auto scrollbar-thin">
            <div className="bg-gray-100 p-4 sticky top-0 z-10">
                <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            </div>
            <Table variant="simple" bg="white" border="1px" borderColor="gray.300">
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Total</Th>
                        <Th>Status</Th>
                        <Th>Created At</Th>
                        <Th>Invoice</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders && orders.data.map((order) => (
                        <>
                            <Tr key={order?.order_id} onClick={() => toggleOrderDetails(order?.order_id)} className="cursor-pointer">
                                <Td>{order?.order_items[0]?.product_name}</Td>
                                <Td>₹{order?.total}</Td>
                                <Td><span className={`font-bold ${order.order_status === 'Delivered' ? 'text-green-700' : 'text-yellow-700'}`}>{order.order_status}</span></Td>
                                <Td>{new Date(order.order_created_at).toLocaleDateString('en-GB')}</Td>
                                <Td>
                                    <button
                                        className="border-2 border-black p-2 rounded-[1rem] bg-black group duration-300 hover:bg-transparent hover:text-black cursor-pointer text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toast({ title: "Download invoice feature coming soon!", status: "info", duration: 2500, isClosable: true });
                                        }}
                                    >
                                        Invoice
                                    </button>
                                </Td>
                            </Tr>

                            {expandedOrderId === order.order_id && (
                                <Tr>
                                    <Td colSpan="5" className="bg-gray-50">
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-2">Order Details</h3>
                                            <p><strong>Address:</strong> {`${order.addresses[0].street_address}, ${order.addresses[0].town_city}, ${order.addresses[0].state}, ${order.addresses[0].country} - ${order.addresses[0].pin_code}`}</p>
                                            <p><strong>Email:</strong> {order.addresses[0].email}</p>
                                            <p><strong>Mobile:</strong> {order.addresses[0].mobile_number}</p>
                                            <p><strong>Items:</strong></p>
                                            <ul className="list-disc pl-5">
                                                {order.order_items.map((item) => (
                                                    <li key={item.id}>{item.product_name} - {item.size} - {item.subcategory} - Qty: {item.quantity} - ₹{item.quantity_price}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Td>
                                </Tr>
                            )}
                        </>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default Orders;
