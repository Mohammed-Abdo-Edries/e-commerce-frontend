import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { openCart } = useContext(ShopContext);
  const { logout } = useLogout()
  const handelClick = () => {
    logout()
  }
  return (
    <div className='container max-w-full bg-teal-500 relative py-2 px-10 h-24'>
        <Link className='text-lg text-center left-96' to="/">Luxury</Link>
        <button className='ml-auto' onClick={handelClick}>Log Out</button>
            <div className='flex justify-between pt-3 px-40'>
                <Link className='text-lg' to="/login">Login</Link>
                <Link className='ml-4 text-lg' to="/signup">Signup</Link>
                <Link className='ml-4 text-lg' to="/dress">Dress</Link>
                <Link className='ml-4 text-lg' to="/shirts">Shirts</Link>
                {/* <Link className='ml-4 text-lg' to="/adminsonly">Cntrol panel</Link> */}
                <Link className='ml-4 text-lg' to="/pants">Pants</Link>
                <Link id="cart" onClick={openCart} className='text-lg ml-4'>Cart</Link>
            </div>
    </div>
    
  )
}

export default Navbar