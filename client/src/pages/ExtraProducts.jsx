import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import HomeHero from '../components/Home/HomeHero';
import CardImg from "../assets/Home/cardImg.png";
import {apiConnector} from "../services/apiConnector.jsx";
import {useNavigate,Link} from "react-router-dom";
import {Spinner} from "@chakra-ui/react";
// import axios from 'axios';
// import { BASEAPI } from '../utils/BASE_API.js';

const Shop = () => {
  const [sortType, setSortType] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate();

  // Fetch the product categories and their associated products
  const getProductsByCategory = async () => {
    try {
      const response=await apiConnector('GET','/get-product-categorise',null,null,null,false)
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const sortedProducts = (products) => {
    return [...products].sort((a, b) => {
      if (sortType === 'price-low-high') {
        return a.discounted_price - b.discounted_price;
      }
      if (sortType === 'price-high-low') {
        return b.discounted_price - a.discounted_price;
      }
      if (sortType === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (sortType === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return 0;
    });
  };

  const handleCardClick = (productId) => {
      navigate(`/product/${productId}`);
  };
  if (!categories) {
    return (
        <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
          <Spinner size="xl" />
          <div>Loading...</div>
        </div>
    );
  }
  if (categories.length === 0) {
    return (
        <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
          <Spinner size="xl" />
          <div>No products available</div>
        </div>
    );
  }
  return (
      <div className="w-full mx-auto">
        <HomeHero title="Shop" showShopNowButton={false} />
        {/*<div className="flex justify-end mb-4 mt-4 mr-4">*/}
        {/*  <select*/}
        {/*      value={sortType}*/}
        {/*      onChange={handleSort}*/}
        {/*      className="border p-2 rounded"*/}
        {/*  >*/}
        {/*    <option value="">Sort by</option>*/}
        {/*    <option value="newest">Newest</option>*/}
        {/*    <option value="oldest">Oldest</option>*/}
        {/*    <option value="price-low-high">Price: Low to High</option>*/}
        {/*    <option value="price-high-low">Price: High to Low</option>*/}
        {/*  </select>*/}
        {/*</div>*/}
        <div className="w-full p-[1rem]">
          {categories.map((category, index) => {
            const categoryName = category?.category_name;
            const categoryId=category.products[0]?.category_id;
            const products = sortedProducts(category.products);

            return (
                <div className="container pb-[2.5rem]" key={index}>
                  <hr />
                  {/* Category header */}
                  <header className="flex justify-between pt-3 lg:w-[98%]">
                    <div className="border px-4 py-2 rounded-[5rem] bg-slate-800 cursor-pointer">
                      <h3 className="text-white">{categoryName}</h3>
                    </div>
                    <Link to={`/extraproducts/${categoryId}`}>
                    <div className="border-2 border-black w-[6.3rem] h-[2rem] flex justify-center items-center rounded-sm cursor-pointer font-semibold">
                      view more
                    </div>
                    </Link>
                  </header>

                  {/* Products list */}
                  <section className="w-full mt-5 grid lg:grid-cols-5 grid-cols-2 place-items-center md:grid-cols-3 gap-2">
                    {products.map((product, prodIndex) => (
                        <div className="p-2 max-w-max cursor-pointer" key={prodIndex} onClick={() => handleCardClick(product.id)}>
                          <div className="lg:w-[16rem] w-[9.5rem] md:w-[15rem] overflow-hidden">
                            <img className="w-full" src={product.images[0]?.image_url || CardImg} alt={product.title} />
                          </div>
                          <h2 className="font-semibold text-black text-[1rem] mt-1 ml-2">
                            {product.title}
                          </h2>
                          <p className="font-semibold text-black text-[1rem] ml-2">
                            ₹{product.discounted_price}
                          </p>
                        </div>
                    ))}
                  </section>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default Shop;
