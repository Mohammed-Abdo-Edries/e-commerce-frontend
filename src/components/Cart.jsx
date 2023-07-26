import React, { useState, useEffect } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { CartItem } from './cartItem';
import { useCookies } from 'react-cookie';
import Drawer from '@mui/material/Drawer'
import '@dotlottie/player-component'

const cart = ({ open }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart, setCart, refresh, closeCart } = useShopContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);

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
  const onClickRemove = () => {
    setCart([]);
    removeCookie('cart', { path: '/' });
  };
  return (
    <Drawer anchor={"right"} open={open} onClose={closeCart} data-aos="fade-left" data-aos-duration="1000" className='flex-column' >
      <div className='text-center w-full px-2 pb-4 h-full dark:bg-gray-900 dark:text-zinc-200' >
        {cart.length ?
          cart.map((product) => (
            <CartItem data={product} />
          )) :
          <div className='dark:mt-24 mx-auto mt-10 h-96 w-64 sm:h-96 sm:w-96'>
            <dotLottie-player
              src='https://lottie.host/eafaeb00-9793-498d-8de3-cbdc40c88620/1zQdw7c2yr.lottie'
              autoplay loop mode='normal' ></dotLottie-player>
            <h2 className='text-center mt-4' >You have'nt bought enything yet</h2>
          </div>
        }
        {cart.length ?
          <div className='flex-column' >
            <div >Product Amount: {totalAmount}</div>
            <div >Total Price: {totalPrice} $</div>
            <button className='' onClick={onClickRemove} >Remove All</button>
          </div>
          : null}
      </div>
    </Drawer>
  )
}

export default cart