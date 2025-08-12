import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Details from './pages/Details'
import AdminsOnly from './pages/AdminsOnly'
import NotFound from "./pages/NotFound"
import "./index.css"
import { useAuthContext } from './hooks/useAuthContext'
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Footer from './components/Footer2';
import { ShopContextProvider } from './context1/ShopContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white text-gray-700 dark:bg-gray-900 dark:text-zinc-200">
      <BrowserRouter>
      <ShopContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productDetails/:id" element={<Details />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {user?.isAdmin ?
            <Route path="/adminsonly" element={<AdminsOnly />} />
            :

            <Route path="/" element={<Navigate to='/' />} />
          }

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
        </ShopContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
