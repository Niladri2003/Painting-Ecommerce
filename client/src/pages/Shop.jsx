// import React, { useState } from 'react';
// import Card from '../components/ShopCard';
// import products from '../../product'; // Assume you have a products array
// import Footer from '../components/footer/Footer';
// import HomeHero from '../components/Home/HomeHero';

// const Shop = () => {
//   const [sortType, setSortType] = useState('');

//   const handleSort = (e) => {
//     setSortType(e.target.value);
//   };

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortType === 'price-low-high') {
//       return a.price - b.price;
//     }
//     if (sortType === 'price-high-low') {
//       return b.price - a.price;
//     }
//     if (sortType === 'newest') {
//       return new Date(b.date) - new Date(a.date);
//     }
//     if (sortType === 'oldest') {
//       return new Date(a.date) - new Date(b.date);
//     }
//     return 0;
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <HomeHero title='Shop' showShopNowButton={false} />
//       <div className="flex justify-end mb-4">
//         <select value={sortType} onChange={handleSort} className="border p-2 rounded">
//           <option value="">Sort by</option>
//           <option value="newest">Newest</option>
//           <option value="oldest">Oldest</option>
//           <option value="price-low-high">Price: Low to High</option>
//           <option value="price-high-low">Price: High to Low</option>
//         </select>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {sortedProducts.map((product) => (
//           <Card key={product.id} product={product} />
//         ))}
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Shop;

import React, { useState,useEffect } from 'react';
import Card from '../components/ShopCard';
import products from '../../product'; // Assume you have a products array
import Footer from '../components/footer/Footer';
import HomeHero from '../components/Home/HomeHero';
import axios from "axios";
import {BASEAPI} from "../utils/BASE_API.js";

const Shop = () => {
  const [sortType, setSortType] = useState('');
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASEAPI}/get-all-product`);
      // toast({
      //   title: response.data.msg,
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true,
      // });
      setProduct(response.data.data);
      //setSortedProducts(response.data.data);
      console.log(response.data);
      console.log(product)
    } catch (error) {
      console.error('Error fetching products:', error);
      // toast({
      //   title: 'Error fetching products',
      //   description: error.message || 'An error occurred.',
      //   status: 'error',
      //   duration: 2000,
      //   isClosable: true,
      // });
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

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

  return (
    <div className="container mx-auto ">
      <HomeHero title='Shop' showShopNowButton={false} />
      <div className="flex justify-end mb-4 mt-4 mr-4">
        <select value={sortType} onChange={handleSort} className="border p-2 rounded">
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6 gap-6">
        {sortedProducts.map((product) => (
            <>

              <Card key={product.id} product={product} />
            </>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
