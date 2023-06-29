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
    <Drawer anchor={"right"} open={open} onClose={closeCart} className='d-flex flex-column' >
      <div className='text-center w-full' >
        {cart.length ?
          cart.map((product) => (
            <CartItem data={product} />
          )) : <h2 className='text-center' >You have nothing in your cart.</h2>}
        <div className='flex-column' >
          <div >Product Amount: {totalAmount}</div>
          <div >Total Price: {totalPrice} $</div>
          {cart.length ? <button className='' onClick={onClickRemove} >Remove All</button> : null}
        </div>
      </div>
    </Drawer>
  )
}

export default cart