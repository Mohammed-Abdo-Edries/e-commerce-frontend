import { Link } from 'react-router-dom'
import { useShopContext } from '../Context/ShopContext';
import { AiFillHome } from "react-icons/ai"
import { GiLargeDress, GiConverseShoe, GiArmoredPants, GiTShirt } from "react-icons/gi"
const Footer = () => {
    const { setActivTab } = useShopContext();
    return (
        <>
            <div className=" block bottom-0 w-full mt-auto text-center py-4 ">
                &copy; {new Date().getFullYear()} <a href="https://portfolio-sage-nine-23.vercel.app" className="text-blue-700" target="_blank" rel="noopener noreferrer">Mohammed Abdo</a>. All Rights are Reserved
            </div>
            <div className="py-2 flex sticky bottom-0 bg-zinc-200 dark:bg-gray-900 dark:text-zinc-200 sm:hidden h-14">
                <Link to="/" className='mx-auto text-center' onClick={() => setActivTab("home")}><AiFillHome className="text-lg mx-auto" />Home</Link>
                <Link to="/" className='mx-auto' onClick={() => setActivTab("dress")}><GiLargeDress className="text-lg mx-auto" />dress</Link>
                <Link to="/" className='mx-auto' onClick={() => setActivTab("pants")}><GiArmoredPants className="text-lg mx-auto" />pants</Link>
                <Link to="/" className='mx-auto' onClick={() => setActivTab("shirt")}><GiTShirt className="text-lg mx-auto" />shirts</Link>
                <Link to="/" className='mx-auto ' onClick={() => setActivTab("shoes")}><GiConverseShoe className="text-xl mx-auto" />shoes</Link>
            </div>
        </>
    )
}

export default Footer