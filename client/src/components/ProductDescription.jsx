import React from 'react'
import { useState } from 'react';


const ProductDescription = () => {
  const [activeButton, setActiveButton] = useState("description");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  }
  return (
    <div className='mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className={`btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 ${activeButton ==="description" ? 'btn_dark_rounded' : 'btn_dark_outline'}`}  onClick={()=> handleButtonClick("description")}>Description</button>
            <button className={`btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 ${activeButton ==="card-guide" ? 'btn_dark_rounded' : 'btn_dark_outline'}`} onClick={()=> handleButtonClick("card-guide")}>Care Guide</button>
            <button className={`btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 ${activeButton ==="size-guide" ? 'btn_dark_rounded' : 'btn_dark_outline'}`} onClick={()=> handleButtonClick("size-guide")}>Size Guide</button>
        </div>
        <div className='flex flex-col pb-16'>
            <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo ipsa incidunt ipsam similique quod sunt mollitia voluptas rerum adipisci ad dolores aut nesciunt modi, laudantium aspernatur! Neque aliquid quaerat libero dolorem aliquam perferendis, inventore eligendi eum, vel doloremque dolore impedit molestias quod temporibus voluptate veniam aut molestiae, nulla illo eius natus. Deleniti officiis consequatur aliquam.</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iure ex numquam tempore ratione nostrum voluptate autem, harum beatae officia amet deserunt enim maxime quam dolorem. A, dolore.</p>
        </div>
    </div>
  )
}

export default ProductDescription