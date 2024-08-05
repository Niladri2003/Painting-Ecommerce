import * as React from "react";

const Navbar=()=> {
    return (
        <div className="flex flex-col justify-center items-end self-stretch px-16 py-7 text-2xl font-semibold tracking-tight text-white shadow-sm backdrop-blur-[17.5px] bg-white bg-opacity-10 max-md:px-5">
            <div className="flex gap-5 items-start pt-2 max-w-full w-[705px] max-md:flex-wrap">
                <div className="flex flex-col whitespace-nowrap">
                    <div>Home</div>
                    <div className="shrink-0 mt-1.5 bg-white border-white border-solid border-[3px] h-[3px]" />
                </div>
                <div>Team</div>
                <div>Event</div>
                <div>Blog</div>
                <div className="self-stretch">Gallery</div>
                <div className="flex-auto self-stretch">Contact Us</div>
            </div>
        </div>
    );
}
export default Navbar;

