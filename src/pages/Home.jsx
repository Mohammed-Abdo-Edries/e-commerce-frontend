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
    <>
      <div>Hello there, {user?.firstname + user?.lastname}</div>
      <div className="w-screen h-96 overflow-hidden">
        <Slider {...settings} >
          {images.map((item) => (
            <div key={item.id}>
              <img className="rounded-xl overflow-hidden h-max" src={item.src} alt={item.alt} />
            </div>
          ))}
        </Slider>
      </div>
      {user ? <div>Hello there, {user.firstname + user.lastname}</div> : null}
    </>
  )
}

export default Home