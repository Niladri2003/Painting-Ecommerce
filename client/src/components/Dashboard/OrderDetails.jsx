import React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { apiConnector } from "../../services/apiConnector.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
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
      <div className="h-[40rem] flex items-center justify-center">
        <p className="text-xl font-bold text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* full header */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="capitalize text-xl font-bold">Order details</h2>
            <button className="capitalize bg-black text-white p-2 rounded-sm md:px-3 md:py-2" onClick={()=>{navigate(-1)}}>
              Back to orders
            </button>
          </div>

          <hr className="my-7" />
          <div className="flex lg:flex-row flex-col md:items-center md:justify-between gap-5 md:gap-0">
            <div className="flex flex-col gap-[1rem] md:gap-[1rem]">
              <div className="flex gap-[1rem] items-center">
                <p className="font-semibold w-max">Order ID</p>
                <p className="text-[.85rem] md:text-[1rem]">
                  {currentOrders.order_id}
                </p>
              </div>
              <div className="flex gap-[1rem]">
                <p className="font-semibold">Order Date</p>
                <p>
                  {new Date(
                    currentOrders.order_created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button className="capitalize bg-black text-white p-1 rounded-sm md:px-3 md:py-2">
              Cancle Order
            </button>
          </div>
        </div>

        {/* order items and order summary */}
        {/* order items  */}
        <div className="my-7 md:flex-row flex-col flex justify-between gap-10">
          <div className="my-5 w-full md:w-[65%]">
            <h2 className="capitalize text-xl font-bold">Order Items</h2>
            <hr className="mb-5 mt-2" />
            <div>
              {orderItems.map((cur) => {
                return (
                  <div key={cur.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
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
                        {cur.descrption ||
                          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt vitae amet"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                      <Link
                        className="text-blue-500 text-md font-medium md:text-center"
                        to={`/product/${cur.product_id}`}
                      >
                        {cur.product_name}
                      </Link>
                      <p>₹{cur.price}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                      <p className="md:text-center font-medium md:font-normal">Status</p>
                      <p className="md:row-start-2">
                        {currentOrders.order_status}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                      <p className="md:text-center">{cur.quantity}</p>
                      <p className="row-start-1 md:row-start-2 font-medium md:font-normal">
                        Quantity
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:w-max gap-5 md:gap-0">
                      <p className="md:text-center">₹{currentOrders.total}</p>
                      <p className="row-start-1 md:row-start-2 font-medium md:font-normal">
                        Total Price
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex w-full">
              <button className="capitalize bg-black text-white px-6 py-2 rounded-sm md:px-5 md:py-2">
                Cancle Order
              </button>
            </div>
          </div>

          {/* order summary */}
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
                <p className="font-semibold">₹{currentOrders.total}</p>
                <p className="font-semibold flex justify-end">
                  ₹{currentOrders?.tax || 0}
                </p>
                <p className="font-semibold flex justify-end">
                  ₹{currentOrders?.shipping || 0}
                </p>
              </div>
            </div>
            <hr className="my-5" />
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
