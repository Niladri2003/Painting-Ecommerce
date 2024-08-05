import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="overflow-hidden rounded">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110" />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">${product.price}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
