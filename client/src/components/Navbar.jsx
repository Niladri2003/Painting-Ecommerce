import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = true;

    const { totalItems } = useSelector((state) => state.cart);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(totalItems);

    useEffect(() => {
        setCartCount(totalItems);
    }, [totalItems]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavItemClick = () => {
        if (isOpen) {
            toggleMenu();
        }
    };

    return (
        <nav className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isScrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className={`font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-black'}`}>My Navbar</h1>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                    <div className="hidden md:flex lg:flex">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Home</Link>
                            <Link to="/about" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>About</Link>
                            <Link to="/shop" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Shop</Link>
                            <Link to="/contact-us" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}>
                                <span>Contact Us</span>
                            </Link>
                            <div className="hidden md:flex items-center gap-x-4 ">
                                {user && (
                                    <Link to="/dashboard/cart" className="relative">
                                        <AiOutlineShoppingCart className={`text-2xl ${isScrolled ? 'text-white' : 'text-black'}`} />
                                        {cartCount > 0 && (
                                            <span className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-auto py-3 bg-gray-800 text-white w-64 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu} className="text-white">
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="flex flex-col mt-6 space-y-4 px-4">
                    <Link to="/" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link to="/about" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                    <Link to="/shop" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                    <Link to="/contact" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                    <div className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer  rounded-md text-sm font-medium">
                        <FaShoppingCart className="text-white mr-2" />
                        <span>Cart</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
