import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../slices/favouriteSlice.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product, showDiscountPercentage, showOriginalPrice }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favourite.favorites || []);

  const discountPercentage = Math.round(
      ((product.original_price - product.discounted_price) / product.original_price) * 100
  );

  const isFavorited = favorites.some((fav) => fav.productId === product.id);

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(
          addToFavorites({
            productId: product.id,
            name: product.title,
            image: product.images[0]?.image_url || "default-image.jpg",
            price: product.discounted_price,
          })
      );
    }
  };

  return (
      <div className="relative bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg w-[200px] md:w-[250px]">
        {/* Favorite Button */}
        <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition duration-200"
        >
          {isFavorited ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-600 text-xl" />}
        </button>

        {/* Image Section */}
        <Link to={`/product/${product.id}`} className="block">
          <div className="w-full h-[180px] md:h-[220px] flex justify-center items-center">
            <img
                src={product.images[0]?.image_url || "default-image.jpg"}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="mt-3 text-center">
          <h3 className="text-md font-medium truncate">{product.title}</h3>

          {/* Price & Discount */}
          <div className="flex justify-center items-center mt-1 gap-2">
            {showOriginalPrice && (
                <p className="line-through text-sm text-red-500">₹{product.original_price}</p>
            )}
            <p className="text-lg font-semibold text-gray-800">₹{product.discounted_price}</p>
          </div>

          {showDiscountPercentage && discountPercentage > 0 && (
              <p className="text-xs text-red-600 font-medium mt-1">{discountPercentage}% Off</p>
          )}
        </div>
      </div>
  );
};

export default ProductCard;
