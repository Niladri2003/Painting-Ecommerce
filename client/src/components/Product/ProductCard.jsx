import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../slices/favouriteSlice.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const ProductCard = ({
  product,
  showDiscountPercentage,
  showOriginalPrice,
}) => {
  // Calculate discount percentage
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favourite.favorites || []);
  console.log(favorites);
  const discountPercentage = Math.round(
    ((product.original_price - product.discounted_price) /
      product.original_price) *
      100
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
    <div className="product-card relative bg-zinc-200 h-[310px] md:h-[370px] w-[180px] md:w-[240px] rounded-lg lg:p-8 p-5">
      <div className="image-container">
        <span
          onClick={toggleFavorite}
          className="discount-badge z-10 absolute lg:top-1 top-1 right-0  text-white lg:text-sm text-[10px] font-bold px-2 py-3 rounded-[100%]"
        >
          {isFavorited ? (
            <FaHeart color={"black"} size={20} />
          ) : (
            <FaRegHeart color={"black"} size={20} />
          )}
        </span>

        <img
          src={product.images[0]?.image_url || "default-image.jpg"}
          alt={product.title}
          className="rounded-t-lg hover:scale-[1.02] w-[130px] h-[130px] md:w-[200px] md:h-[200px] transition-transform duration-300"
        />
      </div>

      <Link to={`/product/${product.id}`}>
        <div className="product-details mt-4 font-Poppins flex flex-row justify-between items-center">
          <div className={"flex flex-col"}>
            <h3 className="text-lg">{product.title}</h3>
            {/*<p className="text-gray-600">{product.description}</p>*/}
            {showOriginalPrice && (
              <p className="line-through text-red-600">
                ₹{product.original_price}
              </p>
            )}
            <div className={"flex flex-row gap-2 items-center"}>
              {" "}
              <p className="text-gray-800 font-semibold">
                ₹{product.discounted_price}
              </p>
              {discountPercentage > 0 && (
                <p
                  className={
                    " text-red-600 font-Poppins lg:text-md text-[10px]"
                  }
                >
                  {discountPercentage}% Off
                </p>
              )}
            </div>
          </div>
          <span onClick={toggleFavorite}></span>
          {/*<span*/}
          {/*    className="discount-badge  text-white bg-re lg:text-sm text-[10px] font-bold px-2 py-2 rounded">*/}
          {/*        {discountPercentage}%*/}
          {/*    </span>*/}
          {/* Sizes and sub-categories can be added here */}
          {/*<div className="sizes mt-2">*/}
          {/*    {product.sizes.map(size => (*/}
          {/*        <span key={size.id} className="text-sm border px-2 py-1 rounded mr-2">*/}
          {/*            {size.size} (+₹{size.charge})*/}
          {/*        </span>*/}
          {/*    ))}*/}
          {/*</div>*/}
          {/*<div className="sub-categories mt-2">*/}
          {/*    {product.sub_category.map(subCat => (*/}
          {/*        <span key={subCat.id} className="text-sm border px-2 py-1 rounded mr-2">*/}
          {/*            {subCat.subcategory} (+₹{subCat.charge})*/}
          {/*        </span>*/}
          {/*    ))}*/}
          {/*</div>*/}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
