import { CartItem } from './cartItem';
import { Link } from 'react-router-dom'
import { useShopContext } from '../context1/ShopContext';
import Popup from "reactjs-popup"
import {BsCart4} from "react-icons/bs"

function CartPopup() {
    const { cart,totalAmount,totalPrice, onClickRemove } = useShopContext();
  return (
    <Popup trigger={<button className='ml-2 text-2xl hover:scale-125 duration-300'><BsCart4 /></button>} 
    position="bottom right" closeOnDocumentClick >
      <div className='flex-column text-center w-full px-2 pb-4 h-[calc(1vh+500px)] overflow-y-scroll rounded
      bg-zinc-200 dark:bg-gray-900 dark:text-zinc-200' >
        {cart.length ?
          cart.map((product) => (
            <CartItem data={product} />
          ))
          :
          <div className='dark:mt-24 mx-auto mt-10 w-64 sm:h-96 sm:w-96'>
            <dotLottie-player
              src='https://lottie.host/eafaeb00-9793-498d-8de3-cbdc40c88620/1zQdw7c2yr.lottie'
              autoplay loop mode='normal' ></dotLottie-player>
            <h2 className='text-center' >You have'nt bought enything yet</h2>
          </div>
        }
        {cart.length ?
        <div>
            <div >Total Price: {totalPrice} $</div>
          <div className='flex mx-6 mt-4' >
            <button className='mr-4 py-1 px-2 bg-purple-700 cursor-pointer text-white rounded-lg' onClick={onClickRemove} >Remove All</button><hr />
            <button className="py-1 px-2 bg-purple-700 cursor-pointer text-white rounded-lg"><Link to="/checkout">checkout</Link></button>
          </div>
        </div>
          : null} 
        </div>
    </Popup>
)
}

export default CartPopup