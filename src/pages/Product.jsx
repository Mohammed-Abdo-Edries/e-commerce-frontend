import { useEffect, useState } from 'react'
import { useShopContext } from '../context1/ShopContext';
import { useParams } from 'react-router-dom';
import { url } from "../http-common"
import { useCookies } from 'react-cookie';
import { motion } from "framer-motion"
import RelatedProducts from '../components/RelatedProducts';  
import { FaRegStar, FaStar } from 'react-icons/fa'
const Product = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([])
  const { cart, setCart, products } = useShopContext();
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);
  // const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((p) => p._id === id || p.id === id);
    if (product) {
      setDetails(product);
    }
    window.scrollTo(0, 0);
  }, [id, products]);
  useEffect(() => {
    const item = cart.find((item) => item.id === id);
      if (item) {
        setInCart(true);
        setAmount(item.amount);
      } else {
      setInCart(false);
      setAmount(0);
  }
  }, [id, cart, amount]);
  // useEffect(() => {
  //   axios.get(`${url}/product/${id}`,
  //     Headers = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         id: id
  //       }
  //     })
  //     .then(response => {
  //       setDetails(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(err => console.log(err))
  // }, [])
const onClickAddCart = () => {
  const currentIndex = cart.findIndex(item => item.id === id);

  if (currentIndex >= 0) {
    const updatedCart = [...cart];
    updatedCart[currentIndex].amount += 1;
    updatedCart[currentIndex].price =
      updatedCart[currentIndex].unitPrice * updatedCart[currentIndex].amount;

    setCart(updatedCart);
    setAmount(updatedCart[currentIndex].amount); 
    setCookies("cart", updatedCart, { path: "/" });
  } else {
    const newCart = [
      ...cart,
      {
        id: id,
        name: details.name,
        unitPrice: details.price, 
        price: details.price,    
        category: details.category,
        amount: 1,
      },
    ];

    setCart(newCart);
    setAmount(1);
    setCookies("cart", newCart, { path: "/" });
  }
};


  const onClickRemoveCart = () => {
  const currentIndex = cart.findIndex(item => item.id === id);

  if (currentIndex >= 0) {
    const updatedCart = [...cart];

    if (updatedCart[currentIndex].amount === 1) {
      updatedCart.splice(currentIndex, 1);
      setCart(updatedCart);
      setCookies('cart', updatedCart, { path: '/' });

      setInCart(false); 
      setAmount(0);       
    } else {
      updatedCart[currentIndex].amount -= 1;
      setCart(updatedCart);
      setCookies('cart', updatedCart, { path: '/' });

      setAmount(amount - 1);
    }
  }
};

  return (
    <motion.div id={details._id}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: .5, duration: .3 }} exit={{ opacity: 0, y: 20 }}>
      <div className='container mt-12'>
        <img 
       src={ details.imgURL &&
           typeof details.imgURL === "string" && !details.imgURL.startsWith("http") 
           && !details.imgURL.startsWith("/")
             ? `${url}/images/${details.imgURL}`
             : details.imgURL
         } alt={details.name}
         className='rounded-lg w-full h-auto pr-12' />
        <div className='flex flex-col text-left mt-8'>
          <div className='font-bold text-2xl'>{details.name}</div>
          <div className='pt-2 font-bold text-2xl'>{details.category}</div>
          <div className='flex'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <p className="pl-2">(122)</p>
          </div>
          <div className='pt-4 font-bold text-2xl'>{details.price}</div>
          <div className='pt-2'>{details.description}</div>
          {/* <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {details.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div> */}
          {
            inCart
              ?
              <div className='flex my-2' >
                <button className='bg-black px-3 py-2 text-white dark:bg-white dark:text-black text-base' onClick={onClickRemoveCart} disabled={amount === 0}>-</button>
                <div className='text-center w-8' >{amount}</div>
                <button className='bg-black px-3 py-2 text-white dark:bg-white dark:text-black text-base' onClick={onClickAddCart} >+</button>
              </div>
              :
              <motion.button className='text-left bg-black px-4 py-2 text-white dark:bg-white dark:text-black text-base w-36 my-4 animate-slideIn hover:scale-125 duration-300'
                onClick={onClickAddCart}
              >ADD TO CART</motion.button>
          }
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-gray-500 mt-2 mr-8 flex flex-col">
            <p>100% Original product</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
          {/* Description & Review Section */}
      <div className="mt-20 pr-12 sm:pr-0">
        <div className="flex">
          <b className="border pr-5 py-3 text-sm">Description</b>
          <p className="border py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* Display Related Products  */}
      <RelatedProducts
      currentId={id}
        category={details.category}
        subCategory={details.subCategory}
      />
        </div>
      </div>
    </motion.div>
  )
}

export default Product