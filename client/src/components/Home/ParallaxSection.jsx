// import React from 'react';
// import parallax_img from '../../assets/Home/parallax_img.png'; // Replace with actual image path
// import './ParallaxSection.css'; // For custom styles if needed

// const ParallaxSection = () => {
//     return (
//         <div className="relative w-full h-screen overflow-hidden bg-white">
//             {/* Background Text and Button */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black z-10 p-4">
//                 <div className="relative">
//                     <h1 className="text-2xl lg:text-4xl font-bold mb-4">Discover Our Collection</h1>
//                     <button className="bg-black text-white text-sm px-4 py-2 md:px-6 md:py-3 rounded shadow-lg">Shop</button>
//                 </div>
//             </div>

//             {/* Parallax Effect */}
//             <div className="relative w-full h-full flex items-center justify-center">
//                 {/* Left Side Images */}
//                 <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 md:space-y-6">
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Left Image 1"
//                         className="w-[200px] h-[400px] md:w-[300px] md:h-[500px] flex-shrink-0"
//                     />
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Left Image 2"
//                         className="w-[200px] h-[400px] md:w-[300px] md:h-[500px] flex-shrink-0"
//                     />
//                 </div>

//                 {/* Right Side Images */}
//                 <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 md:space-y-6">
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Right Image 1"
//                         className="w-[200px] h-[400px] md:w-[300px] md:h-[500px] flex-shrink-0"
//                     />
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Right Image 2"
//                         className="w-[200px] h-[400px] md:w-[300px] md:h-[500px] flex-shrink-0"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ParallaxSection;


import React from 'react';
import parallax_img from '../../assets/Home/parallax_img.png'; // Replace with actual image path

const ParallaxSection = () => {
    return (
        <div className="relative w-full h-[80.5rem] bg-white">
            {/* Background Text and Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black  p-4 ">
                <div className="relative">
                    <h1 className="text-2xl lg:text-4xl font-medium">Discover Our Collection</h1>
                    <button className="bg-black text-white text-sm px-4 py-2 md:px-6 md:py-3 rounded shadow-lg md:mt-5">Shop</button>
                </div>
            </div>

            {/* Parallax Effect */}
            <div className="relative w-[full] h-full flex flex-col items-center justify-center">
                {/* Left Side Images */}
                <div className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
                    <img
                        src={parallax_img} // Replace with actual image path
                        alt="Left Image 1"
                        className="w-[30rem] h-auto flex-shrink-0"
                    />
                    <img
                        src={parallax_img} // Replace with actual image path
                        alt="Left Image 2"
                        className="w-[30rem] h-auto flex-shrink-0"
                    />
                </div>

                {/* Right Side Images */}
                <div className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
                    <img
                        src={parallax_img} // Replace with actual image path
                        alt="Right Image 1"
                        className="w-[30rem] h-auto flex-shrink-0"
                    />
                    <img
                        src={parallax_img} // Replace with actual image path w-[600px] h-[791.19px]
                        alt="Right Image 2"
                        className="w-[30rem] h-auto flex-shrink-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default ParallaxSection;
