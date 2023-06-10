import React, { useEffect, useState } from 'react'
import { useShopContext } from '../Context/ShopContext';
import axios from 'axios'
import url from "../http-common"

export const CartItem = (props) => {
  const { id, name, price, category, amount } = props.data;
  const [cartItem, setCartItem] = useState([])
  const { cart, setCart, refresh, setRefresh } = useShopContext();

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
    <div id={cartItem.id} className='cartItem flex text-center my-4 mx-10 bg-gray-700 w-48'>
      <img className='w-20 h-20' src={`http://localhost:4000/images/${cartItem.imgURL}`} />
      <div>
        <div className='flex'> <p>{name}</p> in <p>{category}</p> </div>
        <p> ${cartItem.price}</p>
        <p> x{amount}</p>
        {/* <p><b>{cartItem.price  amount}</b></p> */}
        {/* <p> {cartItem.category}</p> */}
        <p> {price}</p>
        {/* <p> {category}</p> */}
        <div>
          <div className='d-flex' >
          </div>
          {/* <button className='ml-5' onClick={() => removeFromCart(id)}> - </button> */}
          {/* <input className='w-5' value={cartItems[id]} onChange={(e) => updateItemAmount(Number(e.target.value), id)} /> */}
          {/* <button onClick={() => addToCart(id)}> + </button> */}
        </div>
      </div>
    </div>
  )
}
