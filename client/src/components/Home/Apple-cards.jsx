import {Card, Carousel} from "../apple-cards/Apple-cards-carosuel.jsx";


export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="pl-20  mx-auto text-start text-lg font-Poppins md:text-5xl  text-black">
                Art Categories
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Talapatra",
        title: "You can do more with AI.",
        src: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp",
        content: <DummyContent />,
    },
    {
        category: "Patachitra",
        title: "Enhance your productivity.",
        src: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp",
        content: <DummyContent />,
    },
    {
        category: "Tribal Art",
        title: "Launching the new Apple Vision Pro.",
        src: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp",
        content: <DummyContent />,
    },

    {
        category: "Moder Art",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp",
        content: <DummyContent />,
    },
    {
        category: "Custome Art",
        title: "Photography just got better.",
        src: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1724940664/paintings_image/vt8qmtecjh63r4wxvkll.webp",
        content: <DummyContent />,
    },

];