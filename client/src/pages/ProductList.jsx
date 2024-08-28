import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector.jsx";
import ProductCard from "../components/Product/ProductCard.jsx";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]); // All products from API
    const [filteredProducts, setFilteredProducts] = useState([]); // Products after filtering
    const [filters, setFilters] = useState({
        category: "",
        subcategories: [],
        sizes: [],
        priceRange: 5000,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Fetch all products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await apiConnector(
                    "GET",
                    `/get-all-product`,
                    null,
                    null,
                    null,
                    false
                );
                const productsData = response.data.data;
                setProducts(productsData);
                setFilteredProducts(productsData);
                extractFilterOptions(productsData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Extract unique categories, subcategories, and sizes from products
    const extractFilterOptions = (productsData) => {
        const uniqueCategories = [
            ...new Set(productsData.map((p) => p.category.name)),
        ];
        const uniqueSubcategories = [
            ...new Set(
                productsData.flatMap((p) =>
                    p.sub_category.map((s) => s.subcategory)
                )
            ),
        ];
        const uniqueSizes = [
            ...new Set(
                productsData.flatMap((p) => p.sizes.map((s) => s.size))
            ),
        ];

        setCategories(uniqueCategories);
        setSubcategories(uniqueSubcategories);
        setSizes(uniqueSizes);
    };

    // Apply filters whenever products or filters change
    useEffect(() => {
        const applyFilters = () => {
            let updatedProducts = [...products];

            // Filter by category
            if (filters.category) {
                updatedProducts = updatedProducts.filter(
                    (product) => product.category.name === filters.category
                );
            }

            // Filter by subcategories
            if (filters.subcategories.length > 0) {
                updatedProducts = updatedProducts.filter((product) =>
                    product.sub_category.some((sub) =>
                        filters.subcategories.includes(sub.subcategory)
                    )
                );
            }

            // Filter by sizes
            if (filters.sizes.length > 0) {
                updatedProducts = updatedProducts.filter((product) =>
                    product.sizes.some((s) => filters.sizes.includes(s.size))
                );
            }

            // Filter by price range
            if (filters.priceRange < 5000) {
                updatedProducts = updatedProducts.filter(
                    (product) => product.discounted_price <= filters.priceRange
                );
            }

            setFilteredProducts(updatedProducts);
        };

        if (!loading) {
            applyFilters();
        }
    }, [products, filters, loading]);

    // Handler functions for filter changes
    const handleCategoryChange = (category) => {
        setFilters((prev) => ({
            ...prev,
            category: prev.category === category ? "" : category,
            subcategories: [], // Reset subcategories when category changes
        }));
    };

    const handleSubcategoryChange = (subcategory) => {
        setFilters((prev) => ({
            ...prev,
            subcategories: prev.subcategories.includes(subcategory)
                ? prev.subcategories.filter((sub) => sub !== subcategory)
                : [...prev.subcategories, subcategory],
        }));
    };

    const handleSizeChange = (size) => {
        setFilters((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    const handlePriceChange = (price) => {
        setFilters((prev) => ({
            ...prev,
            priceRange: price,
        }));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            category: "",
            subcategories: [],
            sizes: [],
            priceRange: 5000,
        });
    };

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:mt-24 mt-14 w-full lg:p-10">
            {/* Sidebar for large screens */}
            <div className="hidden lg:block w-[20%] p-4">
                <h2 className="text-xl font-Poppins text-[20px] leading-[28px]">
                    Categories
                </h2>
                <div className="h-[1px] bg-draw-color mt-[2px]" />
                <ul className="font-Poppins text-[16px] flex flex-col gap-1 lg:mt-2">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => handleCategoryChange(category)}
                            className={`cursor-pointer ${
                                filters.category === category ? "font-bold" : ""
                            }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                {/* Price Filter */}
                <h3 className="text-sm font-Poppins mt-10">Filter by</h3>
                <div className="mt-2">
                    <div className="flex flex-col justify-start">
                        <label
                            htmlFor="price-range"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Price
                        </label>
                        <input
                            id="price-range"
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={filters.priceRange}
                            onChange={(e) =>
                                handlePriceChange(Number(e.target.value))
                            }
                            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-500"
                        />
                        <div>Up to ₹{filters.priceRange}</div>
                    </div>
                </div>

                <div className="h-[1px] bg-draw-color mt-[20px]" />

                {/* Subcategory Filter */}
                <div className="mt-2">
                    <h4 className="text-sm font-Poppins mb-2">Subcategory</h4>
                    <div className="space-y-1 font-Poppins text-[13px] max-h-40 overflow-y-auto">
                        {subcategories.map((subcategory, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.subcategories.includes(
                                        subcategory
                                    )}
                                    onChange={() =>
                                        handleSubcategoryChange(subcategory)
                                    }
                                />
                                <span>{subcategory}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Size Filter */}
                <div className="mt-2">
                    <h4 className="text-sm font-Poppins">Size</h4>
                    <div className="space-y-1 font-Poppins text-[13px]">
                        {sizes.map((size, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.sizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                                <span>{size}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col w-full lg:w-3/4 lg:p-4 mt-2 p-2">
                {/* Filters button for small screens */}
                <div className="block lg:hidden space-x-[4px] mb-4 w-[100%]">
                    <button
                        onClick={toggleSidebar}
                        className=" w-[48%] text-black border border-black p-2 rounded-lg"
                    >
                        Filters
                    </button>
                    <button

                        className=" w-[48%] text-black border border-black p-2 rounded-lg"
                    >
                        <select className=" bg-white font-Poppins rounded">
                            <option value="">Sort by</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </button>
                </div>

                {/* Sidebar modal for small screens */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex justify-end">
                        <div className="bg-white w-64 h-full p-4">
                            <button
                                onClick={toggleSidebar}
                                className="text-white font-Poppins p-2 rounded-md mb-4 bg-red-600"
                            >
                                Close
                            </button>
                            <h2 className="text-xl font-bold mb-4">Filters</h2>
                            <div>
                                {/* Categories */}
                                <h2 className="text-xl font-Poppins text-[20px] leading-[28px]">
                                    Categories
                                </h2>
                                <div className="h-[1px] bg-draw-color mt-[2px]"/>
                                <ul className="font-Poppins text-[16px] flex flex-col gap-1 lg:mt-2">
                                    {categories.map((category, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`cursor-pointer ${
                                                filters.category === category ? "font-bold" : ""
                                            }`}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>

                                {/* Price Filter */}
                                <h3 className="text-sm font-Poppins mt-10">Filter by</h3>
                                <div className="mt-2">
                                    <div className="flex flex-col justify-start">
                                        <label
                                            htmlFor="price-range"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Price
                                        </label>
                                        <input
                                            id="price-range"
                                            type="range"
                                            min="0"
                                            max="5000"
                                            step="100"
                                            value={filters.priceRange}
                                            onChange={(e) =>
                                                handlePriceChange(Number(e.target.value))
                                            }
                                            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-500"
                                        />
                                        <div>Up to ₹{filters.priceRange}</div>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-draw-color mt-[20px]"/>

                                {/* Subcategory Filter */}
                                <div className="mt-2">
                                    <h4 className="text-sm font-Poppins mb-2">
                                        Subcategory
                                    </h4>
                                    <div className="space-y-1 font-Poppins text-[13px] max-h-40 overflow-y-auto">
                                        {subcategories.map((subcategory, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters.subcategories.includes(
                                                        subcategory
                                                    )}
                                                    onChange={() =>
                                                        handleSubcategoryChange(subcategory)
                                                    }
                                                />
                                                <span>{subcategory}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Size Filter */}
                                <div className="mt-2">
                                    <h4 className="text-sm font-Poppins">Size</h4>
                                    <div className="space-y-1 font-Poppins text-[13px]">
                                        {sizes.map((size, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters.sizes.includes(size)}
                                                    onChange={() => handleSizeChange(size)}
                                                />
                                                <span>{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product List */}
                <div className="flex flex-col w-full lg:p-4">
                    <div className="flex justify-between items-center">
                        {filters.category ? (
                            <p className="lg:text-[40px] text-[20px] font-Poppins">
                                {filters.category}
                            </p>
                        ) : (
                            <p className="lg:text-[40px] text-[20px] font-Poppins">All Products</p>
                        )}

                        {/* Clear Filters Button */}
                        <div className={"lg:block hidden"} ><select  className=" border bg-white font-Poppins p-2 rounded">
                            <option value="">Sort by</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select></div>
                    </div>

                    {/* Applied Filters Display */}
                    <div className="lg:mt-4 lg:mb-0 mb-4">
                        {filters.category || filters.subcategories.length > 0 || filters.sizes.length > 0 || filters.priceRange < 5000 ? (
                            <div className="flex gap-2 flex-wrap font-Poppins text-[12px]">
                            {filters.category && (
                                    <span className="bg-gray-200 p-2 rounded">
                                    Category: {filters.category}
                                </span>
                                )}
                                {filters.subcategories.map((subcategory, index) => (
                                    <span key={index} className="bg-gray-200 p-2 rounded">
                                    Subcategory: {subcategory}
                                </span>
                                ))}
                                {filters.sizes.map((size, index) => (
                                    <span key={index} className="bg-gray-200 p-2 rounded">
                                    Size: {size}
                                </span>
                                ))}
                                {filters.priceRange < 5000 && (
                                    <span className="bg-gray-200 p-2 rounded">
                                    Price: Up to ₹{filters.priceRange}
                                </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="text-sm bg-red-500 text-white px-2 py-1 rounded "
                                >
                                    Clear filter
                                </button>
                            </div>

                        ) : null}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Loading products...</p>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div
                            className="product-listing font-Poppins lg:mt-10 flex-grow grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} showDiscountPercentage={true}
                                             showOriginalPrice={true}/>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p>No products found. Adjust your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
