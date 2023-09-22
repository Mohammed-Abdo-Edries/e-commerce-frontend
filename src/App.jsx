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
