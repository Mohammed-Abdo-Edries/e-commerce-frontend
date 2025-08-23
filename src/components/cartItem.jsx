import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from "../http-common"

export const CartItem = (props) => {
  const { id, name, amount } = props.data;
  const [cartItem, setCartItem] = useState([])

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
    <div id={cartItem.id} className='relative flex text-center my-4 rounded-xl shadow-xl w-64 h-44 dark:bg-slate-400'>
      <img className='w-32 h-44 rounded-xl' src={`${url}/images/${cartItem.imgURL}`} />
      <div className='flex-column text-start mx-4 mt-4 text-gray-700 dark:text-zinc-200'>
        <div className='font-semibold flex'>
          {name} 
          <div className='absolute right-4'> x{amount}</div>
          </div>
        <div> in {cartItem.category} </div>
        <div> ${cartItem.price}</div>
      </div>
    </div>
  )
}
