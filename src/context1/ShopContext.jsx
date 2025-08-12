import React, { createContext, useContext, useState } from 'react'
import { useCookies } from "react-cookie"
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../http-common"

const ShopContext = createContext();


export const ShopContextProvider = (props) => {
    const [cookies] = useCookies(['cart'])
    const [cart, setCart] = useState(cookies.cart || [])
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActivTab] = useState("home")
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([]);

    const getProductsData = async (req, res) => {
        try {
          const response = await axios.get(url + "/product/");
          if (response.data.success) {
            setProducts(response.data.products);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

    const contextValue = { 
      cart,
      setCart,
      products,
      search,
      setSearch,
      refresh,
      setRefresh,
      activeTab,
       setActivTab }
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