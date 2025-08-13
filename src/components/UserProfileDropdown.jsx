import Popup from "reactjs-popup"
import { FaUserCircle } from "react-icons/fa"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

function userProfileDropdown() {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const handelClick = () => {
        logout()
      }
  return (
    <Popup trigger={<button className='pl-2 mt-1 hover:scale-125 duration-300'><FaUserCircle /></button>} position="bottom right" closeOnDocumentClick>
    <div className='bg-zinc-200 w-60 h-60 py-2 px-4 rounded'>
      {user ?
        <div className='text-lg '>
          <div>{user.firstname + " " + user.lastname}</div>
          <div>{user.email}</div>
          <div><button className='pr-4 pl-4 pb-1' onClick={handelClick}>
            Log Out</button></div>
        </div>
        :
        <Link className='' to="/login">You are not logged in <span className='text-blue-700'>Login</span></Link>
      }
    </div>
  </Popup>
  )
}

export default userProfileDropdown