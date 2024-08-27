
const ProductCard = ({ product }) => {
   // console.log(product);
    return (
        <div className="product-card border rounded-lg p-4">
            <div className="image-container">
                <img
                    src={product.images[0]?.image_url || 'default-image.jpg'}
                    alt={product.title}
                    className=" rounded-t-lg hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="product-details mt-4 font-Poppins">
                <h3 className="text-lg ">{product.title}</h3>
                {/*<p className="text-gray-600">{product.description}</p>*/}
                <p className="text-gray-800 font-semibold">
                    ₹{product.discounted_price} <span className="line-through">₹{product.original_price}</span>
                </p>
                {/* Sizes and sub-categories can be added here */}
                <div className="sizes mt-2">
                    {product.sizes.map(size => (
                        <span key={size.id} className="text-sm border px-2 py-1 rounded mr-2">
              {size.size} (+₹{size.charge})
            </span>
                    ))}
                </div>
                <div className="sub-categories mt-2">
                    {product.sub_category.map(subCat => (
                        <span key={subCat.id} className="text-sm border px-2 py-1 rounded mr-2">
              {subCat.subcategory} (+${subCat.charge})
            </span>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ProductCard;
