// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between px-4">
        <div className="w-full md:w-1/6 mb-4 md:mb-0">
          <h2 className="text-xl font-bold">LOGO</h2>
        </div>
        <div className="w-full md:w-1/6 mb-4 md:mb-0">
          <h4 className="font-semibold mb-2">Location</h4>
          <address className="not-italic">
            Salt Lake <br />
            sectore v, 700001<br />
            1800 564 234<br />
            <a href="mailto:info@mysite.com" className="text-gray-400 hover:text-white">info@mysite.com</a>
          </address>
        </div>
        <div className="w-full md:w-1/6 mb-4 md:mb-0">
          <h4 className="font-semibold mb-2">Menu</h4>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/6 mb-4 md:mb-0">
          <h4 className="font-semibold mb-2">Policy</h4>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Store Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/6 mb-4 md:mb-0">
          <h4 className="font-semibold mb-2">Social</h4>
          <ul>
            <li><a href="www.facebook.com" className="text-gray-400 hover:text-white">Facebook</a></li>
            <li><a href="www.instagram.com" className="text-gray-400 hover:text-white">Instagram</a></li>
            <li><a href="www.xhandle.com" className="text-gray-400 hover:text-white">Twitter</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/6 mb-4 md:mb-0">
          <h4 className="font-semibold mb-2">Join Our Newsletter</h4>
          <form>
            <input type="email" placeholder="Email Address" className="w-full p-2 mb-2 rounded bg-gray-700 text-white" required />
            <button type="submit" className="w-full p-2 rounded bg-white text-gray-800">Submit</button>
          </form>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-8 text-sm">© 2024 by Brand Name. Created on Editor X.</p>
    </footer>
  );
};

export default Footer;
