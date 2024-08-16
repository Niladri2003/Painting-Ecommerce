import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FaTrashAlt } from 'react-icons/fa';
import { BASEAPI } from '../../utils/BASEAPI.js';

const CouponUploader = () => {
    const [couponCode, setCouponCode] = useState('');
    const [validity, setValidity] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const token = JSON.parse(localStorage.getItem('token'));

    const fetchCoupons = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/v1/get-all-coupons`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setCoupons(response.data.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleCouponCreation = async () => {
        try {
            setUploading(true);
            const formattedValidity = dayjs(validity).format('DD-MM-YYYY');

            const response = await axios.post(
                `${BASEAPI}/v1/create-coupon`,
                {
                    coupon_code: couponCode,
                    validity: formattedValidity,
                    discount_percentage: discountPercentage,
                    is_active: isActive,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setCoupons((prevCoupons) => [...prevCoupons, response.data.data]);
            setCouponCode('');
            setValidity('');
            setDiscountPercentage('');
            setIsActive(true);
        } catch (error) {
            console.error('Error creating coupon:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteCoupon = async (id) => {
        try {
            await axios.delete(`${BASEAPI}/v1/delete-coupon/${id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            setCoupons(coupons.filter((coupon) => coupon.id !== id));
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.post(
                `${BASEAPI}/v1/change-coupon-status/${id}`,
                { is_active: newStatus },
                {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setCoupons(
                coupons.map((coupon) =>
                    coupon.id === id ? { ...coupon, is_active: newStatus === 'true' } : coupon
                )
            );
        } catch (error) {
            console.error('Error updating coupon status:', error);
        }
    };

    return (
        <div className="w-full min-h-screen p-5">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Create a New Coupon</h2>
                <div className="space-y-4">
                    <div className="form-group">
                        <label className="block text-gray-700">Coupon Code</label>
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700">Validity</label>
                        <input
                            type="date"
                            value={validity}
                            onChange={(e) => setValidity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700">Discount Percentage</label>
                        <input
                            type="number"
                            placeholder="Enter discount percentage"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value === 'true')}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <button
                        onClick={handleCouponCreation}
                        className={`w-full bg-blue-600 text-white px-4 py-2 rounded ${
                            uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={uploading}
                    >
                        {uploading ? 'Creating...' : 'Create Coupon'}
                    </button>
                </div>
            </div>

            <div className="mt-10 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">All Coupons</h2>
                {coupons?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {coupons.map((coupon) => (
                            <div
                                key={coupon.id}
                                className={`p-4 rounded-lg shadow-md ${
                                    coupon.is_active ? 'bg-green-100' : 'bg-red-100'
                                }`}
                            >
                                <h3 className="text-lg font-semibold">{coupon.coupon_code}</h3>
                                <p>Validity: {dayjs(coupon.validity).format('DD-MM-YYYY')}</p>
                                <p>Discount: {coupon.discount_percentage}%</p>
                                <p>Status: {coupon.is_active ? 'Active' : 'Inactive'}</p>

                                <div className="flex items-center mt-4 space-x-4">
                                    <button
                                        onClick={() => handleDeleteCoupon(coupon.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    <select
                                        value={coupon.is_active ? 'true' : 'false'}
                                        onChange={(e) =>
                                            handleStatusChange(coupon.id, e.target.value)
                                        }
                                        className="px-2 py-1 border border-gray-300 rounded"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
                        No coupons found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CouponUploader;
