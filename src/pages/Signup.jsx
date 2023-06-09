import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const {signup, error, isLoading} = useSignup()
    const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(firstname, lastname, email, password)  
    }
  return (
    <div className="myform h-screen flex justify-center items-center">
    <form className='signup h-64 w-96 py-5 px-6 rounded-lg' onSubmit={handleSubmit}>
      <h3 className='pb-5 text-4xl'>Sign up</h3>
      <div className='formdiv h-12 mb-4 relative'>
      <input type="name" placeholder=' ' 
        className='forminput w-full h-full text-lg absolute p-4 bg-none rounded-lg  outline-none focus:border-blue-500 transition duration-200' 
        onChange={(e) => setFirstname(e.target.value)} value={firstname} />
        <label className='formlable absolute bg-white text-gray-700 text-base top-2 left-4 p-1'>firstname</label>
        </div>
      <div className='formdiv h-12 mb-4 relative'>
      <input type="name" placeholder=' ' 
        className='forminput w-full h-full text-lg absolute p-4 bg-none rounded-lg  outline-none focus:border-blue-500 transition duration-200' 
        onChange={(e) => setLastname(e.target.value)} value={lastname} />
        <label className='formlable absolute bg-white text-gray-700 text-base top-2 left-4 p-1'>lastname</label>
        </div>
      <div className='formdiv h-12 mb-4 relative'>
        <input type="email" placeholder=' ' 
        className='forminput w-full h-full text-lg absolute p-4 bg-none rounded-lg  outline-none focus:border-blue-500 transition duration-200' 
        onChange={(e) => setEmail(e.target.value)} value={email} />
        <label className='formlable absolute bg-white text-gray-700 text-base top-2 left-4 p-1'>Email</label>
      </div>
      <div className='formdiv h-12 mb-2 relative'>
        <input type="password" placeholder=' '
        className='forminput w-full h-full absolute text-lg p-4 bg-none rounded-lg  outline-none focus:border-blue-500 transition duration-200'
        onChange={(e) => setPassword(e.target.value)} value={password} />
        <label className='formlable absolute bg-white text-gray-700 text-base top-2 left-4 p-1'>Password</label>
      </div>
      <button className='pt-2 p-2 ml-auto bg-blue-600 w-20 block cursor-pointer text-white rounded-lg' disabled={isLoading}>Sign up</button>
      {error && <div className='error'>{error}</div>}
    </form>
    <div>you dont have an account?<Link className='ml-4 text-lg' to="/signup">Signup</Link></div>
    </div>
  )
}

export default Signup