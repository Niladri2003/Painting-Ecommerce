import React, { useEffect, useState } from "react";
import CardImg from "../assets/Home/cardImg.png";
import { Link } from "react-router-dom";
const FeatureProducts = () => {
  const [featureProducts, setFeatureProducts] = useState([]);
  const allFeatureProducts = [
    {
      product_Title: "Classic Wristwatch",
      product_Description: "Timeless design",
      products_images:CardImg,
      product_Price: 59.99,
    },
    {
      product_Title: "Stylish Sunglasses",
      product_Description: "UV protection",
      products_images:CardImg,
      product_Price: 29.99,
    },
    {
      product_Title: "Leather Crossbody Bag",
      product_Description: "Stylish and practical",
      products_images:CardImg,
      product_Price: 49.99,
    },
    {
      product_Title: "Wireless Headphones",
      product_Description: "High-quality sound",
      products_images:CardImg,
      product_Price: 89.99,
    },
    {
      product_Title: "Stylish",
      product_Description: "Timeless design",
      products_images:CardImg,
      product_Price: 39.99,
    },
    {
      product_Title: " smartphone",
      product_Description: "Timeless design",
      products_images:CardImg,
      product_Price: 3899,
    },
  ];
  useEffect(() => {
    setFeatureProducts(allFeatureProducts);
  }, []);
  return (
    <>
      {featureProducts.map((cur, index) => {
        return (
          <div
            className="relative overflow-hidden group"
            key={index}
          >
            <Link to="#" className="absolute inset-0 z-10">
              <span className="sr-only">View Product</span>
            </Link>
            <img
              src={cur.products_images}
              width={400}
              height={300}
              alt="Product 4"
              className="object-cover w-[300px] h-[170px] md:h-[320px] md:w-full group-hover:opacity-50 transition-opacity"
            />
            <div className="py-4 bg-background">
              <h3 className="text-lg font-bold capitalize">
                {cur.product_Title}
              </h3>
              {/* <p className="text-sm text-muted-foreground">
                {cur.product_Description}
              </p> */}
              <h4 className="text-base font-semibold">${cur.product_Price}</h4>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeatureProducts;
