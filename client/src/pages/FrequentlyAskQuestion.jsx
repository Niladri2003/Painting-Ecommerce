import React, { useState } from 'react';

const FrequentlyAskQuestion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What types of paintings do you offer?",
            answer: "We offer a wide range of paintings, including contemporary, abstract, landscape, portrait, and more. Our collection features both framed and unframed options to suit your style.",
        },
        {
            question: "Are the paintings original or prints?",
            answer: "We provide both original artworks created by talented artists and high-quality prints of famous paintings. Each product description clearly states whether it is an original or a print.",
        },
        {
            question: "Can I request a custom painting?",
            answer: "Yes, we do accept custom painting requests. You can contact us with your requirements, and our artists will work with you to create a unique piece tailored to your specifications.",
        },
        {
            question: "What is the estimated delivery time?",
            answer: "Delivery times vary depending on your location and the type of painting you ordered. Typically, it takes 5-10 business days for framed artworks and 7-14 business days for custom paintings. You will receive a tracking number once your order is shipped.",
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping. Shipping costs and delivery times will vary based on your location. Please contact us for a quote and more information on international shipping policies.",
        },
        {
            question: "What is your return policy?",
            answer: (
                <p>
                    Please refer to our <a href="/return-policy" className="text-blue-500 underline">Return Policy</a> page for detailed information on returns and replacements. Generally, items must be unused and in original condition to be eligible for a return. Custom and framed artworks may have different return policies.
                </p>
            ),
        }
    ];

    return (
        <div className="px-4 py-8 md:px-8 lg:px-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-300 rounded-md shadow-md">
                        <button 
                            className="w-full text-left px-4 py-2 flex items-center justify-between bg-gray-100 hover:bg-gray-200 focus:outline-none"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="font-semibold text-lg">{faq.question}</span>
                            <span className="text-xl">{activeIndex === index ? '-' : '+'}</span>
                        </button>
                        {activeIndex === index && (
                            <div className="px-4 py-2 text-sm text-gray-700">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FrequentlyAskQuestion;
