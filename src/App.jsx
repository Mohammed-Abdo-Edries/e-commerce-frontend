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
import Footer from './components/footer';
import "./index.css"
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()
  const url = "https://luxury-t0tu.onrender.com"
  return (
    <div className="App bg-white text-gray-700 dark:bg-gray-900 dark:text-zinc-200">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path={url + "/"} element={<Home />} />
          <Route path={url + "/login"} element={<Login />} />
          <Route path={url + "/signup"} element={<Signup />} />
          <Route path={url + "/checkout"} element={<Checkout />} />
          <Route path={url + "/productDetails/:id"} element={<Details />} />
          {user?.isAdmin ?
            <Route path={url + "/adminsonly"} element={<AdminsOnly />} />
            :

            <Route path={url + "/"} element={<Navigate to={url + '/'} />} />
          }

          <Route path={url + "/*"} element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
