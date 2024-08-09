import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IoMdArrowDropdown } from "react-icons/io"; // Importing the arrow icon from react-icons

//cart
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

// Import images from local assets folder
import Image1 from "../assets/checkout/productCheckout.jpg";
import Image2 from "../assets/checkout/productCheckout2.jpg";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { BASEAPI } from "../utils/BASE_API";


const ProductCheckout = () => {
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);

  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sections, setSections] = useState({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: false,
  });
  const [selectedOption, setSelectedOption] = useState("Select");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const getProductDetails = async () => {
    try {
      setLoading(true);
      console.log("Requesting product details for ID:", id); // Log request
      const { data } = await axios.get(`${BASEAPI}/get-product-details/${id}`);
      console.log("API Response:", data); // Log response
      setProduct(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching product details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      product.images && prevIndex < product.images.length - 1
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddToCart = () => {
    delete product.msg;
    product.data.quantity = quantity;
    dispatch(addToCart(product));
  };
  const presentInCart = () => {
    if (cart) {
      const index = cart.findIndex((item) => item.data.id === product.data.id);
      return index >= 0;
    }
    return false;
  };


  if (loading) {
    return <div>Loading...</div>; // Show a loading state until product is fetched
  }

  if (error) {
    return <div>Error loading product details: {error}</div>; // Show an error message if there was a problem
  }

  if (!product) {
    return <div>No product found.</div>; // Handle case where no product is found
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row items-center md:flex-col lg:items-start mt-16 lg:mt-24 px-4 lg:px-8 w-full max-w-screen-xl  lg:gap-6 mx-auto">
        {/* Left Side: Image Viewer with Next/Previous Arrows */}
        <div className="w-full lg:w-1/2 relative">
          <div className="mb-4">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImageIndex].image_url} // Use the product images
                alt={product.title || "Product image"} // Use a fallback alt text
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <div>No images available</div> // Fallback content
            )}
          </div>
          {product.images &&
            product.images.length > 1 && ( // Only show buttons if there is more than 1 image
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                  onClick={handlePreviousImage}
                  disabled={selectedImageIndex === 0}
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                  onClick={handleNextImage}
                  disabled={selectedImageIndex === product.images.length - 1}
                  aria-label="Next image"
                >
                  &gt;
                </button>
              </>
            )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.data.title}
          </h1>
          <p className="text-lg text-gray-500 line-through">
            ₹{product.data.price}
          </p>
          <p className="text-xl md:text-2xl text-red-600">
            ₹{product.data.price}
          </p>

          {/* Dropdown for Size/Option Selection */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="size"
            >
              Size
            </label>
            <div className="relative">
              <select
                id="size"
                value={selectedOption}
                onChange={handleOptionChange}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Select">Select</option>
                <option value="With Frame">With Frame</option>
                <option value="Without Frame">Without Frame</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <IoMdArrowDropdown className="w-5 h-5" />{" "}
                {/* React Icon for dropdown arrow */}
              </div>
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
  