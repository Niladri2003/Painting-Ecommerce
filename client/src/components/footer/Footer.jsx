import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Footer/logo_white.png"; // Import the logo image
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("..../newsletter", { email });
      console.log("Response:", response.data);
      setEmail("");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full">
      <footer className="bg-black text-white py-8 px-2">
        <div className="container mx-auto flex flex-wrap justify-between px-4 md:flex-col gap-5">
          <div className="w-full md:w-1/3 lg:w-1/5 mb-4 md:mb-0 flex justify-start md:justify-start">
            <img
              src={logo}
              alt="Trivart Logo"
              className="  h-7 md:h-10 md:w-4/5 lg:w-[50%] "
            />
          </div>
          {/* start */}
          <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="w-full md:w-1/3 flex">

          <div className="w-full mb-4 md:mb-0 justify-start">
            <h4 className="font-semibold mb-2">Location</h4>
            <address className="not-italic">
              Salt Lake <br />
              Sector V, 700001
              <br />
              1800 564 234
              <br />
              <a
                href="mailto:info@mysite.com"
                className="text-gray-400 hover:text-white"
              >
                info@mysite.com
              </a>
            </address>
          </div>
          <div className="w-1/2 mb-4 md:mb-0 justify-center">
            <h4 className="font-semibold mb-2">Menu</h4>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={scrollTop}
                  className="text-gray-400 hover:text-white"
                  >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={scrollTop}
                  className="text-gray-400 hover:text-white"
                  >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollTop}
                  className="text-gray-400 hover:text-white"
                  >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={scrollTop}
                  className="text-gray-400 hover:text-white"
                  >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
                  </div>
          {/* end */}
          {/* start */}
          <div className="w-full md:w-1/3 flex">

          <div className="w-full mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Policy</h4>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Store Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="w-1/2  mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Social</h4>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com"
                  className="text-gray-400 hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  className="text-gray-400 hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          </div>
          {/* end */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Join Our Newsletter</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                value={email}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full p-2 rounded bg-white text-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">
          © 2024 by Trivart. Culture on Your Walls.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
