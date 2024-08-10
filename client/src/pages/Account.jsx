import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaKey, FaTruck, FaShoppingBag, FaTrashAlt, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
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
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: ''
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
      setAddresses(response.data);
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
        ? `${BASEAPI}/update-address/${editAddress.id}` 
        : `${BASEAPI}/create-address`;

      const method = editAddress ? 'put' : 'post';

      await axios({
        method: method,
        url: endpoint,
        data: formData,
        headers: {
          Authorization: `${token}`,
        },
      });
      
      toast({
        title: editAddress ? "Address updated successfully" : "Address added successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      
      loadAddresses();
      setIsModalOpen(false);
      setEditAddress(null);
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: ''
      });
    } catch (error) {
      toast({
        title: "Error saving address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`${BASEAPI}/deleteaddress/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: ''
      });
    }
  };

  // Components for each section
  const renderAddresses = () => (
    <div className="max-h-96 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => openModal()}>
        Add New Address
      </Button>
      <ul className="mt-4 space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <li key={address.id} className="bg-white p-4 rounded-md shadow flex justify-between items-center">
              <div>
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.address}, {address.city}, {address.state}, {address.country}</p>
                <p>Pin Code: {address.pinCode}</p>
              </div>
              <div className="flex space-x-3">
                <FaEdit className="text-blue-500 cursor-pointer" onClick={() => openModal(address)} />
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteAddress(address.id)} />
              </div>
            </li>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </ul>
    </div>
  );

  const ChangePassword = () => (
    <div>
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <Button type="submit" colorScheme="blue">Update Password</Button>
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
          <Input type="password" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <Button type="submit" colorScheme="red">Delete Account</Button>
      </form>
    </div>
  );

  const renderModal = () => (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editAddress ? "Edit Address" : "Add New Address"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="address-form">
            <Input name="firstName" placeholder="First Name" mb={3} value={formData.firstName} onChange={handleInputChange} />
            <Input name="lastName" placeholder="Last Name" mb={3} value={formData.lastName} onChange={handleInputChange} />
            <Input name="address" placeholder="Address" mb={3} value={formData.address} onChange={handleInputChange} />
            <Input name="city" placeholder="City" mb={3} value={formData.city} onChange={handleInputChange} />
            <Input name="state" placeholder="State" mb={3} value={formData.state} onChange={handleInputChange} />
            <Input name="country" placeholder="Country" mb={3} value={formData.country} onChange={handleInputChange} />
            <Input name="pinCode" placeholder="Pin Code" mb={3} value={formData.pinCode} onChange={handleInputChange} />
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
        return <ChangePassword />;
      case "orders":
        return <MyOrders />;
      case "delete-account":
        return <DeleteAccount />;
      default:
        return renderAddresses();
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
      <main className="flex-1 p-8 bg-gray-100">
        {renderContent()}
      </main>

      {/* Address Modal */}
      {renderModal()}
    </div>
  );
};

export default AccountPage;
