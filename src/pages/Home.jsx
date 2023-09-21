import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useShopContext } from '../Context/ShopContext';
import { motion, AnimatePresence } from "framer-motion"
import { getDress } from './Services'
import { getPants } from './Services'
import { getShirts } from './Services'
import { getShoes } from './Services'
import { getSearch } from './Services'
import { deleteAllProudcts } from './Services'
import { Product } from '../components/product'
import empty from "../assets/no-products.jpg"
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'
import '@dotlottie/player-component'

const Home = () => {
  const [results, setResults] = useState([]);
  const { search, activeTab } = useShopContext();
  const [dress, setDress] = useState([])
  const [pants, setPants] = useState([])
  const [shirts, setShirts] = useState([])
  const [shoes, setShoes] = useState([])
  const { user } = useAuthContext()
  const titles = gsap.utils.toArray('p')
  const tl = gsap.timeline({ repeat: -1 });
  titles.forEach(title => {
    const splitTitle = new SplitTextJS(title);
    tl
      .from(splitTitle.chars, {
        opacity: 0,
        y: 30,
        // y: 80,
        rotateX: -90,
        stagger: .02,
        delay: 1
      }, '<')
      .to(splitTitle.chars, {
        opacity: 0,
        y: -30,
        rotateX: 90,
        stagger: .02,
        // y: -80
      }, '<1')
  })
  const email = user?.email

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
  useEffect(() => {
    getSearch(search)
      .then((data) => {
        setResults(data)
      })
      .catch((error) => console.log(error))
  }, [shoes])
  return (
    <>
      <AnimatePresence initial={false}>
        {activeTab === "dress" &&
          <motion.div key="dress" mode='wait' layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ layout: { duration: .4 }, duration: .8, delay: .3 }}
            exit={{ opacity: 0, y: 20 }}
            className='text-center'
          >
            {dress.length ?
              <div className='grid mt-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5 mr-4 ml-4 sm:ml-24 '>
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
            <div>{dress.length ? user?.isAdmin ? <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: .5 }}
              className='bg-purple-700 px-3 py-2 text-white text-base block text-center mx-auto rounded-xl my-5'
              onClick={() => deleteAllProudcts(email, "dress")}>delete all products</motion.button> : null : null}</div>
          </motion.div>
        }
        {activeTab === "pants" &&
          <motion.div layout mode='wait' initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 20 }}>
            {pants.length ?
              <div className='grid mt-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 min-h-[32rem] mx-10'>
                {pants.map((product) => (
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
            <div>{pants.length ? user?.isAdmin ? <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: .5 }}
              className='bg-purple-700 px-3 py-2 text-white text-base block text-center mx-auto rounded-xl my-5'
              onClick={() => deleteAllProudcts(email, "pants")}>delete all products</motion.button> : null : null}</div>
          </motion.div>
        }
        {activeTab === "shirt" &&
          <motion.div layout mode='wait' initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0, y: 20 }}>
            {shirts.length ?
              <div className='grid mt-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 min-h-[32rem] mx-10'>
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
            <div>{shirts.length ? user?.isAdmin ? <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: .5 }}
              className='bg-purple-700 px-3 py-2 text-white text-base block text-center mx-auto rounded-xl my-5'
              onClick={() => deleteAllProudcts(email, "shirts")}>delete all products</motion.button> : null : null}</div>
          </motion.div>
        }
        {activeTab === "shoes" &&
          <motion.div layout initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0, y: 20 }} mode='wait'>
            {shoes.length ?
              <div className='grid mt-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 min-h-[32rem] mx-10'>
                {shoes.map((product) => (
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
            <div>{shoes.length ? user?.isAdmin ? <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: .5 }}
              className='bg-purple-700 px-3 py-2 text-white text-base block text-center mx-auto rounded-xl my-5'
              onClick={() => deleteAllProudcts(email, "shoes")}>delete all products</motion.button> : null : null}</div>
          </motion.div>
        }
        {activeTab === "search" &&
          <motion.div layout mode='wait' initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0, y: 20 }}>
            {results.length ?
              <div className='grid mt-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 min-h-[32rem] mx-10'>
                {results?.map((product) => (
                  <Product data={product} />
                ))
                }
              </div>
              :
              <div className='h-[calc(100vh+160px)]'>there are no products with this name</div>
            }
          </motion.div>
        }
        {activeTab === "home" &&
          <motion.div key="home" mode='wait' className='home ml-10 mr-8 px-2 h-[calc(100vh-180px)] sm:h-[calc(100vh+20px)] py-2 font-bold text-lg overflow-hidden'
            initial={{ opacity: 0, y: 40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 20 }}>
            <div className='mb-2 w-72 h-56 flex flex-col sm:flex-row sm:w-full sm:h-96'>
              <dotLottie-player className='basis-1/2'
                src='https://lottie.host/dd0d62d9-f05d-412f-b731-3c4ecd3589cb/2nd1hkC0N9.lottie'
                autoplay loop mode='normal' ></dotLottie-player>
            </div>
            <div className='gsap text-center leading-none'>
              <p>latest brands</p>
              <p>for all seasons</p>
              <p>always fits</p>
              <p>Monthly sales</p>
            </div>
            <motion.div className='sm:px-20 mt-8' initial={{ opacity: 0, y: 40 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: .5, delay: .5 }}
              exit={{ opacity: 0, y: 20 }}>
              Hi everyone!
              welcome to my ecommerce website!
              This is the place to come for all your shopping needs!
              We Have a wide range of clothes available, including costumes.
              We also have a great selection of sale items, so be sure to check them out!
              Thanks for visiting, and I hope you enjoy your shopping experience!
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default Home