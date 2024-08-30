
import {Link} from 'react-router-dom'


const HomeProductCard = ({ product, showDiscountPercentage,showOriginalPrice }) => {
    // Calculate discount percentage
    const discountPercentage = Math.round(
        ((product.original_price - product.discounted_price) / product.original_price) * 100
    );

    return (
        <Link to={`/product/${product.id}`}>
            <div className="product-card relative flex flex-col items-center rounded-lg p-4 ">
                <div className="image-container">
                    {showDiscountPercentage && (
                        <span className="discount-badge z-10 absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {discountPercentage}% OFF
                        </span>
                    )}
                    <img
                        src={product.images[0]?.image_url || 'default-image.jpg'}
                        alt={product.title}
                        className="rounded-t-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="product-details mt-2 font-Poppins">
                    <h3 className="text-lg  text-[22px] leading-[20px] font-[400]">{product.title}</h3>
                    {/*<p className="text-gray-600">{product.description}</p>*/}
                    {showOriginalPrice &&    ( <p className="line-through text-red-600">₹{product.original_price}</p>)}
                    <p className="text-gray-800">
                      From Rs. ₹{product.discounted_price}
                    </p>
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
            </div>
        </Link>
    );
}
export default HomeProductCard;