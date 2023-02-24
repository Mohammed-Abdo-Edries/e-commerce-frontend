import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
export const CartItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartItems, addToCart, removeFromCart, updateItemAmount } = useContext(ShopContext);

  return (
    <div id={id} className='cartItem flex text-center my-4 mx-10 bg-gray-700 w-48'>
      <img className='w-20 h-20' src={productImage} />
      <div>
        <p><b>{productName}</b></p>
        <p> ${price}</p>
        <div>
          <button className='ml-5' onClick={() => removeFromCart(id)}> - </button>
          <input className='w-5' value={cartItems[id]} onChange={(e) => updateItemAmount(Number(e.target.value), id)}/>
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  )
}
