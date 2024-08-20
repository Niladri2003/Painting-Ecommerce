import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASEAPI } from "../utils/BASE_API";
import { useToast } from "@chakra-ui/react";

const ProductCheckout = () => {
  const { cartId } = useSelector((state) => state.cart); // Access cart_id from Redux state
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [calculatedOriginalPrice, setCalculatedOriginalPrice] = useState(0);
  const [calculatedDiscountedPrice, setCalculatedDiscountedPrice] = useState(0);
  const [sections, setSections] = useState({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: false,
  });
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // State to track if the product is in the cart
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

      // Initialize calculated prices with the base prices
      setCalculatedOriginalPrice(data.data.original_price);
      setCalculatedDiscountedPrice(data.data.discounted_price);

      // Check if the product is in the cart
      const isPresent = await presentInCart(data.data.id);
      setIsInCart(isPresent);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    // Re-check if the product is in the cart whenever the cart changes
    const checkProductInCart = async () => {
      if (product) {
        const isPresent = await presentInCart(product.data.id);
        setIsInCart(isPresent);
      }
    };

    checkProductInCart();
  }, [product]);

  useEffect(() => {
    const calculatePrices = () => {
      let baseOriginalPrice = product?.data?.original_price || 0;
      let baseDiscountedPrice = product?.data?.discounted_price || 0;

      if (selectedSize) {
        baseOriginalPrice += selectedSize.charge;
        baseDiscountedPrice += selectedSize.charge;
      }

      if (selectedSubCategory) {
        baseOriginalPrice += selectedSubCategory.charge;
        baseDiscountedPrice += selectedSubCategory.charge;
      }

      setCalculatedOriginalPrice(baseOriginalPrice);
      setCalculatedDiscountedPrice(baseDiscountedPrice);
    };

    if (product) {
      calculatePrices();
    }
  }, [selectedSize, selectedSubCategory, product]);

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

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedSubCategory) {
      toast({
        title: "Selection Error",
        description: "Please select a size and subcategory before adding to cart.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(`${BASEAPI}/get-cart`, {
        headers: {
          Authorization: `${token}`, 
        },
      });

      const cartItems = response.data.items || []; 

      // Check if the current product is already in the cart
      const existingItem = cartItems.find(
        (item) =>
          item.product_id === product.data.id &&
          item.product_size_id === selectedSize.id &&
          item.product_sub_category === selectedSubCategory.id
      );

      if (existingItem) {
        // If the item is already in the cart, update its quantity
        const updatedQuantity = existingItem.quantity + quantity;

        await axios.put(
          `${BASEAPI}/update-item`,
          {
            cart_item_id: existingItem.id, // Use the existing cart item ID
            quantity: updatedQuantity, // New quantity
          },
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast({
          title: "Cart Updated",
          description: "The item quantity has been updated in your cart.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

      } else {
        // If the item is not in the cart, add it as a new item
        const cartItem = {
          cart_id: cartId,
          product_id: product.data.id,
          product_size_id: selectedSize.id,
          product_sub_category: selectedSubCategory.id,
          quantity,
        };

        await axios.post(`${BASEAPI}/add-item`, cartItem, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setIsInCart(true); 
      }
    } catch (error) {
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

  // Function to check if the product is already in the cart
  const presentInCart = async (productId) => {
    try {
      const response = await axios.get(`${BASEAPI}/get-cart`, {
        headers: {
          Authorization: `${token}`, // Send auth token in the request headers
        },
      });

      const cartItems = response.data.items || []; // Ensure this is an array

      // Check if the current product is in the cart
      const index = cartItems.findIndex((item) => item.product_id === productId);

      return index >= 0;
    } catch (error) {
      console.error("Error checking cart items:", error);
      return false;
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error loading product details: {error}</div>;
  }

  // No product found state
  if (!product) {
    return <div>No product found.</div>;
  }

  // Calculate discount percentage
  const discountPercentage = calculatedOriginalPrice > 0
    ? Math.round(
        ((calculatedOriginalPrice - calculatedDiscountedPrice) /
          calculatedOriginalPrice) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen flex flex-col w-full mb-5">
      <div className="flex flex-col lg:flex-row items-center md:flex-col lg:items-start mt-16 lg:mt-24 px-4 lg:px-8 w-full max-w-screen-xl lg:gap-6 mx-auto">
        <div className="w-full lg:w-1/2 relative">
          <div>
            <div className="mb-4">

              {product.images && product.images.length > 0 ? (
                  <img
                      src={product.images[selectedImageIndex].image_url} // Use the product images
                      alt={product.title || "Product image"} // Use a fallback alt text
                      className="w-full h-auto max-h-[500px] object-cover rounded-lg" // Set max-height and object-fit
                  />
              ) : (
                  <div>No images available</div> // Fallback content
              )}
            </div>
            {product.images &&
                product.images.length > 1 && ( // Only show buttons if there is more than 1 image
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
                          disabled={selectedImageIndex === product.images.length - 1}
                          aria-label="Next image"
                      >
                        &gt;
                      </button>
                    </>
                )}
            {/* Related products=================================================================================================================== */}
            <h1>Related Products</h1>
            <div className="w-[100%] flex gap-5 border-2 border-black border-r-0 border-l-0 py-2 overflow-x-auto">


              {product.related_products.map((cur, index) => {
                return (
                    <div className=" cursor-pointer" key={index} onClick={() => handleNavigate(cur)}>
                      <div className=" h-[8rem] w-[8rem] p-3 bg-slate-300 rounded-[.2rem] overflow-hidden">
                        <img
                            src={cur.images[0].image_url}
                            alt="sub images"
                            className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium my-1">
                        {cur.title}
                      </h3>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Price:</span> ₹{cur.price}
                      </p>
                    </div>
                );
              })}
            </div>


          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.data.title}
          </h1>
          <p className="text-lg text-gray-500 line-through">
            ₹{calculatedOriginalPrice}
          </p>
          <p className="text-xl md:text-2xl text-red-600">
            ₹{calculatedDiscountedPrice}
          </p>
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
            {isInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="bg-black text-white px-6 py-2 w-full sm:w-auto"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-2 w-full sm:w-auto"
              >
                Add to Cart
              </button>
            )}
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
