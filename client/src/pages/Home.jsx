
import HeroImage from "../assets/Home/3cf42f1fce41c05751aca8476095b529.png";
import HomeHero from "../components/Home/HomeHero.jsx";
import FeatureProducts from "./FeatureProducts.jsx";
import home_bottom from "../assets/Home/home_bottom_img.png";
import { useNavigate } from "react-router-dom";
import art_advisory from "../assets/Home/art_advisory.png";
import cash_on_delivery from "../assets/Home/cash-on-delivery.png";
import return_icon from "../assets/Home/return.png";
import premium from "../assets/Home/premium.png";
import odissa from "../assets/Home/odissa.png";
import FrequentlyAskQuestion from "./FrequentlyAskQuestion.jsx";
import { useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import OverlaySection from "../components/Home/OverlaySection.jsx";
import ParallaxSection from "../components/Home/ParallaxSection.jsx";
import HomeNewsLetter from "../components/Home/HomeNewsLetter.jsx";

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { loading } = useSelector((state) => state.auth);

    const handleClick = () => {
        navigate("/shop"); // Redirect to the shop page
    };

    const handleClick2 = () => {
        navigate("/about"); // Redirect to the shop page
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="w-full overflow-hidden">
            <HomeHero />
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-3">
                <div className=" md:px-6 grid gap-8">
                    <div className="text-start space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Featured Products
                        </h2>
                        <p className="text-muted-foreground md:text-xl">
                            Check out our top-selling products.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10">
                        {/*  */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:py-10">
                            <FeatureProducts />

                        </div>
                        <div className="w-full h-[15rem] md:h-full md:w-3/5  grid place-items-center relative">
                            <img
                                src={HeroImage}
                                alt="Hero"
                                className="w-full h-full rounded-[10px] object-fill "
                            />
                            <div className={"absolute grid place-items-center gap-3"}>
                                <p className={"text-[30px] font-[400] text-center "}>
                                    Write a Title Here. Click to Edit and Add Your Own
                                </p>
                                <button className="bg-black text-white text-lg px-5 py-2">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Section: Features with icons, titles, and descriptions */}
            <section className="w-full py-12 bg-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <img src={cash_on_delivery} alt="Secure" className="w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Confidential and Secure</h3>

                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <img src={cash_on_delivery} alt="Secure" className="w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Confidential and Secure</h3>
                            {/* <p className="text-gray-600">Rest assured knowing that your privacy and data security are our top priorities, ensuring a safe space for your journey.</p> */}
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <img src={cash_on_delivery} alt="Secure" className="w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Confidential and Secure</h3>
                            {/* <p className="text-gray-600">Rest assured knowing that your privacy and data security are our top priorities, ensuring a safe space for your journey.</p> */}
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <img src={art_advisory} alt="Assistance" className="w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Homework Assistance</h3>
                            {/* <p className="text-gray-600">Struggling with a tough assignment? EduBot can provide explanations, hints, and guidance to help you tackle your homework effectively.</p> */}
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <img src={return_icon} alt="Explorations" className="w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Subject Explorations</h3>
                            {/* <p className="text-gray-600">Dive into various subjects, from mathematics and science to literature and history. Discover new topics and broaden your horizons.</p> */}
                        </div>
                    </div>
                </div>
            </section>


            <OverlaySection />


            <ParallaxSection className="mb-10"/>

            <HomeNewsLetter className="mt-10 "/>

            <div className="container mx-auto my-16 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <img
                                src={art_advisory}
                                className="w-full h-auto max-w-[48px] max-h-[48px] "
                                viewBox="0 0 48 48"
                            />
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">
                            Art Advisory
                        </p>
                        <p className="text-xs font-light text-center max-w-md">
                            You can reach us from contact us page to get free art advisory
                            from us.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <img
                                src={cash_on_delivery}
                                className="w-full h-auto max-w-[48px] max-h-[48px] "
                                viewBox="0 0 48 48"
                            />
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">
                            Cash On Delivery
                        </p>
                        <p className="text-xs font-light text-center max-w-md">
                            No problem about online payment we have cash on delivery facility
                            on every product across the country
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <img
                                src={return_icon}
                                className="w-full h-auto max-w-[48px] max-h-[48px] "
                                viewBox="0 0 48 48"
                            />
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">
                            Return Policy
                        </p>
                        <p className="text-xs font-light text-center max-w-md">
                            Read our return policy carefull available on page ..{" "}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <img
                                src={premium}
                                className="w-full h-auto max-w-[48px] max-h-[48px] "
                                viewBox="0 0 48 48"
                            />
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">
                            Premium Quality
                        </p>
                        <p className="text-xs font-light text-center max-w-md">
                            We use premium quality papers , glass , frame so that it gives
                            your wall a premium looks.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
