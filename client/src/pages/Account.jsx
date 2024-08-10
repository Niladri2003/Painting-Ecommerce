// import HomeHero from "../components/Home/HomeHero"
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaUser, FaKey, FaTruck, FaShoppingBag, FaLock, FaTrashAlt } from "react-icons/fa";
// import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // Replace with your actual image path

// const AccountPage = () => {
//     const userProfileImage = null; // Replace with actual logic to get the user's profile image or set to null if not available

//     return (
//         <div className="flex  min-h-screen my-16 w-4/5 bg-gray-100">

//             {/* Sidebar */}
//             <aside className="w-1/3 bg-white shadow-md">
//                 <div className="flex flex-col items-center p-6">
//                     <img
//                         src={userProfileImage || defaultAvatar}
//                         alt="User Avatar"
//                         className="w-24 h-24 rounded-full"
//                     />
//                     <h2 className="mt-4 text-xl font-semibold">Sarah Miller</h2>
//                 </div>
//                 <nav className="mt-6">
//                     <ul>
//                         <li className="border-t border-gray-200">
//                             <Link
//                                 to="/change-password"
//                                 className="flex items-center p-4 hover:bg-gray-100"
//                             >
//                                 <FaKey className="mr-3" />
//                                 Change Password
//                             </Link>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <Link
//                                 to="/billing-address"
//                                 className="flex items-center p-4 hover:bg-gray-100"
//                             >
//                                 <FaTruck className="mr-3" />
//                                 Delivery Address
//                             </Link>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <Link
//                                 to="/orders"
//                                 className="flex items-center p-4 hover:bg-gray-100"
//                             >
//                                 <FaShoppingBag className="mr-3" />
//                                 My Orders
//                             </Link>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <Link
//                                 to="/privacy"
//                                 className="flex items-center p-4 hover:bg-gray-100"
//                             >
//                                 <FaLock className="mr-3" />
//                                 Privacy
//                             </Link>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <Link
//                                 to="/delete-account"
//                                 className="flex items-center p-4 text-red-600 hover:bg-gray-100"
//                             >
//                                 <FaTrashAlt className="mr-3" />
//                                 Delete Account
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-8">
//                 <h1 className="text-2xl font-bold mb-6">Billing Address</h1>
//                 <form className="space-y-6">
//                     <div className="flex flex-wrap -mx-3">
//                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
//                                 First Name
//                             </label>
//                             <input
//                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="first-name"
//                                 type="text"
//                                 placeholder="Sarah"
//                             />
//                         </div>
//                         <div className="w-full md:w-1/2 px-3">
//                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
//                                 Last Name
//                             </label>
//                             <input
//                                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="last-name"
//                                 type="text"
//                                 placeholder="Miller"
//                             />
//                         </div>
//                     </div>

//                     {/* Additional form fields */}
//                     <div className="px-3">
//                         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
//                             Address
//                         </label>
//                         <input
//                             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                             id="address"
//                             type="text"
//                             placeholder="12 abc street"
//                         />
//                     </div>

//                     <div className="px-3">
//                         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
//                             Town / City
//                         </label>
//                         <input
//                             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                             id="city"
//                             type="text"
//                             placeholder="London"
//                         />
//                     </div>
//                 </form>
//             </main>
//         </div>
//     );
// };

// export default AccountPage;

import React, { useState } from "react";
import { FaKey, FaTruck, FaShoppingBag, FaLock, FaTrashAlt } from "react-icons/fa";
import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // Replace with your actual image path

const AccountPage = () => {
    const [selectedTab, setSelectedTab] = useState("billing-address"); // State to track selected tab
    const userProfileImage = null; // Replace with actual logic to get the user's profile image or set to null if not available

    // Components for each section
    const DeliveryAddress = () => (
        <div>
            <h1 className="text-2xl font-bold mb-6">Delivery Address</h1>
            <form className="space-y-6">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                            First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="first-name"
                            type="text"
                            placeholder="Sarah"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                            Last Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="last-name"
                            type="text"
                            placeholder="Miller"
                        />
                    </div>
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="address"
                        type="text"
                        placeholder="12 abc street"
                    />
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                        Country
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="country"
                        type="text"
                        placeholder="India"
                    />
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                        State
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="state"
                        type="text"
                        placeholder="Odisha"
                    />
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mobile">
                        Mobile
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="mobile"
                        type="number"
                        placeholder="Mobile"
                    />
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="text"
                        placeholder="user@gmail.com"
                    />
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                        Town / City
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="city"
                        type="text"
                        placeholder="London"
                    />
                </div>

                <div className="">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pincode">
                        Pin Code
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="pincode"
                        type="number"
                        placeholder="Pin Code"
                    />
                </div>

                
            </form>
        </div>
    );

    const ChangePassword = () => (
        <div>
            <h1 className="text-2xl font-bold mb-6">Change Password</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Password</button>
            </form>
        </div>
    );

    const MyOrders = () => (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            <p>No active orders.</p>
        </div>
    );

    const DeleteAccount = () => (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-red-600">Delete Account</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete Account</button>
            </form>
        </div>
    );

    const renderContent = () => {
        switch (selectedTab) {
            case "change-password":
                return <ChangePassword />;
            case "billing-address":
                return <DeliveryAddress />;
            case "orders":
                return <MyOrders />;
            case "delete-account":
                return <DeleteAccount />;
            default:
                return <BillingAddress />;
        }
    };

    return (
        <div className="flex min-h-screen my-16 w-4/5 bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/3 bg-white shadow-md">
                <div className="flex flex-col items-center p-6">
                    <img
                        src={userProfileImage || defaultAvatar}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    <h2 className="mt-4 text-xl font-semibold">Sarah Miller</h2>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li className="border-t border-gray-200">
                            <button
                                onClick={() => setSelectedTab("change-password")}
                                className="flex items-center w-full p-4 hover:bg-gray-100"
                            >
                                <FaKey className="mr-3" />
                                Change Password
                            </button>
                        </li>
                        <li className="border-t border-gray-200">
                            <button
                                onClick={() => setSelectedTab("billing-address")}
                                className="flex items-center w-full p-4 hover:bg-gray-100"
                            >
                                <FaTruck className="mr-3" />
                                Delivery Address
                            </button>
                        </li>
                        <li className="border-t border-gray-200">
                            <button
                                onClick={() => setSelectedTab("orders")}
                                className="flex items-center w-full p-4 hover:bg-gray-100"
                            >
                                <FaShoppingBag className="mr-3" />
                                My Orders
                            </button>
                        </li>
                        <li className="border-t border-gray-200">
                            <button
                                onClick={() => setSelectedTab("delete-account")}
                                className="flex items-center w-full p-4 text-red-600 hover:bg-gray-100"
                            >
                                <FaTrashAlt className="mr-3" />
                                Delete Account
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-gray-100 ">
                {renderContent()}
            </main>
        </div>
    );
};

export default AccountPage;
