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
  const { id, name, description, price, imgURL, category, subCategory } = props;
  const { user } = useAuthContext();
  const { getProductsData } = useShopContext();

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
        getProductsData();
      })
      .catch((error) => {
        toast(`${error.response.data.message}`, {
          position: 'top-right',
          type: 'error',
          theme: 'light',
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="mt-5 rounded-xl pb-4 dark:bg-slate-400" id={id}>
      <Link to={`/product/${id}`}>
      <img
        src={`${url}/images/${imgURL}`} 
        alt={name}
        className="rounded-lg w-full h-auto object-cover"
        />
        </Link>
      <div className="flex flex-col">
        <div className="pt-2">
          <div className='font-bold'>{name}</div>
          {/* <div>{category}</div> */}
          <div>{subCategory}</div>
        </div>
        <div className='font-bold'>${price}</div>
        {/* {inCart ? (
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
        )} */}

        {user?.isAdmin ? (
          <div className="">
            <motion.button
              // initial={{ x: -250 }}
              // animate={{ x: 0 }}
              // transition={{ delay: 0.2 }}
              className="bg-black px-3 py-2 mt-2 text-white 
              text-base rounded-xl animate-slideIn hover:scale-125 duration-300"
              onClick={deleteProduct}
            >
              Delete
            </motion.button>
            <ToastContainer />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
