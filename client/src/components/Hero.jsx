import { MdOutlineLocalOffer } from "react-icons/md"
import { FaStar } from "react-icons/fa";
import React from "react"
import { NavLink } from "react-router-dom"


const Hero = () => {
  return (
    <section className="h-screen w-full">
      <div className="absolute inset-0 bg-hero bg-center bg-cover bg-no-repeat opacity-60"></div>
      <div className="max_padd_container relative top-32 xs:top-52 ">
        <h1 className="h1 capitalize md:bold-52 sm:bold-48 bold-36 max-w-[35rem]">Digital Shopping Hub Junction</h1>
        <p className="text-black sm:medium-24 medium-16 mt-6 max-w-[33rem]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis nam maiores illum quo. Odio dignissimos distinctio atque maxime numquam in!</p>
        <div className="flexStart !items-center gap-x-4 my-10 ">
          <div className="!regular-24 flexCenter gap-x-3">
            <FaStar className="sm:medium-24 medium-16"/>
            <FaStar className="sm:medium-24 medium-16"/>
            <FaStar className="sm:medium-24 medium-16"/>
            <FaStar className="sm:medium-24 medium-16"/>
          </div>
          <div className="bold-20 sm:bold-28">176k <span className="medium-16 sm:medium-20 text-black">Excellent Reviews </span></div>
        </div>
        <div className="max-xs:flex-col flex gap-2">
          <NavLink to={''} className={"btn_dark_rounded flexCenter"}>Shop now</NavLink>
          <NavLink to={''} className={"btn_dark_rounded flexCenter gap-x-2"}><MdOutlineLocalOffer className="text-2xl" />Offers</NavLink>
        </div>
      </div>
    </section>
  )
}

export default Hero