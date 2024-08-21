
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BASEAPI } from '../utils/BASE_API';
const Buynow = () => {
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [paymentMethod] = useState('Cash on Delivery');
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/get-addresses`, {
                headers: { Authorization: `${token}` }
            });

            const addresses = response.data.address || [];
            const defaultAddr = addresses.find(addr => addr.set_as_default);

            if (defaultAddr) {
                setDefaultAddress(defaultAddr);
            } else {
                toast({
                    title: 'No Default Address Found',
                    description: 'Please set a default address in your profile.',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch addresses.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleOrderNow = async () => {
        setOrderLoading(true);
        try {
            const response = await axios.post(`${BASEAPI}/create-order`, {}, {
                headers: { Authorization: `${token}` }
            });

            setIsOrderPlaced(true);
            toast({
                title: 'Order Placed',
                description: 'Your order has been placed successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => navigate('/order-confirmation'), 3000); // Redirect after animation

        } catch (error) {
            console.error('Error placing order:', error);
            toast({
                title: 'Error',
                description: 'Failed to place order.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <div className=' mt-28 mb-28 w-full mx-auto'>
            <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-row justify-between">

                {/* 1. Delivery Address Section */}
                <div className="flex-grow">
                    <div className="border rounded-lg mb-6">
                        <h2 className="bg-gray-200 px-4 py-2">
                            1. Delivery address
                        </h2>
                        <div className="px-4 py-4">
                            {defaultAddress ? (
                                <div>
                                    <p>{`${defaultAddress.first_name} ${defaultAddress.last_name}`}</p>
                                    <p>{`${defaultAddress.street_address}, ${defaultAddress.town_city}, ${defaultAddress.state} -  ${defaultAddress.pin_code}`}</p>
                                    <p>{`Mobile: ${defaultAddress.mobile_number}`}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        To change the default address, navigate to 
                                        <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/account')}> Profile {'->'} Account {'->'} Address</span>.
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No default address found. Please set a default address in your profile.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 3. Payment Method Section */}
                    <div className="border rounded-lg mb-6">
                        <h2 className="bg-gray-200 px-4 py-2">
                            3. Payment method
                        </h2>
                        <div className="px-4 py-4">
                            <label className="flex items-center space-x-3">
                                <input type="radio" checked readOnly className="form-radio h-4 w-4 text-blue-600" />
                                <span>Cash on Delivery</span>
                            </label>
                            <p className="text-gray-500 mt-2">UPI payment facility coming soon...</p>
                        </div>
                    </div>

                    {/* 4. Items and Delivery Section */}
                    <div className="border rounded-lg mb-6">
                        <h2 className="bg-gray-200 px-4 py-2">
                            4. Items and delivery
                        </h2>
                        <div className="px-4 py-4 flex gap-6">
                            <button
                                onClick={handleOrderNow}
                                className="bg-yellow-500 hover:bg-yellow-600 border-black text-white px-6 py-2 rounded"
                                disabled={orderLoading}
                            >
                                {orderLoading ? 'Placing Order...' : 'Order Now'}
                            </button>
                            <button className="bg-lime-500 hover:bg-lime-600 border-black text-white px-6 py-2 rounded" onClick={() => navigate('/cart')}>
                                 Go back to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side Summary Box */}
                <div className="p-4 shadow-lg border lg:ml-6 border-black rounded-lg w-full sm:w-1/3">
                    <div className="text-lg font-semibold mb-4">Order Summary</div>
                    <p className="flex justify-between mb-2">
                        <span>Items:</span>
                        <span>₹4,957.00</span>
                    </p>
                    <p className="flex justify-between mb-2">
                        <span>Delivery:</span>
                        <span>₹200.00</span>
                    </p>
                    <p className="flex justify-between mb-2">
                        <span>Total:</span>
                        <span>₹5,157.00</span>
                    </p>
                    <p className="flex justify-between mb-4">
                        <span>Promotion Applied:</span>
                        <span>-₹200.00</span>
                    </p>
                    <div className="text-xl text-red-600 font-bold">
                        Order Total: ₹4,957.00
                    </div>
                </div>

                {/* Order Success Animation */}
                {isOrderPlaced && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <p className="text-2xl font-bold mb-4">🎉 Order Placed Successfully!</p>
                            <p>Redirecting to confirmation page...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Buynow;