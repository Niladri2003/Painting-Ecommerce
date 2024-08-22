import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ relatedProducts, handleNavigate, handleImgClick }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full col-span-full row-span-2">
      <div>
        <div className="w-full">
          <h2 className="text-center text-4xl py-5">Related Products</h2>
        </div>
        <div className="w-[100%] flex gap-7 border-r-0 border-l-0 py-2 overflow-x-auto">
          {relatedProducts.map((cur, index) => (
            <div
              className="cursor-pointer"
              key={index}
              onClick={() => handleNavigate(cur, cur.images[0].image_url)}
            >
              <div className="h-[12rem] w-[12rem] p-3 rounded-[.2rem] overflow-hidden flex justify-center items-center">
                <img
                  src={cur.images[0].image_url}
                  alt="sub images"
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => {
                    handleImgClick(e);
                  }}
                />
              </div>
              <h3 className="text-lg font-medium my-1 text-center">{cur.title}</h3>
              <p className="text-sm mt-1 text-center">
                <span className="font-medium">Price:</span> ₹{cur.original_price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
