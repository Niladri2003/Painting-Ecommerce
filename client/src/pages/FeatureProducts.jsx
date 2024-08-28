import React, { useEffect, useState } from "react";
import CardImg from "../assets/Home/cardImg.png";
import { Link } from "react-router-dom";
import { apiConnector } from "../services/apiConnector.jsx";
import ProductCard from "../components/Product/ProductCard.jsx";
import HomeProductCard from "../components/Product/HomeProductCard.jsx"; // Import the API connector function

const FeatureProducts = () => {
  const [featureProducts, setFeatureProducts] = useState([]);

  // Fetch feature products from the API
  const getFeatureProducts = async () => {
    try {
      const response = await apiConnector('GET', '/get-top-home', null, null, null, false);

      setFeatureProducts(response.data.data);
      await console.log(featureProducts)
    } catch (error) {
      console.error('Error fetching feature products:', error);
    }
  };

  useEffect(() => {
    getFeatureProducts();
  }, []);

  return (
    <>
      {featureProducts.length > 0 ? (
        featureProducts.map((product) => {
       //   console.log(cur);
          // Assuming API response fields are named product_Title, product_Description, products_images, product_Price
          return (
              <HomeProductCard key={product.id} product={product} showDiscountPercentage={true} showOriginalPrice={false}/>

          );
        })
      ) : (
        <div className="text-center py-4">No featured products available</div>
      )}
    </>
  );
};

export default FeatureProducts;
