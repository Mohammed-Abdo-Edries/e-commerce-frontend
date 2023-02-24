import React,{ useContext } from 'react'
import PRODUCTS from './products'
import { ShopContext } from '../Context/ShopContext';
import { CartItem } from './cartItem';
import Drawer from '@mui/material/Drawer'

const cart = ({open}) => {
    const { cartItems, getTotalCartAmount, closeCart } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount()
  return (
    <div>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={closeCart} >
        <div  className='cart ml-auto bg-white fixed w-60 h-screen top-0 right-0' data-aos="slide-left" data-aos-duration="1000">
          <div>
            Your Cart Items   
          <div className='cartItems flex w-full bg-black flex-col'>
            {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product} />;
              }
            })}
          </div>
          {totalAmount > 0 ? (
            <div>
            <p>total: ${totalAmount}</p> 
            </div>
            ) : (
            <h1> Your Cart is Empty</h1>
            )}
          </div>
        </div> 
      </Drawer>
    </div>
  )
} 

export default cart