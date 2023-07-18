import { useEffect } from 'react';
import Navbar from './components/Navbar'
import AOS from "aos";
import "./index.css"
import Footer from './components/footer';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './pages/AnimatedRoutes';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="App bg-zinc-200 text-gray-700 dark:bg-gray-900 dark:text-zinc-200">
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
