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
    <div className='container bg-black text-white max-w-full flex py-2 px-10 h-20'>
      {/* <div className=''> */}
      <Link className='justify-start text-lg ml-2 mr-52' to="/">Luxury</Link>
      <div className='justify-center hidden sm:flex'>
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
      {/* </div> */}
      <div className='hidden sm:flex justify-between pt-3 px-2 text-blue-500'>
        <Link className='ml-4 text-lg' to="/dress">Dress</Link>
        <Link className='ml-4 text-lg' to="/shirts">Shirts</Link>
        <Link className='ml-4 text-lg' to="/pants">Pants</Link>
      </div>
      <div className='justify-end block sm:hidden text-white'>menue</div>
    </div>

  )
}

export default Navbar