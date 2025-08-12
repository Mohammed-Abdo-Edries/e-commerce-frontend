import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../hooks/useAuthContext'
import { useShopContext } from '../context1/ShopContext'
import axios from "axios"
import { url } from "../http-common"
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Product = () => {
  const { _id, name, price, imgURL, category, details } = props.data;
  const { cart, setCart, refresh, setRefresh } = useShopContext();
  const { user } = useAuthContext()
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);

  useEffect(() => {
    cart.forEach((item) => {
      if (item.id === _id) {
        setInCart(true);
        setAmount(item.amount);
      }
    });
  }, [_id, cart, amount]);
  const onClickAddCart = () => {
    const currentIndex = cart.findIndex(item => item.id === _id);
    if (currentIndex >= 0) {
      cart[currentIndex].amount += 1;
      cart[currentIndex].price = price * cart[currentIndex].amount;
      setAmount(amount + 1);
      setCookies('cart', cart, { path: '/' });
    } else {
      setCart([...cart, {
        id: _id,
        amount: 1,
        name: name,
        price: price,
        category: category
      }]);
      setCookies('cart', cart, { path: '/' });
    }
    setRefresh(!refresh);
  };

  const onClickRemoveCart = () => {
    const currentIndex = cart.findIndex(item => item.id === _id);
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
  const email = user?.email
  const deleteProduct = () => {
    console.log(user.email)
    axios.delete(`${url}/product/delete`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          id: _id,
          email
        }
      })
      .then((response) => {
        console.log(response)
        toast(`${response.data.message}`, {
          position: "top-right",
          type: 'success',
          theme: 'light',
          autoClose: 5000
        })
      })
      .catch(error => {
        toast(`${error}`, {
          position: "top-right",
          type: 'error',
          theme: 'light',
          autoClose: 5000
        })
        console.log(error)
      })
  }
  return (
    <div className='mt-5 rounded-xl shadow-xl pb-4  dark:bg-slate-400' id={_id}>
      <img src={`${url}/images/${imgURL}`} className='rounded-lg w-full h-50' />
      <div className='flex flex-col items-center'>
        <div className='pt-2'><b>{name}</b></div>
        <div> ${price}</div>
        {
          inCart
            ?
            <div className='flex my-2' >
              <span className='bg-purple-700 text-white text-base px-3 py-1 rounded-xl' onClick={onClickRemoveCart} disabled={amount === 0}>-</span>
              <span className='text-center w-8 px-1 pt-1' >{amount}</span>
              <span className='bg-purple-700 text-white text-base px-3 py-1 rounded-xl' onClick={onClickAddCart} >+</span>
            </div>
            :
            <motion.button initial={{ x: -250 }} animate={{ x: 0 }} transition={{ delay: .5 }}
              className='bg-purple-700 px-3 py-2 text-white text-base my-2 rounded-xl w-32'
              onClick={onClickAddCart}
            >Add to cart</motion.button>
        }

        <Link to={`/productDetails/${_id}`} >
          <motion.button initial={{ x: -250 }} animate={{ x: 0 }} transition={{ delay: .5 }}
            className='bg-purple-700 px-3 py-2 text-white text-base rounded-xl'>
            More Details
          </motion.button>
        </Link>
        {user?.isAdmin ?
          <div className='mx-auto'>
            <motion.button initial={{ x: -250 }} animate={{ x: 0 }} transition={{ delay: .5 }}
              className='bg-purple-700 px-3 py-2 text-white text-base rounded-xl my-2'
              onClick={
                () => {
                  deleteProduct()
                }}>delete</motion.button>
            <ToastContainer />
          </div>
          : null}
      </div>
    </div>
  )
};

export default Product