
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const Card = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
      <div
          className="relative overflow-hidden rounded-lg group"
          onClick={handleCardClick}
      >
        <div className="overflow-hidden rounded">
          <img
              src={product.images[0].image_url}
              width={300}
              height={400}
              alt={product.title}
              className="object-cover w-[300px] h-[400px] group-hover:opacity-90 transition-opacity"
          />
        </div>
        {/*<div className="mt-4">*/}
        {/*  <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>*/}
        {/*  /!*<p className="text-gray-700 mt-2">{product.description}</p>*!/*/}
        {/*  <div className="mt-4 flex justify-between items-center">*/}
        {/*    <span className="text-xl font-bold text-gray-800">₹{product.price}</span>*/}
        {/*    <button*/}
        {/*        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"*/}
        {/*      onClick={(e) => {*/}
        {/*        e.stopPropagation();*/}
        {/*        navigate(`/product/${product.id}`);*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Add to Cart*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="p-4 bg-background">
          <h3 className="text-[18px] font-[500] leading-[22px]">{product.title}</h3>
          <h4 className="text-[15px] font-[400] leading-[24px]">₹{product.original_price+(product?.sizes[0].charge)+(product?.sub_category[0].charge)}</h4>
        </div>
      </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
          image_url: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
};

export default Card;
