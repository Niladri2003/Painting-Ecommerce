import React, { useEffect, useState } from "react";
import CardImg from "../assets/Home/cardImg.png";
import { Link } from "react-router-dom";
import { apiConnector } from "../services/apiConnector.jsx"; // Import the API connector function

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
        featureProducts.map((cur, index) => {
          console.log(cur);
          // Assuming API response fields are named product_Title, product_Description, products_images, product_Price
          return (
            <Link to={`/product/${cur.id}`} key={cur.id}>
              <div className="relative overflow-hidden group" key={index}>

                <img
                  src={cur.images[0].image_url || CardImg} // Fallback to CardImg if products_images is not available
                  width={400}
                  height={300}
                  alt={cur.title || "Product Image"}
                  className="object-cover w-[300px] h-[170px] md:h-[320px] md:w-full group-hover:opacity-50 transition-opacity rounded-md" />

                <div className="py-4 bg-background">
                  <h3 className="text-lg font-bold capitalize">
                    {cur.title || "Title Not Available"}
                  </h3>
                  
                  <h4 className="text-base font-semibold">
                    ₹{cur.original_price + (cur.sub_category[0].charge + cur.sizes[0].charge) || "Price Not Available"}
                  </h4>

                </div>
                
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-center py-4">No featured products available</div>
      )}
    </>
  );
};

export default FeatureProducts;
