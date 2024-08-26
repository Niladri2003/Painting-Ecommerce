import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const MobileMenu = ({ isOpen, toggleMenu, token, cartCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [activeLink, setActiveLink] = useState("/");
  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logout successful",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    navigate("/signin");
    toggleMenu();
  };
  const handleActiveLink = (path) => {
    setActiveLink(path);
    toggleMenu();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full py-3 bg-black text-white w-72 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleMenu} className="text-white">
          <FaTimes size={24} />
        </button>
      </div>
      <div className="flex flex-col mt-4 space-y-4">
        <Link
          to="/"
          onClick={() => {
            handleActiveLink("/");
          }}
          className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center mx-3 group px-3
          ${activeLink == "/" && `text-white bg-gray-700`}
            `}
        >
          <FaHome
            className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
              activeLink == "/" && `text-white`
            }`}
          />{" "}
          <span className="text-lg"> Home</span>
        </Link>
        <Link
          to="/shop"
          onClick={() => {
            handleActiveLink("/shop");
          }}
          className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center mx-3 group px-3
          ${activeLink == "/shop" && `text-white bg-gray-700`}
            `}
        >
          <FaShoppingCart
            className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
              activeLink == "/shop" && `text-white`
            }`}
          />{" "}
          <span className="text-lg"> Shop</span>
        </Link>
        <Link
          to="/about"
          onClick={() => {
            handleActiveLink("/about");
          }}
          className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center mx-3 group px-3
          ${activeLink == "/about" && `text-white bg-gray-700`}
            `}
        >
          <FaBookOpen
            className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
              activeLink == "/about" && `text-white`
            }`}
          />{" "}
          <span className="text-lg"> About</span>
        </Link>
        <Link
          to="/contact-us"
          onClick={() => {
            handleActiveLink("/contact-us");
          }}
          className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center mx-3 group px-3
          ${activeLink == "/contact-us" && `text-white bg-gray-700`}
            `}
        >
          <BiSolidContact
            className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
              activeLink == "/contact-us" && `text-white`
            }`}
          />{" "}
          <span className="text-lg"> Contact Us</span>
        </Link>
        {!token && (
          <Link
            to="/signin"
            onClick={() => {
              handleActiveLink("/signin");
            }}
            className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center mx-3 group px-3
          ${activeLink == "/signin" && `text-white bg-gray-700`}
            `}
          >
            <PiSignOutBold
              className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
                activeLink == "/signin" && `text-white`
              }`}
            />{" "}
            <span className="text-xl">Sign In</span>
          </Link>
        )}

        <div className="flex ">
          {token && (
            <div className=" px-3 rounded-md text-sm font-medium w-full space-y-4">
              <Link
                to="/account/delivery-address"
                onClick={() => {
                  handleActiveLink("/account/delivery-address");
                }}
                className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center group px-3
              ${
                activeLink == "/account/delivery-address" &&
                `text-white bg-gray-700`
              }
                `}
              >
                <FaUserGroup
                  className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
                    activeLink == "/account/delivery-address" && `text-white`
                  }`}
                />{" "}
                <span className="text-lg">My Account </span>
              </Link>
              <Link
                to="/cart"
                onClick={() => {
                  handleActiveLink("/cart");
                }}
                className={`text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex items-center  group px-3
            ${activeLink == "/cart" && `text-white bg-gray-700`}
              `}
              >
                <GiShoppingBag
                  className={`mr-2 mt-1 group-hover:text-white text-xl text-gray-400  ${
                    activeLink == "/cart" && `text-white`
                  }`}
                />{" "}
                <span className="text-xl">Cart</span>
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-600 rounded-full text-xs w-6 h-6 flex  items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:bg-gray-700 rounded-md py-2 text-sm font-medium flex w-full items-center group px-3"
              >
                <PiSignOutBold className="mr-2 mt-1 group-hover:text-white text-xl text-gray-400" />{" "}
                <span className="text-lg">Logout </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
