import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Checkout from './pages/checkout'
import Details from './pages/Details'
import AdminsOnly from './pages/AdminsOnly'
import NotFound from "./pages/NotFound"
import Footer from './components/footer';
import AOS from "aos";
import "./index.css"
import { useAuthContext } from './hooks/useAuthContext'
import { useShopContext } from './Context/ShopContext';
import { loadStripe } from '@stripe/stripe-js'
import { stripeKey } from './http-common'
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { user } = useAuthContext()
  const { clientSecret } = useShopContext()
  const stripePromise = loadStripe(stripeKey)
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <div className="App bg-white text-gray-700 dark:bg-gray-900 dark:text-zinc-200">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productDetails/:id" element={<Details />} />
          {user?.isAdmin ?
            <Route path="/adminsonly" element={<AdminsOnly />} />
            :

            <Route path="/" element={<Navigate to='/' />} />
          }

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
