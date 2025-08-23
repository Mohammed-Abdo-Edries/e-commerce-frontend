import { useShopContext } from '../context1/ShopContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
import CartPopup from './cartPopup'; // 
import { AnimatePresence, motion } from "framer-motion"
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu';
import UserProfileDropdown from './UserProfileDropdown'
const Navbar = () => {
  const { theme,toggleTheme } = useShopContext();
  const { user } = useAuthContext()
   
  const variants = {
    hidden: { y: -20, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    exit: { y: 25, opacity: 0 }
  }
 
  return (
    <motion.div initial={{ opacity: 0, y: -180 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: 'easeInOut', duration: 1, delay: .5 }}
     className='sticky top-0 backdrop-blur-2xl items-center z-10 dark:text-zinc-200 border-gray-300 border-b-2 text-lg py-4'>
      <div className='flex justify-between'>
          <Link className='relative' to="/">
            <div className='logo text-black dark:text-zinc-200'>Luxury</div>
            <span className='absolute bottom-4 right-2'>&reg;</span>
          </Link>

        <ul className='hidden md:flex'>
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
        <div className='flex items-center right-0'>
          <button onClick={toggleTheme}
          className='hover:scale-125 duration-300' >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.div
                key="sun"
                variants={variants} initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-orange-200 pr-2"
              >
                <BsSunFill  />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                variants={variants} initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-purple-700  pr-2"
              >
                <BsFillMoonStarsFill  />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
          <CartPopup />
          <UserProfileDropdown />
          <MobileMenu />
          {user?.isAdmin ?
            <div className='flex'>
              <Link className='' to="/adminsonly"><div className='pl-2 pr-2 mt-1 text-2xl hover:scale-125 duration-300'><FcSettings /></div></Link>
            </div>
            :
            null
          }
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar