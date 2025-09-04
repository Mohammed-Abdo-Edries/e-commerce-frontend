import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { url } from "../http-common"
import { useShopContext } from '../context1/ShopContext';

export const CartItem = (props) => {
  const { id, name, amount } = props.data;
  const [cartItem, setCartItem] = useState([])
  const { products } = useShopContext();

  useEffect(() => {
     const product = products.find((p) => p._id === id || p.id === id);
     if (product) {
       setCartItem(product);
     }
   }, [id, products]);

  return (
    <div id={cartItem.id} className='relative flex text-center rounded-xl shadow-xl w-64 py-2 dark:bg-slate-400'>
      <img className='w-32 h-44 rounded-xl' 
src={ cartItem.imgURL &&
           typeof cartItem.imgURL === "string" && !cartItem.imgURL.startsWith("http") 
           && !cartItem.imgURL.startsWith("/")
             ? `${url}/images/${cartItem.imgURL}`
             : cartItem.imgURL
         } alt={cartItem.name}       />
      <div className='flex-column text-start mx-4 mt-4 text-gray-700 dark:text-zinc-200'>
        <div className='font-semibold flex'>
          {name} 
          </div>
        <div> in {cartItem.category} </div>
        <div> $  {cartItem.price}</div>
          <div className=''> x{amount}</div>
      </div>
    </div>
  )
}
