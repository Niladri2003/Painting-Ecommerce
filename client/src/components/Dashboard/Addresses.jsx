import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
    Button, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from "@chakra-ui/react";
import { apiConnector } from "../../services/apiConnector.jsx";
import Loader from "../Loader.jsx";

const Addresses = () => {
    const toast = useToast();
    const [editAddress, setEditAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const[loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        street_address: "",
        town_city: "",
        state: "",
        country: "",
        pin_code: "",
        mobile_number: "",
        email: ""
    });
    const loadAddresses = async () => {
        try {
            // const response = await axios.get(`${BASEAPI}/get-addresses`, {
            //   headers: {
            //     Authorization: `${token}`,
            //   },
            // });
            const response = await apiConnector('GET','get-addresses',null,null,null,true)
            setAddresses(response.data.address);
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
            console.log(editAddress);
            const endpoint = editAddress
                ? `/update-address/${editAddress.id}`
                : `/create-address`;

            const method = editAddress ? "PUT" : "POST";

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
                email
            };
            await apiConnector(
                method,       // HTTP method (PUT or POST)
                endpoint,     // API endpoint (update or create address)
                data,
                null,// Request body data
                null,         // URL parameters (none in this case)
                true          // Use access token (true since the token is required)
            );

            toast({
                title: editAddress
                    ? "Address updated successfully"
                    : "Address added successfully",
                status: "success",
                duration: 2500,
                isClosable: true,
            });

            await loadAddresses();
            setIsModalOpen(false);
            setEditAddress(null);
            resetFormData();
        } catch (error) {
            console.log(error)
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
            setLoading(true)
            await apiConnector('DELETE', `/delete-address/${id}`, null, null, null, true);
            await loadAddresses();
            toast({
                title: "Address deleted successfully",
                status: "success",
                duration: 2500,
                isClosable: true,
            });
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error deleting address",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setLoading(false)
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

    useEffect(() => {
        loadAddresses();
    }, []);



    return (
        <div className="h-[40rem] overflow-auto scrollbar-thin font-Poppins">
            <div className="bg-gray-100 p-4 sticky top-0 z-10">
                <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
                <Button
                    className="border-2 border-black p-2 rounded-[1rem] bg-black group duration-300 hover:bg-transparent cursor-pointer"
                    leftIcon={<FaPlus className="text-white group-hover:text-black  duration-300" />}
                    colorScheme=""
                    onClick={() => openModal()}
                >
                    <p className="text-white group-hover:text-black  duration-300">Add New Address</p>
                </Button>
            </div>
            <ul className="mt-4 space-y-4 overflow-y-auto max-h-[35rem]l scrollbar-thin">
                {addresses?.length > 0 ? (
                    addresses.map((address) => (
                        <li key={address.id} className="bg-white py-4 px-6 rounded-md  flex justify-between items-end border-2 shadow-sm">
                            <div>
                                <p className="font-bold ">{address.first_name} {address.last_name}</p>
                                <p className="py-2">
                                    {address.street_address}, {address.town_city}, {address.state}, {address.country}
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
            </ul>

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
        </div>
    );
};

export default Addresses;
