import React, { useState, useEffect } from 'react'
// import PRODUCTS from './products'
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
        cart.length?
        (
        {
          cart && cart.map((product) => {
            return product && <CartItem data={product} />
          })
        }

        {/* {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}  */}

        <div className='d-flex' >
          <div >Product Amount: {totalAmount}</div>
          <div >Total Price: {totalPrice} $</div>
          <button onClick={onClickRemove} >Remove All</button>
        </div>

        ) : (
        <h2 className='text-center' >You have nothing in your cart.</h2>
        )
      </div>
    </Drawer>
  )
  // return (
  //   <div>
  //     <Drawer
  //        >
  //       <div className='cart ml-auto bg-white fixed w-60 h-screen top-0 right-0' data-aos="slide-left" data-aos-duration="1000">
  //         <div>
  //           Your Cart Items
  //           <div className='cartItems flex w-full bg-black flex-col'>
  //             {/* {PRODUCTS.map((product) => {
  //               if (cartItems[product.id] !== 0) {
  //                 return <CartItem data={product} />;
  //               }
  //             })} */}
  //           </div>
  //         </div>
  //       </div>
  //     </Drawer>
  //   </div>
  // )
}

export default cart