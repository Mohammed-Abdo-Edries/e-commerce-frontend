import React,{ useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom'


export const Product = (props) => {
  const { id, productName, price, productImage, productTitle } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemsAmount = cartItems[id]

  return (
    <div id={id} className='mt-5'>
      <img src={productImage} className='rounded-lg w-50 h-50' />
      <div className='flex flex-col items-center'>
        <div className=''><b>{productName}</b></div>
        <div> ${price}</div>
        <div> {productTitle}</div>
        <button className='border-4 border-black px-2 py-1 rounded-xl' onClick={() => addToCart(id)}>
          Add To Cart {cartItemsAmount > 0 && <> ({cartItemsAmount}) </>}
        </button>
        <Link to={`/productDetails/${id}`} >
          <button className='border-4 border-black px-2 py-1 rounded-xl'>
            Show More Details
          </button>
        </Link>
      </div>
    </div>
  )
};

