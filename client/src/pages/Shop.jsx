import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Card from '../components/ShopCard';
import Footer from '../components/footer/Footer';
import HomeHero from '../components/Home/HomeHero';
import axios from 'axios';
import { BASEAPI } from '../utils/BASE_API.js';

const Shop = () => {
  const [sortType, setSortType] = useState('');
  const [product, setProduct] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASEAPI}/get-all-product`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto">
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
          <div key={product.id} onClick={() => handleCardClick(product.id)}>
            <Card product={product} />
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default Shop;
