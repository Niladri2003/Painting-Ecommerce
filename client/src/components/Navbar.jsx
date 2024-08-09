// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//     const user = true;

//     const { totalItems } = useSelector((state) => state.cart);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     const [cartCount, setCartCount] = useState(totalItems);

//     useEffect(() => {
//         setCartCount(totalItems);
//     }, [totalItems]);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 10) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleNavItemClick = () => {
//         if (isOpen) {
//             toggleMenu();
//         }
//     };

//     return (
//         <nav className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isScrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <Link to="/" className={`font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-black'}`}>My Navbar</Link>
//                     </div>
//                     <div className="flex items-center md:hidden">
//                         <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
//                             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//                         </button>
//                     </div>
//                     <div className="hidden md:flex lg:flex">
//                         <div className="ml-10 flex items-baseline space-x-4">
//                             <Link to="/" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Home</Link>
//                             <Link to="/about" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>About</Link>
//                             <Link to="/shop" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Shop</Link>
//                             <Link to="/contact-us" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}>
//                                 <span>Contact Us</span>
//                             </Link>
//                             <div className="hidden md:flex items-center gap-x-4 ">
//                                 {user && (
//                                     <Link to="/cart" className="relative">
//                                         <AiOutlineShoppingCart className={`text-2xl ${isScrolled ? 'text-white' : 'text-black'}`} />
//                                         {cartCount > 0 && (
//                                             <span className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled ? 'bg-red-600  text-white' : 'bg-red-600 text-white'}`}>
//                                                 {cartCount}
//                                             </span>
//                                         )}
//                                     </Link>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className={`fixed top-0 right-0 h-auto py-3 bg-gray-800 text-white w-64 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
//                 <div className="flex justify-end p-4">
//                     <button onClick={toggleMenu} className="text-white">
//                         <FaTimes size={24} />
//                     </button>
//                 </div>
//                 <div className="flex flex-col mt-6 space-y-4 px-4">
//                     <Link to="/" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
//                     <Link to="/about" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
//                     <Link to="/shop" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
//                     <Link to="/contact" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
//                     <div className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer  rounded-md text-sm font-medium">
//                         <FaShoppingCart className="text-white mr-2" />
//                         <span>Cart</span>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

//code-> 2

// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import Avatar from '../components/avatar/Avatar'; // Import your Avatar component

// const Navbar = () => {
//     const { totalItems } = useSelector((state) => state.cart);
//     const token = useSelector((state) => state.auth.token); // Get the token from the Redux store
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     const [cartCount, setCartCount] = useState(totalItems);

//     useEffect(() => {
//         setCartCount(totalItems);
//     }, [totalItems]);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 10) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleNavItemClick = () => {
//         if (isOpen) {
//             toggleMenu();
//         }
//     };

//     return (
//         <nav className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isScrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <Link to="/" className={`font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-black'}`}>My Navbar</Link>
//                     </div>
//                     <div className="flex items-center md:hidden">
//                         <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
//                             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//                         </button>
//                     </div>
//                     <div className="hidden md:flex lg:flex">
//                         <div className="ml-10 flex items-baseline space-x-4">
//                             <Link to="/" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Home</Link>
//                             <Link to="/about" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>About</Link>
//                             <Link to="/shop" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Shop</Link>
//                             <Link to="/contact-us" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}>
//                                 <span>Contact Us</span>
//                             </Link>

//                             {token ? (
//                                 <Avatar /> // Show avatar when the user is logged in
//                             ) : (
//                                 <div className="flex space-x-4">
//                                     <Link to="/signin" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign In</Link>
//                                     <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Sign Up</Link>
//                                 </div>
//                             )}

//                             <div className="hidden md:flex items-center gap-x-4 ">
//                                 <Link to="/cart" className="relative">
//                                     <AiOutlineShoppingCart className={`text-2xl ${isScrolled ? 'text-white' : 'text-black'}`} />
//                                     {cartCount > 0 && (
//                                         <span className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled ? 'bg-red-600  text-white' : 'bg-red-600 text-white'}`}>
//                                             {cartCount}
//                                         </span>
//                                     )}
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             <div className={`fixed top-0 right-0 h-auto py-3 bg-gray-800 text-white w-64 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
//                 <div className="flex justify-end p-4">
//                     <button onClick={toggleMenu} className="text-white">
//                         <FaTimes size={24} />
//                     </button>
//                 </div>
//                 <div className="flex flex-col mt-6 space-y-4 px-4">
//                     <Link to="/" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
//                     <Link to="/about" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
//                     <Link to="/shop" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
//                     <Link to="/contact" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>

//                     {token ? (
//                         <Avatar /> // Show avatar when the user is logged in
//                     ) : (
//                         <div className="flex flex-col space-y-4">
//                             <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</Link>
//                             <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Sign Up</Link>
//                         </div>
//                     )}

//                     <div className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer rounded-md text-sm font-medium">
//                         <FaShoppingCart className="text-white mr-2" />
//                         <span>Cart</span>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

//code- 3

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import { FaUserCircle } from 'react-icons/fa'; // Default avatar icon
// import { logout } from '../slices/authSlice'; // Import logout action
// import { useState,useEffect } from 'react';

// const Navbar = () => {
//     const dispatch = useDispatch();
//     const token = useSelector((state) => state.auth.token); 
//     console.log(token)// Check if the user is logged in
//     const { totalItems } = useSelector((state) => state.cart);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 10) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleLogout = () => {
//         dispatch(logout()); // Dispatch the logout action
//     };

//     return (
//         <nav className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isScrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <Link to="/" className={`font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-black'}`}>My Navbar</Link>
//                     </div>
//                     <div className="flex items-center md:hidden">
//                         <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
//                             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//                         </button>
//                     </div>
//                     <div className="hidden md:flex lg:flex">
//                         <div className="ml-10 flex items-baseline space-x-4">
//                             <Link to="/" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Home</Link>
//                             <Link to="/about" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>About</Link>
//                             <Link to="/shop" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Shop</Link>
//                             <Link to="/contact-us" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}>
//                                 <span>Contact Us</span>
//                             </Link>

//                             {token ? (
//                                 // Show Avatar and Logout Button when logged in
//                                 <div className="flex items-center gap-x-4">
//                                     <FaUserCircle className="text-white text-3xl" />
//                                     <button onClick={handleLogout} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Logout</button>
//                                 </div>
//                             ) : (
//                                 // Show Sign In and Sign Up buttons when not logged in
//                                 <div className="flex items-center gap-x-4">
//                                     <Link to="/signin" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Sign In</Link>
//                                     <Link to="/sign-up" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Sign Up</Link>
//                                 </div>
//                             )}

//                             <Link to="/cart" className="relative">
//                                 <AiOutlineShoppingCart className={`text-2xl ${isScrolled ? 'text-white' : 'text-black'}`} />
//                                 {totalItems > 0 && (
//                                     <span className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled ? 'bg-red-600  text-white' : 'bg-red-600 text-white'}`}>
//                                         {totalItems}
//                                     </span>
//                                 )}
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

//code-4

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Avatar } from '@chakra-ui/react'; // For the avatar icon, adjust if needed
import defaultAvatar from '../assets/avatar/defaultAvatar.jpg'; // A default avatar image

const Navbar = () => {
    const { totalItems } = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token); // Get the token from Redux state
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(totalItems);
    const userProfileImage = null; // You might load this from user profile data after login

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
                        <Link to="/" className={`font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-black'}`}>My Navbar</Link>
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
                            <div className="hidden md:flex items-center gap-x-4">
                                {token ? (
                                    // If the user is logged in, show the avatar
                                    <Link to="/profile">
                                        <Avatar src={userProfileImage || defaultAvatar} alt="User Avatar" className="cursor-pointer" />
                                    </Link>
                                ) : (
                                    // If the user is not logged in, show Sign In/Sign Up buttons
                                    <>
                                        <Link to="/signin" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                                            Sign In
                                        </Link>
                                        <Link to="/signup" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                                <Link to="/cart" className="relative">
                                    <AiOutlineShoppingCart className={`text-2xl ${isScrolled ? 'text-white' : 'text-black'}`} />
                                    {cartCount > 0 && (
                                        <span className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled ? 'bg-red-600  text-white' : 'bg-red-600 text-white'}`}>
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
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
                    <Link to="/contact-us" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                    {token ? (
                        <Link href="/profile" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                            <Avatar src={userProfileImage || defaultAvatar} alt="User Avatar" />
                        </Link>
                    ) : (
                        <>
                            <Link to="/signin" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
                            <Link to="/signup" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                        </>
                    )}
                    <Link to="/cart" className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer rounded-md text-sm font-medium">
                        <FaShoppingCart className="text-white mr-2" />
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <span className="ml-2 bg-red-600 rounded-full text-xs px-2 py-1">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
