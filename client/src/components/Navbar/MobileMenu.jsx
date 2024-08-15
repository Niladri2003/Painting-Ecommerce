import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import AvatarDropdown from "./AvatarDropDown";

const MobileMenu = ({ isOpen, toggleMenu, token, userProfileImage, cartCount }) => {
  return (
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
            <AvatarDropdown userProfileImage={userProfileImage} />
          </div>
        )}
        <Link
          to="/"
          onClick={toggleMenu}
          className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="/shop"
          onClick={toggleMenu}
          className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
        >
          Shop
        </Link>
        <Link
          to="/about"
          onClick={toggleMenu}
          className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
        >
          About
        </Link>
        <Link
          to="/contact-us"
          onClick={toggleMenu}
          className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
        >
          Contact Us
        </Link>
        {!token && (
          <Link
            to="/signin"
            onClick={toggleMenu}
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Sign In
          </Link>
        )}
        <Link
          to="/cart"
          className="flex items-center mt-4 hover:bg-gray-700 px-3 py-2 cursor-pointer rounded-md text-sm font-medium"
        >
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="ml-2 bg-red-600 rounded-full text-xs px-2 py-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
