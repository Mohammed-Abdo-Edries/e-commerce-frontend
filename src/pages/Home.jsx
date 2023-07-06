import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BsFillArrowRightCircleFill, BsFillAspectRatioFill } from 'react-icons/bs'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import images from "../components/Images"
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
  const { user } = useAuthContext()
  const settings = {
    dots: false,
    arrows: true,
    pauseOnHover: false,
    autoplay: true,
    fade: BsFillAspectRatioFill,
    infinite: true,
    speed: 2000,
    slidestoShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    nextArrow: <BsFillArrowRightCircleFill />,
    prevArrow: <BsFillArrowLeftCircleFill />
  };
  return (
    <div className='ml-12 mr-8 px-2 mt-12 py-2 font-bold text-lg'>
      <div>Hello there {user ? user.firstname + " " + user.lastname : null}</div><br />
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam expedita sunt repellendus.</div>
    </div>
  )
}

export default Home