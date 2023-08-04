import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from "../http-common"

export const CartItem = (props) => {
  const { id, name, price, category, amount } = props.data;
  const [cartItem, setCartItem] = useState([])
  // const { cart, setCart, refresh, setRefresh } = useShopContext();

  useEffect(() => {
    axios.get(`${url}/product/${id}`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          id: id
        }
      })
      .then(response => {
        setCartItem(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div id={cartItem.id} className='cartItem flex text-center my-4 rounded-xl shadow-xl w-64 h-44 dark:bg-slate-400'>
      <img className='w-32 h-44 rounded-xl' src={`${url}/images/${cartItem.imgURL}`} />
      <div className='flex-column w-32 mx-4 mt-4 text-gray-700 dark:text-zinc-200'>
        <div className='font-semibold flex justify-between'>{name}  <span> x{amount}</span></div>
        <div> in {cartItem.category} </div>
        <div> ${price}</div>
      </div>
    </div>
  )
}
