import React, { createContext, useContext, useState } from 'react'
import { useCookies } from "react-cookie"

const ShopContext = createContext();


export const ShopContextProvider = (props) => {
    const [cookies] = useCookies(['cart'])
    const [cart, setCart] = useState(cookies.cart || [])
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActivTab] = useState("home")
    const [clientSecret, setClientSecret] = useState("");
    const [order, setOrder] = useState([])

    const contextValue = { cart, setCart, refresh, setRefresh, activeTab, setActivTab, order, setOrder, clientSecret, setClientSecret }
    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export const useShopContext = () => useContext(ShopContext);