import React from 'react';
import newsletterImg from "../../assets/Home/newsletter_img.png";

const NewsletterSection = () => {
    return (
        <div className="relative w-full flex justify-center items-center overflow-hidden mt-[10rem]">
            {/* Images Container */}
            <div className="flex w-full lg:w-2/3 flex-wrap justify-center lg:justify-between"> {/* Adjusted for responsive behavior */}
                <img
                    src={newsletterImg}
                    alt="Newsletter Background Left"
                    className="h-auto w-1/2 lg:w-1/2"
                />
                <img
                    src={newsletterImg}
                    alt="Newsletter Background Right"
                    className="h-auto w-1/2 lg:w-1/2"
                />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-end justify-center z-10 p-4">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl bg-white bg-opacity-75 p-6 rounded-md shadow-lg">
                    {/* Left Side Text */}
                    <div className="text-center lg:text-left mb-4 lg:mb-0 lg:mr-4 w-full lg:w-1/3">
                        <h2 className="text-xl md:text-2xl font-bold">Join Our Newsletter</h2>
                        <p className="text-sm md:text-base">This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.</p>
                    </div>

                    {/* Right Side Form */}
                    <form className="flex flex-col items-center w-full lg:w-2/3 space-y-2">
                    <label htmlFor="email" className='text-md font-medium w-full'>Email Address *</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="p-3 w-full bg-black text-white rounded-md hover:bg-gray-800"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;
