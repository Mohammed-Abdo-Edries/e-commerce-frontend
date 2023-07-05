import React, { useEffect, useState } from 'react'
import { useShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import url from "../http-common"
import { useCookies } from 'react-cookie';

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
    <div id={details._id} className='mt-5'>
      <img src={`${url}/images/${details.imgURL}`} className='rounded-lg w-50 h-50 ml-20' />
      <div className='flex flex-col text-left'>
        <div className=''><b>{details.name}</b></div>
        <div>{details.price}</div>
        <div>{details.details}</div>
        {
          inCart
            ?
            <div className='flex my-2' >
              <button className='border-4 border-black px-2 py-1 rounded-xl' onClick={onClickRemoveCart} disabled={amount === 0}>-</button>
              <div className='text-center w-24' >{amount}</div>
              <button className='border-4 border-black px-2 py-1 rounded-xl' onClick={onClickAddCart} >+</button>
            </div>
            :
            <button className='mb-5 text-left'
              onClick={onClickAddCart}
            >ADD TO CART</button>
        }
      </div>
    </div>
  )
}

export default Details