import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { logout } from "../../slices/authSlice";
import defaultAvatar from "../../assets/avatar/defaultAvatar.jpg";
import { useToast } from "@chakra-ui/react";

const AvatarDropdown = ({ userProfileImage ,size = "sm" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logout successful",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Avatar
        src={userProfileImage}
        alt="User Avatar"
        className="cursor-pointer"
        size={size}
        onClick={handleAvatarClick}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <Link
            to="/account/delivery-address"
            className="px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md flex items-center"
          >
            My Account
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 rounded-md flex items-center"
          >
            Logout <MdLogout className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
