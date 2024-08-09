import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast'; // Import useToast from Chakra UI
import Footer from '../components/footer/Footer';
import axios from 'axios'; // Import axios for making HTTP requests
import { FcGoogle } from "react-icons/fc";
import { BASEAPI } from '../utils/BASE_API';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        //name: '',
        email: '',
        password: '',
        user_role: 'user' 
    });

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

        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedPassword = formData.password.trim();

        // Basic validation for missing fields and spaces-only input
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            toast({
                title: "Invalid Information",
                description: "Please provide valid name, email, and password.",
                status: "warning",
                duration: 2500,
                isClosable: true,
            });
            return;
        }

        // Password validation: at least 6 characters long and contains at least one digit
        const passwordRegex = /^(?=.*\d).{6,}$/;
        if (!passwordRegex.test(trimmedPassword)) {
            toast({
                title: "Invalid Password",
                description: "Password must be at least 6 characters long and contain at least one digit.",
                status: "warning",
                duration: 2500,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post(`${BASEAPI}/user/register`, {
                name: trimmedName,
                email: trimmedEmail,
                password: trimmedPassword,
                user_role: formData.user_role,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201 || response.status === 200) {
                toast({
                    title: "Registration successful!",
                    description: "You have successfully registered.",
                    status: "success",
                    duration: 2500,
                    isClosable: true,
                });
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    user_role: 'user'
                });
            } else {
                toast({
                    title: "Registration failed",
                    description: "Please try again later.",
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "An error occurred",
                description: "Something went wrong during the registration process.",
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
                    <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
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
                        {/* Hidden role input */}
                        <input
                            type="hidden"
                            name="user_role"
                            value={formData.user_role}
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
                        Already have an account?{' '}
                        <Link to="/signin" className="text-orange-600 hover:text-orange-800">
                            Login
                        </Link>
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

export default SignUp;
