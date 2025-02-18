"use client";
import ProfileImg from "../../assets/avatar/defaultAvatar.jpg";
import { InfiniteMovingCards } from "./InfiniteMovingCards.jsx";

export function Testimonials() {
    return (
        <div className="h-[25rem] w-screen rounded-md flex flex-col antialiased bg-white text-black items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>
    );
}

const testimonials = [
    {
        quote:
            "Absolutely in love with my Madhubani painting from Trivart! The intricate details and vibrant colors bring so much life to my space. The quality of the canvas is exceptional, and the packaging ensured it arrived in perfect condition. Will definitely be ordering again!",
        name: "Aarav Mehta",
        title: "Art Collector",
        profile: ProfileImg,
    },
    {
        quote:
            "I was looking for a unique Pattachitra painting to complement my home decor, and Trivart had the perfect piece. The hand-painted work is stunning, and I appreciate the authenticity and craftsmanship that went into it. Highly recommended for art lovers!",
        name: "Sophia Iyer",
        title: "Interior Designer",
        profile: ProfileImg,
    },
    {
        quote:
            "As an artist myself, I’m very particular about prints and framing quality. The fine art print I purchased exceeded my expectations! The colors are rich, the texture is amazing, and it truly feels like an original. Trivart is now my go-to art destination!",
        name: "Rohan Sen",
        title: "Contemporary Artist",
        profile: ProfileImg,
    },
    {
        quote:
            "I gifted a framed Madhubani painting to a dear friend, and they were thrilled! The premium museum-grade canvas and the frame quality were exceptional. I love that Trivart is helping preserve traditional Indian art while making it accessible worldwide.",
        name: "Priya Kapoor",
        title: "Art Enthusiast",
        profile: ProfileImg,
    },
    {
        quote:
            "Being a first-time buyer of traditional Indian art, I had a lot of questions. The team at Trivart was incredibly helpful in guiding me through the selection process. The painting I received is breathtaking, and I couldn’t be happier with my purchase!",
        name: "Daniel Fernandez",
        title: "First-time Art Buyer",
        profile: ProfileImg,
    },
];
