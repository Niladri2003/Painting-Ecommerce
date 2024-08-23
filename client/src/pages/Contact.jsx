import React, { useState, useEffect } from 'react';
import HomeHero from '../components/Home/HomeHero';
import girl from "../assets/Contact/girl.jpg";
import AOS from 'aos';
import { useToast } from '@chakra-ui/react';  
import 'aos/dist/aos.css';
import {apiConnector} from "../services/apiConnector.jsx";  // Import AOS styles

export default function Contact() {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,  // Duration of the animation
            easing: 'ease-in-out',  // Easing function for animation
            once: false,  // Whether animation should happen only once
        });
    }, []);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const toast = useToast();  // Initialize Chakra UI's useToast hook

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
 
            const response=await apiConnector('POST','/contact-us',formData,null,null,false)
            if (response.status === 200) {
                // Display success toast
                toast({
                    title: "Message sent successfully.",
                    description: "We have received your message and will get back to you soon.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Clear the form fields
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                alert('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div>
            <HomeHero title='Contact Us' showShopNowButton={false} />
            <div className="flex flex-col md:flex-row justify-between p-6 max-w-screen-xl mx-auto">
                {/* Left Section: Contact Form */}
                <div className="w-full md:w-1/3 p-4" data-aos="fade-right">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
                            <input type="text" id="first_name" name="first_name" className="mt-1 p-2 w-full border rounded" value={formData.first_name} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
                            <input type="text" id="last_name" name="last_name" className="mt-1 p-2 w-full border rounded" value={formData.last_name} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                            <input type="text" id="phone" name="phone" className="mt-1 p-2 w-full border rounded" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                            <input type="text" id="subject" name="subject" className="mt-1 p-2 w-full border rounded" value={formData.subject} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium">Message</label>
                            <textarea id="message" name="message" className="mt-1 p-2 w-full border rounded" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                    </form>
                </div>

                {/* Middle Section: Company Location and Hours */}
                <div className="w-full md:w-1/3 p-4" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold mb-4">Our Location & Hours</h2>
                    <p className="mb-2"><strong>Address:</strong> 123 Main St, Anytown, USA</p>
                    <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Business Hours</h3>
                    <p className="mb-1"><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
                    <p className="mb-1"><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                </div>

                {/* Right Section: Image */}
                <div className="relative w-full md:w-1/3 p-4" data-aos="fade-left">
                    <div className="relative w-full">
                        <img src={girl} alt="Contact Us" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
