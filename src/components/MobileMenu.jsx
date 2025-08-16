import { BiMenuAltRight } from "react-icons/bi"
import Popup from "reactjs-popup"

function MobileMenu() {
  return (
    <Popup trigger={<button><BiMenuAltRight className='ml-2 text-2xl sm:hidden hover:scale-125 duration-300'/></button>} closeOnDocumentClick position={"bottom right"}>
                    <ul className='w-60 rounded-md bg-white dark:bg-slate-950 dark:text-white animate-slideInDown'>
                        <li className='pb-2 hover:pl-6 pl-4 py-2 border-slate-300 border-b-2'>
                            <a to='/' key={"home"} href="/home">Home</a>
                        </li>
                        <li className='pb-2 hover:pl-6 pl-4 py-2 border-slate-300 border-b-2'>
                            <a to='/collection' key={"about"} href="/collection">Collections</a>
                        </li>
                        <li className='pb-2 hover:pl-6 pt-2 border-slate-300 pl-4 border-b-2'>
                            <a to='/skills' key={"skills"} href="/about">About</a>
                        </li>
                        <li className='pb-2 hover:pl-6 py-2 border-slate-300 pl-4 border-b-2'>
                            <a to='contact' key={"projects"} href="contact">Contact</a>
                        </li>
                    </ul>
                </Popup>
  )
}

export default MobileMenu