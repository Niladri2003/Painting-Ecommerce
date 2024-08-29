import React from 'react';
import { motion } from 'framer-motion';
import art_advisory from '../../assets/Home/art_advisory.png'; // Replace with actual image path
import cash_on_delivery from '../../assets/Home/cash-on-delivery.png'; // Replace with actual image path
import return_icon from '../../assets/Home/return.png'; // Replace with actual image path
import premium from '../../assets/Home/premium.png'; // Replace with actual image path

const items = [
    {
        img: art_advisory,
        title: 'Art Advisory',
        description: 'You can reach us from contact us page to get free art advisory from us.'
    },
    {
        img: cash_on_delivery,
        title: 'Cash On Delivery',
        description: 'No problem about online payment we have cash on delivery facility on every product across the country.'
    },
    {
        img: return_icon,
        title: 'Return Policy',
        description: 'Read our return policy carefully available on page.'
    },
    {
        img: premium,
        title: 'Premium Quality',
        description: 'We use premium quality papers, glass, frame so that it gives your wall a premium look.'
    },
];

const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ArtAdvisorySection = () => {
    return (
        <div className="container mx-auto my-16 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col gap-4 items-center p-6 border rounded-lg shadow-lg bg-white transition-transform duration-300 ease-in-out"
                        initial="hidden"
                        animate="visible"
                        variants={animationVariants}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-16 h-16 flex items-center justify-center mb-4">
                            <motion.img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-contain"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">
                            {item.title}
                        </p>
                        <p className="text-xs font-light text-center max-w-md">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ArtAdvisorySection;
