import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../hooks/useAuthContext';
import { useShopContext } from '../context1/ShopContext';
import axios from 'axios';
import { url } from '../http-common';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = (props) => {
  // NOTE: read the same prop names you pass from Collection: id, imageURL
  const { id, name, description, price, imgURL, category } = props;
  // console.log('Product props:', props)
  const { cart, setCart } = useShopContext();
  const { user } = useAuthContext();
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);

  // Derive item state from cart to avoid local-state drift
  const cartItem = cart.find((item) => item.id === id);
  const inCart = !!cartItem;
  const amount = cartItem?.amount || 0;

  const persistCart = (newCart) => {
    setCart(newCart);
    if (newCart.length === 0) {
      removeCookie('cart', { path: '/' });
    } else {
      setCookies('cart', newCart, { path: '/' });
    }
  };

  const onClickAddCart = () => {
    const idx = cart.findIndex((item) => item.id === id);
    let newCart;

    if (idx >= 0) {
      newCart = cart.map((item, i) =>
        i === idx ? { ...item, amount: item.amount + 1 } : item
      );
    } else {
      // store unit price separately, compute totals elsewhere
      newCart = [...cart, { id, name, category, unitPrice: price, amount: 1 }];
    }

    persistCart(newCart);
  };

  const onClickRemoveCart = () => {
    const idx = cart.findIndex((item) => item.id === id);
    if (idx < 0) return;

    const item = cart[idx];
    let newCart;

    if (item.amount <= 1) {
      newCart = cart.filter((_, i) => i !== idx);
    } else {
      newCart = cart.map((it, i) =>
        i === idx ? { ...it, amount: it.amount - 1 } : it
      );
    }

    persistCart(newCart);
  };

  const email = user?.email;
  const deleteProduct = () => {
    axios
      .delete(`${url}/product/delete`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          id,
          email,
        },
      })
      .then((response) => {
        toast(response.data.message || 'Deleted', {
          position: 'top-right',
          type: 'success',
          theme: 'light',
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast(`${error}`, {
          position: 'top-right',
          type: 'error',
          theme: 'light',
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="mt-5 rounded-xl shadow-xl pb-4 dark:bg-slate-400" id={id}>
      <Link to={`/productDetails/${id}`}>
      <img
        src={`${url}/images/${imgURL}`} // NOTE: imageURL, not imgURL
        alt={name}
        className="rounded-lg w-full h-50 object-cover"
        />
        </Link>
      <div className="flex flex-col items-center">
        <div className="pt-2">
          <b>{name}</b>
        </div>
        <div>${price}</div>
        {inCart ? (
          <div className="flex my-2">
            <button
              className="bg-purple-700 text-white text-base px-3 py-1 rounded-xl"
              onClick={onClickRemoveCart}
              disabled={amount === 0}
            >
              -
            </button>
            <span className="text-center w-8 px-1 pt-1">{amount}</span>
            <button
              className="bg-purple-700 text-white text-base px-3 py-1 rounded-xl"
              onClick={onClickAddCart}
            >
              +
            </button>
          </div>
        ) : (
          <motion.button
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-purple-700 px-3 py-2 text-white text-base my-2 rounded-xl w-32"
            onClick={onClickAddCart}
          >
            Add to cart
          </motion.button>
        )}

          {/* <motion.button
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-purple-700 px-3 py-2 text-white text-base rounded-xl"
          >
            More Details
          </motion.button> */}

        {user?.isAdmin ? (
          <div className="mx-auto">
            <motion.button
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-purple-700 px-3 py-2 text-white text-base rounded-xl my-2"
              onClick={deleteProduct}
            >
              delete
            </motion.button>
            <ToastContainer />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
