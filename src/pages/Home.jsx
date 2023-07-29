import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import homepage from "../assets/homepage.jpg"
import '@dotlottie/player-component'
import Banner from './Banner'
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'
const Home = () => {
  const { user } = useAuthContext()
  const titles = gsap.utils.toArray('p')
  const tl = gsap.timeline({ repeat: -1 });
  titles.forEach(title => {
    //mmm
    const splitTitle = new SplitTextJS(title);
    tl
      .from(splitTitle.chars, {
        opacity: 0,
        y: 30,
        // rotateX: -20,
        delay: 0.5
      }, '<')
      .to(splitTitle.chars, {
        opacity: 0,
        y: -30,
        // rotateX: 20,
      }, '<1')
  })
  const letterAnimation = {
    initial: { x: window.innerWidth > 380 ? "140vh" : "40vh" },
    // initial: { x: "40vh" },
    animate: { x: "-10vh" }
  };
  const [playMarquee, setPlayMarquee] = useState(false)
  useEffect(() => {
    // setTimeout(() => {
    setPlayMarquee(true)
    // }, 0.5);
  }, []);
  return (
    <AnimatePresence>
      {/* <motion.div className='overflow-x-hidden w-24' variants={letterAnimation} initial="initial" animate="animate" */}
      {/* transition={{ ease: "linear", duration: 3, repeat: "loop" }} >Collections</motion.div> */}
      <motion.div className='home ml-10 mr-8 px-2 h-[calc(100vh+160px)] sm:h-screen mt-4 py-2 font-bold text-lg overflow-hidden'
        initial={{ opacity: 0, y: 40 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: .3 }}
        exit={{ opacity: 0, y: 20 }}>
        {/* <motion.img initial={{ opacity: 0, y: 40 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        exit={{ opacity: 0, y: 20 }}
      className="rounded-xl mx-auto h-96 w-64 sm:h-96 sm:w-96" src={homepage} alt={"nnn"} /> */}
        <div className='mt-4 ml-10'>Hello there {user ? user.firstname + " " + user.lastname : null}</div><br />
        <motion.div className='pt-4 sm:px-20 mt-8' initial={{ opacity: 0, y: 40 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          exit={{ opacity: 0, y: 20 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore debitis dolorem suscipit consequuntur aliquam quos dolorum incidunt praesentium consectetur architecto?
        </motion.div>
        <div className='mt-8 mb-4 w-72 h-56 flex flex-col sm:flex-row sm:w-full sm:h-96'>
          <dotLottie-player className='basis-1/2'
            src='https://lottie.host/dd0d62d9-f05d-412f-b731-3c4ecd3589cb/2nd1hkC0N9.lottie'
            autoplay loop mode='normal' ></dotLottie-player>
          <div className='basis-1/2 mt-4'>
            <div className='gsap text-center leading-none'>
              <p>title1</p>
              <p>title2</p>
              <p>title3</p>
              <p>title4</p>
            </div>
            <div className='mt-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe voluptatum incidunt cupiditate quos quam commodi dolores nostrum vero accusamus reprehenderit, consequatur sint placeat tempore nobis! Nesciunt cum fuga itaque.</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home