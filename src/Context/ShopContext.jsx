import React, { createContext, useContext, useState } from 'react'
import { useCookies } from "react-cookie"

const ShopContext = createContext();


export const ShopContextProvider = (props) => {
    const [cookies] = useCookies(['cart'])
    const [cart, setCart] = useState(cookies.cart || [])
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActivTab] = useState("home")
    const [search, setSearch] = useState('')

    const contextValue = { cart, setCart, search, setSearch, refresh, setRefresh, activeTab, setActivTab }
    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export const useShopContext = () => useContext(ShopContext);