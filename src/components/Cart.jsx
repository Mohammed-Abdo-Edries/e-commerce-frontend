import React, { useState, useEffect } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { CartItem } from './cartItem';
import { useCookies } from 'react-cookie';
import Drawer from '@mui/material/Drawer'
// import { useNavigate } from 'react-router-dom';

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
    <Drawer anchor={"right"} open={open} onClose={closeCart} data-aos="fade-left" data-aos-duration="1000" className='d-flex flex-column' >
      <div className='text-center w-full px-4' >
        {cart.length ?
          cart.map((product) => (
            <CartItem data={product} />
          )) : <h2 className='text-center' >You have'nt bought enything yet</h2>}
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