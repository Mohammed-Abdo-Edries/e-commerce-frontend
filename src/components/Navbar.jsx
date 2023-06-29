import React from 'react'
import { Link } from 'react-router-dom'
import { useShopContext } from '../Context/ShopContext';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsCart4, BsThreeDotsVertical } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
import Popup from "reactjs-popup"
const Navbar = () => {
  const { openCart } = useShopContext();
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handelClick = () => {
    logout()
  }
  return (
    <>
      <div className='text-white bg-black h-12 py-2 max-w-full text-lg px-8 sm:px-40'>
        <div className='flex justify-between'>
          <div>
            <Link className='' to="/">Luxury</Link>
          </div>
          <div className='hidden sm:flex'>
            {user && (
              <div>
                <button className='' onClick={handelClick}>Log Out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link className='' to="/login">Login</Link>
              </div>
            )}
            {user && (
              user.isAdmin ?
                <Link className='ml-2' to="/adminsonly"><FcSettings /></Link>
                : null)}
            <Link id="cart" onClick={openCart} className='ml-4 pt-1'><BsCart4 /></Link>
          </div>
          <div className='flex justify-end sm:hidden'>
            {/* <Link className='' to="/login">Login</Link> */}
            <Link id="cart" onClick={openCart} className='pt-1 ml-2'><BsCart4 /></Link>
            <Popup className='' trigger={<button className='ml-2 pt-1'><BsThreeDotsVertical /></button>} position="bottom right" closeOnDocumentClick>
              <ul className='bg-white border-2 border-black rounded py-2 px-4'>
                <li><div>{user ? user.firstname + user.lastname : <Link className='' to="/login">Login</Link>}</div></li>
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
        <Link className='' to="/dress">Dress</Link>
        <Link className='' to="/shirts">Shirts</Link>
        <Link className='' to="/pants">Pants</Link>
        <Link className='' to="/shoes">Shoes</Link>
      </div>
    </>
  )
}

export default Navbar