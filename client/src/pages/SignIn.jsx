import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import { BASEAPI } from "../utils/BASE_API";
import { setLoading, setRefreshToken, setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { setCartId, setTotalItems } from "../slices/cartSlice";
import { apiConnector } from "../services/apiConnector.jsx";

const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in both email and password fields.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        `/user/sign-in`,
        formData,
        { "Content-Type": "application/json" },
        null,
        false
      );
      // console.log('Response:', response);

      if (response.status === 201 || response.status === 200) {
        const { tokens } = response.data;
        const refreshToken = tokens.refreshToken;
        console.log(refreshToken);

        const { access, cart_id } = tokens;
        console.log("cart_id:", cart_id);

        tokens.user_details.password_hash = null;

        const user = {
          ...tokens.user_details,
          profile_picture: `https://api.dicebear.com/5.x/initials/svg?seed=${tokens.user_details.first_name} ${tokens.user_details.last_name}`,
        };
        dispatch(setUser(user));
        dispatch(setToken(access));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setCartId(cart_id));

        const { data } = await apiConnector(
          "GET",
          "/get-cart",
          null,
          null,
          null,
          true
        );
        const totalItems = data?.cart?.items?.length || 0;
        dispatch(setTotalItems(totalItems));

        // Restore cart from localStorage after login
        // const savedCart = localStorage.getItem("cart");
        // const savedTotal = localStorage.getItem("total");
        // const savedTotalItems = localStorage.getItem("totalItems");

        // if (savedCart && savedTotal && savedTotalItems) {
        //     dispatch(restoreCart({
        //         cart: JSON.parse(savedCart),
        //         total: JSON.parse(savedTotal),
        //         totalItems: JSON.parse(savedTotalItems),
        //     }));
        // }

        toast({
          title: "Login successful!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
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
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.response.data.msg,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally{
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to your backend's Google OAuth login endpoint
    window.location.href = `${BASEAPI}/user/google/login`;
  };

  return (
    <div className="w-full">
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
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-6 h-6 inline-block mr-2" />
              <span>Sign in with Google</span>
            </button>
          </form>
          <p className="text-center mt-6 text-gray-700">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-600 hover:text-orange-800 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
