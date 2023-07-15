import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BsFillArrowRightCircleFill, BsFillAspectRatioFill } from 'react-icons/bs'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import images from "../components/Images"
import { useAuthContext } from '../hooks/useAuthContext'
import { motion } from "framer-motion"
import homepage from "../assets/homepage.jpg"

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
    <motion.div className='ml-12 mr-8 px-2 mt-12 py-2 h-screen font-bold text-lg'
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'easeInOut' }}
      exit={{ opacity: 0, y: 20 }}>
      <div>Hello there {user ? user.firstname + " " + user.lastname : null}</div><br />
      <img className="rounded-xl mx-auto mt-10 h-96 w-64 sm:h-96 sm:w-96" src={homepage} alt={"nnn"} />
      <motion.div className='pt-12' transition={{ duration: 0.8, delay: 0.8, type: 'easeInOut' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore debitis dolorem suscipit consequuntur aliquam quos dolorum incidunt praesentium consectetur architecto?</motion.div>
    </motion.div>
  )
}

export default Home