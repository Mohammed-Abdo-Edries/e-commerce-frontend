import React from 'react'
import { Link } from 'react-router-dom'
import { useShopContext } from '../Context/ShopContext';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsCart4, BsThreeDotsVertical } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
import Popup from "reactjs-popup"
import logo from "../assets/r.jpg"

const Navbar = () => {
  const { openCart } = useShopContext();
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handelClick = () => {
    logout()
  }
  return (
    <div className='sticky top-0'>
      <div className='text-white bg-black h-16 max-w-full text-lg px-8 sm:px-40'>
        <div className='flex justify-between'>
          <div>
            <Link className='' to="/">
              <div className=' overflow-hidden h-20 w-16'>
                <img className="rounded-xl" src={logo} alt={"nnn"} />
              </div>
            </Link>
          </div>
          <div className='hidden sm:flex pt-4'>
            {user && (
              <div>
                <button className='' onClick={handelClick}>Log Out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link className='pt-1' to="/login">Login</Link>
              </div>
            )}
            {user && (
              user.isAdmin ?
                <Link className='ml-2 pt-1' to="/adminsonly"><FcSettings /></Link>
                : null)}
            <Link id="cart" onClick={openCart} className='ml-4 pt-1'><BsCart4 /></Link>
          </div>
          <div className='phone flex justify-end sm:hidden'>
            {/* <Link className='' to="/login">Login</Link> */}
            {user && (
              user.isAdmin ?
                <Link className='ml-2 pt-6' to="/adminsonly"><FcSettings /></Link>
                : null)}
            <Link id="cart" onClick={openCart} className='pt-6 ml-2'><BsCart4 /></Link>
            <Popup trigger={<button className='ml-2 pb-2'><BsThreeDotsVertical /></button>} position="bottom right" closeOnDocumentClick>
              <ul className='bg-white border-2 border-black rounded py-2 px-4 -mt-7' data-aos="fade-up" ease-in-out data-aos-duration="2000" >
                <li className='text-lg'><div className='text-lg font-medium' >{user ? user.firstname + " " + user.lastname : <Link className='' to="/login">Login</Link>}</div></li>
                {user && (
                  <li>
                    <button className='' onClick={handelClick}>Log Out</button>
                  </li>
                )}
                <li><Link className='' to="/dress">Dress</Link></li>
                <li><Link className='' to="/shirts">Shirts</Link></li>
                <li><Link className='' to="/pants">pants</Link></li>
                <li><Link className='' to="/shoes">shoes</Link></li>
              </ul>
            </Popup>
          </div>
        </div>
      </div>
      <div className='hidden sm:flex justify-between text-white pt-3 h-12 bg-black max-w-full px-40'>
        <Link className='text-lg font-medium' to="/dress">Dress</Link>
        <Link className='text-lg font-medium' to="/shirts">Shirts</Link>
        <Link className='text-lg font-medium' to="/pants">Pants</Link>
        <Link className='text-lg font-medium' to="/shoes">Shoes</Link>
      </div>
    </div>
  )
}

export default Navbar