import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HomeHero from "../components/Home/HomeHero";
import { apiConnector } from "../services/apiConnector.jsx";
import { Spinner } from "@chakra-ui/react";
import ProductCard from "../components/Product/ProductCard.jsx";

const Shop = () => {
  const [sortType, setSortType] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();

  // Fetch the product categories and their associated products
  const getProductsByCategory = async () => {
    try {
      setLoading(true); // Start loading
      const response = await apiConnector(
          "GET",
          "/get-product-categorise",
          null,
          null,
          null,
          false
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const sortedProducts = (products) => {
    return [...products].sort((a, b) => {
      if (sortType === "price-low-high") return a.discounted_price - b.discounted_price;
      if (sortType === "price-high-low") return b.discounted_price - a.discounted_price;
      if (sortType === "newest") return new Date(b.created_at) - new Date(a.created_at);
      if (sortType === "oldest") return new Date(a.created_at) - new Date(b.created_at);
      return 0;
    });
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // ✅ Show loader while fetching data
  if (loading) {
    return (
        <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
          <Spinner size="xl" />
          <div>Loading products...</div>
        </div>
    );
  }

  // ✅ Check AFTER loading completes
  if (categories.length === 0) {
    return (
        <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
          <div>No products available</div>
        </div>
    );
  }

  return (
      <div className="w-full mx-auto">
        <HomeHero title="Shop" showShopNowButton={false} />
        <div className="w-full p-[1rem]">
          {categories.map((category, index) => {
            const categoryName = category?.category_name;
            const categoryId = category.products[0]?.category_id;
            const products = sortedProducts(category.products);

            return (
                <div className="pb-[2.5rem]" key={index}>
                  {/* Category header */}
                  <header className="flex justify-between pt-3 lg:w-[98%]">
                    <div className="px-4 py-2 flex flex-col gap-2 lg:w-[86%] w-[96%] cursor-pointer">
                      <h3 className="text-black font-Poppins text-[30px]">{categoryName}</h3>
                      <div className="h-[2px] bg-black"></div>
                    </div>
                  </header>

                  {/* Products list */}
                  <section className="w-full mt-5 grid lg:grid-cols-6 grid-cols-2 place-items-center md:grid-cols-3 gap-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} showDiscountPercentage={true} showOriginalPrice={true} />
                    ))}
                    <div className="font-Poppins text-[20px] cursor-pointer bg-black text-white text-lg px-5 py-2">
                      <Link to={`/product-list`}>View More</Link>
                    </div>
                  </section>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default Shop;
