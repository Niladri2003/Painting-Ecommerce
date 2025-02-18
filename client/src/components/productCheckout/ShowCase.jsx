import React from 'react';
import guideOne from "../../assets/Sub-category-Of-Painting/guide-3.jpeg";
import guideTwo from "../../assets/Sub-category-Of-Painting/guide-1.jpeg";
import guideThree from "../../assets/Sub-category-Of-Painting/guide-2.jpeg";

const ShowCase = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
            {/* Showcase Items */}
            {[
                { img: guideOne, title: "Frame", subtitle: "Premium Quality Frames for Premium Art", description: "Best for Madhubani Paintings and Art Prints as they're much more durable and have a matte finish. Available Frame Colors: Black, White, Natural Wood, and Gold." },
                { img: guideTwo, title: "Canvas Gallery Wrap", subtitle: "Stretched Canvas for Classic Look", description: "Museum Canvas Print is stretched on a wooden frame in such a way that it wraps around the sides of the stretcher. The sides of the canvas are prepared with white as a natural white canvas for illustrations, pop-art." },
                { img: guideThree, title: "Only Print", subtitle: "Rolled and Shipped inside a Safe Packaging Art Tube", description: "When you want to get a specific custom framing for your Paintings or Art Prints that is not available on our website. Then you can buy Only Print as it comes unframed and rolled inside our Art Tubes." }
            ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105">
                    <img src={item.img} alt={item.title} className="w-full h-64 object-cover rounded-md mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-md font-medium text-gray-700 mb-2">{item.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ShowCase;
