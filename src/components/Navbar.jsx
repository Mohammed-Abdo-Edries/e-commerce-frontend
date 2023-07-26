import React, { useState, useEffect } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsCart4, BsThreeDotsVertical, BsSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
import Popup from "reactjs-popup"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation, Link } from 'react-router-dom'
const Navbar = () => {
  const [theme, setTheme] = useState("light")
  const { openCart } = useShopContext();
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const location = useLocation()
  const handelClick = () => {
    logout()
  }
  const variants = {
    hidden: { y: -30, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 }
  }
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])
  return (
    <motion.div initial={{ opacity: 0, y: -180 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: 'easeInOut', duration: 1, delay: .5 }}
      className='sticky top-0 backdrop-blur-2xl bg-zinc-100/30 z-10 backdrop-brightness-90 dark:text-zinc-200 h-16 max-w-full text-lg px-8 sm:px-40'>
      <div className='flex justify-between'>
        <div className='relative'>
          <Link className='' to="/">
            <div className='logo text-black dark:text-zinc-200'>Luxury</div>
            <span className='absolute bottom-4 right-2'>&reg;</span>
          </Link>
        </div>
        <div className='flex pt-4 ml-auto'>
          {theme === 'dark' ?
            <AnimatePresence mode='wait' >
              {theme === "dark" && (
                <motion.button key='sun' variants={variants} initial='hidden'
                  animate="enter"
                  exit='exit'
                  transition={{ duration: 0.3 }}
                  className='w-9 h-8 px-2 rounded bg-orange-200 text-gray-900'
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  <BsSunFill className='' />
                </motion.button>
              )}
            </AnimatePresence>
            :
            <AnimatePresence mode='wait' >
              {theme === "light" && (
                <motion.button key='moon' variants={variants} initial="hidden"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className='px-2 w-9 h-8 rounded bg-purple-700 text-white'
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                  <BsFillMoonStarsFill className='' />
                </motion.button>
              )}
            </AnimatePresence>
          }
          <Link id="cart" onClick={openCart} className='ml-2 pt-1'><BsCart4 /></Link>
          <Popup trigger={<button className='ml-2 pb-2 pt-2'><BsThreeDotsVertical /></button>} position="bottom right" closeOnDocumentClick>
            <ul className='bg-purple-700 text-white -mt-2 rounded'  >
              <li className='text-lg '><div className='text-lg font-medium pl-3 pt-1 rounded-xl' data-aos="slide-left" ease-in-out data-aos-duration="500" >{user ? user.firstname + " " + user.lastname : <Link className='' to="/login">Login</Link>}</div></li>
              {user?.isAdmin ?
                <li>
                  <Link className='' to="/adminsonly"><div className='pr-8 pl-8 pr-8 py-1' data-aos="fade-up" data-aos-duration="600"><FcSettings /></div></Link>
                </li>
                : null}
              <li><Link className='' to="/dress" ><div className='pr-8 pl-8 py-1' data-aos="fade-up" data-aos-duration="700">Dress</div></Link></li>
              <li><Link className='' to="/shirts"><div className='pr-8 pl-8 py-1' data-aos="fade-up" data-aos-duration="800">Shirts</div></Link></li>
              <li><Link className='' to="/pants" ><div className='pr-8 pl-8 py-1' data-aos="fade-up" data-aos-duration="900">pants</div></Link></li>
              <li><Link className='' to="/shoes" ><div className='pr-8 pl-8 py-1' data-aos="fade-up" data-aos-duration="1000">shoes</div></Link></li>
              {user && (
                <li>
                  <button className='pr-8 pl-8 pb-1' onClick={handelClick} data-aos="slide-right" ease-in-out data-aos-duration="1000">Log Out</button>
                </li>
              )}
            </ul>
          </Popup>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar