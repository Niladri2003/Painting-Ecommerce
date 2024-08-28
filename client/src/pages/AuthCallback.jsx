import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { setCartId, setTotalItems } from "../slices/cartSlice";
import { BASEAPI } from "../utils/BASE_API";
import Loader from "../components/Loader";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASEAPI}/user/get-tokens`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        console.log("Response:", response);

        if (response.status === 200) {
          const { access_token, refresh_token, cart_id, user_details } =
            response.data;

          const user = {
            ...user_details,
            profile_picture:
              user_details.profile_picture ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user_details.first_name} ${user_details.last_name}`,
          };

          // Dispatch to redux store if needed
          dispatch(setToken(access_token));
          dispatch(setRefreshToken(refresh_token));
          dispatch(setUser(user));
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

          toast({
            title: "Login successful!",
            status: "success",
            duration: 2500,
            isClosable: true,
          });

          // Redirect to home or dashboard
          navigate("/");
        } else {
          toast({
            title: "Login failed",
            description: "Unable to fetch tokens.",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        toast({
          title: "Error",
          description: "Failed to fetch tokens.",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
        navigate("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [navigate, dispatch, toast]);

  return isLoading ? <Loader /> : null;
};

export default AuthCallback;
