// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../slices/cartSlice";
// import axios from "axios";
// import Footer from "../components/footer/Footer";
// import { BASEAPI } from "../utils/BASE_API";

// const ProductCheckout = () => {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.cart);
//   const { id } = useParams();
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [sections, setSections] = useState({
//     productInfo: false,
//     returnPolicy: false,
//     shippingInfo: false,
//   });
//   const [selectedOption, setSelectedOption] = useState("Select");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleNavigate = (cur) => {
//     navigate(`/product/${cur.id}`);
//   };

//   const getProductDetails = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${BASEAPI}/get-product-details/${id}`);
//       setProduct(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProductDetails();
//   }, [id]);

//   const handleNextImage = () => {
//     setSelectedImageIndex((prevIndex) =>
//       product.images && prevIndex < product.images.length - 1
//         ? prevIndex + 1
//         : prevIndex
//     );
//   };

//   const handlePreviousImage = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : prevIndex
//     );
//   };

//   const toggleSection = (section) => {
//     setSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const handleQuantityChange = (change) => {
//     setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
//   };

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleAddToCart = () => {
//     delete product.msg;
//     product.data.quantity = quantity;
//     dispatch(addToCart(product));
//   };

//   const presentInCart = () => {
//     if (cart) {
//       const index = cart.findIndex((item) => item.data.id === product.data.id);
//       return index >= 0;
//     }
//     return false;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading product details: {error}</div>;
//   }

//   if (!product) {
//     return <div>No product found.</div>;
//   }

//   const originalPrice = product.data.original_price;
//   const discountedPrice = product.data.discounted_price;
//   const discountPercentage = Math.round(
//     ((originalPrice - discountedPrice) / originalPrice) * 100
//   );

//   return (
//     <div className="min-h-screen flex flex-col w-full mb-5">
//       <div className="flex flex-col lg:flex-row items-center md:flex-col lg:items-start mt-16 lg:mt-24 px-4 lg:px-8 w-full max-w-screen-xl lg:gap-6 mx-auto">
//         {/* Left Side: Image Viewer with Next/Previous Arrows */}
//         <div className="w-full lg:w-1/2 relative">
//           <div>
//             <div className="mb-4">
//               {product.images && product.images.length > 0 ? (
//                 <img
//                   src={product.images[selectedImageIndex].image_url}
//                   alt={product.data.title || "Product image"}
//                   className="w-full h-auto max-h-[500px] object-cover rounded-lg"
//                 />
//               ) : (
//                 <div>No images available</div>
//               )}
//             </div>
//             {product.images &&
//               product.images.length > 1 && (
//                 <>
//                   <button
//                     className="absolute left-2 top-[16rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                     onClick={handlePreviousImage}
//                     disabled={selectedImageIndex === 0}
//                     aria-label="Previous image"
//                   >
//                     &lt;
//                   </button>
//                   <button
//                     className="absolute right-2 top-[16rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                     onClick={handleNextImage}
//                     disabled={selectedImageIndex === product.images.length - 1}
//                     aria-label="Next image"
//                   >
//                     &gt;
//                   </button>
//                 </>
//               )}
//           </div>
//         </div>

//         {/* Right Side: Product Details */}
//         <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
//           <h1 className="text-2xl md:text-3xl font-bold mb-2">
//             {product.data.title}
//           </h1>
//           <p className="text-lg text-gray-500 line-through">
//             ₹{originalPrice}
//           </p>
//           <p className="text-xl md:text-2xl text-red-600">
//             ₹{discountedPrice}
//           </p>
//           <p className="text-md text-green-600">
//             {discountPercentage}% off
//           </p>

//           {/* Dropdown for Size/Option Selection */}
//           <div className="mt-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="size"
//             >
//               Size
//             </label>
//             <div className="relative">
//               <select
//                 id="size"
//                 value={selectedOption}
//                 onChange={handleOptionChange}
//                 className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
//               >
//                 <option value="Select">Select</option>
//                 <option value="With Frame">With Frame</option>
//                 <option value="Without Frame">Without Frame</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <IoMdArrowDropdown className="w-5 h-5" />
//               </div>
//             </div>
//           </div>

//           {/* Quantity Selector */}
//           <div className="flex items-center my-4">
//             <label className="text-gray-700 mr-4">Quantity</label>
//             <div className="flex">
//               <button
//                 className="border px-4 py-2 text-gray-600"
//                 onClick={() => handleQuantityChange(-1)}
//                 aria-label="Decrease quantity"
//               >
//                 -
//               </button>
//               <span className="border-t border-b px-4 py-2">{quantity}</span>
//               <button
//                 className="border px-4 py-2 text-gray-600"
//                 onClick={() => handleQuantityChange(1)}
//                 aria-label="Increase quantity"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to Cart and Buy Now Buttons */}
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
//             <button
//               onClick={handleAddToCart}
//               className="bg-black text-white px-6 py-2 w-full sm:w-auto"
//             >
//               {presentInCart() ? "Go to Cart" : "Add to Cart"}
//             </button>
//             <button className="border border-black text-black px-6 py-2 w-full sm:w-auto">
//               Buy Now
//             </button>
//           </div>

//           {/* Product Info */}
//           <div>
//             <button
//               className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
//               onClick={() => toggleSection("productInfo")}
//               aria-expanded={sections.productInfo}
//             >
//               Product Info
//               <span>{sections.productInfo ? "-" : "+"}</span>
//             </button>
//             {sections.productInfo && (
//               <p className="text-gray-600 mt-2">{product.data.description}</p>
//             )}
//           </div>

//           {/* Return & Refund Policy */}
//           <div>
//             <button
//               className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
//               onClick={() => toggleSection("returnPolicy")}
//               aria-expanded={sections.returnPolicy}
//             >
//               Return & Refund Policy
//               <span>{sections.returnPolicy ? "-" : "+"}</span>
//             </button>
//             {sections.returnPolicy && (
//               <p className="text-gray-600 mt-2">
//                 Buyers like to know what they’re getting before they purchase,
//                 so give them as much information as possible.
//               </p>
//             )}
//           </div>

//           {/* Shipping Info */}
//           <div>
//             <button
//               className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
//               onClick={() => toggleSection("shippingInfo")}
//               aria-expanded={sections.shippingInfo}
//             >
//               Shipping Info
//               <span>{sections.shippingInfo ? "-" : "+"}</span>
//             </button>
//             {sections.shippingInfo && (
//               <p className="text-gray-600 mt-2">
//                 Buyers like to know what they’re getting before they purchase,
//                 so give them as much information as possible.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCheckout;

//code-4
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASEAPI } from "../utils/BASE_API";
import { addToCart } from "../slices/cartSlice";
import { useToast } from "@chakra-ui/react";

const ProductCheckout = () => {
  const dispatch = useDispatch();
  const { cartId, cart } = useSelector((state) => state.cart); // Access cart_id from Redux state
  console.log("Cart ID and cart:", cartId, cart); // Log the cart_id to verify

  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sections, setSections] = useState({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: false,
  });

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast(); // Chakra UI toast for notifications
  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

  const handleNavigate = (cur) => {
    navigate(`/product/${cur.id}`);
  };

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASEAPI}/get-product-details/${id}`);
      setProduct(data);

      if (data.data.sizes.length > 0) {
        setSelectedSize(data.data.sizes[0]); // Select the first size by default
      }
      if (data.data.sub_category.length > 0) {
        setSelectedSubCategory(data.data.sub_category[0]); // Select the first subcategory by default
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      product.data.images && prevIndex < product.data.images.length - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  // const handleAddToCart = async () => {
  //   if (!selectedSize || !selectedSubCategory) {
  //     toast({
  //       title: "Selection Error",
  //       description: "Please select a size and subcategory before adding to cart.",
  //       status: "warning",
  //       duration: 2500,
  //       isClosable: true,
  //     });
  //     return;
  //   }

  //   const cartItem = {
  //     cart_id: cart_id,  // Use cart_id from Redux state
  //     product_id: product.data.id,
  //     product_size_id: selectedSize.id,
  //     product_sub_category: selectedSubCategory.id,
  //     quantity,
  //   };

  //   try {
  //     const response = await axios.post(`${BASEAPI}/add-item`, cartItem, {
  //       headers: {
  //         Authorization: `${token}`,  // Send auth token in header
  //         "Content-Type": "application/json",  // Specify content type as JSON
  //       },
  //     });

  //     if (response.status === 200 || response.status === 201) {
  //       dispatch(addToCart(response.data));  // Update Redux store with the response data
  //       toast({
  //         title: "Added to Cart",
  //         description: "The item has been added to your cart.",
  //         status: "success",
  //         duration: 2500,
  //         isClosable: true,
  //       });
  //     } else {
  //       throw new Error("Failed to add to cart");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add item to cart. Please try again.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedSubCategory) {
      toast({
        title: "Selection Error",
        description:
          "Please select a size and subcategory before adding to cart.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    const cartItem = {
      cart_id: cartId, // Use cart_id from Redux state
      product_id: product.data.id,
      product_size_id: selectedSize.id,
      product_sub_category: selectedSubCategory.id,
      quantity,
    };

    console.log("Cart Item Payload:", cartItem); // Log the payload to verify the data

    try {
      const response = await axios.post(`${BASEAPI}/add-item`, cartItem, {
        headers: {
          Authorization: `${token}`,
          // Specify content type as JSON
        },
      });

      console.log("API Response:", response.status);

      if (response.status === 200 || response.status === 201) {
        console(response.data);
        dispatch(addToCart(response.data.data)); // Update Redux store with the response data
        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      } 
      // else {
      //   throw new Error("Failed to add to cart");
      // }
    } catch (error) {
      console.error("API Error:", error.response.data?.message); // Log the exact error
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to add item to cart. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const presentInCart = () => {
    if (cart) {
      const index = cart.findIndex(
        (item) => item.product_id === product.data.id
      );
      return index >= 0;
    }
    return false;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product details: {error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const originalPrice = product.data.original_price;
  const discountedPrice = product.data.discounted_price;
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return (
    <div className="min-h-screen flex flex-col w-full mb-5">
      <div className="flex flex-col lg:flex-row items-center md:flex-col lg:items-start mt-16 lg:mt-24 px-4 lg:px-8 w-full max-w-screen-xl lg:gap-6 mx-auto">
        <div className="w-full lg:w-1/2 relative">
          <div>
            <div className="mb-4">
              {product.data.images && product.data.images.length > 0 ? (
                <img
                  src={product.data.images[selectedImageIndex].image_url}
                  alt={product.data.title || "Product image"}
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg"
                />
              ) : (
                <div>No images available</div>
              )}
            </div>
            {product.data.images && product.data.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-[16rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                  onClick={handlePreviousImage}
                  disabled={selectedImageIndex === 0}
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button
                  className="absolute right-2 top-[16rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                  onClick={handleNextImage}
                  disabled={
                    selectedImageIndex === product.data.images.length - 1
                  }
                  aria-label="Next image"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.data.title}
          </h1>
          <p className="text-lg text-gray-500 line-through">₹{originalPrice}</p>
          <p className="text-xl md:text-2xl text-red-600">₹{discountedPrice}</p>
          <p className="text-md text-green-600">{discountPercentage}% off</p>

          {/* Size Selection */}
          <div className="mt-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Size
            </label>
            <div className="flex gap-2">
              {product.data.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSize?.id === size.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size.size} (+₹{size.charge})
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Selection */}
          <div className="mt-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Type
            </label>
            <div className="flex gap-2">
              {product.data.sub_category.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setSelectedSubCategory(subcategory)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSubCategory?.id === subcategory.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {subcategory.subcategory} (+₹{subcategory.charge})
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center my-4">
            <label className="text-gray-700 mr-4">Quantity</label>
            <div className="flex">
              <button
                className="border px-4 py-2 text-gray-600"
                onClick={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="border-t border-b px-4 py-2">{quantity}</span>
              <button
                className="border px-4 py-2 text-gray-600"
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 w-full sm:w-auto"
            >
              {presentInCart() ? "Go to Cart" : "Add to Cart"}
            </button>
            <button className="border border-black text-black px-6 py-2 w-full sm:w-auto">
              Buy Now
            </button>
          </div>

          {/* Product Info */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
              onClick={() => toggleSection("productInfo")}
              aria-expanded={sections.productInfo}
            >
              Product Info
              <span>{sections.productInfo ? "-" : "+"}</span>
            </button>
            {sections.productInfo && (
              <p className="text-gray-600 mt-2">{product.data.description}</p>
            )}
          </div>

          {/* Return & Refund Policy */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
              onClick={() => toggleSection("returnPolicy")}
              aria-expanded={sections.returnPolicy}
            >
              Return & Refund Policy
              <span>{sections.returnPolicy ? "-" : "+"}</span>
            </button>
            {sections.returnPolicy && (
              <p className="text-gray-600 mt-2">
                Buyers like to know what they’re getting before they purchase,
                so give them as much information as possible.
              </p>
            )}
          </div>

          {/* Shipping Info */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
              onClick={() => toggleSection("shippingInfo")}
              aria-expanded={sections.shippingInfo}
            >
              Shipping Info
              <span>{sections.shippingInfo ? "-" : "+"}</span>
            </button>
            {sections.shippingInfo && (
              <p className="text-gray-600 mt-2">
                Buyers like to know what they’re getting before they purchase,
                so give them as much information as possible.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
