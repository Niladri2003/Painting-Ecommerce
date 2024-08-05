import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { IoMdArrowDropdown } from 'react-icons/io'; // Importing the arrow icon from react-icons

// Import images from local assets folder
import Image1 from '../assets/checkout/productCheckout.jpg';
import Image2 from '../assets/checkout/productCheckout2.jpg';
import Footer from '../components/footer/Footer';

const ProductCheckout = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sections, setSections] = useState({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: false,
  });
  const [selectedOption, setSelectedOption] = useState('Select');

  // Use imported images in the productImages array
  const productImages = [Image1, Image2];

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < productImages.length - 1 ? prevIndex + 1 : prevIndex
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center lg:items-start mt-16 lg:mt-24 px-4 lg:px-8 w-full max-w-screen-xl mx-auto">
        {/* Left Side: Image Viewer with Next/Previous Arrows */}
        <div className="w-full lg:w-1/2 relative">
          <div className="mb-4">
            <img
              src={productImages[selectedImageIndex]}
              alt="Product"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={handlePreviousImage}
            disabled={selectedImageIndex === 0}
          >
            &lt;
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={handleNextImage}
            disabled={selectedImageIndex === productImages.length - 1}
          >
            &gt;
          </button>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Product Title 03</h1>
          <p className="text-lg text-gray-500 line-through">₹9.99</p>
          <p className="text-xl md:text-2xl text-red-600">₹4.99</p>

          {/* Dropdown for Size/Option Selection */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
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
                <IoMdArrowDropdown className="w-5 h-5" /> {/* React Icon for dropdown arrow */}
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
              >
                -
              </button>
              <span className="border-t border-b px-4 py-2">{quantity}</span>
              <button
                className="border px-4 py-2 text-gray-600"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <button className="bg-black text-white px-6 py-2 w-full sm:w-auto">Add to Cart</button>
            <button className="border border-black text-black px-6 py-2 w-full sm:w-auto">Buy Now</button>
          </div>

          {/* Product Info */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
              onClick={() => toggleSection('productInfo')}
            >
              Product Info
              <span>{sections.productInfo ? '-' : '+'}</span>
            </button>
            {sections.productInfo && (
              <p className="text-gray-600 mt-2">
                I'm a product detail. I'm a great place to add more information about your product such as sizing, materials, care and cleaning instructions.
              </p>
            )}
          </div>

          {/* Return & Refund Policy */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
              onClick={() => toggleSection('returnPolicy')}
            >
              Return & Refund Policy
              <span>{sections.returnPolicy ? '-' : '+'}</span>
            </button>
            {sections.returnPolicy && (
              <p className="text-gray-600 mt-2">
                Buyers like to know what they’re getting before they purchase, so give them as much information as possible.
              </p>
            )}
          </div>

          {/* Shipping Info */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 text-left text-lg font-medium border-b border-gray-300"
              onClick={() => toggleSection('shippingInfo')}
            >
              Shipping Info
              <span>{sections.shippingInfo ? '-' : '+'}</span>
            </button>
            {sections.shippingInfo && (
              <p className="text-gray-600 mt-2">
                Buyers like to know what they’re getting before they purchase, so give them as much information as possible.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Ensure the footer is full width */}
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductCheckout;
