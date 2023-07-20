import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShopContext } from '../Context/ShopContext';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsCart4, BsThreeDotsVertical, BsSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
import Popup from "reactjs-popup"
import logo from "../assets/r.jpg"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from 'react-router-dom'
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
    <div className='sticky top-0 backdrop-blur-2xl bg-zinc-100/30 z-10 backdrop-brightness-90 dark:text-zinc-200'>
      <div className='h-16 max-w-full text-lg px-8 sm:px-40'>
        <div className='flex justify-between'>
          <div>
            <Link className='' to="/">
              <div className='logo text-black'>Luxury</div>
              {/* <span className='mini-logo'>stylish outfits</span> */}
              {/* <img className="rounded-xl h-16 w-28 sm:h-20 sm:w-32" src={logo} alt={"nnn"} /> */}
            </Link>
          </div>
          <div className='hidden sm:flex pt-4'>
            {user && (
              <div>
                <button className='mr-2' onClick={handelClick}>Log Out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link className='pt-1 mr-2' to="/login">Login</Link>
              </div>
            )}
            {theme === 'dark' ?
              <AnimatePresence mode='wait' >
                {theme === "dark" && (
                  <motion.button key='sun' variants={variants} initial='hidden'
                    animate="enter"
                    exit='exit'
                    transition={{ duration: 0.5 }}
                    className='w-9 h-8 px-2 rounded-md bg-orange-200 text-gray-900'
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
                    className='px-2 w-9 h-8 rounded-md bg-purple-700 text-white'
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    <BsFillMoonStarsFill className='' />
                  </motion.button>
                )}
              </AnimatePresence>
            }
            {user && (
              user.isAdmin ?
                <Link className='ml-2 pt-1' to="/adminsonly"><FcSettings /></Link>
                : null)}
            <Link id="cart" onClick={openCart} className='ml-4 pt-1'><BsCart4 /></Link>
          </div>
          <div className='phone flex justify-end sm:hidden'>
            {/* <Link className='' to="/login">Login</Link> */}
            {/* <div className={darkMode ? "dark" : ""} onClick={() => setDarkMode(!darkMode)}>darkMode</div> */}
            {theme === 'dark' ?
              <AnimatePresence mode='wait' >
                {theme === "dark" && (
                  <motion.button key='sun' variants={variants} initial='hidden'
                    animate="enter"
                    exit='exit'
                    transition={{ duration: 0.3 }}
                    className='w-9 h-8 px-2 mt-4 rounded-md bg-orange-200 text-gray-900'
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
                    className='px-2 w-9 h-8 mt-4 rounded-md bg-purple-700 text-white'
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    <BsFillMoonStarsFill className='' />
                  </motion.button>
                )}
              </AnimatePresence>
            }
            {user && (
              user.isAdmin ?
                <Link className='ml-2 pt-6' to="/adminsonly"><FcSettings /></Link>
                : null)}
            <Link id="cart" onClick={openCart} className='pt-6 ml-2'><BsCart4 /></Link>
            <Popup trigger={<button className='ml-2 pb-2 pt-6'><BsThreeDotsVertical /></button>} position="bottom right" closeOnDocumentClick>
              <ul className='bg-white -mt-7 divide-y-2 bg-gray-300 rounded-xl divide-gray-400'  >
                <li className='text-lg '><div className='text-lg font-medium bg-gray-300 pl-2 rounded-xl' data-aos="slide-left" ease-in-out data-aos-duration="500" >{user ? user.firstname + " " + user.lastname : <Link className='' to="/login">Login</Link>}</div></li>
                <li><Link className='' to="/dress" ><div className='pr-28 pl-2 py-1' data-aos="fade-up" data-aos-duration="600">Dress</div></Link></li>
                <li><Link className='' to="/shirts"><div className='pr-28 pl-2 py-1' data-aos="fade-up" data-aos-duration="700">Shirts</div></Link></li>
                <li><Link className='' to="/pants" ><div className='pr-28 pl-2 py-1' data-aos="fade-up" data-aos-duration="800">pants</div></Link></li>
                <li><Link className='' to="/shoes" ><div className='pr-28 pl-2 py-1' data-aos="fade-up" data-aos-duration="900">shoes</div></Link></li>
                {user && (
                  <li>
                    <button className='pr-24 pl-2 divide-x' onClick={handelClick} data-aos="slide-right" ease-in-out data-aos-duration="1000">Log Out</button>
                  </li>
                )}
              </ul>
            </Popup>
          </div>
        </div>
      </div>
      <div className='hidden sm:flex justify-between pt-3 h-12 max-w-full px-40'>
        <Link className=' font-medium' to="/dress">Dress</Link>
        <Link className=' font-medium' to="/shirts">Shirts</Link>
        <Link className=' font-medium' to="/pants">Pants</Link>
        <Link className=' font-medium' to="/shoes">Shoes</Link>
      </div>
    </div >
  )
}

export default Navbar