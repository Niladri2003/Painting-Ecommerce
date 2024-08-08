import React, { useState } from 'react';
import axios from 'axios';
import HomeHero from '../components/Home/HomeHero';
import contactImg from "../assets/Contact/contactImg1.jpg";
import overlyImg from "../assets/Contact/overlyImg.jpg";
import Footer from '../components/footer/Footer';

export default function Contact() {
    // Update state keys to snake_case to match the backend's expected JSON structure
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

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
            const response = await axios.post('http://13.60.65.162:5000/api/v1/contact-us', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Message sent successfully');
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
                <div className="w-full md:w-1/3 p-4">
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
                <div className="w-full md:w-1/3 p-4">
                    <h2 className="text-2xl font-semibold mb-4">Our Location & Hours</h2>
                    <p className="mb-2"><strong>Address:</strong> 123 Main St, Anytown, USA</p>
                    <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Business Hours</h3>
                    <p className="mb-1"><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
                    <p className="mb-1"><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                </div>

                {/* Right Section: Image */}
                <div className="relative w-full md:w-1/3 p-4">
                    <div className="relative w-full">
                        <img src={contactImg} alt="Contact Us" className="w-full h-auto rounded-lg" />
                        <img src={overlyImg} alt="Overlay" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-30 h-40 bg-transparent" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}