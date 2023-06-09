import React from 'react'
import { Link } from 'react-router-dom'
import { useShopContext } from '../Context/ShopContext';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const { openCart } = useShopContext();
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handelClick = () => {
    logout()
  }
  return (
    <div className='container max-w-full bg-teal-500 relative py-2 px-10 h-24'>
      <div className='flex text-center'>
        <div className='flex'>
          <Link className='text-lg text-center ml-60' to="/">Luxury</Link>
          {user && (
            <div>
              <button className='ml-52' onClick={handelClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link className='text-lg' to="/login">Login</Link>
            </div>
          )}
          {user && (
            user.isAdmin ?
              <Link className='ml-4 text-lg' to="/adminsonly">Cntrol panel</Link>
              : null)}
          <Link id="cart" onClick={openCart} className='text-lg ml-4'>Cart</Link>
        </div>
      </div>
      <div className='flex justify-between pt-3 px-40'>
        <Link className='ml-4 text-lg' to="/dress">Dress</Link>
        <Link className='ml-4 text-lg' to="/shirts">Shirts</Link>
        <Link className='ml-4 text-lg' to="/pants">Pants</Link>
      </div>
    </div>

  )
}

export default Navbar