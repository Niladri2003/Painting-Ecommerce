
import {
  FaKey,
  FaTruck,
  FaShoppingBag,
  FaTrashAlt,

} from "react-icons/fa";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // Replace with your actual image path

import {Outlet} from "react-router-dom";

const AccountPage = () => {
  const user = useSelector((state) => state.profile.user);


  return (
      <div className="flex min-h-screen my-16 w-full lg:w-full md:w-full lg:ml-4 lg:mr-4  bg-gray-100 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full  lg:w-[20%]   bg-white shadow-md lg:border-r-2">
          <p className={"p-2 text-[20px] w-full  font-bold "}>My Account</p>
          <div className="flex flex-col items-center p-6">
            <img
                src={user?.profile_picture || defaultAvatar}
                alt="User Avatar"
                className="lg:w-24 lg:h-24 w-24 h-24 md:w-20 md:h-20 rounded-full"
            />
            <h2 className="mt-4 lg:text-xl text-md font-semibold font-Poppins">{user ? `${user.first_name} ${user.last_name}` : 'User'}</h2>
          </div>
          <nav className="mt-6">
            <ul className={"font-Poppins"}>
              <li className="border-t border-gray-200">
                <Link to={'change-password'}>
                <button
                    className="flex items-center w-full p-4 hover:bg-gray-100"
                >
                  <FaKey className="mr-3"/>
                  Change Password
                </button>
                </Link>
              </li>
              <li className="border-t border-gray-200">
                <Link to={'delivery-address'}>
                <button
                    className="flex items-center w-full p-4 hover:bg-gray-100"
                >
                  <FaTruck className="mr-3"/>
                  Delivery Address
                </button>
                </Link>
              </li>
              <li className="border-t border-gray-200">
                <Link to={'orders'}>
                <button
                    className="flex items-center w-full p-4 hover:bg-gray-100"
                >
                  <FaShoppingBag className="mr-3"/>
                  My Orders
                </button>
                </Link>
              </li>
              <li className="border-t border-gray-200">
                <Link to={'delete-account'}>
                <button
                    className="flex items-center w-full p-4 text-red-600 hover:bg-gray-100"
                >
                  <FaTrashAlt className="mr-3"/>
                  Delete Account
                </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6  md:ml-0 md:mr-0">
          <Outlet/>
        </main>
      </div>
  );
};

export default AccountPage;
