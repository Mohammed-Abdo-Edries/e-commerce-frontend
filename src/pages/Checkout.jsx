import React, { useState, useEffect } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { CartItem } from '../components/cartItem';
import { useCookies } from 'react-cookie';
import { AnimatePresence, motion } from "framer-motion"
import '@dotlottie/player-component'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './checkoutForm';
import { loadStripe } from '@stripe/stripe-js'
import { url } from '../http-common'

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const { cart, setCart, refresh, setOrder, order } = useShopContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const stripePromise = loadStripe('pk_live_51NazxEIFn6o3wLuBT1YsPL5yZhmkhJqWOUHLMbGGy8PublxUjqESIAyvW4N1ERYqzDCcuKnWx2BXW4S26rohYSYu00ho7pBX6M')
  // const stripePromise = loadStripe('pk_test_51NazxEIFn6o3wLuBJtXoQaHpIILdGlOGgVW0HSH46mGbIlXAck5cgZE8706SoCmbKol6D1xvCBrZLASm8Os0rvyj00aj06RclN')

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

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${url}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: order })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const onClickRemove = () => {
    setCart([]);
    removeCookie('cart', { path: '/' });
  };
  return (
    <motion.div className='flex-column' >
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
            <button className='' onClick={onClickRemove} >Remove All</button> <hr />
            <button onClick={() => {
              // console.log(cart)
              console.log(typeof (order))
              console.log(order)
            }}
            >Buy</button>
          </div>
          : null}
      </div>
    </motion.div>
  )
}

export default Checkout