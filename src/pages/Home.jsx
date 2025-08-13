import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useShopContext } from '../context1/ShopContext';
import { motion, AnimatePresence } from "framer-motion"
import { getDress } from './Services'
import { getPants } from './Services'
import { getShirts } from './Services'
import { getShoes } from './Services'
import { getSearch } from './Services'
import { deleteAllProudcts } from './Services'
import Product  from '../components/product'
import empty from "../assets/no-products.jpg"
import '@dotlottie/player-component'
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => {
  const [results, setResults] = useState([]);
  const { search, activeTab } = useShopContext();
  const [dress, setDress] = useState([])
  const [pants, setPants] = useState([])
  const [shirts, setShirts] = useState([])
  const [shoes, setShoes] = useState([])
  const { user } = useAuthContext()
  const email = user?.email

  // useEffect(() => {
  //   getDress()
  //     .then((data) => {
  //       setDress(data)
  //     })
  // }, [dress])
  // useEffect(() => {
  //   getPants()
  //     .then((data) =>
  //       setPants(data)
  //     )
  //     .catch((error) => console.log(error))
  // }, [pants])
  // useEffect(() => {
  //   getShirts()
  //     .then((data) =>
  //       setShirts(data)
  //     )
  //     .catch((error) => console.log(error))
  // }, [shirts])
  // useEffect(() => {
  //   getShoes()
  //     .then((data) =>
  //       setShoes(data)
  //     )
  //     .catch((error) => console.log(error))
  // }, [shoes])
  // useEffect(() => {
  //   getSearch(search)
  //     .then((data) => {
  //       setResults(data)
  //     })
  //     .catch((error) => console.log(error))
  // }, [shoes])
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
              <div className='grid mt-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5'>
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
          <motion.div key="home" mode='wait' className=' py-2 font-bold text-lg overflow-hidden'
            initial={{ opacity: 0, y: 40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 20 }}>
              <div className='flex flex-col sm:flex-row w-full'>
              <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-16 px-6'>
                <div className="text-[#414141] dark:text-zinc-200">
                  <div className="flex items-center gap-2">
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141] "></p>
                    <p className="font-semibold text-sm md:text-base">OUR BESTSELLERS</p>
                  </div>
                  <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
                    Latest Arrivals
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-sm md:text-base">SHOP NOW</div>
                    <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                  </div>
              </div>
              </div>
              <div className='w-full sm:w-1/2 flex items-center justify-center p-6'>
              <dotLottie-player className='w-full max-w-md'
                src='https://lottie.host/dd0d62d9-f05d-412f-b731-3c4ecd3589cb/2nd1hkC0N9.lottie'
                autoplay loop mode='normal' style={{height: '200px', margin: '0 auto'}} ></dotLottie-player>
                </div>
                </div>
              <OurPolicy />
              <NewsletterBox />
              {/* <Footer /> */}
            {/* <motion.div className='mt-8' initial={{ opacity: 0, y: 40 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: .5, delay: .5 }}
              exit={{ opacity: 0, y: 20 }}>
              Hi everyone!
              welcome to my ecommerce website!
              This is the place to come for all your shopping needs!
              We Have a wide range of clothes available, including costumes.
              We also have a great selection of sale items, so be sure to check them out!
              Thanks for visiting, and I hope you enjoy your shopping experience!
            </motion.div> */}
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default Home