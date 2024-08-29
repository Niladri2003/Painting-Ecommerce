import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, useToast } from "@chakra-ui/react";
import { apiConnector } from "../services/apiConnector.jsx";
import RelatedProducts from "../components/productCheckout/RelatedProducts.jsx";
import { setTotalItems } from "../slices/cartSlice.jsx";
import calender from "../assets/product-checkout-page/calender.png"
import truck from "../assets/product-checkout-page/truck.png"
import box from "../assets/product-checkout-page/box.png"
import DescriptionAboveTheRelatedProduct from "../components/productCheckout/DescriptionAboveTheRelatedProduct.jsx";
import ShowCase from "../components/productCheckout/ShowCase.jsx";

const ProductCheckout = () => {
  const { cartId } = useSelector((state) => state.cart); // Access cart_id from Redux state
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [subImages, setsubImages] = useState(null);
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
  const dispatch = useDispatch();

  const handleNavigate = (cur, image) => {
    // Navigate to the new product page
    navigate(`/product/${cur.id}`);

    setsubImages(image);
  };

  const getProductDetails = async () => {
    try {
      setLoading(true);
      //const { data } = await axios.get(`${BASEAPI}/get-product-details/${id}`);
      const { data } = await apiConnector(
        "GET",
        `/get-product-details/${id}`,
        null,
        null,
        null,
        false
      );
      setProduct(data);
      console.log(data);
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

  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // const handleQuantityChange = (change) => {
  //   setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  // };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      if (newQuantity < 6 && newQuantity > 0) {
        return newQuantity;
      }
      return prevQuantity;
    });
  };

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

    try {
      const response = await apiConnector(
        "GET",
        "/get-cart",
        null,
        null,
        null,
        true
      );

      const cartItems = response.data.cart.items || [];

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
        if (!(updatedQuantity < 6 && updatedQuantity > 0)) {
          toast({
            title: "Quantity Limit Reached",
            description:
              "You cannot add more than 5 of this item to your cart.",
            status: "warning",
            duration: 2500,
            isClosable: true,
          });
          return;
        }
        // const updatedQuantity = existingItem.quantity + quantity;
        await apiConnector(
          "POST",
          "/update-item",
          {
            cart_item_id: existingItem.id, // Use the existing cart item ID
            quantity: updatedQuantity, // New quantity
          },
          null,
          null,
          true
        );

        toast({
          title: "Cart Updated",
          description: "The item quantity has been updated in your cart.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
        setIsInCart(true);
      } else {
        // If the item is not in the cart, add it as a new item
        const cartItem = {
          cart_id: cartId,
          product_id: product.data.id,
          product_size_id: selectedSize.id,
          product_sub_category: selectedSubCategory.id,
          quantity,
        };

        await apiConnector("POST", "/add-item", cartItem, null, null, true);
        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setIsInCart(true);
      }

      // Update Redux state with the new total items count
      const { data } = await apiConnector(
        "GET",
        "/get-cart",
        null,
        null,
        null,
        true
      );
      const totalItems = data?.cart?.items?.length || 0;
      dispatch(setTotalItems(totalItems));
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

  const handleBuyNow = async () => {
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

    try {
      const response = await apiConnector(
        "GET",
        "/get-cart",
        null,
        null,
        null,
        true
      );

      const cartItems = response.data.cart.items || [];

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
        if (!(updatedQuantity < 6 && updatedQuantity > 0)) {
          toast({
            title: "Quantity Limit Reached",
            description:
              "You cannot add more than 5 of this item to your cart.",
            status: "warning",
            duration: 2500,
            isClosable: true,
          });

          return;
        }
        await apiConnector(
          "POST",
          "/update-item",
          {
            cart_item_id: existingItem.id, // Use the existing cart item ID
            quantity: updatedQuantity, // New quantity
          },
          null,
          null,
          true
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

        await apiConnector("POST", "/add-item", cartItem, null, null, true);
        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setIsInCart(true);

        navigate("/cart");
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
      // const response = await axios.get(`${BASEAPI}/get-cart`, {
      //   headers: {
      //     Authorization: `${token}`, // Send auth token in the request headers
      //   },
      // });
      const response = await apiConnector(
        "GET",
        "/get-cart",
        null,
        null,
        null,
        true
      );

      const cartItems = response.data.items || []; // Ensure this is an array

      // Check if the current product is in the cart
      const index = cartItems.findIndex(
        (item) => item.product_id === productId
      );

      return index >= 0;
    } catch (error) {
      console.error("Error checking cart items:", error);
      return false;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={
          "min-h-screen w-full flex flex-col gap-2 justify-center items-center"
        }
      >
        <Spinner size="xl" />
        <div>Loading...</div>
      </div>
    );
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
  const discountPercentage =
    calculatedOriginalPrice > 0
      ? Math.round(
        ((calculatedOriginalPrice - calculatedDiscountedPrice) /
          calculatedOriginalPrice) *
        100
      )
      : 0;
  console.log(product);

  // Click to change main images
  const handleImgClick = (e) => {
    setsubImages(e.target.src);
  };

  

  return (
    <div className="min-h-screen flex flex-col w-full mb-5">
      <div className=" p-4 grid grid-cols-1 md:grid-cols-2 grid-rows-1 mt-16 lg:mt-24 px-4 lg:px-8 w-full max-w-screen-xl lg:gap-6 mx-auto">
        {/* first raw */}
        <div className="w-full relative">
          <div>
            <div className="mb-4 overflow-hidden w-full h-[500px] flex justify-center items-center">
              {product.images && product.images.length > 0 ? (
                <img
                  src={
                    subImages
                      ? subImages
                      : product.images[selectedImageIndex].image_url
                  } // Use the product images
                  alt={product.title || "Product image"} // Use a fallback alt text
                  className="max-w-full max-h-full object-contain rounded-lg border-2 border-sky-500" // Improved image styling
                />
              ) : (
                <div className="text-gray-500">No images available</div> // Fallback content
              )}
            </div>

            {/* sub images=========================================== */}
            <div className="w-full flex gap-2 justify-start items-start">
              {product?.images.map((cur, index) => {
                return (
                  <div
                    className="w-[7rem] h-[7rem] overflow-hidden object-contain  cursor-pointer border-2 hover:scale-[1.01] duration-300 rounded-md"
                    key={index}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={cur.image_url}
                      alt="sub images"
                      onClick={(e) => {
                        handleImgClick(e);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:pl-8 mt-8 lg:mt-0 ">
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
                  className={`px-4 py-2 rounded-full border ${selectedSize?.id === size.id
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>


          {/* <div className="mt-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Size
            </label>
            <select
              onChange={handleSizeChange}
              className="block w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2 mt-1 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSize}
            >
              {product.data.sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          </div> */}



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
                  className={`px-4 py-2 rounded-full border ${selectedSubCategory?.id === subcategory.id
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {subcategory.subcategory}
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
            <button
              onClick={handleBuyNow}
              className="border border-black text-black px-6 py-2 w-full sm:w-auto"
            >
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

          {/* Timeline section  */}
          <div className="flex items-center justify-between mt-8 ">
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full p-2 mb-2">
                <img src={calender} alt="calender" className="w-8 h-8 fill-none" />
              </div>
              <div className="text-center">
                <p className="text-xs text-black">Order placed</p>
              </div>
            </div>

            <div>
              <div className="h-0.5 w-16 bg-black"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full p-2 mb-2">
                <img src={truck} alt="calender" className="w-8 h-8 fill-none" />
              </div>
              <div className="text-center">
                <p className="text-xs text-black">Art Ready</p>
              </div>
            </div>

            <div>
              <div className="h-0.5 w-16 bg-black"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full p-2 mb-2">
                <img src={box} alt="calender" className="w-8 h-8 fill-none" />
              </div>
              <div className="text-center">
                <p className="text-xs text-black ">Delivered!</p>
              </div>
            </div>
          </div>

        </div>


      </div>
      <div className="p-8 ">
        <DescriptionAboveTheRelatedProduct className="mb-8" />


        <ShowCase />

        {/* related product section start */}
        <RelatedProducts
          relatedProducts={product.related_products}
          handleNavigate={handleNavigate}
          handleImgClick={handleImgClick}
        />
        {/* end related product section */}
      </div>
    </div>
  );
};

export default ProductCheckout;
{/* <DescriptionAboveTheRelatedProduct/> */ }

{/* related product section start */ }
{/* <RelatedProducts
  relatedProducts={product.related_products}
  handleNavigate={handleNavigate}
  handleImgClick={handleImgClick}
/> */}
{/* end related product section */ }