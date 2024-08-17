// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaKey, FaTruck, FaShoppingBag, FaTrashAlt, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // Replace with your actual image path
// import { BASEAPI } from "../utils/BASE_API";
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalCloseButton,
//     ModalBody,
//     ModalFooter,
//     Button,
//     Input,
//     useToast,
// } from "@chakra-ui/react";

// const AccountPage = () => {
//     const [selectedTab, setSelectedTab] = useState("delivery-address");
//     const [addresses, setAddresses] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editAddress, setEditAddress] = useState(null);
//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         street_address: '',
//         town_city: '',
//         state: '',
//         country: '',
//         pin_code: '',
//         mobile_number: '',
//         email: '',
//         set_as_default: true
//     });

//     const toast = useToast();
//     const userProfileImage = null;
//     const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

//     useEffect(() => {
//         if (selectedTab === "delivery-address") {
//             loadAddresses();
//         }
//     }, [selectedTab]);

//     const loadAddresses = async () => {
//         try {
//             const response = await axios.get(`${BASEAPI}/get-addresses`, {
//                 headers: {
//                     Authorization: `${token}`,
//                 },
//             });
//             setAddresses(response.data.address);
//             console.log(response.data)
//         } catch (error) {
//             toast({
//                 title: "Error loading addresses",
//                 status: "error",
//                 duration: 2500,
//                 isClosable: true,
//             });
//         }
//     };

//     const handleSaveAddress = async () => {
//         try {
//             const endpoint = editAddress
//                 ? `${BASEAPI}/update-address`
//                 : `${BASEAPI}/create-address`;

//             const method = editAddress ? 'put' : 'post';

//             await axios({
//                 method: method,
//                 url: endpoint,
//                 data: formData,
//                 headers: {
//                     Authorization: `${token}`,
//                 },
//             });

//             toast({
//                 title: editAddress ? "Address updated successfully" : "Address added successfully",
//                 status: "success",
//                 duration: 2500,
//                 isClosable: true,
//             });

//             loadAddresses();
//             setIsModalOpen(false);
//             setEditAddress(null);
//             resetFormData();
//         } catch (error) {
//             toast({
//                 title: "Error saving address",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };

//     const resetFormData = () => {
//         setFormData({
//             first_name: '',
//             last_name: '',
//             street_address: '',
//             town_city: '',
//             state: '',
//             country: '',
//             pin_code: '',
//             mobile_number: '',
//             email: ''
//         });
//     };

//     const handleDeleteAddress = async (id) => {
//         try {
//             await axios.get(`${BASEAPI}/delete-address/${id}`, {
//                 headers: {
//                     Authorization: `${token}`,
//                 },
//             });
//             loadAddresses();
//             toast({
//                 title: "Address deleted successfully",
//                 status: "success",
//                 duration: 2500,
//                 isClosable: true,
//             });
//         } catch (error) {
//             toast({
//                 title: "Error deleting address",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const openModal = (address = null) => {
//         setEditAddress(address);
//         setIsModalOpen(true);
//         if (address) {
//             setFormData(address);
//         } else {
//             resetFormData();
//         }
//     };

//     // Components for each section
//     const renderAddresses = () => (
//         <div className="max-h-96 overflow-y-auto">
//             <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
//             <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => openModal()}>
//                 Add New Address
//             </Button>
//             <ul className="mt-4 space-y-4">
//                 {addresses?.length > 0 ? (
//                     addresses.map((address) => (
//                         <li key={address.id} className="bg-white p-4 rounded-md shadow flex justify-between items-center">
//                             <div>
//                                 <p className="font-bold ">{address.first_name} {address.last_name}</p>
//                                 <p>{address.street_address}, {address.town_city}, {address.state}, {address.country}</p>
//                                 <p>Pin Code: {address.pin_code}</p>
//                                 <p>Mobile: {address.mobile_number}</p>
//                                 <p>Email: {address.email}</p>
//                             </div>
//                             <div className="flex space-x-3">
//                                 <FaEdit className="text-blue-500 cursor-pointer" onClick={() => openModal(address)} />
//                                 <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteAddress(address.id)} />
//                             </div>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No addresses found.</p>
//                 )}
//             </ul>
//         </div>
//     );

//     const ChangePassword = () => (
//         <div>
//             <h1 className="text-2xl font-bold mb-6">Change Password</h1>
//             <form>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Current Password</label>
//                     <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">New Password</label>
//                     <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Confirm Password</label>
//                     <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//                 <Button type="submit" colorScheme="blue">Update Password</Button>
//             </form>
//         </div>
//     );

//     const MyOrders = () => (
//         <div>
//             <h1 className="text-2xl font-bold mb-6">My Orders</h1>
//             <p>No active orders.</p>
//         </div>
//     );

//     const DeleteAccount = () => (
//         <div>
//             <h1 className="text-2xl font-bold mb-6 text-red-600">Delete Account</h1>
//             <form>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Password</label>
//                     <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//                 <Button type="submit" colorScheme="red">Delete Account</Button>
//             </form>
//         </div>
//     );

//     const renderModal = () => (
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>{editAddress ? "Edit Address" : "Add New Address"}</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody>
//                     <form id="address-form">
//                         <Input name="first_name" placeholder="First Name" mb={3} value={formData.first_name} onChange={handleInputChange} />
//                         <Input name="last_name" placeholder="Last Name" mb={3} value={formData.last_name} onChange={handleInputChange} />
//                         <Input name="street_address" placeholder="Address" mb={3} value={formData.street_address} onChange={handleInputChange} />
//                         <Input name="town_city" placeholder="City" mb={3} value={formData.town_city} onChange={handleInputChange} />
//                         <Input name="state" placeholder="State" mb={3} value={formData.state} onChange={handleInputChange} />
//                         <Input name="country" placeholder="Country" mb={3} value={formData.country} onChange={handleInputChange} />
//                         <Input name="pin_code" placeholder="Pin Code" mb={3} value={formData.pin_code} onChange={handleInputChange} />
//                         <Input name="mobile_number" placeholder="Mobile Number" mb={3} value={formData.mobile_number} onChange={handleInputChange} />
//                         <Input name="email" placeholder="Email" mb={3} value={formData.email} onChange={handleInputChange} />
//                     </form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button colorScheme="blue" onClick={handleSaveAddress}>
//                         Save
//                     </Button>
//                 </ModalFooter>
//             </ModalContent>
//         </Modal>
//     );

//     const renderContent = () => {
//         switch (selectedTab) {
//             case "delivery-address":
//                 return renderAddresses();
//             case "change-password":
//                 return <ChangePassword />;
//             case "orders":
//                 return <MyOrders />;
//             case "delete-account":
//                 return <DeleteAccount />;
//             default:
//                 return renderAddresses();
//         }
//     };

//     return (
//         <div className="flex min-h-screen my-16 w-4/5 bg-gray-100">
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
//                             <button
//                                 onClick={() => setSelectedTab("change-password")}
//                                 className="flex items-center w-full p-4 hover:bg-gray-100"
//                             >
//                                 <FaKey className="mr-3" />
//                                 Change Password
//                             </button>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <button
//                                 onClick={() => setSelectedTab("delivery-address")}
//                                 className="flex items-center w-full p-4 hover:bg-gray-100"
//                             >
//                                 <FaTruck className="mr-3" />
//                                 Delivery Address
//                             </button>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <button
//                                 onClick={() => setSelectedTab("orders")}
//                                 className="flex items-center w-full p-4 hover:bg-gray-100"
//                             >
//                                 <FaShoppingBag className="mr-3" />
//                                 My Orders
//                             </button>
//                         </li>
//                         <li className="border-t border-gray-200">
//                             <button
//                                 onClick={() => setSelectedTab("delete-account")}
//                                 className="flex items-center w-full p-4 text-red-600 hover:bg-gray-100"
//                             >
//                                 <FaTrashAlt className="mr-3" />
//                                 Delete Account
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-8 bg-gray-100">
//                 {renderContent()}
//             </main>

//             {/* Address Modal */}
//             {renderModal()}
//         </div>
//     );
// };

// export default AccountPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaKey,
  FaTruck,
  FaShoppingBag,
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import defaultAvatar from "../assets/avatar/defaultAvatar.jpg"; // Replace with your actual image path
import { BASEAPI } from "../utils/BASE_API";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState("delivery-address");
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street_address: "",
    town_city: "",
    state: "",
    country: "",
    pin_code: "",
    mobile_number: "",
    email: "",
    set_as_default: "true",
  });

  const toast = useToast();
  const userProfileImage = null;
  const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

  useEffect(() => {
    if (selectedTab === "delivery-address") {
      loadAddresses();
    }
  }, [selectedTab]);

  const loadAddresses = async () => {
    try {
      const response = await axios.get(`${BASEAPI}/get-addresses`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setAddresses(response.data.address);
      console.log(response.data);
    } catch (error) {
      toast({
        title: "Error loading addresses",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const handleSaveAddress = async () => {
    try {
      const endpoint = editAddress
        ? `${BASEAPI}/update-address`
        : `${BASEAPI}/create-address`;

      const method = editAddress ? "put" : "post";

      // Only keep the necessary fields for creating/updating an address
      const {
        first_name,
        last_name,
        street_address,
        town_city,
        state,
        country,
        pin_code,
        mobile_number,
        email,
      } = formData;

      const data = {
        first_name,
        last_name,
        street_address,
        town_city,
        state,
        country,
        pin_code,
        mobile_number,
        email,
        set_as_default: "true", // Hardcoded to true
      };
      await axios({
        method: method,
        url: endpoint,
        data: data,
        headers: {
          Authorization: `${token}`,
        },
      });

      toast({
        title: editAddress
          ? "Address updated successfully"
          : "Address added successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      loadAddresses();
      setIsModalOpen(false);
      setEditAddress(null);
      resetFormData();
    } catch (error) {
      toast({
        title: "Error saving address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const resetFormData = () => {
    setFormData({
      first_name: "",
      last_name: "",
      street_address: "",
      town_city: "",
      state: "",
      country: "",
      pin_code: "",
      mobile_number: "",
      email: "",
    });
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.get(`${BASEAPI}/delete-address/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      loadAddresses();
      toast({
        title: "Address deleted successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = (address = null) => {
    setEditAddress(address);
    setIsModalOpen(true);
    if (address) {
      setFormData(address);
    } else {
      resetFormData();
    }
  };

  // Components for each section
  const renderAddresses = () => (
    <div className="h-[40rem] overflow-auto scrollbar-thin">
      <div className="bg-gray-100 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
        <Button
          className="border-2 border-black p-2 rounded-[1rem] bg-black group duration-300 hover:bg-transparent cursor-pointer"
          leftIcon={
            <FaPlus className="text-white group-hover:text-black  duration-300" />
          }
          colorScheme=""
          onClick={() => openModal()}
        >
          <p className="text-white group-hover:text-black  duration-300">
            Add New Address
          </p>
        </Button>
      </div>
      <ul className="mt-4 space-y-4 overflow-y-auto max-h-[35rem]l scrollbar-thin">
        {addresses?.length > 0 ? (
          addresses.map((address) => (
            <li
              key={address.id}
              className="bg-white py-4 px-6 rounded-md shadow flex justify-between items-end"
            >
              <div>
                <p className="font-bold ">
                  {address.first_name} {address.last_name}
                </p>
                <p className="py-2">
                  {address.street_address}, {address.town_city}, {address.state}
                  , {address.country}
                </p>
                <p>Pin Code: {address.pin_code}</p>
                <p>Mobile: {address.mobile_number}</p>
                <p>Email: {address.email}</p>
              </div>
              <div className="flex space-x-3 self-end">
                <div className="border-2 border-black p-2 rounded-[.2rem] bg-black group duration-300 hover:bg-transparent cursor-pointer">
                  <FaEdit
                    className="text-white group-hover:text-black  duration-300"
                    onClick={() => openModal(address)}
                  />
                </div>
                <div className="border-2 border-black p-2 rounded-[.2rem] bg-black group duration-300 hover:bg-transparent cursor-pointer">
                  <FaTrash
                    className="text-white group-hover:text-black  duration-300"
                    onClick={() => handleDeleteAddress(address.id)}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="px-4">No addresses found.</p>
        )}
        {/* <li className="bg-white py-4 px-6 rounded-md shadow flex justify-between items-end">
          <div>
            <p className="font-bold">Akash Biswas</p>
            <p className="py-2">
              uttar goara, hatkalna, bardhaman, nibhujibazar,west bengal,713434
              uttar goara, hatkalna, bardhaman, nibhujibazar,west bengal,713434
              uttar goara, hatkalna, bardhaman, nibhujibazar,west bengal,713434
            </p>
            <p>Pin Code: 4555121</p>
            <p>Mobile: 615111611</p>
            <p>Email: ba a @gmail.com</p>
          </div>
          
          <div className="flex space-x-3 self-end">
            <div className="border-2 border-black p-2 rounded-[.2rem] bg-black group duration-300 hover:bg-transparent cursor-pointer">
            <FaEdit
              className="text-white group-hover:text-black  duration-300"
              onClick={() => openModal(address)}
            />
            </div>
            <div className="border-2 border-black p-2 rounded-[.2rem] bg-black group duration-300 hover:bg-transparent cursor-pointer">
                 <FaTrash
              className="text-white group-hover:text-black  duration-300"
              onClick={() => handleDeleteAddress(address.id)}
            /> 
            </div>
          </div>
        </li> */}

      </ul>
    </div>
  );

  // ChangePassword component modified to make API call for resetting password
  const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = async (e) => {
      e.preventDefault();

      if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
        toast({
          title: "Validation Error",
          description: "Passwords do not match or fields are empty.",
          status: "warning",
          duration: 2500,
          isClosable: true,
        });
        return;
      }

      if (newPassword === confirmPassword) {
        if (newPassword === currentPassword) {
          toast({
            title: "Validation Error",
            description: "New password cannot be same as current password.",
            status: "warning",
            duration: 2500,
            isClosable: true,
          });
        } else {
          try {
            await axios.post(
              `${BASEAPI}/reset-password`,
              { new_password: newPassword },
              {
                headers: {
                  Authorization: `${token}`,
                },
              }
            );

            toast({
              title: "Password Updated",
              description: "Your password has been updated successfully.",
              status: "success",
              duration: 2500,
              isClosable: true,
            });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          } catch (error) {
            toast({
              title: "Update Failed",
              description: "Failed to update password. Please try again.",
              status: "error",
              duration: 2500,
              isClosable: true,
            });
          }
        }
      } else {
        toast({
          title: "Validation Error",
          description: "Passwords do not match.",
          status: "warning",
          duration: 2500,
          isClosable: true,
        });
      }
    };

    return (
      <div className="p-4 md:p-0">
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <Button type="submit" colorScheme="" className="border-2 border-black p-2 rounded-[1rem] bg-black group duration-300 hover:bg-transparent cursor-pointer">
          <p className="text-white group-hover:text-black  duration-300">
            Update Password
          </p>
          </Button>
        </form>
      </div>
    );
  };

  const MyOrders = () => (
    <div className="p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <p>No active orders.</p>
    </div>
  );

  const DeleteAccount = () => (
    <div  className="p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Delete Account</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <Button type="submit" colorScheme="red">
          Delete Account
        </Button>
      </form>
    </div>
  );

  const renderModal = () => (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editAddress ? "Edit Address" : "Add New Address"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="address-form">
            <Input
              name="first_name"
              placeholder="First Name"
              mb={3}
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              mb={3}
              value={formData.last_name}
              onChange={handleInputChange}
            />
            <Input
              name="street_address"
              placeholder="Address"
              mb={3}
              value={formData.street_address}
              onChange={handleInputChange}
            />
            <Input
              name="town_city"
              placeholder="City"
              mb={3}
              value={formData.town_city}
              onChange={handleInputChange}
            />
            <Input
              name="state"
              placeholder="State"
              mb={3}
              value={formData.state}
              onChange={handleInputChange}
            />
            <Input
              name="country"
              placeholder="Country"
              mb={3}
              value={formData.country}
              onChange={handleInputChange}
            />
            <Input
              name="pin_code"
              placeholder="Pin Code"
              mb={3}
              value={formData.pin_code}
              onChange={handleInputChange}
            />
            <Input
              name="mobile_number"
              placeholder="Mobile Number"
              mb={3}
              value={formData.mobile_number}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              mb={3}
              value={formData.email}
              onChange={handleInputChange}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSaveAddress}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case "delivery-address":
        return renderAddresses();
      case "change-password":
        return <ChangePassword />; // Changed to include API call for resetting password
      case "orders":
        return <MyOrders />;
      case "delete-account":
        return <DeleteAccount />;
      default:
        return renderAddresses();
    }
  };

  return (
    <div className="flex min-h-screen my-16 w-full md:w-4/5 bg-gray-100 flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-white shadow-md">
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
                onClick={() => setSelectedTab("delivery-address")}
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
      <main className="flex-1 md:p-8 bg-gray-100">{renderContent()}</main>

      {/* Address Modal */}
      {renderModal()}
    </div>
  );
};

export default AccountPage;
