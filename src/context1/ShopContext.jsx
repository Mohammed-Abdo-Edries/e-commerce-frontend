import React, { createContext, useContext, useState,useEffect } from 'react'
import { useCookies } from "react-cookie"
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../http-common"

const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const [theme, setTheme] = useState("light")
    const [cart, setCart] = useState(cookies.cart || [])
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const onClickRemove = () => {
    setCart([]);
    removeCookie('cart', { path: '/' });
    };
    useEffect(() => {
      var price = 0
      var amount = 0;
      cart.forEach((item) => {
        if (item.unitPrice && item.amount) {
          price += item.unitPrice * item.amount;
          amount += item.amount;
        }
      });
      setTotalPrice(price);
      setTotalAmount(amount);
    }, [cart, cookies.cart]);

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
    }, []);
  
    useEffect(() => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    const getProductsData = async (req, res) => {
      try {
          const response = await axios.get(url + "/product");
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
      useEffect(() => {
        console.log(products)
      getProductsData();
    },[])
    const bestSellers = products.filter(p => p.bestseller === true);
    const contextValue = { 
      cart,
      setCart,
      onClickRemove,
      totalAmount,
      totalPrice,
      theme,
      toggleTheme,
      products,
      getProductsData,
      bestSellers
      }
    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export const useShopContext = () => {
  const context = useContext(ShopContext); 
  if (!context) {
    throw new Error('useShopContext must be used within ShopContextProvider');
  }
  return context;
};