import React from "react";
import { useEffect, useState } from "react";
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
      await console.log("orders", data);
      setOrders(data);
      await console.log("orders", orders);
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
  console.log(orderItems);
  console.log(currentOrders);

  if (!orders || !Array.isArray(orders.data) || orders.data.length === 0) {
    return (
      // <div className="h-[40rem] flex items-center justify-center">
      //   <p className="text-xl font-bold text-gray-500">No orders found.</p>
      // </div>
        <Loader/>
    );
  }
  const getStatusColor = (status) => {
    const data= status ? status: ""
    switch (data.toLowerCase()) {
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
  return (
    <>
      <div>
        {/* full header */}
        <div>
          <div className="flex justify-between items-center font-Poppins">
            <h2 className="capitalize text-xl font-bold">Order details</h2>
            <button className="capitalize bg-black text-white p-2 rounded-sm md:px-3 md:py-2" onClick={()=>{navigate(-1)}}>
              Back to orders
            </button>
          </div>

          <hr className="my-7" />
          <div className="flex lg:flex-row flex-col md:items-center md:justify-between gap-5 md:gap-0 font-Poppins">
            <div className="flex flex-col gap-[1rem] md:gap-[1rem]">
              <div className="flex gap-[1rem] items-center">
                <p className="font-semibold lg:text-[15px] text-[12px] w-max">Order ID :</p>
                <p className="lg:text-[.85rem] text-[13px] md:text-[1rem]">
                  {currentOrders.order_id}
                </p>
              </div>
              <div className="flex gap-[1rem]">
                <p className="font-semibold lg:text-[15px] text-[12px]">Order Date: </p>
                <p className={"lg:text-[.85rem] text-[13px]"}>
                  {new Date(
                      currentOrders.order_created_at
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-[1rem]">
                <p className="font-semibold">Order Status: </p>
                <p className={`${getStatusColor(currentOrders.order_status)} font-bold uppercase`}>
                  {currentOrders.order_status}
                </p>
              </div>
            </div>
            <div className={"flex flex-col gap-2"}>
              <button className="capitalize bg-black text-white p-1 rounded-sm md:px-3 md:py-2">
                Cancle Order
              </button>
              <button onClick={()=>(alert("Coming soon"))} className="capitalize bg-black text-white p-1 rounded-sm md:px-3 md:py-2">
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* order items and order summary */}
        {/* order items  */}
        <div className="my-7 md:flex-row flex-col flex justify-between gap-10 font-Poppins">
          <div className="my-5 w-full md:w-[65%] ">
            <h2 className="capitalize text-xl font-bold">Order Items</h2>
            <hr className="mb-5 mt-2"/>
            <div className={"w-full  overscroll-x-auto"}>
              <table className="min-w-full border-collapse">
                <thead>
                <tr>
                  <th className="p-2 border-b text-left">Product</th>
                  <th className="p-2 border-b text-left">Name</th>
                  <th className="p-2 border-b text-left">Size</th>
                  <th className="p-2 border-b text-left">Subcategory</th>
                  <th className="p-2 border-b text-left">Status</th>
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
                          <div className="w-[8rem] overflow-hidden">
                            <img
                                className="w-full"
                                src={
                                    cur.product_image ||
                                    "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724409721/paintings_image/keoti85wwhm3uzoxp1zs.webp"
                                }
                                alt={cur.product_name}
                            />
                          </div>
                          <p className="md:hidden w-[80%]">
                            {cur.description ||
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt vitae amet"}
                          </p>
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
                      <td  className=" text-md font-medium border-b"
                        >
                          {cur.size}

                      </td>
                      <td className=" text-md font-medium border-b">
                          {cur.subcategory}

                      </td>
                      <td className="p-2 border-b">
                        <p className="font-medium">{currentOrders.order_status}</p>
                      </td>
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

            <div className="mt-5 flex w-full">
              {/*<button className="capitalize bg-black text-white px-6 py-2 rounded-sm md:px-5 md:py-2">*/}
              {/*  Cancle Order*/}
              {/*</button>*/}
            </div>
          </div>

          {/* order summary */}
          <div className="border-2 w-full h-[50%] rounded-md md:w-[35%] p-5">
            <h2 className="capitalize text-xl font-bold">Order Summary</h2>
            <hr className="mb-5 mt-2"/>
            <div className="flex flex-col gap-[1rem]">
              {orderItems.map((cur) => (
                  <div
                      key={cur.id}
                      className="flex justify-between"
                  >
                    <p className="font-medium">
                      {cur.quantity} x ₹{cur.quantity_price}
                    </p>
                    <p className="font-semibold">
                      ₹{cur.quantity * cur.quantity_price}
                    </p>
                  </div>
              ))}
            </div>
            <hr className="my-5"/>
            <div className="flex justify-between">
              <p className="flex">Total</p>
              <p className="font-semibold flex">₹{currentOrders?.total}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default OrderDetails;
