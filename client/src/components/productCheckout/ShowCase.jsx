import React from 'react'
import guideOne from "../../assets/Sub-category-Of-Painting/guide-3.jpeg"
import guideTwo from "../../assets/Sub-category-Of-Painting/guide-1.jpeg"
import guideThree from "../../assets/Sub-category-Of-Painting/guide-2.jpeg"

const ShowCase = () => {
    return (
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 '>
            <div className='flex flex-col items-center text-center'>
                <img src={guideOne} alt="guide" className='w-full h-auto mb-4' />
                <h3 className='text-xl font-semibold mb-2'>Frame</h3>
                <p className='mb-2 font-semibold font-serif '>Premium Quality Frames for Premium Art</p>
                <p className='text-justify font-serif text-sm '>Best for Madhubani Paintings and Art Prints as they're much more durable and have a matte finish. Available Frame Colors: Black, White, Natural Wood, and Gold</p>
            </div>

            <div className='flex flex-col items-center text-center'>
                <img src={guideTwo} alt="guide" className='w-full h-auto mb-4' />
                <h3 className='text-xl font-semibold mb-2'>Canvas Gallery Wrap</h3>
                <p className='mb-2 font-semibold font-serif '>Stretched Canvas for Classic Look</p>
                <p className='text-justify font-serif text-sm'>Museum Canvas Print is stretched on a wooden frame in such a way that it wraps around the sides of the stretcher. The sides of the canvas are prepared with white as a natural white canvas for illustrations, pop-art.</p>
            </div>

            <div className='flex flex-col items-center text-center'>
                <img src={guideThree} alt="guide" className='w-full h-auto mb-4' />
                <h3 className='text-xl font-semibold mb-2'>Only Print</h3>
                <p className='mb-2 font-semibold font-serif '>Rolled and Shipped inside a Safe Packaging Art Tube</p>
                <p className='text-justify font-serif text-sm'>When you want to get a specific custom framing for your Paintings or Art Prints that is not available on our website. Then you can buy Only Print as it comes unframed and rolled inside our Art Tubes.</p>
            </div>
        </div>
    )
}

export default ShowCase
