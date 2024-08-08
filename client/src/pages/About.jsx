import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer/Footer';
import aboutImage from '../assets/about-us/side_img.jpg';
import HomeHero from '../components/Home/HomeHero';
import philosophyImage from "../assets/about-us/bottom_img.jpg"
import { FaRegHandshake } from 'react-icons/fa6';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';


const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeHero title='About Us' showShopNowButton={false} />

      <div className="flex flex-col md:flex-row items-center justify-center flex-grow p-6 max-w-screen-xl mx-auto">
        {/* Image Section */}

        <div className="w-full md:w-1/2 p-4">
          <img
            src={aboutImage}
            alt="Cultural Art"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 p-4 text-center md:text-left">


          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">About Trivart</h2>
            <p className="text-gray-700">
              Trivart is your premier destination for exquisite paintings that celebrate the rich cultural heritage of India. Based in Talapatra, Kuchipuri, Odisha, Trivart is more than just an art gallery—it's a tribute to the timeless traditions and artistic expressions of our region.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Our Collection</h2>
            <p className="text-gray-700">
              We specialize in showcasing an array of traditional Indian paintings, with a focus on the vibrant and intricate styles native to Odisha. From the delicate strokes of Pattachitra to the soulful depictions in tribal and folk art, our collection is a curated journey through the artistic spirit of India.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-700">
              At Trivart, we are passionate about preserving and promoting these cultural art forms, offering art lovers and collectors the opportunity to bring a piece of India’s rich artistic legacy into their homes. Join us in celebrating the beauty of tradition through art.
            </p>
          </section>
        </div>
      </div>

      <section className="relative w-full">
        <div className="absolute inset-0">
          <img
            src={philosophyImage}
            alt="Philosophy Background"
            className="w-full p-10 h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent opacity-50"></div> {/* Dark overlay for better text readability */}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto p-6 md:p-16 flex justify-center items-center">
          <div className="bg-  bg-opacity-90 p-6 md:p-12 rounded-lg shadow-lg text-white">
            <div className="text-3xl md:text-4xl font-bold mb-4 flex justify-center">Our Philosophy</div>
            <p className="text-lg md:text-xl mb-4">
              At Trivart, we believe that art is not just a visual experience but a profound connection to culture, history, and emotion. Our mission is to preserve and promote the rich artistic heritage of India, bringing traditional and cultural art forms to the forefront of modern appreciation.
            </p>
            <p className="text-lg md:text-xl mb-4">
              We view each painting not merely as a product but as a story—a narrative that captures the essence of the artists' heritage and the culture they represent. By curating a collection that honors the past while resonating with contemporary art lovers, we strive to create a bridge between generations.
            </p>
            <p className="text-lg md:text-xl">
              At the heart of Trivart is a commitment to integrity, quality, and cultural preservation. We believe in the power of art to transcend boundaries, inspire creativity, and enrich lives, making it accessible to everyone who seeks to connect with the deeper meanings behind each brushstroke.
            </p>
          </div>
        </div>
      </section>

      <div className="p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {/* Trust Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FaRegHandshake className="text-4xl text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Trust</h2>
              <p className="text-gray-600">
                Building reliable and honest relationships with our customers to ensure confidence in every purchase.
              </p>
            </div>

            {/* Safe Delivery Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <AiFillSafetyCertificate className="text-4xl text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Safe Delivery</h2>
              <p className="text-gray-600">
                Ensuring your art reaches you in perfect condition with secure packaging and reliable delivery services.
              </p>
            </div>

            {/* Fast Delivery Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <TbTruckDelivery className="text-4xl text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Fast Delivery</h2>
              <p className="text-gray-600">
                Speedy delivery to get your art to you as quickly as possible without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
