import Home_hero from "../../assets/Home/Home_hero.jpeg"
import { useNavigate } from "react-router-dom";

const HomeHero = ({ title, showShopNowButton = true }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook


    const handleClick = () => {
        navigate("/shop"); // Redirect to the shop page
    };

    return (
        <div className="w-screen h-[50%] flex flex-col mt-14 md:mt-0 items-center justify-center relative">
            <img src={Home_hero} alt="Hero" className="w-screen h-full object-cover" />
            <div
                className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black flex flex-col items-center gap-4">
                <h1 className="text-4xl font-medium">
                    {title}
                </h1>
                {showShopNowButton && (
                    <button onClick={handleClick} className="bg-black text-white text-lg px-5 py-2">
                        Shop Now
                    </button>
                )}
            </div>

        </div>
    )
}

// HomeHero.defaultProps = {
//     title: (
//         <>
//             Write a Title Here. Click to Edit<br />and Add Your Own
//         </>
//     ),
//     showShopNowButton: true
// };

export default HomeHero