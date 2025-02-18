
import aboutImage from '../assets/about-us/side_img.jpg';
import HomeHero from '../components/Home/HomeHero';
import philosophyImage from "../assets/about-us/bottom_img.jpg"
import { FaRegHandshake } from 'react-icons/fa6';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import { motion } from 'framer-motion';


const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <HomeHero title='About Us' showShopNowButton={false} />
      <motion.div
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
      >
        <motion.h1
            className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-rose-600 text-transparent bg-clip-text"
            {...fadeIn}
        >
          About Our Gallery
        </motion.h1>

        <motion.p
            className="text-xl text-gray-600 text-center max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
        >
          Discover a world where creativity knows no bounds. We curate exceptional artworks
          from emerging and established artists worldwide.
        </motion.p>
      </motion.div>
      <div className="flex flex-col md:flex-row items-center justify-between flex-grow p-8 max-w-screen-xl mx-auto gap-10">

        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
              src={"https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Cultural Art"
              className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">

          {/* About Section */}
          <section className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">About Trivart</h2>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-blue-600">Trivart</span> is your premier destination for exquisite paintings that celebrate the **rich cultural heritage** of India.
              Based in **Talapatra, Kuchipuri, Odisha**, Trivart is more than just an art gallery—it's a tribute to the **timeless traditions** and artistic expressions of our region.
            </p>
          </section>

          {/* Collection Section */}
          <section className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Our Collection</h2>
            <p className="text-gray-700 leading-relaxed">
              We specialize in **showcasing an array of traditional Indian paintings**, focusing on the vibrant and intricate styles native to **Odisha**.
              From the delicate strokes of **Pattachitra** to the soulful depictions in **tribal and folk art**, our collection takes you on a journey through the artistic spirit of India.
            </p>
          </section>

          {/* Mission Section */}
          <section className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At <span className="font-semibold text-blue-600">Trivart</span>, we are passionate about **preserving and promoting** these cultural art forms. We offer art lovers and collectors the opportunity to bring a piece of **India’s rich artistic legacy** into their homes.
              Join us in celebrating the **beauty of tradition through art.**
            </p>
          </section>

        </div>
      </div>


      <section className="relative w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
              src={philosophyImage}
              alt="Philosophy Background"
              className="w-full h-full object-cover brightness-50"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex justify-center items-center min-h-screen px-6 py-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg text-white p-8 md:p-14 max-w-3xl">

            {/* Section Title */}
            <h2 className="text-center text-3xl md:text-5xl font-bold mb-6 tracking-wide">
              Our Philosophy
            </h2>

            {/* Philosophy Text */}
            <p className="text-lg md:text-xl mb-5 leading-relaxed">
              At <span className="font-semibold text-yellow-300">Trivart</span>, we believe that art is not just a visual experience but a profound connection to culture, history, and emotion. Our mission is to preserve and promote the rich artistic heritage of India, bringing traditional and cultural art forms to the forefront of modern appreciation.
            </p>

            <p className="text-lg md:text-xl mb-5 leading-relaxed">
              Every painting tells a story—a narrative that captures the essence of the artist’s heritage and the culture they represent. By curating a collection that honors the past while resonating with contemporary art lovers, we strive to bridge generations through art.
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              Integrity, quality, and cultural preservation lie at the heart of <span className="font-semibold text-yellow-300">Trivart</span>. We believe in the power of art to transcend boundaries, inspire creativity, and enrich lives—making it accessible to all who seek its deeper meaning.
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


    </div>
  );
};

export default AboutUs;
