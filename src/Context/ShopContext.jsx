import React, { createContext, useContext, useState } from 'react'
// import PRODUCTS from '../components/products'
import Cart from "../components/Cart"
import { useCookies } from "react-cookie"

const ShopContext = createContext();

// export const getDefaultCart = () => {
//     let cart = {};
//     for (let i = 1; i < PRODUCTS.length + 1; i++) {
//         cart[i] = 0;
//     }
//     return cart;
// };

export const ShopContextProvider = (props) => {
    const [cookies] = useCookies(['cart'])
    const [cart, setCart] = useState(cookies.cart || [])
    const [refresh, setRefresh] = useState(false);
    // const [cartItems, setCartItems] = useState(getDefaultCart());

    const [open, setOpen] = useState(false)
    const openCart = () => {
        setOpen(true);
    }
    const closeCart = () => {
        setOpen(false);
    }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
    //             totalAmount += cartItems[item] * itemInfo.price;
    //         }
    //     }
    //     return totalAmount;
    // }
    // const addToCart = (itemId) => {
    //     setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    // };

    // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    // };

    // const updateItemAmount = (newAmount, itemId) => {
    //     setCartItems((prev) => ({...prev, [itemId]: newAmount }));
    // };
    // const contextValue = { cartItems, addToCart, removeFromCart, updateItemAmount, getTotalCartAmount, closeCart, openCart }
    const contextValue = { cart, setCart, refresh, setRefresh, openCart, closeCart }
    return <ShopContext.Provider value={contextValue}>
        {props.children}
        <Cart open={open} />
    </ShopContext.Provider>
}

export const useShopContext = () => useContext(ShopContext);