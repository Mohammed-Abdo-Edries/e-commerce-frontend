import React,{ useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import PRODUCTS from "./products"

 const Details = () => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const productId = useParams();
  // useEffect(() => {
    let details = PRODUCTS.filter(product => product.id === Number(productId))  
  // }, [Details])
    // const cartItemsAmount = cartItems[details.id]
  
  return (
      <div id={details.id} className='mt-5'>
        <img src={details.productImage} className='rounded-lg w-50 h-50' />
        <div className='flex flex-col items-center'>
          <div className=''><b>{details.productName}</b></div>
          <div> ${details.price}</div>
          <div> {details.productTitle}</div>
          <div> {details.productDetails}</div>
          <button className='border-4 border-black px-2 py-1 rounded-xl' onClick={() => addToCart(details.id)}>
            Add To Cart 
          </button>
        </div>
      </div>
  )
}

export default Details