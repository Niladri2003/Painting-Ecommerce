import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector.jsx";
import ProductCard from "../components/Product/ProductCard.jsx";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [priceRange, setPriceRange] = useState(5000);

    const getAllProducts = async () => {
        try {
            const response = await apiConnector('GET', `/get-all-product`, null, null, null, false);
            const productsData = response.data.data;

            setProducts(productsData);
            setFilteredProducts(productsData);

            const uniqueCategories = [...new Set(productsData.map(p => p.category.name))];
            const uniqueSubcategories = [...new Set(productsData.flatMap(p => p.sub_category.map(s => s.subcategory)))];
            const uniqueSizes = [...new Set(productsData.flatMap(p => p.sizes.map(s => s.size)))];

            setCategories(uniqueCategories);
            setSubcategories(uniqueSubcategories);
            setSizes(uniqueSizes);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSubcategoryChange = (subcategory) => {
        setSelectedSubcategory(prev =>
            prev.includes(subcategory)
                ? prev.filter(item => item !== subcategory)
                : [...prev, subcategory]
        );
    };

    const handleSizeChange = (size) => {
        setSelectedSize(prev =>
            prev.includes(size)
                ? prev.filter(item => item !== size)
                : [...prev, size]
        );
    };

    useEffect(() => {
        filterProducts();
    }, [selectedCategory, selectedSubcategory, selectedSize, priceRange]);

    const filterProducts = () => {
        let filtered = [...products];

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category.name === selectedCategory);
            setFilteredProducts(filtered);
            console.log(filtered)
        }

        if (selectedSubcategory.length > 0) {
            filtered = filtered.filter(product =>
                product.sub_category.some(sub => selectedSubcategory.includes(sub.subcategory))
            );
        }

        if (selectedSize.length > 0) {
            filtered = filtered.filter(product =>
                product.sizes.some(s => selectedSize.includes(s.size))
            );
        }

        if (priceRange) {
            filtered = filtered.filter(product => product.discountedPrice <= priceRange);
        }

        setFilteredProducts(filtered);
        console.log("Filtered products updated:", filteredProducts);
    };
    useEffect(() => {
        getAllProducts();
    }, []);


    return (
        <div className="flex mt-24 w-full p-10 bg-[#fffbf6]">
            <div className="sidebar p-4 w-[240px]">
                <h2 className="text-xl font-Poppins text-[20px] leading-[28px]">Categories</h2>
                <div className={"h-[1px] bg-draw-color mt-[2px]"}>{""}</div>
                <ul className={"font-Poppins text-[16px] flex flex-col gap-1 lg:mt-2"}>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => handleCategoryChange(category)} className={`cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`}>
                            {category}
                        </li>
                    ))}
                </ul>
                <h3 className="text-sm font-Poppins mt-10">Filter by</h3>
                <div className="mt-2">
                    <div className="flex flex-col justify-start">
                        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input
                            id="default-range"
                            type="range"
                            min="0"
                            max="5000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-500"
                        />
                        <div>Up to ${priceRange}</div>
                    </div>
                </div>
                <div className={"h-[1px] bg-draw-color mt-[20px]"}>{""}</div>
                <div className="mt-2">
                    <h4 className="text-sm font-Poppins mb-2">Subcategory</h4>
                    <div className="space-y-1 font-Poppins text-[13px]">
                        {subcategories.map((subcategory, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedSubcategory.includes(subcategory)}
                                    onChange={() => handleSubcategoryChange(subcategory)}
                                />
                                <span>{subcategory}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="text-sm font-Poppins">Size</h4>
                    <div className="space-y-1 font-Poppins text-[13px]">
                        {sizes.map((size, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedSize.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                                <span>{size}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className={"flex flex-col w-full p-4"}>
                <div>
                    <p className={"text-[40px] font-Poppins"}>All products</p>
                </div>
                <div className="product-listing font-Poppins lg:mt-10 flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
