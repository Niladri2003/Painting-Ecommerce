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
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]); // State to store available coupons
  const [appliedCoupon, setAppliedCoupon] = useState(null); // State for applied coupon
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCartDetails();
    fetchAvailableCoupons(); // Fetch available coupons on component mount
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

  const fetchAvailableCoupons = async () => {
    try {
      const response = await apiConnector(
        "GET",
        "/get-all-coupons",
        null,
        null,
        null,
        true
      );
      // Access the `data` field in the response
      const { data } = response;
      setAvailableCoupons(data.data || []); // Use data.data to access the coupons array
      console.log("Available coupons:", data.data); // Log the coupons array
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast({
        title: "Failed to fetch coupons.",
        description: error.response?.data?.msg || "Failed to fetch coupons.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const refreshCart = () => {
    fetchCartDetails();
  };

  const handleCheckout = () => {
    navigate("/buynow");
  };

  const handleApplyCoupon = async (couponCode) => {
    try {
      const response = await apiConnector(
        "POST",
        "/apply-coupon",
        { code: couponCode },
        null,
        null,
        true
      );
      setAppliedCoupon(couponCode); // Set the applied coupon code
      refreshCart();
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
      setAppliedCoupon(null); // Clear the applied coupon
      refreshCart();
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

  const handleCouponClick = (coupon) => {
    handleApplyCoupon(coupon.coupon_code); // Apply the coupon directly
  };

  if (!cartData) {
    return (
      <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
        <Spinner size="xl" />
        <div>Loading...</div>
      </div>
    );
  }

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
              <p className="flex text-center justify-center">Your cart is empty.</p>
            )}
          </div>
          <div className="w-full lg:w-[25%] pl-0 lg:pl-8">
            <div className="flex-col flex justify-between h-auto bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold mb-2">Order summary</h3>
                <p className="text-gray-600 mb-2">
                  Total Items: {cartData?.items?.length || 0}
                </p>
                {discount > 0 && (
                  <h2 className="text-lg mb-2">
                    Discount: ₹{totalPrice - finalPrice}
                  </h2>
                )}
                <h2 className={`text-xl font-bold mb-4`}>
                  Total: ₹{finalPrice || 0}
                </h2>
              </div>
              <div className="flex flex-col items-start">
                <button
                  className={`w-full ${cartData.items ? "bg-black" : "bg-gray-500"
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

        {/* coupon section */}
        <div className="mt-8">
          <div className="mb-4">
            {!appliedCoupon ? (
              availableCoupons.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-700 mb-2">Available Coupons:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableCoupons?.map((coupon) => (
                      <div
                        key={coupon.id}
                        className="bg-white shadow-lg border border-gray-300 rounded-lg p-4 transition-colors flex flex-row justify-between"
                      >
                        <div>
                          <h3 className="text-lg font-semibold">
                            {coupon.coupon_code}
                          </h3>
                          <p className="text-gray-600">
                            Discount: {coupon.discount_percentage}%
                          </p>
                        </div>
                        <button
                          onClick={() => handleCouponClick(coupon)}
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="flex">
                <p className="flex items-center gap-2 text-lg">
                  <SlTag /> <span>Promo code applied: {appliedCoupon}</span>
                </p>
                <p className="underline text-red-500 cursor-pointer ml-5" onClick={handleRemoveCoupon}>Remove</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
