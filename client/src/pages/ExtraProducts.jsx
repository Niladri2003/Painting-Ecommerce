import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import HomeHero from '../components/Home/HomeHero';
import CardImg from "../assets/Home/cardImg.png";
// import axios from 'axios';
// import { BASEAPI } from '../utils/BASE_API.js';

const Shop = () => {
  const [sortType, setSortType] = useState('');
  const [product, setProduct] = useState([]);
//   const navigate = useNavigate();

//   const getAllProducts = async () => {
//     try {
//       const response = await axios.get(`${BASEAPI}/get-all-product`);
//       setProduct(response.data.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };
// console.log(product);

//   useEffect(() => {
//     getAllProducts();
//   }, []);

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const sortedProducts = [...product].sort((a, b) => {
    if (sortType === 'price-low-high') {
      return a.price - b.price;
    }
    if (sortType === 'price-high-low') {
      return b.price - a.price;
    }
    if (sortType === 'newest') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortType === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  const categoryWiseProducts = [
    {
      Pattachitra: [
        { categoryName: "Pattachitra", productName: "Krishna Painting", price: 442 },
        { categoryName: "Pattachitra", productName: "Balram Painting", price: 342 },
        { categoryName: "Pattachitra", productName: "Ram Painting", price: 242 },
        { categoryName: "Pattachitra", productName: "Hanuman Painting", price: 842 },
        { categoryName: "Pattachitra", productName: "Sita Painting", price: 542 },
        // { categoryName: "Pattachitra", productName: "Radha Painting", price: 642 },
        // { categoryName: "Pattachitra", productName: "Shiva Painting", price: 742 },
      ],
    },
    {
      Abstract: [
        { categoryName: "Abstract", productName: "Color Splash", price: 500 },
        { categoryName: "Abstract", productName: "Geometric Patterns", price: 400 },
        { categoryName: "Abstract", productName: "Modern Lines", price: 600 },
        { categoryName: "Abstract", productName: "Waveforms", price: 450 },
        { categoryName: "Abstract", productName: "Circular Motion", price: 550 },
        // { categoryName: "Abstract", productName: "Abstract Fire", price: 700 },
        // { categoryName: "Abstract", productName: "Cubist Dreams", price: 650 },
      ],
    },
    {
      Landscape: [
        { categoryName: "Landscape", productName: "Sunset View", price: 300 },
        { categoryName: "Landscape", productName: "Mountain Range", price: 350 },
        { categoryName: "Landscape", productName: "Forest Path", price: 400 },
        { categoryName: "Landscape", productName: "Seaside Breeze", price: 500 },
        { categoryName: "Landscape", productName: "Desert Dunes", price: 450 },
        // { categoryName: "Landscape", productName: "Autumn Leaves", price: 350 },
        // { categoryName: "Landscape", productName: "Winter Wonderland", price: 550 },
      ],
    },
    {
      Portrait: [
        { categoryName: "Portrait", productName: "Lady in Red", price: 600 },
        { categoryName: "Portrait", productName: "The Thinker", price: 700 },
        { categoryName: "Portrait", productName: "Old Man", price: 550 },
        { categoryName: "Portrait", productName: "Smiling Child", price: 650 },
        { categoryName: "Portrait", productName: "Mysterious Woman", price: 750 },
        // { categoryName: "Portrait", productName: "Royal Guard", price: 800 },
        // { categoryName: "Portrait", productName: "Dancer", price: 900 },
      ],
    },
    {
      Wildlife: [
        { categoryName: "Wildlife", productName: "Majestic Tiger", price: 800 },
        { categoryName: "Wildlife", productName: "Elephant Herd", price: 700 },
        { categoryName: "Wildlife", productName: "Soaring Eagle", price: 600 },
        { categoryName: "Wildlife", productName: "Panda Family", price: 750 },
        { categoryName: "Wildlife", productName: "Lone Wolf", price: 850 },
        // { categoryName: "Wildlife", productName: "Giraffe Tower", price: 550 },
        // { categoryName: "Wildlife", productName: "Roaring Lion", price: 900 },
      ],
    },
  ];
  return (
    <div className="w-full mx-auto">
      <HomeHero title="Shop" showShopNowButton={false} />
      <div className="flex justify-end mb-4 mt-4 mr-4">
        <select
          value={sortType}
          onChange={handleSort}
          className="border p-2 rounded"
        >
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
      <div className="w-full p-[1rem]">
      {categoryWiseProducts.map((category, index) => {
        // category name and products
        const categoryName = Object.keys(category)[0];   
        const products = category[categoryName];

        return (
          <div className="container pb-[2.5rem]" key={index}>
            <hr />
            {/* Category header */}
            <header className="flex justify-between pt-3 lg:w-[98%]">
              <div className="border px-4 py-2 rounded-[5rem] bg-slate-800 cursor-pointer">
                <h3 className="text-white">{categoryName}</h3>
              </div>
              <div className="border-2 border-black w-[6.3rem] h-[2rem] flex justify-center items-center rounded-sm cursor-pointer font-semibold">
                view more...
              </div>
            </header>

            {/* Products list =====*/}
            <section className="w-full mt-5 grid lg:grid-cols-5 grid-cols-2 place-items-center md:grid-cols-3 gap-2">
              {products.map((product, prodIndex) => (
                <div className="p-2 max-w-max cursor-pointer" key={prodIndex}>
                  <div className="lg:w-[16rem] w-[9.5rem] md:w-[15rem] overflow-hidden">
                    <img className="w-full" src={CardImg} alt={product.productName} />
                  </div>
                  <h2 className="font-semibold text-black text-[1rem] mt-1 ml-2">
                    {product.productName}
                  </h2>
                  <p className="font-semibold text-black text-[1rem] ml-2">
                    ₹{product.price}
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
