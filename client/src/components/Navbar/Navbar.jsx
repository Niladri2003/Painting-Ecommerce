import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import NavItems from "./NavItems";
import AvatarDropdown from "./AvatarDropDown";
import Avatar from "../../assets/avatar/defaultAvatar.jpg"
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);

  const userProfileImage = user ? user.profile_picture : Avatar;


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

  return (
    <nav
      className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isScrolled ? "bg-black" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 h-16">
          <div className="grid place-content-center text-2xl font-normal justify-start md:justify-center">
            <Link
              to="/"
              className={`font-bold cursor-pointer ${isScrolled ? "text-white" : "text-black"
                }`}
            >
              Trivart
            </Link>
          </div>
          <div className="flex items-center md:hidden justify-end">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 "
            >
              <FaBars size={24} />
            </button>
          </div>
          <div className="hidden md:flex lg:flex col-start-1 col-end-2 row-start-1 place-items-center">
            <NavItems isScrolled={isScrolled} handleNavItemClick={toggleMenu} />
          </div>
          <div className="hidden md:flex items-center justify-center md:justify-end space-x-4">
            {token ? (
              <AvatarDropdown userProfileImage={userProfileImage} />
            ) : (
              <Link
                to="/signin"
                className={`${isScrolled ? "text-white" : "text-black"
                  } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Sign In
              </Link>
            )}
            <Link to="/cart" className="relative">
              <AiOutlineShoppingCart
                className={`text-2xl ${isScrolled ? "text-white" : "text-black"
                  }`}
              />
              {totalItems > 0 && (
                <span
                  className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold ${isScrolled
                      ? "bg-red-600  text-white"
                      : "bg-red-600 text-white"
                    }`}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        <MobileMenu
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          token={token}
          userProfileImage={userProfileImage}
          cartCount={totalItems}
        />
      </div>
    </nav>
  );
};

export default Navbar;
