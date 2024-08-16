import React from "react";
import { Link } from "react-router-dom";

const NavItems = ({ isScrolled, handleNavItemClick }) => {
  return (
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
        } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
      >
        Contact Us
      </Link>
    </div>
  );
};

export default NavItems;
