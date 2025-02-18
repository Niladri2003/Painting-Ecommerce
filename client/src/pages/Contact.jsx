import React, { useState, useEffect } from "react";
import HomeHero from "../components/Home/HomeHero";
import girl from "../assets/Contact/contact-us.png";
import AOS from "aos";
import { useToast } from "@chakra-ui/react";
import "aos/dist/aos.css";
import { apiConnector } from "../services/apiConnector.jsx";

export default function Contact() {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-in-out", once: false });
    }, []);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const toast = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiConnector("POST", "/contact-us", formData, null, null, false);
            if (response.status === 200) {
                toast({
                    title: "Message sent successfully.",
                    description: "We have received your message and will get back to you soon.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            } else {
                alert("Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred");
        }
    };

    return (
        <div className="w-full">
            <HomeHero title="Contact Us" showShopNowButton={false} />

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 p-6 max-w-7xl mx-auto font-Poppins">
                {/* Left Section - Contact Form */}
                <div className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white shadow-lg rounded-lg" data-aos="fade-right">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Get in Touch</h2>
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "First Name", name: "first_name", type: "text" },
                            { label: "Last Name", name: "last_name", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone", name: "phone", type: "text" },
                            { label: "Subject", name: "subject", type: "text" },
                        ].map((field, index) => (
                            <div key={index} className="mb-4">
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition"
                                />
                            </div>
                        ))}

                        {/* Message Input */}
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="mt-1 p-3 w-full border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-black focus:border-black transition"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-black text-white w-full py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Middle Section - Location & Hours */}
                <div className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white shadow-lg rounded-lg" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Location & Hours</h2>
                    <p className="mb-2"><strong>📍 Address:</strong> 123 Main St, Anytown, USA</p>
                    <p className="mb-2"><strong>📞 Phone:</strong> (123) 456-7890</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">Business Hours</h3>
                    <p className="mb-1"><strong>🕒 Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
                    <p className="mb-1"><strong>🕒 Saturday:</strong> 10:00 AM - 4:00 PM</p>
                    <p className="text-red-600"><strong>🛑 Sunday:</strong> Closed</p>
                </div>

                {/* Right Section - Image */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center items-center" data-aos="fade-left">
                    <img src={girl} alt="Contact Us" className="w-full h-auto max-w-sm rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
}
