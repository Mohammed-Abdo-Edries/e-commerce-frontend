import React, { useEffect, useState } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { url } from "../http-common"
import { useCookies } from 'react-cookie';
import { motion } from "framer-motion"

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([])
  const { cart, setCart, refresh, setRefresh } = useShopContext();
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);

  useEffect(() => {
    cart.forEach((item) => {
      if (item.id === id) {
        setInCart(true);
        setAmount(item.amount);
      }
    });
  }, [id, cart, amount]);
  useEffect(() => {
    axios.get(`${url}/product/${id}`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          id: id
        }
      })
      .then(response => {
        setDetails(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  const onClickAddCart = () => {
    const currentIndex = cart.findIndex(item => item.id === id);
    if (currentIndex >= 0) {
      cart[currentIndex].amount += 1;
      cart[currentIndex].price = details.price * cart[currentIndex].amount;
      setAmount(amount + 1);
      setCookies('cart', cart, { path: '/' });
    } else {
      setCart([...cart, {
        id: id,
        name: details.name,
        price: details.price,
        category: details.category,
        amount: 1
      }]);
      setCookies('cart', cart, { path: '/' });
    }
    setRefresh(!refresh);
  };

  const onClickRemoveCart = () => {
    const currentIndex = cart.findIndex(item => item.id === id);
    if (currentIndex >= 0) {
      if (cart[currentIndex].amount === 1) {
        const newCart = new Array([]);
        cart.forEach((item, index) => {
          index !== currentIndex && newCart.push(item);
        })
        if (cart.length === 1) {
          removeCookie('cart', { path: '/' });
        } else {
          setCookies('cart', newCart, { path: '/' });
        }
        setInCart(false);
        setCart(newCart);
        setAmount(amount - 1);
      } else {
        cart[currentIndex].price -= cart[currentIndex].price / cart[currentIndex].amount;
        cart[currentIndex].amount -= 1;
        setAmount(amount - 1);
        setCookies('cart', cart, { path: '/' });
      }
    }
    setRefresh(!refresh);
  };
  return (
    <motion.div id={details._id}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: .5, duration: .3 }} exit={{ opacity: 0, y: 20 }}>
      <div className='container mt-12 ml-8 h-[calc(100vh-180px)]'>
        <img src={`${url}/images/${details.imgURL}`} className='rounded-lg w-64 h-50' />
        <div className='flex flex-col text-left mt-8'>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .8, duration: .8 }} className=''><b>{details.name}</b></motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2 }} className='pt-4'>{details.price}</motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }} className='pt-2'>{details.details}</motion.div>
          {
            inCart
              ?
              <div className='flex my-2' >
                <button className='bg-purple-700 px-3 py-2 text-white text-base rounded-xl' onClick={onClickRemoveCart} disabled={amount === 0}>-</button>
                <div className='text-center w-8' >{amount}</div>
                <button className='bg-purple-700 px-3 py-2 text-white text-base rounded-xl' onClick={onClickAddCart} >+</button>
              </div>
              :
              <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: 1.5, type: 'spring', stiffness: 500 }} whileHover={{ scale: 1.1 }} className='text-left bg-purple-700 px-4 py-2 text-white text-base rounded-xl w-36 my-4'
                onClick={onClickAddCart}
              >ADD TO CART</motion.button>
          }
        </div>
      </div>
    </motion.div>
  )
}

export default Details