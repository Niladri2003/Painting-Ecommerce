import React, { useContext, useState } from 'react'
import product_rt_1 from "../assets/product_rt_1.png"
import product_rt_2 from "../assets/product_rt_2.png"
import product_rt_3 from "../assets/product_rt_3.png"
import product_rt_4 from "../assets/product_rt_4.png"
import { MdStar } from 'react-icons/md'
import { ShopContext } from '../Context/ShopContext'

const ProductDisplay = (props) => {

    const [sizeBtn, setSizeBtn] = useState('S');
    const SelectSize = (size) => {
        setSizeBtn(size);
    }

    const { product } = props;
    const { addToCart } = useContext(ShopContext)

    return (
        <section className='max_padd_container'>
            <div className='flex flex-col gap-14 xl:flex-row'>
                {/* Left side */}
                <div className='flex gap-x-2 xl:flex-1'>
                    <div className='flex flex-col gap-[7px]'>
                        <img src={product_rt_1} alt="prdImg" className='max-h-[99px] object-cover' />
                        <img src={product_rt_2} alt="prdImg" className='max-h-[99px] object-cover' />
                        <img src={product_rt_3} alt="prdImg" className='max-h-[99px] object-cover' />
                        <img src={product_rt_4} alt="prdImg" className='max-h-[99px] object-cover' />
                    </div>
                    <div className='ml-4'>
                        <img src={product.image} alt="main product" className='object-cover max-w-full h-auto' />
                    </div>
                </div>
                {/* right side */}
                <div className='flex flex-col xl:flex-[1.7]'>
                    <h3 className='h3'>{product.name}</h3>
                    <div className='flex gap-x-2 text-secondary medium-22'>
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <p>(111)</p>
                    </div>
                    <div className='flex gap-x-6 medium-20 my-4'>
                        <div className='line-through'>{product.old_price}</div>
                        <div className='text-secondary'>{product.new_price}.00</div>
                    </div>
                    <div className='mb-4'>
                        <h4 className='bold-16'>Select Size</h4>
                        <div className='flex gap-3 my-3'>
                            <div className={`ring-2  ${sizeBtn == 'S' ? "ring-slate-900" : "ring-slate-900/10"} h-10 w-10 flexCenter cursor-pointer`} onClick={() => SelectSize('S')}>S</div>
                            <div className={`ring-2  ${sizeBtn == 'M' ? "ring-slate-900" : "ring-slate-900/10"} h-10 w-10 flexCenter cursor-pointer`} onClick={() => SelectSize('M')}>M</div>
                            <div className={`ring-2  ${sizeBtn == 'L' ? "ring-slate-900" : "ring-slate-900/10"} h-10 w-10 flexCenter cursor-pointer`} onClick={() => SelectSize('L')}>L</div>
                            <div className={`ring-2  ${sizeBtn == 'XL' ? "ring-slate-900" : "ring-slate-900/10"} h-10 w-10 flexCenter cursor-pointer`} onClick={() => SelectSize('XL')}>XL</div>
                        </div>
                        <div className='flex flex-col gap-y-3 mb-4 max-w-[555px]'>
                            <button onClick={() => { addToCart(product.id) }} className='btn_dark_outline !rounded-none uppercase regular-14 tracking-widest'>Add to cart</button>
                            <button className='btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest'>By it now</button>
                        </div>
                        <p><span className='medium-16 text-tertiary'>Category :</span>{product.category} | Jacket | Winter</p>
                        <p><span className='medium-16 text-tertiary'>Tags :</span> Modern | Latest</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDisplay