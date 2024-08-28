import React from 'react';
import smallImage1 from '../../assets/Home/overlay_img_1.png';
import largeImage from '../../assets/Home/base_img.png';

const OverlaySection = () => {
    return (
        <div className="flex flex-col md:flex-row w-full items-center justify-center my-10 px-4 md:px-10 lg:px-20">
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <img
                    src={largeImage}
                    alt="Large"
                    className="w-full h-full object-fit flex-shrink-0"
                />
                <img
                    src={smallImage1}
                    alt="Small 1"
                    className="absolute top-5 -left-8 w-40 h-56 sm:w-24 sm:h-32 md:w-28 md:h-36 lg:w-32 lg:h-40 object-cover border-2 border-white shadow-md"
                />
                <img
                    src={smallImage1}
                    alt="Small 2"
                    className="absolute bottom-4 right-4 w-40 h-56 sm:w-24 sm:h-32 md:w-28 md:h-36 lg:w-32 lg:h-40 object-cover border-2 border-white shadow-md"
                />
            </div>
            <div className="mt-6 md:mt-0 md:ml-10 w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-sm mb-4 text-justify ">
                    This is a paragraph. Click to edit and add your own text. Add any information you want to share. You can use this space to tell users a story about the company or describe a special service it offers. Change the font, size or scale to get the look you want.
                </p>
                <button className="bg-black text-white text-sm px-4 py-2 rounded">Learn More</button>
            </div>
        </div>
    );
};

export default OverlaySection;
