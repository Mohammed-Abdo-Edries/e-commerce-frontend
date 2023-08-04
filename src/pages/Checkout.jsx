import React, { useState, useEffect } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { CartItem } from '../components/cartItem';
import { useCookies } from 'react-cookie';
import { AnimatePresence, motion } from "framer-motion"
import '@dotlottie/player-component'
import { Elements } from "@stripe/react-stripe-js";
import { stripeKey } from '../http-common'
import CheckoutForm from './checkoutForm';
// import { loadStripe } from '@stripe/stripe-js'

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart, setCart, refresh, setOrder, order, clientSecret } = useShopContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  // const stripePromise = loadStripe(stripeKey)

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

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    setOrder(cart.map((item) => {
      const id = item.id
      const amount = item.amount
      console.log(order)
      return { id, amount }
    })
    )
  }, [])


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
              console.log(cart)
              console.log(order)
              console.log(order)
            }}
            >Buy</button>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
          : null}
      </div>
    </motion.div>
  )
}

export default Checkout