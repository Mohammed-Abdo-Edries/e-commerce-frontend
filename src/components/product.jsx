import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../hooks/useAuthContext'
import Popup from "reactjs-popup";
import { useShopContext } from '../Context/ShopContext'
import axios from "axios"
import url from "../http-common"
import { SpeedDialIcon } from '@mui/material';

export const Product = (props) => {
  const { _id, name, price, imgURL, category, details } = props.data;
  const { cart, setCart, refresh, setRefresh } = useShopContext();
  const { user } = useAuthContext()
  const [inCart, setInCart] = useState(false);
  const [product, setProduct] = useState("");
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
        name: name,
        price: price,
        category: category,
        amount: 1
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
  const deleteProduct = () => {
    axios.delete(`${url}/product/delete`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          id: _id
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  return (
    <div className='mt-5' id={_id}>
      <img src={`${url}/images/${imgURL}`} className='rounded-lg w-50 h-50' />
      <div className='flex flex-col items-center'>
        <div className=''><b>{name}</b></div>
        <div> ${price}</div>
        <div> {details}</div>
        {/* {user ?
          <button className='border-4 border-black px-2 py-1 rounded-xl' onClick={() => addToCart(id)}>
            Add To Cart {cartItemsAmount > 0 && <> ({cartItemsAmount}) </>}
          </button>
          : <Popup className='bg-red-700' trigger={<button className='border-4 border-black px-2 py-1 rounded-xl'>Add to Cart</button>}>Sorry, your not logged in
          </Popup>
        } */}

        {
          inCart
            ?
            <div className='d-flex my-2' >
              <span className='border-4 border-black px-2 py-1 rounded-xl' onClick={onClickRemoveCart} disabled={amount === 0}>-</span>
              <span className='text-center w-24 px-1' >{amount}</span>
              <span className='border-4 border-black px-2 py-1 rounded-xl' onClick={onClickAddCart} >+</span>
            </div>
            :
            <button
              onClick={onClickAddCart}
            >ADD TO CART</button>
        }

        <Link to={`/productDetails/${_id}`} >
          <button className='border-4 border-black px-2 py-1 rounded-xl'>
            Show More Details
          </button>
        </Link>
        {user?.isAdmin ?
          <div>
            <button onClick={deleteProduct}>delete</button>
          </div>
          : null}
      </div>
    </div>
  )
};

