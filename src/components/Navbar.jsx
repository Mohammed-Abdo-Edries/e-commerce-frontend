import { useState, useEffect } from 'react'
import { useShopContext } from '../context1/ShopContext';
import { CartItem } from '../components/cartItem';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsCart4, BsSunFill, BsFillMoonStarsFill, BsSearch } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { FcSettings } from "react-icons/fc"
import { getAllProducts } from '../pages/Services'
import { useCookies } from 'react-cookie';
import Popup from "reactjs-popup"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [theme, setTheme] = useState("light")
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [value, setValue] = useState('')
  const [names, setNames] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const { cart, setCart, refresh, setSearch, setActivTab } = useShopContext();
  const { logout } = useLogout()
  const { user } = useAuthContext()
  // const location = useLocation()
  useEffect(() => {
    getAllProducts()
      .then(response => {
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
     className='sticky top-0 backdrop-blur-2xl items-center z-10 dark:text-zinc-200 border-gray-300 border-b-2 text-lg py-4'>
      <div className='flex justify-between'>
        {/* <div className='flex-shrink-0'> */}
          <Link className='relative' to="/">
            <div className='logo text-black dark:text-zinc-200'>Luxury</div>
            <span className='absolute bottom-4 right-2'>&reg;</span>
          </Link>
        {/* </div> */}
        {/* <div className="flex-1 flex justify-center"> */}
        <ul className='hidden sm:flex'>
        <Link to="/" className='text-medium px-4' >Home</Link>
        <Link to="/collection" className='text-medium px-4' >COLLECTION</Link>
        <Link to="/about" className='text-medium px-4' >ABOUT</Link>
        <Link to="/contact" className='text-medium px-4' >CONTACT</Link>
        {user?.isAdmin? 
        <Link to="/adminsonly" className='text-medium px-4' >Admin</Link>
        :
        null
      }
        </ul>
        {/* </div> */}
        <div className='flex items-center absolue right-0'>
          {/* <AnimatePresence > */}
            {/* <Popup className='' trigger={<button><BsSearch className='relative sm:hidden mr-2' /></button>} position="bottom center" closeOnDocumentClick >
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: 'easeInOut', duration: .5 }} exit={{ opacity: 0, y: -20 }}
                key="search" mode='wait' className='mt-10 w-80 block mx-auto'>
                <input type="text" className='rounded w-full absolute bottom-0 pl-2 text-black mx-auto bg-zinc-200' value={value} onChange={onChange} />
                <Link to="/" onClick={() => setActivTab("search")}>
                  <button onClick={() => onSearch(value)} className='absolute right-2 top-5'><BsSearch /></button>
                </Link>
              </motion.div>
              <div className='z-20 flex-column bg-white rounded w-80'>
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
            </Popup>
          </AnimatePresence> */}
          {/* <div className='relative hidden sm:block'>
            <div className='mr-4'>
              <input type="text" className='rounded mx-auto w-32 sm:w-48 md:w-80 pl-2 text-black' value={value} onChange={onChange} />
              <Link to="/" onClick={() => setActivTab("search")}>
                <button onClick={() => onSearch(value)} className='absolute right-5 top-1'><BsSearch /></button>
              </Link>
            </div>
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
          </div> */}
          {theme === 'dark' ?
            <AnimatePresence mode='wait' >
              {theme === "dark" && (
                <motion.button key='sun' variants={variants} initial='hidden'
                  animate="enter"
                  exit='exit'
                  transition={{ duration: 0.3 }}
                  className='w-9 h-8 px-2 rounded text-orange-200'
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
                  className='px-2 w-9 h-8 rounded text-purple-700'
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light")
                  }}>
                  <BsFillMoonStarsFill className='' />
                </motion.button>
              )}
            </AnimatePresence>
          }
          <Popup trigger={<button className='ml-2'><BsCart4 /></button>} position="bottom right" closeOnDocumentClick >
            <div className='flex-column text-center w-full px-2 pb-4 h-[calc(1vh+500px)] overflow-y-scroll rounded bg-zinc-200 dark:bg-gray-900 dark:text-zinc-200' >
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
              <Link className='' to="/adminsonly"><div className='pl-2 pr-2 mt-1'><FcSettings /></div></Link>
            </div>
            :
            null
          }
          <Popup trigger={<button className='pl-2 mt-1'><FaUserCircle /></button>} position="bottom right" closeOnDocumentClick>
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
          <Popup trigger={<button><GiHamburgerMenu className='ml-2 sm:hidden'/></button>} closeOnDocumentClick position={"bottom right"}>
                    <ul className='w-60 rounded-md bg-white dark:bg-slate-950 dark:text-white animate-slideInDown'>
                        <li className='pb-2 hover:pl-6 pl-4 py-2 border-slate-300 border-b-2'>
                            <a to='/' key={"home"} href="/home">Home</a>
                        </li>
                        <li className='pb-2 hover:pl-6 pl-4 py-2 border-slate-300 border-b-2'>
                            <a to='/collection' key={"about"} href="/collection">Collections</a>
                        </li>
                        <li className='pb-2 hover:pl-6 pt-2 border-slate-300 pl-4 border-b-2'>
                            <a to='/skills' key={"skills"} href="/about">About</a>
                        </li>
                        <li className='pb-2 hover:pl-6 py-2 border-slate-300 pl-4 border-b-2'>
                            <a to='contact' key={"projects"} href="contact">Contact</a>
                        </li>
                    </ul>
                </Popup>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar