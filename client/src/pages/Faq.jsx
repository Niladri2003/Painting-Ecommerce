import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Faq = () => {
    const [expanded, setExpanded] = useState(null);

    const faqData = [
        {
            question: "Do you provide International delivery?",
            answer:
                "This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.",
        },
        {
            question: "How do I return an item?",
            answer:
                "This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.",
        },
        {
            question: "What is your returns policy?",
            answer:
                "This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.",
        },
        {
            question: "How do I track my order?",
            answer:
                "This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.",
        },
        {
            question: "How can I contact your couriers?",
            answer:
                "This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.",
        },
        {
            question: "What are your delivery options?",
            answer:
                "This is a paragraph. Click to edit and add your own text. Add any information you want to share with users. Change the font, size or scale to get the look you want.",
        },
    ];

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-full">
            <div className="w-full max-w-3xl p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="border-b pb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className="cursor-pointer py-2 text-lg font-medium flex justify-between items-center"
                                onClick={() => toggleExpand(index)}
                            >
                                {faq.question}
                                <motion.span
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: expanded === index ? 90 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    ▶
                                </motion.span>
                            </div>
                            <AnimatePresence>
                                {expanded === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="overflow-hidden text-gray-700"
                                    >
                                        <p className="py-2">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
