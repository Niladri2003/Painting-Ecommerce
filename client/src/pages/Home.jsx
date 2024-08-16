import HeroImage from "../assets/Home/3cf42f1fce41c05751aca8476095b529.png";
import CardImg from "../assets/Home/cardImg.png";
import { Link } from "react-router-dom";
import HomeHero from "../components/Home/HomeHero.jsx";
import Footer from "../components/footer/Footer.jsx";
import FeatureProducts from "./FeatureProducts.jsx";

const Home = () => {
    return (
        <div className="w-full overflow-hidden">
            <HomeHero />
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-3">
                <div className=" md:px-6 grid gap-8">
                    <div className="text-start space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Products</h2>
                        <p className="text-muted-foreground md:text-xl">Check out our top-selling products.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-10">
                        {/*  */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:py-10">
                            <FeatureProducts/>
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
                            <img src={HeroImage} alt="Hero" className="w-full h-full rounded-[10px]" />
                            <div className={"absolute grid place-items-center gap-3"} >
                                <p className={"text-[30px] font-[400] text-center"} >
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
                <div className={"grid grid-cols-2 place-items-center gap-10 my-10 md:grid-cols-4"}>
                    <p className={"text-[32px] font-[600]"}>Logo</p>
                    <p className={"text-[32px] font-[600]"}>Logo</p>
                    <p className={"text-[32px] font-[600]"}>Logo</p>
                    <p className={"text-[32px] font-[600]"}>Logo</p>

                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 mt-[40px] px-3 md:px-0"}>
                <div>
                    <img src={CardImg} alt="Hero" className="w-full h-full rounded-[10px]" />
                </div>
                <div className={"w-full flex flex-col items-center justify-around md:p-10"}>
                    <div className={"flex flex-col items-start justify-center gap-4 md:p-10 max-w-2xl"}>
                        <p className={"text-[25px] font-[600]"}>About</p>
                        <p>This is a paragraph. Click to edit and add your own text. Add any information you want to
                            share. You can use this space to tell users a story about the company or describe a special
                            service it offers. Change the font, size or scale to get the look you want.</p>
                        <button className="bg-black text-white text-lg px-5 py-2">
                            Learn More
                        </button>
                    </div>
                </div>

            </div>

            <div className="container mx-auto my-16 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <path d="M41 20.9399C41 31.9857 32.0457 40.9399 21 40.9399C9.95425 40.9399 1 31.9857 1 20.9399C1 9.89419 9.95425 0.939941 21 0.939941C32.0457 0.939941 41 9.89419 41 20.9399Z" stroke="black" strokeWidth="0.24375" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">Title One</p>
                        <p className="text-xs font-light text-center max-w-md">Click to edit and add your own text. Change the font, size, or scale to get the look you want.</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <path d="M41 20.9399C41 31.9857 32.0457 40.9399 21 40.9399C9.95425 40.9399 1 31.9857 1 20.9399C1 9.89419 9.95425 0.939941 21 0.939941C32.0457 0.939941 41 9.89419 41 20.9399Z" stroke="black" strokeWidth="0.24375" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">Title One</p>
                        <p className="text-xs font-light text-center max-w-md">Click to edit and add your own text. Change the font, size, or scale to get the look you want.</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <path d="M41 20.9399C41 31.9857 32.0457 40.9399 21 40.9399C9.95425 40.9399 1 31.9857 1 20.9399C1 9.89419 9.95425 0.939941 21 0.939941C32.0457 0.939941 41 9.89419 41 20.9399Z" stroke="black" strokeWidth="0.24375" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">Title One</p>
                        <p className="text-xs font-light text-center max-w-md">Click to edit and add your own text. Change the font, size, or scale to get the look you want.</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <path d="M41 20.9399C41 31.9857 32.0457 40.9399 21 40.9399C9.95425 40.9399 1 31.9857 1 20.9399C1 9.89419 9.95425 0.939941 21 0.939941C32.0457 0.939941 41 9.89419 41 20.9399Z" stroke="black" strokeWidth="0.24375" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium leading-6 text-center">Title One</p>
                        <p className="text-xs font-light text-center max-w-md">Click to edit and add your own text. Change the font, size, or scale to get the look you want.</p>
                    </div>
                </div>
            </div>

       

        </div>
    );
};

export default Home;
