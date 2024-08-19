// import HomeHero from "../components/Home/HomeHero";
// import React, { useState } from 'react';
// import { SlTag } from "react-icons/sl";
// import { GrNotes } from "react-icons/gr";
// import { useSelector } from "react-redux";
// import { CartItem } from "../components/cart/CartItem";

// const Cart = () => {
//   const { cart, total, totalItems } = useSelector((state) => state.cart)
//   const [couponVis, setcouponVis] = useState(false);
//   const [noteVis, setnoteVis] = useState(false);

//   return (
//     <div className="w-full">
//       <div className="w-11/12 mx-auto flex flex-col mt-16 lg:mt-36 mb-12">
//         <div className="flex flex-col lg:flex-row w-full justify-between text-lg font-bold">
//           <div className="w-full lg:w-[70%] border-b-2 pb-3">My Cart</div>
//           <div className=" hidden sm:block w-full lg:w-[25%] border-b-2 pb-3 mt-4 lg:mt-0">Order Summary</div>
//         </div>
//         <div className="w-full flex flex-col lg:flex-row mt-8">
//           <div className="w-full lg:w-[70%] flex flex-col mb-10">
//             {cart.map((item) => {
//               return <CartItem key={item.data.id} item={item} />
//             })}
//           </div>

//           <div className="w-full lg:w-[25%] pl-0 lg:pl-8">
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">Order summary</h3>
//               <p className="text-gray-600 mb-2">Total Items: {totalItems}</p>
//               <a href="#estimate-delivery" className="text-blue-500 hover:underline mb-2 block">
//                 Estimate Delivery
//               </a>
//               <h3 className="text-xl font-bold mb-4">Total: ₹{total}</h3>
//               <button className="w-full bg-black text-white py-2 rounded">Checkout</button>
//               <p className="text-gray-500 mt-2">🔒 Secure Checkout</p>
//             </div>
//           </div>
          
//         </div>
//         <div className="mt-8">
//           <div className="mb-4">
//             <p
//               onClick={() => setcouponVis(!couponVis)}
//               className="flex items-center gap-2 cursor-pointer text-lg">
//               <SlTag /> <span>Enter a promo code</span>
//             </p>
//             <input
//               type="text"
//               className={`mt-2 ${!couponVis ? "hidden" : "flex border outline-none w-full px-4 py-2 rounded"}`}
//             />
//           </div>
//           {/* <div>
//             <p
//               onClick={() => setnoteVis(!noteVis)}
//               className="flex items-center gap-2 cursor-pointer text-lg">
//               <GrNotes /> <span>Add a note</span>
//             </p>
//             <textarea
//               rows={3}
//               cols={30}
//               className={`mt-2 ${!noteVis ? "hidden" : "flex border w-full px-4 py-2 rounded"}`}
//             ></textarea>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import HomeHero from "../components/Home/HomeHero";
import React, { useState } from 'react';
import { SlTag } from "react-icons/sl";
import { GrNotes } from "react-icons/gr";
import { useSelector } from "react-redux";
import { CartItem } from "../components/cart/CartItem";

const Cart = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart);
  const [couponVis, setcouponVis] = useState(false);
  const [coupon, setCoupon] = useState("");

  const handleInputChange = (e) => {
    setCoupon(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto flex flex-col mt-16 lg:mt-36 mb-12">
        <div className="flex flex-col lg:flex-row w-full justify-between text-lg font-bold">
          <div className="w-full lg:w-[70%] border-b-2 pb-3">My Cart</div>
          <div className="hidden sm:block w-full lg:w-[25%] border-b-2 pb-3 mt-4 lg:mt-0">Order Summary</div>
        </div>
        <div className="w-full flex flex-col lg:flex-row mt-8">
          <div className="w-full lg:w-[70%] flex flex-col mb-10">
            {cart.map((item) => {
              return <CartItem key={item.data.id} item={item} />;
            })}
          </div>

          <div className="w-full lg:w-[25%] pl-0 lg:pl-8">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Order summary</h3>
              <p className="text-gray-600 mb-2">Total Items: {totalItems}</p>
              <a href="#estimate-delivery" className="text-blue-500 hover:underline mb-2 block">
                Estimate Delivery
              </a>
              <h3 className="text-xl font-bold mb-4">Total: ₹{total}</h3>
              <button className="w-full bg-black text-white py-2 rounded">Checkout</button>
              <p className="text-gray-500 mt-2">🔒 Secure Checkout</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <p
              onClick={() => setcouponVis(!couponVis)}
              className="flex items-center gap-2 cursor-pointer text-lg"
            >
              <SlTag /> <span>Enter a promo code</span>
            </p>
            <div className={`flex items-center ${couponVis ? 'flex-row' : 'hidden'} mt-2`}>
              <input
                type="text"
                className="border outline-none w-full lg:w-1/4 px-4 py-2 rounded"
                value={coupon}
                onChange={handleInputChange}
              />
              <button
                className="bg-black text-white py-2 px-4 rounded ml-2 flex-shrink-0 flex items-center justify-center"
                disabled={!coupon}
              >
                Apply
              </button>
            </div>
          </div>

          {/* <div>
            <p
              onClick={() => setnoteVis(!noteVis)}
              className="flex items-center gap-2 cursor-pointer text-lg"
            >
              <GrNotes /> <span>Add a note</span>
            </p>
            <textarea
              rows={3}
              cols={30}
              className={`mt-2 ${!noteVis ? "hidden" : "flex border w-full px-4 py-2 rounded"}`}
            ></textarea>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
