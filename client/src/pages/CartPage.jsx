import HomeHero from "../components/Home/HomeHero";
import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlTag } from "react-icons/sl";
import { GrNotes } from "react-icons/gr";

const Cart = () => {
  const [couponVis, setcouponVis] = useState(false);
  const [noteVis, setnoteVis] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const price = 9.99;

  return (
    <div className="w-full h-">
      {/* <div className="h-16 border "></div> */}
      <div className="w-11/12 mx-auto flex flex-col mt-36 mb-12">
        <div className="flex w-full justify-between text-lg font-bold ">
          <div className="w-[70%] border-b-2 pb-3">My Cart</div>
          <div className="w-[25%] border-b-2 pb-3">Order Summary</div>
        </div>
        <div className="w-full flex mx-auto justify-between">
          <div className="flex justify-between items-center w-[70%] px-5">
            <div className="flex ">
              <img
                src="https://via.placeholder.com/100"
                alt="Product"
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="mr-8">
                <h3 className="text-lg font-semibold">Product Title 11</h3>
                <p className="text-gray-600">₹{price.toFixed(2)}</p>
                <p className="text-gray-500">Color: Light</p>
                <button className="text-blue-500 hover:underline">More Details</button>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center mr-8">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-semibold mr-8">₹{(price * quantity).toFixed(2)}</p>
              <button className="text-red-500 text-xl"><RiDeleteBin6Line /></button>
            </div>
          </div>

          <div className="w-[25%] pl-8">
            <h3 className="text-lg font-semibold mb-2">Order summary</h3>
            <p className="text-gray-600 mb-2">Subtotal: ₹{(price * quantity).toFixed(2)}</p>
            <a href="#estimate-delivery" className="text-blue-500 hover:underline mb-2 block">
              Estimate Delivery
            </a>
            <h3 className="text-xl font-bold mb-4">Total: ₹{(price * quantity).toFixed(2)}</h3>
            <button className="w-full bg-black text-white py-2 rounded">Checkout</button>
            <p className="text-gray-500 mt-2">🔒 Secure Checkout</p>
          </div>
        </div>
        <div>
          <div>
            <p
              onClick={() => setcouponVis(!couponVis)}
              className="flex items-center gap-5 cursor-pointer">
              <SlTag /> <span>Enter a promo code</span>
            </p>
            <input type="text" name="" id="" className={`${!couponVis ? "hidden " : "flex border outline-none"} `} />
          </div>
          <div>
            <p
              onClick={() => setnoteVis(!noteVis)}
              className="flex items-center gap-5 cursor-pointer">
              <GrNotes /> <span>Add a note</span>
            </p>
            <textarea name="" rows={3} cols={30} id="" className={`${!noteVis ? "hidden" : "flex border"}`}></textarea>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;

