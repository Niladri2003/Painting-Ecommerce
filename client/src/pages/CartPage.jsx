import HomeHero from "../components/Home/HomeHero";
import React, { useState, useEffect } from 'react';
import { SlTag } from "react-icons/sl";
import { GrNotes } from "react-icons/gr";
import { useSelector } from "react-redux";

import { CartItem } from "../components/cart/CartItem";

const Cart = () => {
  const { cartId, cart, total, totalItems } = useSelector((state) => state.cart)
  const [couponVis, setcouponVis] = useState(false);
  const [noteVis, setnoteVis] = useState(false);


  return (
    <div className="w-full ">
      {/* <div className="h-16 border "></div> */}
      <div className="w-11/12 mx-auto flex flex-col mt-36 mb-12">
        <div className="flex w-full justify-between text-lg font-bold ">
          <div className="w-[70%] border-b-2 pb-3">My Cart</div>
          <div className="w-[25%] border-b-2 pb-3">Order Summary</div>
        </div>
        <div className="w-full flex mx-auto  ">
          <div className="w-[70%] flex flex-col mb-10">
            {
              cart.map((item) => {
                return <CartItem key={item.data.id} item={item} />
              })
            }
          </div>

          <div className="w-[25%] pl-8 ">
            <h3 className="text-lg font-semibold mb-2">Order summary</h3>
            <p className="text-gray-600 mb-2">Total Items: {totalItems}</p>
            <a href="#estimate-delivery" className="text-blue-500 hover:underline mb-2 block">
              Estimate Delivery
            </a>
            <h3 className="text-xl font-bold mb-4">Total: ₹{total} </h3>
            
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