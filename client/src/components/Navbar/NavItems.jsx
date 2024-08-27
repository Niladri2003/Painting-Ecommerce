// import React from "react";
// import { Link } from "react-router-dom";

// const NavItems = ({ isScrolled, handleNavItemClick }) => {
//   return (
//     <div className="flex items-baseline space-x-4">
//       <Link
//         to="/"
//         onClick={handleNavItemClick}
//         className={`${isScrolled ? "text-white" : "text-black"
//           } ${isScrolled ? "hover:bg-gray-700" : "hover:bg-black"
//           }  hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
//       >
//         Home
//       </Link>
//       <Link
//         to="/shop"
//         onClick={handleNavItemClick}
//         className={`${isScrolled ? "text-white" : "text-black"
//           } ${isScrolled ? "hover:bg-gray-700" : "hover:bg-black"
//           } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
//       >
//         Shop
//       </Link>
//       <Link
//         to="/about"
//         onClick={handleNavItemClick}
//         className={`${isScrolled ? "text-white" : "text-black"
//           } ${isScrolled ? "hover:bg-gray-700" : "hover:bg-black"
//           } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
//       >
//         About
//       </Link>
//       <Link
//         to="/contact-us"
//         onClick={handleNavItemClick}
//         className={`${isScrolled ? "text-white" : "text-black"
//           } ${isScrolled ? "hover:bg-gray-700" : "hover:bg-black"
//           } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
//       >
//         Contact Us
//       </Link>
//     </div>
//   );
// };

// export default NavItems;

// previous navbar code on the top 
//    ^
//    |

import React from "react";
import { Link } from "react-router-dom";

const NavItems = ({ handleNavItemClick }) => {
  return (
    <div className="flex items-baseline space-x-4">
      <Link
        to="/"
        onClick={handleNavItemClick}
        className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Home
      </Link>
      <Link
        to="/shop"
        onClick={handleNavItemClick}
        className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Shop
      </Link>
      <Link
        to="/about"
        onClick={handleNavItemClick}
        className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        About
      </Link>
      <Link
        to="/contact-us"
        onClick={handleNavItemClick}
        className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default NavItems;
