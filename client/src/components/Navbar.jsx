// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { Avatar } from "@chakra-ui/react"; // For the avatar icon, adjust if needed
// import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // A default avatar image
// import { logout } from "../slices/authSlice"; // Import the logout action
// import { MdLogout } from "react-icons/md"; // Logout icon
// import { RiAccountCircleFill } from "react-icons/ri"; // My Account icon
// import { LiaTruckLoadingSolid } from "react-icons/lia"; // My Orders icon
// import { useToast } from "@chakra-ui/react"; // Import Chakra UI Toast

// const Navbar = () => {
//   const { totalItems } = useSelector((state) => state.cart);
//   const token = useSelector((state) => state.auth.token); // Get the token from Redux state
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(totalItems);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // State for mobile dropdown
//   const userProfileImage = null; // You might load this from user profile data after login
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Navigation hook
//   const dropdownRef = useRef(null); // Reference to the dropdown
//   const toast = useToast(); // Toast hook

//   useEffect(() => {
//     setCartCount(totalItems);
//   }, [totalItems]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleNavItemClick = () => {
//     if (isOpen) {
//       toggleMenu();
//     }
//   };

//   const handleAvatarClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleMobileAvatarClick = () => {
//     setIsMobileDropdownOpen(!isMobileDropdownOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     toast({
//       title: "Logout successful",
//       status: "success",
//       duration: 2500,
//       isClosable: true,
//     });
//     navigate("/signin"); // Redirect to signin page
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//         setIsMobileDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isScrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className={`font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-black'}`}>My Navbar</Link>
//           </div>
//           <div className="flex items-center md:hidden">
//             <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
//               {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//           <div className="hidden md:flex lg:flex">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link to="/" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Home</Link>
//               <Link to="/about" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>About</Link>
//               <Link to="/shop" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Shop</Link>
//               <Link to="/contact-us" onClick={handleNavItemClick} className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}>
//                 <span>Contact Us</span>
//               </Link>
//               <div className="hidden md:flex items-center justify-center gap-x-4">
//                 {token ? (
//                   <div className="relative" ref={dropdownRef}>
//                     <Avatar
//                       src={userProfileImage || defaultAvatar}
//                       alt="User Avatar"
//                       className="cursor-pointer"
//                       onClick={handleAvatarClick}
//                     />
//                     {isDropdownOpen && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//                         {/* <Link to="/orders" className=" px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md flex items-center">
//                            My Orders
//                         </Link> */}
//                         <Link to="/account" className=" px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md flex items-center">
//                            My Account
//                         </Link>
//                         <button onClick={handleLogout} className=" w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 rounded-md flex items-center">
//                           Logout <MdLogout className="ml-2" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex space-x-4">
//                     <Link to="/signin" className={`${isScrolled ? 'text-white' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
//                       Sign In
//                     </Link>

//                   </div>
//                 )}
//                 <Link to="/cart" className="relative">
//                   <AiOutlineShoppingCart className={`text-2xl ${isScrolled ? 'text-white' : 'text-black'}`} />
//                   {cartCount > 0 && (
//                     <span className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled ? 'bg-red-600  text-white' : 'bg-red-600 text-white'}`}>
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={`fixed top-0 right-0 h-auto py-3 bg-gray-800 text-white w-64 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
//         <div className="flex justify-end p-4">
//           <button onClick={toggleMenu} className="text-white">
//             <FaTimes size={24} />
//           </button>
//         </div>
//         <div className="flex flex-col mt-6 space-y-4 px-4">
//           {token && (
//             <div className="mb-4 flex justify-center relative">
//               <Avatar
//                 src={userProfileImage || defaultAvatar}
//                 alt="User Avatar"
//                 className="h-16 w-16 cursor-pointer"
//                 onClick={handleMobileAvatarClick}
//               />
//               {isMobileDropdownOpen && (
//                 <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//                   {/* <Link to="/orders" className=" px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
//                      My Orders
//                   </Link> */}
//                   <Link to="/account" className=" px-4 py-2 text-gray-800 hover:bg-gray-200 flex rounded-md items-center">
//                      My Account
//                   </Link>
//                   <button onClick={handleLogout} className=" w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
//                     Logout <MdLogout className="ml-auto" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//           <Link to="/" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
//           <Link to="/about" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
//           <Link to="/shop" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
//           <Link to="/contact-us" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
//           {!token && (
//             <>
//               <Link to="/signin" onClick={handleNavItemClick} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>

//             </>
//           )}
//           <Link to="/cart" className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer rounded-md text-sm font-medium">
//             <FaShoppingCart className="text-white mr-2" />
//             <span>Cart</span>
//             {cartCount > 0 && (
//               <span className="ml-2 bg-red-600 rounded-full text-xs px-2 py-1">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react"; // For the avatar icon, adjust if needed
import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // A default avatar image
import { logout } from "../slices/authSlice"; // Import the logout action
import { MdLogout } from "react-icons/md"; // Logout icon
import { useToast } from "@chakra-ui/react"; // Import Chakra UI Toast

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token); // Get the token from Redux state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(totalItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // State for mobile dropdown
  const userProfileImage = null; // You might load this from user profile data after login
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook
  const dropdownRef = useRef(null); // Reference to the dropdown
  const toast = useToast(); // Toast hook

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileAvatarClick = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logout successful",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    navigate("/signin"); // Redirect to signin page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full transition-colors duration-300 z-50 ${
        isScrolled ? "bg-gray-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 h-16">
          <div className="grid place-content-center text-2xl font-normal justify-start md:justify-center">
            <Link
              to="/"
              className={`font-bold cursor-pointer ${
                isScrolled ? "text-white" : "text-black"
              }`}
            >
              LOGO
            </Link>
          </div>
          <div className="flex items-center md:hidden justify-end">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <div className="hidden md:flex lg:flex col-start-1 col-end-2 row-start-1 place-items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                onClick={handleNavItemClick}
                className={`${
                  isScrolled ? "text-white" : "text-black"
                } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={handleNavItemClick}
                className={`${
                  isScrolled ? "text-white" : "text-black"
                } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={handleNavItemClick}
                className={`${
                  isScrolled ? "text-white" : "text-black"
                } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              <Link
                to="/contact-us"
                onClick={handleNavItemClick}
                className={`${
                  isScrolled ? "text-white" : "text-black"
                } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
              >
                <span>Contact</span>
              </Link>
              {/* <div className="hidden md:flex items-center justify-center gap-x-4">
                {token ? (
                  <div className="relative" ref={dropdownRef}>
                    <Avatar
                      src={userProfileImage || defaultAvatar}
                      alt="User Avatar"
                      className="cursor-pointer"
                      onClick={handleAvatarClick}
                    />
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link
                          to="/account"
                          className=" px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md flex items-center"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={handleLogout}
                          className=" w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 rounded-md flex items-center"
                        >
                          Logout <MdLogout className="ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/signin"
                      className={`${
                        isScrolled ? "text-white" : "text-black"
                      } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
                <Link to="/cart" className="relative">
                  <AiOutlineShoppingCart
                    className={`text-2xl ${
                      isScrolled ? "text-white" : "text-black"
                    }`}
                  />
                  {cartCount > 0 && (
                    <span
                      className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${
                        isScrolled
                          ? "bg-red-600  text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div> */}
            </div>
          </div>
          <div className="hidden md:flex flex items-center justify-center gap-x-4">
                {token ? (
                  <div className="relative" ref={dropdownRef}>
                    <Avatar
                      src={userProfileImage || defaultAvatar}
                      alt="User Avatar"
                      className="cursor-pointer"
                      onClick={handleAvatarClick}
                    />
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link
                          to="/account"
                          className=" px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md flex items-center"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={handleLogout}
                          className=" w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 rounded-md flex items-center"
                        >
                          Logout <MdLogout className="ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/cart" className="relative">
                <FaUserCircle
                    className={`text-2xl ${
                      isScrolled ? "text-white" : "text-black"
                    }`}
                  />
                  {cartCount > 0 && (
                    <span
                      className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${
                        isScrolled
                          ? "bg-red-600  text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                  <div className="flex space-x-4 capitalize">
                    <Link
                      to="/signin"
                      className={`${
                        isScrolled ? "text-white" : "text-black"
                      } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                      >
                      Log in
                    </Link>
                  </div>
                      </>
                )}
                <Link to="/cart" className="relative">
                  <GiShoppingBag
                    className={`text-3xl ${
                      isScrolled ? "text-white" : "text-black"
                    }`}
                  />
                 <span
                      className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${
                        isScrolled
                          ? "bg-red-600  text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                     0
                    </span>
                  {/* <span>0</span> */}
                  {cartCount > 0 && (
                    <span
                      className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${
                        isScrolled
                          ? "bg-red-600  text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-auto py-3 bg-gray-800 text-white w-64 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-white">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col mt-6 space-y-4 px-4">
          {token && (
            <div className="mb-4 flex justify-center relative">
              <Avatar
                src={userProfileImage || defaultAvatar}
                alt="User Avatar"
                className="h-16 w-16 cursor-pointer"
                onClick={handleMobileAvatarClick}
              />
              {isMobileDropdownOpen && (
                <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/account"
                    className=" px-4 py-2 text-gray-800 hover:bg-gray-200 flex rounded-md items-center"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className=" w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                  >
                    Logout <MdLogout className="ml-auto" />
                  </button>
                </div>
              )}
            </div>
          )}
          <Link
            to="/"
            onClick={handleNavItemClick}
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={handleNavItemClick}
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </Link>
          <Link
            to="/shop"
            onClick={handleNavItemClick}
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Shop
          </Link>
          <Link
            to="/contact-us"
            onClick={handleNavItemClick}
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Contact Us
          </Link>
          {!token && (
            <>
              <Link
                to="/signin"
                onClick={handleNavItemClick}
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            </>
          )}
          <Link
            to="/cart"
            className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer rounded-md text-sm font-medium"
          >
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
};

export default Navbar;
