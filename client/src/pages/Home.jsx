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
              {/* <div className="relative overflow-hidden rounded-lg group border">
                              <Link to="#" className="absolute inset-0 z-10">
                                  <span className="sr-only">View Product</span>
                              </Link>
                              <img
                                  src={CardImg}
                                  width={400}
                                  height={300}
                                  alt="Product 1"
                                  className="object-cover w-[300px] h-[400px] group-hover:opacity-50 transition-opacity"
                              />
                              <div className="p-4 bg-background">
                                  <h3 className="text-lg font-semibold">Stylish Sunglasses</h3>
                                  <p className="text-sm text-muted-foreground">UV protection</p>
                                  <h4 className="text-base font-semibold">$29.99</h4>
                              </div>
                          </div>

                          <div className="relative overflow-hidden rounded-lg group">
                              <Link to="#" className="absolute inset-0 z-10">
                                  <span className="sr-only">View Product</span>
                              </Link>
                              <img
                                  src={CardImg}
                                  width={400}
                                  height={300}
                                  alt="Product 2"
                                  className="object-cover w-[300px] h-[400px] group-hover:opacity-50 transition-opacity"
                              />
                              <div className="p-4 bg-background">
                                  <h3 className="text-lg font-semibold">Leather Crossbody Bag</h3>
                                  <p className="text-sm text-muted-foreground">Stylish and practical</p>
                                  <h4 className="text-base font-semibold">$49.99</h4>
                              </div>
                          </div>


                          <div className="relative overflow-hidden rounded-lg group">
                              <Link to="#" className="absolute inset-0 z-10">
                                  <span className="sr-only">View Product</span>
                              </Link>
                              <img
                                  src={CardImg}
                                  width={400}
                                  height={300}
                                  alt="Product 3"
                                  className="object-cover w-[300px] h-[400px] group-hover:opacity-50 transition-opacity"
                              />
                              <div className="p-4 bg-background">
                                  <h3 className="text-lg font-semibold">Wireless Headphones</h3>
                                  <p className="text-sm text-muted-foreground">High-quality sound</p>
                                  <h4 className="text-base font-semibold">$79.99</h4>
                              </div>
                          </div>


                          <div className="relative overflow-hidden rounded-lg group">
                              <Link to="#" className="absolute inset-0 z-10">
                                  <span className="sr-only">View Product</span>
                              </Link>
                              <img
                                  src={CardImg}

                                  width={300}
                                  height={400}
                                  alt="Product 4"
                                  className="object-cover w-[300px] h-[400px] group-hover:opacity-50 transition-opacity"
                              />
                              <div className="p-4 bg-background">
                                  <h3 className="text-lg font-semibold">Classic Wristwatch</h3>
                                  <p className="text-sm text-muted-foreground">Timeless design</p>
                                  <h4 className="text-base font-semibold">$59.99</h4>
                              </div>
                          </div>


                          <div className="relative overflow-hidden rounded-lg group">
                              <Link to="#" className="absolute inset-0 z-10">
                                  <span className="sr-only">View Product</span>
                              </Link>
                              <img
                                  src={CardImg}
                                  width={400}
                                  height={300}
                                  alt="Product 4"
                                  className="object-cover w-[300px] h-[400px] group-hover:opacity-50 transition-opacity"
                              />
                              <div className="p-4 bg-background">
                                  <h3 className="text-lg font-semibold">Classic Wristwatch</h3>
                                  <p className="text-sm text-muted-foreground">Timeless design</p>
                                  <h4 className="text-base font-semibold">$59.99</h4>
                              </div>

                          </div>
                          <div className="relative overflow-hidden rounded-lg group">
                              <Link to="#" className="absolute inset-0 z-10">
                                  <span className="sr-only">View Product</span>
                              </Link>
                              <img
                                  src={CardImg}
                                  width={400}
                                  height={300}
                                  alt="Product 4"
                                  className="object-cover w-[300px] h-[400px] group-hover:opacity-50 transition-opacity"
                              />
                              <div className="p-4 bg-background">
                                  <h3 className="text-lg font-semibold">Classic Wristwatch</h3>
                                  <p className="text-sm text-muted-foreground">Timeless design</p>
                                  <h4 className="text-base font-semibold">$59.99</h4>
                              </div>
                          </div> */}
            </div>
            <div className="w-full h-[15rem] md:h-full md:w-2/3  grid place-items-center relative">
              <img
                src={HeroImage}
                alt="Hero"
                className="w-full h-full rounded-[10px]"
              />
              <div className={"absolute grid place-items-center gap-3"}>
                <p className={"text-[30px] font-[400] text-center"}>
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

      <div className={"border-black  border-t-[1px] border-b-[1px] mx-10"}>
        <div
          className={
            "grid grid-cols-2 place-items-center gap-10 my-10 md:grid-cols-4"
          }
        >
          <p className={"text-[32px] font-[600]"}>Logo</p>
          <p className={"text-[32px] font-[600]"}>Logo</p>
          <p className={"text-[32px] font-[600]"}>Logo</p>
          <p className={"text-[32px] font-[600]"}>Logo</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-8">
        <div className="flex flex-col items-center lg:items-start lg:w-1/2 lg:mr-8 text-center lg:text-left">
          <h4 className="text-lg font-semibold mb-2">
            Trivart - culture on your walls
          </h4>
          <h3 className="text-2xl font-bold mb-4">PREMIUM ART FOR YOUR WALL</h3>
          <p className="text-sm mb-4">
            Buy The Highest Grade Museum Art That will Last For Decade And Look
            As Real As The Original Artwork.
          </p>
          <button
            onClick={handleClick}
            className="bg-black text-white text-lg px-5 py-2 rounded"
          >
            Shop Now
          </button>
        </div>
        <img
          src={home_bottom}
          className="w-full lg:w-1/2 h-auto mt-4 lg:mt-0"
          alt="Home Bottom"
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 mt-[40px] px-3 md:px-0"}>
        <div>
          <img
            src={odissa}
            alt="Hero"
            className="w-full h-full rounded-[10px]"
          />
        </div>
        <div
          className={"w-full flex flex-col items-center justify-around md:p-10"}
        >
          <div
            className={
              "flex flex-col items-start justify-center gap-4 md:p-10 max-w-2xl"
            }
          >
            <p className={"text-[25px] font-[600] font-mono"}>About Trivart</p>
            <p className="font-mono text-sm ">
              This is a paragraph. Click to edit and add your own text. Add any
              information you want to share. You can use this space to tell
              users a story about the company or describe a special service it
              offers. Change the font, size or scale to get the look you want.
            </p>
            <button
              className="bg-black text-white text-lg px-5 py-2"
              onClick={handleClick2}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

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

      <FrequentlyAskQuestion />
    </div>
  );
};

export default Home;
