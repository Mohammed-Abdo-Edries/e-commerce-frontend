import React from "react"
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Pants from './Pants'
import Shirts from './Shirts'
import Dress from './Dress'
import Shoes from './Shoes'
import Details from './Details'
import AdminsOnly from './AdminsOnly'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <div className="pages">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/pants" element={<Pants />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/shirts" element={<Shirts />} />
                    <Route path="/dress" element={<Dress />} />
                    <Route path="/shoes" element={<Shoes />} />
                    <Route path="/productDetails/:id" element={<Details />} />
                    <Route path="/adminsonly" element={<AdminsOnly />} />
                </Routes>
            </div>
        </AnimatePresence>
    )
}
export default AnimatedRoutes