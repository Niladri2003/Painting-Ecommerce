import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../components/Navbar';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://13.60.65.162:5000/api/v1/user/sign-in', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201 || response.status === 200) {
                alert('Login successful!');
                setFormData({
                    email: '',
                    password: '',
                });
                // Redirect to home or dashboard after successful login
                navigate('/');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className='w-full'>
            <section className="flex justify-center items-center min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                    <h3 className="text-2xl font-bold mb-6 text-center">Sign In</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="block w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300"
                        >
                            Continue
                        </button>
                        <button
                            type="button"
                            className="block w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300 flex justify-center items-center"
                        >
                            <FcGoogle className="w-6 h-6 inline-block mr-2" />
                            <span>Sign in with Google</span>
                        </button>
                    </form>
                    <p className="text-center mt-6 text-gray-700">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/signup')} // Navigate to the signup page on click
                            className="text-orange-600 hover:text-orange-800 cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                    <div className="flex items-center justify-center mt-6">
                        <input type="checkbox" id="terms" className="mr-2" required />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            By continuing, I agree to the{' '}
                            <a href="#" className="text-orange-600 hover:text-orange-800">
                                terms of use
                            </a>{' '}
                            &{' '}
                            <a href="#" className="text-orange-600 hover:text-orange-800">
                                privacy policy
                            </a>
                            .
                        </label>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default SignIn;
