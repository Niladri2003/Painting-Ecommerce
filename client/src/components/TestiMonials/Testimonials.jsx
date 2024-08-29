

"use client";

import React, { useEffect, useState } from "react";

import ProfileImg from "../../assets/avatar/defaultAvatar.jpg"
import {InfiniteMovingCards} from "./InfiniteMovingCards.jsx";

export function Testimonials() {
    return (
        <div className="h-[25rem] w-screen rounded-md flex flex-col antialiased bg-white text-black  items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = [
    {
        quote:
            "I couldn't be happier with my shopping experience! The website is so easy to navigate, and the product selection is fantastic. I found exactly what I was looking for, and the checkout process was seamless. My order arrived quickly, and the items were even better than I expected. ",
        name: "Niladri Adak",
        title: "A Tale of Two Cities",
        profile:ProfileImg,
    },
    {
        quote:
            "I couldn't be happier with my shopping experience! The website is so easy to navigate, and the product selection is fantastic. I found exactly what I was looking for, and the checkout process was seamless. My order arrived quickly, and the items were even better than I expected. ",
        name: "William Shakespeare",
        title: "Hamlet",
        profile:ProfileImg,
    },
    {
        quote: "I couldn't be happier with my shopping experience! The website is so easy to navigate, and the product selection is fantastic. I found exactly what I was looking for, and the checkout process was seamless. My order arrived quickly, and the items were even better than I expected. ",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
        profile:ProfileImg,
    },
    {
        quote:
            "ForeverKnots Photography captured our wedding day perfectly. They were professional, creative, and truly captured the essence of our love. We're so grateful to have these beautiful memories to cherish forever.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
        profile:ProfileImg,
    },
    {
        quote:
            "ForeverKnots Photography captured our wedding day perfectly. They were professional, creative, and truly captured the essence of our love. We're so grateful to have these beautiful memories to cherish forever.",
        name: "Herman Melville",
        title: "Moby-Dick",
        profile:ProfileImg,
    },
];
