import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Pants from './pages/Pants'
import Shirts from './pages/Shirts'
import Dress from './pages/Dress'
import Details from './components/Details'
import AdminsOnly from './pages/AdminsOnly'
import AOS from "aos";
import "./index.css"

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/pants" element={<Pants />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/shirts" element={<Shirts />} exact />
            <Route path="/dress" element={<Dress />} exact />
            <Route path="/productDetails/:id" element={<Details />} exact />
            <Route path="/adminsonly" element={<AdminsOnly />} exact />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
