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
    const [sortOption, setSortOption] = useState("");
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
                console.log("product data",productsData)
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
        console.log(productsData)
        const uniqueCategories = [
            ...new Set(productsData?.map((p) => p?.category?.name)),
        ];
        const uniqueSubcategories = [
            ...new Set(
                productsData?.flatMap((p) =>
                    p?.sub_category?.map((s) => s?.subcategory)
                )
            ),
        ];
        const uniqueSizes = [
            ...new Set(
                productsData?.flatMap((p) => p?.sizes?.map((s) => s?.size))
            ),
        ];
        console.log("categories",uniqueCategories)
        console.log("sub category",uniqueSubcategories)
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

            // Sort products
            if (sortOption) {
                console.log(updatedProducts)
                updatedProducts.sort((a, b) => {
                    switch (sortOption) {
                        case "newest":
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        case "oldest":
                            return new Date(a.createdAt) - new Date(b.createdAt);
                        case "price-low-high":
                            return a.discounted_price - b.discounted_price;
                        case "price-high-low":
                            return b.discounted_price - a.discounted_price;
                        default:
                            return 0;
                    }
                });
            }

            setFilteredProducts(updatedProducts);
        };

        if (!loading) {
            applyFilters();
        }
    }, [products, filters, loading,sortOption]);

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
    const handleSortChange = (e) => {
        console.log("hello")
        setSortOption(e.target.value);
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            category: "",
            subcategories: [],
            sizes: [],
            priceRange: 5000,
        });
        setSortOption("");
    };

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:mt-12 mt-14 w-full lg:p-10">
            {/* Sidebar (Visible on Large Screens) */}
            <aside className="hidden lg:block w-[20%] p-5 bg-gray-100 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Categories</h2>
                <ul className="text-md flex flex-col gap-2">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => handleCategoryChange(category)}
                            className={`cursor-pointer p-2 rounded-md transition ${
                                filters.category === category
                                    ? "bg-gray-300 font-bold"
                                    : "hover:bg-gray-200"
                            }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                {/* Price Filter */}
                <h3 className="text-lg font-semibold mt-6">Filter by</h3>
                <label className="block mt-2 text-md">Price</label>
                <input
                    id="price-range"
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full cursor-pointer bg-gray-400"
                />
                <p className="text-sm mt-1 text-gray-700">Up to ₹{filters.priceRange}</p>

                {/* Subcategory Filter */}
                <h4 className="text-md font-semibold mt-6">Subcategory</h4>
                <div className="max-h-32 overflow-y-auto">
                    {subcategories.map((subcategory, index) => (
                        <label key={index} className="flex items-center gap-2 mt-1">
                            <input
                                type="checkbox"
                                checked={filters.subcategories.includes(subcategory)}
                                onChange={() => handleSubcategoryChange(subcategory)}
                            />
                            <span>{subcategory}</span>
                        </label>
                    ))}
                </div>

                {/* Size Filter */}
                <h4 className="text-md font-semibold mt-6">Size</h4>
                <div>
                    {sizes.map((size, index) => (
                        <label key={index} className="flex items-center gap-2 mt-1">
                            <input
                                type="checkbox"
                                checked={filters.sizes.includes(size)}
                                onChange={() => handleSizeChange(size)}
                            />
                            <span>{size}</span>
                        </label>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-col w-full lg:w-3/4 lg:p-4 mt-4 p-2">
                {/* Mobile Filter & Sort Buttons */}
                <div className="block lg:hidden flex justify-between space-x-4 mb-4">
                    <button
                        onClick={toggleSidebar}
                        className="w-1/2 bg-gray-800 text-white p-2 rounded-md"
                    >
                        Filters
                    </button>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="w-1/2 bg-white border p-2 rounded-md"
                    >
                        <option value="">Sort by</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Sidebar Modal (For Small Screens) */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex justify-end">
                        <div className="bg-white w-64 h-full p-5 shadow-lg">
                            <button
                                onClick={toggleSidebar}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
                            >
                                Close
                            </button>
                            <h2 className="text-xl font-bold mb-3">Filters</h2>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                                <ul className="text-md flex flex-col gap-2">
                                    {categories.map((category, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`cursor-pointer p-2 rounded-md transition ${
                                                filters.category === category
                                                    ? "bg-gray-300 font-bold"
                                                    : "hover:bg-gray-200"
                                            }`}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>

                                {/* Price Filter */}
                                <h4 className="text-md font-semibold mt-5">Price</h4>
                                <input
                                    id="price-range"
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={filters.priceRange}
                                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                                    className="w-full cursor-pointer bg-gray-400"
                                />
                                <p className="text-sm mt-1 text-gray-700">
                                    Up to ₹{filters.priceRange}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold">
                        {filters.category ? filters.category : "All Products"}
                    </p>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="hidden lg:block border bg-white p-2 rounded-md"
                    >
                        <option value="">Sort by</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Applied Filters Display */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {filters.category && (
                        <span className="bg-gray-300 px-3 py-1 rounded">Category: {filters.category}</span>
                    )}
                    {filters.subcategories.map((subcategory, index) => (
                        <span key={index} className="bg-gray-300 px-3 py-1 rounded">
              {subcategory}
            </span>
                    ))}
                    {filters.sizes.map((size, index) => (
                        <span key={index} className="bg-gray-300 px-3 py-1 rounded">{size}</span>
                    ))}
                    {filters.priceRange < 5000 && (
                        <span className="bg-gray-300 px-3 py-1 rounded">
              Price: Up to ₹{filters.priceRange}
            </span>
                    )}
                    <button onClick={clearFilters} className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                        Clear filters
                    </button>
                </div>

                {/* Product Grid */}
                {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">*/}
                    {loading ? (
                        <div className="flex justify-center items-center w-full h-[50vh]">
                            <p className="text-lg font-semibold text-gray-600">Loading products...</p>
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p className="text-center text-gray-600 w-full col-span-full">No products found.</p>
                            )}
                        </div>
                    )}

                {/*</div>*/}

            </main>
        </div>
    );
};

export default ProductList;
