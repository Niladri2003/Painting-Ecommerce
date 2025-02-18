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

// import React from 'react';
// import parallax_img from '../../assets/Home/parallax_img.png'; // Replace with actual image path

// const ParallaxSection = () => {
//     return (
//         <div className="relative w-full h-[80.5rem] bg-white">
//             {/* Background Text and Button */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black  p-4 ">
//                 <div className="relative">
//                     <h1 className="text-2xl lg:text-4xl font-medium">Discover Our Collection</h1>
//                     <button className="bg-black text-white text-sm px-4 py-2 md:px-6 md:py-3 rounded shadow-lg md:mt-5">Shop</button>
//                 </div>
//             </div>

//             {/* Parallax Effect */}
//             <div className="relative w-[full] h-full flex flex-col items-center justify-center">
//                 {/* Left Side Images */}
//                 <div className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Left Image 1"
//                         className="w-[30rem] h-auto flex-shrink-0"
//                     />
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Left Image 2"
//                         className="w-[30rem] h-auto flex-shrink-0"
//                     />
//                 </div>

//                 {/* Right Side Images */}
//                 <div className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
//                     <img
//                         src={parallax_img} // Replace with actual image path
//                         alt="Right Image 1"
//                         className="w-[30rem] h-auto flex-shrink-0"
//                     />
//                     <img
//                         src={parallax_img} // Replace with actual image path w-[600px] h-[791.19px]
//                         alt="Right Image 2"
//                         className="w-[30rem] h-auto flex-shrink-0"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ParallaxSection;
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import parallax_img from "../../assets/Home/parallax_img.png"; // Replace with actual image path

const ParallaxSection = () => {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controlsLeft.start({ x: 0, opacity: 1, transition: { duration: 1 } });
      controlsRight.start({ x: 0, opacity: 1, transition: { duration: 1 } });
    }
  }, [controlsLeft, controlsRight, inView]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[40rem] md:h-[80.5rem] bg-white flex items-center justify-center"
    >
      {/* Background Text and Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black p-4 z-10">
        <div className="relative">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Discover Our Collection
          </h1>
          <button className="bg-black text-white text-sm px-4 py-2 md:px-6 md:py-3 rounded shadow-lg md:mt-5">
            Shop
          </button>
        </div>
      </div>

      {/* Parallax Effect */}
      <div className="relative w-full h-full flex items-center  justify-evenly px-4">
        {/* Left Side Images */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={controlsLeft}
          className="flex flex-col items-center space-y-20 md:space-y-32"
        >
          <motion.img
            src={"https://images.unsplash.com/photo-1594136976553-38699ae9047c?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} // Replace with actual image path
            alt="Left Image 1"
            className="w-[10.5rem] md:w-[20rem] lg:w-[23rem] h-auto flex-shrink-0 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
          />
          <motion.img
            src={"https://images.unsplash.com/photo-1584446922442-7ac6b8c118f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHBhaW50aW5nfGVufDB8fDB8fHww"} // Replace with actual image path
            alt="Left Image 2"
            className="w-[10.5rem] md:w-[20rem] lg:w-[23rem] h-auto flex-shrink-0 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
          />
        </motion.div>

        {/* Right Side Images */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={controlsRight}
          className="flex flex-col items-center space-y-20 md:space-y-32 "
        >
          <motion.img
            src={"https://images.unsplash.com/photo-1599503613556-0f18b122d281?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHBhaW50aW5nfGVufDB8fDB8fHww"} // Replace with actual image path
            alt="Right Image 1"
            className="w-[10.5rem] md:w-[20rem] lg:w-[23rem] h-auto flex-shrink-0 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
          />
          <motion.img
            src={"https://images.unsplash.com/photo-1579783901467-31b604eac7a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D"} // Replace with actual image path
            alt="Right Image 2"
            className="w-[10.5rem] md:w-[20rem] lg:w-[23rem] h-auto flex-shrink-0 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;
