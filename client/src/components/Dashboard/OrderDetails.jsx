import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { apiConnector } from "../../services/apiConnector.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader.jsx";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrders, setcurrentOrders] = useState([]);
  const [orderItems, setorderItems] = useState([]);
  const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const { data } = await apiConnector(
        "GET",
        "/get-all-orders",
        null,
        null,
        null,
        true
      );
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

  const cancelOrder = async () => {
    try {
      const { data } = await apiConnector(
        "POST",
        `/cancel-order/${currentOrders.order_id}`,
        null,
        null,
        null,
        true
      );
      toast({
        title: data.msg || "Order cancelled successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let ordersData = orders?.data;

    if (ordersData) {
      const filterOrder = ordersData.filter(
        (cur) => cur.order_id == params.orderTrack
      );

      setcurrentOrders(...filterOrder);
    }
  }, [orders, params.orderTrack]);

  useEffect(() => {
    if (currentOrders && currentOrders.order_items) {
      setorderItems(currentOrders.order_items);
    }
  }, [currentOrders]);

  if (!orders || !Array.isArray(orders.data) || orders.data.length === 0) {
    return <Loader />;
  }

  const getStatusColor = (status) => {
    const data = status ? status : "";
    switch (data.toLowerCase()) {
      case "delivered":
        return "text-green-500";
      case "shipped":
        return "text-blue-500";
      case "canceled":
        return "text-red-500";
      case "pending":
        return "text-orange-600";
      default:
        return "text-gray-500";
    }
  };

  const getStatus = (status) => {
    const data = status ? status : "";
    switch (data.toLowerCase()) {
      case "delivered":
      case "shipped":
        return true;
      case "canceled":
      case "pending":
        return false;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="px-4 py-6">
        {/* Full header */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-Poppins">
            <h2 className="capitalize text-xl font-bold mb-3 md:mb-0">Order details</h2>
            <button
              className="capitalize bg-black text-white p-2 rounded-sm md:px-3 md:py-2"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back to orders
            </button>
          </div>

          <hr className="my-7" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-0 font-Poppins">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <p className="font-semibold lg:text-base text-sm">Order ID :</p>
                <p className="lg:text-base text-sm">{currentOrders.order_id}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-semibold lg:text-base text-sm">Order Date:</p>
                <p className="lg:text-base text-sm">
                  {new Date(currentOrders.order_created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="font-semibold">Order Status:</p>
                <p className={`${getStatusColor(currentOrders.order_status)} font-bold uppercase`}>
                  {currentOrders.order_status}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="capitalize bg-black text-white p-1 rounded-sm md:px-3 md:py-2"
                onClick={cancelOrder}
                disabled={getStatus(currentOrders.order_status)}
              >
                Cancel Order
              </button>
              <button
                onClick={() => alert("Coming soon")}
                className="capitalize bg-black text-white p-1 rounded-sm md:px-3 md:py-2"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Order items and order summary */}
        <div className="my-7 flex flex-col md:flex-row justify-between gap-10 font-Poppins">
          {/* Order items */}
          <div className="my-5 w-full md:w-3/4">
            <h2 className="capitalize text-xl font-bold">Order Items</h2>
            <hr className="mb-5 mt-2" />
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border-b text-left">Product</th>
                    <th className="p-2 border-b text-left">Name</th>
                    <th className="p-2 border-b text-left">Size</th>
                    <th className="p-2 border-b text-left">Subcategory</th>
                    <th className="p-2 border-b text-left">Quantity</th>
                    <th className="p-2 border-b text-left">Quantity Price</th>
                    <th className="p-2 border-b text-left">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((cur) => (
                    <tr key={cur.id} className="odd:bg-gray-100">
                      <td className="p-2 border-b">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-20 overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={
                                cur.product_image ||
                                "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409721/paintings_image/keoti85wwhm3uzoxp1zs.webp"
                              }
                              alt={cur.product_name}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border-b">
                        <Link
                          className="text-blue-500 text-md font-medium"
                          to={`/product/${cur.product_id}`}
                        >
                          {cur.product_name}
                        </Link>
                      </td>
                      <td className="text-md font-medium border-b">{cur.size}</td>
                      <td className="text-md font-medium border-b">{cur.subcategory}</td>
                      <td className="p-2 border-b">
                        <p className="font-medium">{cur.quantity}</p>
                      </td>
                      <td className="p-2 border-b">
                        <p className="font-medium">{cur.quantity_price}</p>
                      </td>
                      <td className="p-2 border-b">
                        <p className="font-medium">₹{currentOrders.total}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order summary */}
          <div className="border-2 w-full md:w-1/4 rounded-md p-5">
            <h2 className="capitalize text-xl font-bold">Order Summary</h2>
            <hr className="mb-5 mt-2" />
            <div className="flex flex-col gap-4">
              {orderItems.map((cur) => (
                <div key={cur.id} className="flex justify-between gap-2 items-center">
                  <p className="lg:text-base text-sm">{cur.product_name}</p>
                  <p className="font-bold lg:text-base text-sm">₹{cur.quantity_price}</p>
                </div>
              ))}
              <hr className="my-5" />
              <div className="flex justify-between gap-2 items-center">
                <p className="font-semibold">Total</p>
                <p className="font-bold">₹{currentOrders.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
