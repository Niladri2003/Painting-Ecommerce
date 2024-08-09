import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/toast'; 
import { BASEAPI } from '../utils/BASE_API';
import { setToken } from '../slices/authSlice';

const SignIn = () => {
    const dispatch = useDispatch(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const toast = useToast(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for missing fields
        if (!formData.email|| formData.email === " " || !formData.password || formData.password === " ") {
            toast({
                title: "Missing Information",
                description: "Please fill in both email and password fields.",
                status: "warning",
                duration: 2500,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post(`${BASEAPI}/user/sign-in`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            if (response.status === 201 || response.status === 200) {

                const { tokens } = response.data;
                const { access } = tokens;
                dispatch(setToken(access));

                toast({
                    title: "Login successful!",
                    description: "You have successfully logged in.",
                    status: "success",
                    duration: 2500,
                    isClosable: true,
                });
                setFormData({
                    email: '',
                    password: '',
                });
                navigate('/'); 
            } else {
                toast({
                    title: "Login failed",
                    description: "Please check your credentials and try again.",
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "",
                description: "User doesn't exist.",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
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
                            className=" w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300 flex justify-center items-center"
                        >
                            <FcGoogle className="w-6 h-6 inline-block mr-2" />
                            <span>Sign in with Google</span>
                        </button>
                    </form>
                    <p className="text-center mt-6 text-gray-700">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/signup')}
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

        </div>
    );
};

export default SignIn;
