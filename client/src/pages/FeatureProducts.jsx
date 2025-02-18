import React, { useEffect, useState } from "react";
import CardImg from "../assets/Home/cardImg.png";
import { Link } from "react-router-dom";
import { apiConnector } from "../services/apiConnector.jsx";
import ProductCard from "../components/Product/ProductCard.jsx";
import HomeProductCard from "../components/Product/HomeProductCard.jsx"; // Import the API connector function

const FeatureProducts = () => {
  const [featureProducts, setFeatureProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch feature products from the API
  const getFeatureProducts = async () => {
    try {
      setLoading(true);
      const response = await apiConnector('GET', '/get-top-home', null, null, null, false);
      setFeatureProducts(response.data.data);
      //await console.log(featureProducts)
    } catch (error) {
      console.error('Error fetching feature products:', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeatureProducts();
  }, []);

  return (
    <>
      {loading ? (
          // Loader UI
          <div className="flex justify-center items-center w-full py-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
      ) : featureProducts.length > 0 ? (
          featureProducts.map((product) => (
              <HomeProductCard
                  key={product.id}
                  product={product}
                  showDiscountPercentage={true}
                  showOriginalPrice={false}
              />
          ))
      ) : (
          <div className="text-center py-4 text-gray-600">No featured products available</div>
      )}
    </>
  );
};

export default FeatureProducts;
