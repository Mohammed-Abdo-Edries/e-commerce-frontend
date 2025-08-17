import { useShopContext } from '../context1/ShopContext';
import { motion, AnimatePresence } from "framer-motion"
import '@dotlottie/player-component'
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import Product from '../components/product';
const Home = () => {
  const { bestSellers } = useShopContext();
  return (
    <>
      <AnimatePresence initial={false}>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">          
          {bestSellers.map((item, index) => (
            <Product
            key={index}
              name={item.name}
              description={item.description}
              id={item._id}
              price={item.price}
              imageURL={item.imageURL}
              category={item.category}
              />
            ))
          }
        </div>
              <div className='w-full sm:w-1/2 flex items-center justify-center p-6'>
              <dotLottie-player className='w-full max-w-md'
                src='https://lottie.host/dd0d62d9-f05d-412f-b731-3c4ecd3589cb/2nd1hkC0N9.lottie'
                autoplay loop mode='normal' style={{height: '200px', margin: '0 auto'}} ></dotLottie-player>
                </div>
                </div>
              <OurPolicy />
              <NewsletterBox />
          </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Home