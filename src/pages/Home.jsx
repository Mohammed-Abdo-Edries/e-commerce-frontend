import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useShopContext } from '../Context/ShopContext';
import { motion, AnimatePresence } from "framer-motion"
import '@dotlottie/player-component'
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'
import { getDress } from './Services'
import { getPants } from './Services'
import { getShirts } from './Services'
import { getShoes } from './Services'
import { deleteAllProudcts } from './Services'
import { Product } from '../components/product'
import empty from "../assets/no-products.jpg"
import { CartItem } from '../components/cartItem';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
const Home = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart, setCart, refresh, setOrder, order } = useShopContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const [dress, setDress] = useState([])
  const [pants, setPants] = useState([])
  const [shirts, setShirts] = useState([])
  const [shoes, setShoes] = useState([])
  const { user } = useAuthContext()
  const { activeTab } = useShopContext();
  const email = user?.email
  const titles = gsap.utils.toArray('p')
  const tl = gsap.timeline({ repeat: -1 });
  titles.forEach(title => {
    const splitTitle = new SplitTextJS(title);
    tl
      .from(splitTitle.chars, {
        opacity: 0,
        y: 30,
        delay: 0.5
      }, '<')
      .to(splitTitle.chars, {
        opacity: 0,
        y: -30,
      }, '<1')
  })
  useEffect(() => {
    var price = 0
    var amount = 0;
    cart.forEach((item) => {
      if (item.price && item.amount) {
        price += item.price;
        amount += item.amount;
      }
    });
    setTotalPrice(price);
    setTotalAmount(amount);
  }, [cart, cookies.cart, refresh]);
  const onClickRemove = () => {
    setCart([]);
    removeCookie('cart', { path: '/' });
  };

  const grabeOrder = () => {
    setOrder(cart.map((item) => {
      const id = item.id
      const amount = item.amount
      return { id, amount }
    })
    )
    console.log(order)
  }

  useEffect(() => {
    getDress()
      .then((data) => {
        setDress(data)
      })
  }, [dress])
  useEffect(() => {
    getPants()
      .then((data) =>
        setPants(data)
      )
      .catch((error) => console.log(error))
  }, [pants])
  useEffect(() => {
    getShirts()
      .then((data) =>
        setShirts(data)
      )
      .catch((error) => console.log(error))
  }, [shirts])
  useEffect(() => {
    getShoes()
      .then((data) =>
        setShoes(data)
      )
      .catch((error) => console.log(error))
  }, [shoes])
  const deleteAllDress = (email) => {
    deleteAllProudcts(email)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      {activeTab === "dress" &&
        <AnimatePresence>
          <motion.div key="dress" mode='wait'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .8, delay: .3 }}
            exit={{ opacity: 0, y: 20 }}
            className='text-center'
          >
            {dress.length ?
              <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mr-10 ml-16 sm:ml-24'>
                {dress &&
                  dress.map((product) => (
                    <Product data={product} />
                  ))
                }
              </div>
              :
              <div className='container text-center mx-auto h-[calc(100vh-160px)]'>
                <img className="rounded-xl block mx-auto mt-10  h-96 w-64 sm:w-96" src={empty} alt={"nnn"} />
                <div className='pt-10 sm:mt-4 '>there are no products</div>
              </div>
            }
            <div>{dress.length ? user?.isAdmin ? <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: 1.5, type: 'spring', stiffness: 500 }} whileHover={{ scale: 1.1 }}
              className='bg-purple-700 px-3 py-2 text-white text-base block text-center mx-auto rounded-xl my-5' onClick={() => deleteAllDress(email)}>delete all products</motion.button> : null : null}</div>
          </motion.div>
        </AnimatePresence>
      }
      {activeTab === "pants" &&
        <motion.div initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          exit={{ opacity: 0, y: 20 }}>
          {pants.length ?
            <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
              {pants &&
                pants.map((product) => (
                  <Product data={product} />
                ))
              }
            </div>
            :
            <div className='container text-center mx-auto h-[calc(100vh-160px)]'>
              <img className="rounded-xl block mx-auto mt-10 h-96 w-64 sm:w-96" src={empty} alt={"nnn"} />
              <div className='pt-4 sm:mt-4 '>there are no products</div>
            </div>
          }

        </motion.div>
      }
      {activeTab === "shirt" &&
        <motion.div initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          exit={{ opacity: 0, y: 20 }}>
          {shirts.length ?
            <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
              {shirts &&
                shirts.map((product) => (
                  <Product data={product} />
                ))
              }
            </div>
            :
            <div className='container text-center mx-auto h-[calc(100vh-160px)]'>
              <img className="rounded-xl block mx-auto mt-10 h-96 w-64 sm:w-96" src={empty} alt={"nnn"} />
              <div className='pt-4 sm:mt-4 '>there are no products</div>
            </div>
          }

        </motion.div>
      }
      {activeTab === "shoes" &&
        <motion.div initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          exit={{ opacity: 0, y: 20 }}>
          {shoes.length ?
            <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
              {shoes &&
                shoes.map((product) => (
                  <Product data={product} />
                ))
              }
            </div>
            :
            <div className='container text-center mx-auto h-[calc(100vh-160px)]'>
              <img className="rounded-xl block mx-auto mt-10 h-96 w-64 sm:w-96" src={empty} alt={"nnn"} />
              <div className='pt-4 sm:mt-4 '>there are no products</div>
            </div>
          }

        </motion.div>
      }
      {activeTab === "home" &&
        <motion.div key="home" mode='wait' className='home ml-10 mr-8 px-2 h-[calc(100vh+160px)] sm:h-screen mt-4 py-2 font-bold text-lg overflow-hidden'
          initial={{ opacity: 0, y: 40 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: .3 }}
          exit={{ opacity: 0, y: 20 }}>
          <div className='mt-4 ml-10'>Hello there {user ? user.firstname + " " + user.lastname : null}</div><br />
          <motion.div className='pt-4 sm:px-20 mt-8' initial={{ opacity: 0, y: 40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            exit={{ opacity: 0, y: 20 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore debitis dolorem suscipit consequuntur aliquam quos dolorum incidunt praesentium consectetur architecto?
          </motion.div>
          <div className='mt-8 mb-4 w-72 h-56 flex flex-col sm:flex-row sm:w-full sm:h-96'>
            <dotLottie-player className='basis-1/2'
              src='https://lottie.host/dd0d62d9-f05d-412f-b731-3c4ecd3589cb/2nd1hkC0N9.lottie'
              autoplay loop mode='normal' ></dotLottie-player>
            <div className='basis-1/2 mt-4'>
              <div className='gsap text-center leading-none'>
                <p>title1</p>
                <p>title2</p>
                <p>title3</p>
                <p>title4</p>
              </div>
              <div className='mt-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe voluptatum incidunt cupiditate quos quam commodi dolores nostrum vero accusamus reprehenderit, consequatur sint placeat tempore nobis! Nesciunt cum fuga itaque.</div>
            </div>
          </div>
        </motion.div>
      }
      {/* {activeTab === "checkout" &&
        <motion.div className='flex-column' >
          <div className='text-center w-full px-2 pb-4 h-full dark:bg-gray-900 dark:text-zinc-200' >
            {cart.length ?
              cart.map((product) => (
                <CartItem data={product} />
              )) :
              <div className='dark:mt-24 mx-auto mt-10 h-96 w-64 sm:h-96 sm:w-96'>
                <dotLottie-player
                  src='https://lottie.host/eafaeb00-9793-498d-8de3-cbdc40c88620/1zQdw7c2yr.lottie'
                  autoplay loop mode='normal' ></dotLottie-player>
                <h2 className='text-center mt-4' >You have'nt bought enything yet</h2>
              </div>
            }
            {cart.length ?
              <div className='flex-column' >
                <div >Product Amount: {totalAmount}</div>
                <div >Total Price: {totalPrice} $</div>
                <button className='' onClick={onClickRemove} >Remove All</button>
                <Link to='' onClick={grabeOrder}
                >Buy</Link>
              </div>
              : null}
          </div>
        </motion.div>
      } */}
    </>
  )
}

export default Home