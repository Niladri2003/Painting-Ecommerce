import React, { useState, useEffect } from "react";
import { SlTag } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { CartItem } from "../components/cart/CartItem";
import { Spinner } from "@chakra-ui/react";
import { apiConnector } from "../services/apiConnector.jsx";
import { setTotalItems } from "../slices/cartSlice.jsx";
import { useDispatch } from "react-redux";

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [couponVis, setCouponVis] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [cartData, setCartData] = useState(null); // Holds the cart data
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const fetchCartDetails = async () => {
    try {
      const { data } = await apiConnector(
        "GET",
        "/get-cart",
        null,
        null,
        null,
        true
      );
      console.log("coupon", data.cart.coupon_code);
      setCartData(data.cart);
      toast({
        title: data.msg || "Cart item retrieved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const TotalItems = data?.cart?.items?.length || 0;
      dispatch(setTotalItems(TotalItems));
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast({
        title: "Failed to fetch cart.",
        description: error.response?.data?.msg || "Failed to fetch cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    setCouponCode(e.target.value);
  };

  const refreshCart = () => {
    fetchCartDetails();
  };

  const handleCheckout = () => {
    navigate("/buynow"); // Redirect to the Buynow page
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await apiConnector(
        "POST",
        "/apply-coupon",
        { code: couponCode },
        null,
        null,
        true
      );
      console.log("response", response);
      refreshCart(); // Refresh the cart data after applying the coupon
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast({
        title: "Failed to apply coupon",
        description: error.response?.data?.msg || "Failed to apply coupon.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const response = await apiConnector(
        "POST",
        "/remove-coupon",
        null,
        null,
        null,
        true
      );
      console.log("response", response);
      refreshCart(); // Refresh the cart data after removing the coupon
    } catch (error) {
      console.error("Error removing coupon:", error);
      toast({
        title: "Failed to remove coupon",
        description: error.response?.data?.msg || "Failed to remove coupon.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!cartData) {
    return (
      <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
        <Spinner size="xl" />
        <div>Loading...</div>
      </div>
    );
  }
  // Initialize prices with 0
  let totalPrice = 0;
  let discount = 0;
  let finalPrice = 0;

  if (cartData) {
    const items = cartData.items || [];
    totalPrice = items.reduce(
      (acc, item) => acc + item.after_discount_total_price,
      0
    );
    discount = cartData.discount_percentage
      ? (totalPrice * cartData.discount_percentage) / 100
      : 0;
    finalPrice = totalPrice - discount;
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
        <div className="w-full flex flex-col gap-16 lg:flex-row mt-8">
          <div className="w-full lg:w-[70%] flex flex-col mb-10">
            {cartData?.items?.length > 0 ? (
              cartData.items.map((item) => (
                <CartItem key={item.id} item={item} refreshCart={refreshCart} />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="w-full lg:w-[25%] pl-0 lg:pl-8">
            <div className="flex-col flex justify-between h-full bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold mb-2">Order summary</h3>
                <p className="text-gray-600 mb-2">
                  Total Items: {cartData?.items?.length || 0}
                </p>
                {discount > 0 && (
                  <h2 className="text-lg mb-2">
                    Discount:₹{totalPrice - finalPrice}
                  </h2>
                )}
                <h2 className={`text-xl font-bold mb-4`}>
                  Total: ₹{finalPrice || 0}
                </h2>
              </div>
              <div className="flex flex-col items-start">
                <button
                  className={`w-full ${
                    cartData.items ? "bg-black" : "bg-gray-500"
                  } text-white py-2 rounded`}
                  onClick={handleCheckout}
                  disabled={!cartData.items}
                >
                  Checkout
                </button>
                <div className="w-full flex justify-center">
                  <p className="text-gray-500 mt-2">🔒 Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="mb-4">
            {!cartData.is_coupon_applied ? (
              <>
                <p
                  onClick={() => setCouponVis(!couponVis)}
                  className="flex items-center gap-2 cursor-pointer text-lg"
                >
                  <SlTag /> <span>Enter a promo code</span>
                </p>
                <div
                  className={`flex items-center ${
                    couponVis ? "flex-row" : "hidden"
                  } mt-2`}
                >
                  <input
                    type="text"
                    className="border outline-none w-full lg:w-1/4 px-4 py-2 rounded"
                    value={couponCode}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-black text-white py-2 px-4 rounded ml-2 flex-shrink-0 flex items-center justify-center"
                    disabled={!couponCode && !cartData.items}
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full md:w-[40%] flex items-center justify-between gap-2 mt-2 p-4 bg-green-100 rounded-lg border border-green-300">
                <p className="text-sd md:text-lg font-semibold text-green-800">
                  Coupon "{cartData.coupon_code}" applied!
                </p>
                <button
                  className="border-2 border-red-500 bg-red-500 hover:text-red-500 font-medium text-white transition-colors hover:bg-transparent duration-[.3s] px-4 py-1 rounded-[.2rem]"
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;