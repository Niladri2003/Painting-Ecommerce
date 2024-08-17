import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react'; // Import useToast from Chakra UI
import axios from 'axios'; // Import axios for making HTTP requests
import { FcGoogle } from "react-icons/fc";
import { BASEAPI } from '../utils/BASE_API';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_role: 'user'
    });

    const toast = useToast();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { first_name, last_name, email, password } = formData;

        if (!first_name.trim() || !last_name.trim() || !email.trim() || !password.trim()) {
            toast({
                title: "Invalid Information",
                description: "Please provide valid first name, last name, email, and password.",
                status: "warning",
                duration: 2500,
                isClosable: true,
            });
            return;
        }

        const passwordRegex = /^(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
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
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                email: email.trim(),
                password: password.trim(),
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
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    user_role: 'user'
                });
                navigate('/signin'); // Redirect to the sign-in page
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

    
    const handleGoogleLogin = () => {
        // Redirect to your backend's Google OAuth login endpoint
        window.location.href = `${BASEAPI}/user/google/login`;
    };

    return (
        <div className='w-full'>
            <section className="flex justify-center items-center sm:py-4 lg:py-16">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                    <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            value={formData.last_name}
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
                            onClick={handleGoogleLogin}
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
                    {/* <div className="flex items-center justify-center mt-6">
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
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default SignUp;
