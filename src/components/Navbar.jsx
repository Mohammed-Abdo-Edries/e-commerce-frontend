import React, { useState, useEffect } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { CartItem } from '../components/cartItem';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsCart4, BsSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { FcSettings } from "react-icons/fc"
// import { BiLogOut } from "react-icons/bi"
import { url } from "../http-common"
import { getAllProducts } from '../pages/Services'
import { useCookies } from 'react-cookie';
import Popup from "reactjs-popup"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation, Link, Navigate } from 'react-router-dom'
const Navbar = () => {
  const [theme, setTheme] = useState("light")
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart, setCart, refresh, setSearch, setActivTab } = useShopContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const [value, setValue] = useState('')
  const [names, setNames] = useState('')
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const location = useLocation()
  useEffect(() => {
    getAllProducts()
      .then(response => {
        // console.log(response)
        setNames(response)
      })
  }, [names])
  const onChange = (e) => {
    setValue(e.target.value);
  }
  const onSearch = (searchTerm) => {
    setSearch(searchTerm)
    setValue(searchTerm)
    console.log('search', searchTerm)
  }

  const handelClick = () => {
    logout()
  }
  const variants = {
    hidden: { y: -20, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    exit: { y: 25, opacity: 0 }
  }
  const onClickRemove = () => {
    setCart([]);
    removeCookie('cart', { path: '/' });
  };
  useEffect(() => {
    var price = 0
    var amount = 0;
    cart.forEach((item) => {
      if (item.price && item.amount) {
        price += item.price;
        amount += item.amount;
      }
    });
    setTotalPrice(price);
    setTotalAmount(amount);
  }, [cart, cookies.cart, refresh]);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])
  return (
    <motion.div initial={{ opacity: 0, y: -180 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: 'easeInOut', duration: 1, delay: .5 }}
      id="nav" className='sticky top-0 backdrop-blur-2xl bg-white/30 z-10 backdrop-brightness-90 dark:text-zinc-200 h-14 sm:h-24 max-w-full text-lg px-4 sm:px-20'>
      <div className='flex'>
        <div className='relative'>
          <Link className='' to="/">
            <div className='logo text-black dark:text-zinc-200'>Luxury</div>
            <span className='absolute bottom-4 right-2'>&reg;</span>
          </Link>
        </div>
        <div className='relative'>
          <input type="text" value={value} onChange={onChange} />
          <Link to="/" onClick={() => setActivTab("search")}>
            <button onClick={() => onSearch(value)}>Search</button>
          </Link>
          <div className='z-20 absolute flex-column'>
            {names && names.filter(item => {
              const searchTerm = value.toLowerCase();
              const fullName = item.name.toLowerCase();
              return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm
            }).slice(0, 10)
              .map((item) => (
                <div onClick={() => onSearch(item.name)}
                  className='z-30' id={item._id}>{item.name}</div>
              ))}
          </div>
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
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark")
                  }}>
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
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light")
                  }}>
                  <BsFillMoonStarsFill className='' />
                </motion.button>
              )}
            </AnimatePresence>
          }
          <Popup trigger={<button className='ml-2'><BsCart4 /></button>} position="bottom right" closeOnDocumentClick >
            <div className='flex-column text-center w-full px-2 pb-4 h-[calc(1vh+500px)] overflow-y-scroll rounded bg-zinc-200 -mt-10 dark:bg-gray-900 dark:text-zinc-200' >
              {cart.length ?
                cart.map((product) => (
                  <CartItem data={product} />
                ))
                :
                <div className='dark:mt-24 mx-auto mt-10 w-64 sm:h-96 sm:w-96'>
                  <dotLottie-player
                    src='https://lottie.host/eafaeb00-9793-498d-8de3-cbdc40c88620/1zQdw7c2yr.lottie'
                    autoplay loop mode='normal' ></dotLottie-player>
                  <h2 className='text-center' >You have'nt bought enything yet</h2>
                </div>
              }
              {cart.length ?
                <div className='flex-column' >
                  <div >Product Amount: {totalAmount}</div>
                  <div >Total Price: {totalPrice} $</div>
                  <button className='' onClick={onClickRemove} >Remove All</button><hr />
                  <button><Link to="/checkout">checkout</Link></button>
                </div>
                : null}
            </div>
          </Popup>
          {user?.isAdmin ?
            <div className='flex'>
              <Link className='' to="/adminsonly"><div className='pl-4 pr-6 py-1'><FcSettings /></div></Link>
              <button onClick={logout}><BiLogOut /></button>
            </div>
            :
            <Popup trigger={<button className='ml-2 pb-2 pt-1'><FaUserCircle /></button>} position="bottom right" closeOnDocumentClick>
              <div className='bg-zinc-200 w-60 h-60 py-2 px-4 rounded'>
                {user ?
                  <div className='text-lg '>
                    <div>{user.firstname + " " + user.lastname}</div>
                    <div>{user.email}</div>
                    <div><button className='pr-4 pl-4 pb-1' onClick={handelClick}>
                      Log Out</button></div>
                  </div>
                  :
                  <Link className='' to="/login">You are not logged in <span className='text-blue-700'>Login</span></Link>
                }
              </div>
            </Popup>
          }
        </div>
      </div>
      <div className='pt-1 hidden  sm:flex h-12'>
        <Link to="/" className='ml-4 text-medium px-2' onClick={() => setActivTab("home")}>Home</Link>
        <Link to="/" className='mx-auto' onClick={() => setActivTab("dress")}>dress</Link>
        <Link to="/" className='mx-auto' onClick={() => setActivTab("pants")}>pants</Link>
        <Link to="/" className='mx-auto' onClick={() => setActivTab("shirt")}>shirts</Link>
        <Link to="/" className='mx-auto ' onClick={() => setActivTab("shoes")}>shoes</Link>
      </div>
    </motion.div>
  )
}

export default Navbar