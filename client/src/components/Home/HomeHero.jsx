import HeroImage from "../../assets/Home/3cf42f1fce41c05751aca8476095b529.png"

const HomeHero = ({ title, showShopNowButton }) => {
    return (
        <div className="w-screen h-[50%] flex flex-col items-center justify-center relative">
            <img src={HeroImage} alt="Hero" className="w-screen h-full object-cover" />
            <div
                className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black flex flex-col items-center gap-4">
                <h1 className="text-4xl font-medium">
                    {title}
                </h1>
                {showShopNowButton && (
                    <button className="bg-black text-white text-lg px-5 py-2">
                        Shop Now
                    </button>
                )}
            </div>

        </div>
    )
}

HomeHero.defaultProps = {
    title: (
        <>
            Write a Title Here. Click to Edit<br />and Add Your Own
        </>
    ),
    showShopNowButton: true
};

export default HomeHero