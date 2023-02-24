import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }
  return (
    <div className="myform h-screen flex justify-center items-center">
      <form className='Login signup h-64 w-96 py-5 px-6 rounded-lg' onSubmit={handleSubmit}>
        <h3 className="pb-5 text-4xl">Log in</h3>
        <div className="formdiv h-12 mb-4 relative">
          <input type="email" placeholder=' ' className="forminput w-full h-full text-lg absolute p-4 bg-none rounded-lg  outline-none focus:border-blue-500 transition duration-200" onChange={(e) => setEmail(e.target.value)} value={email} />
          <label className="formlable absolute bg-white text-gray-700 text-base top-2 left-4 p-1">Email</label>
        </div>
        <div className="formdiv h-12 mb-2 relative">
          <input type="password" placeholder=' ' className="forminput w-full h-full absolute text-lg p-4 bg-none rounded-lg  outline-none focus:border-blue-500 transition duration-200" onChange={(e) => setPassword(e.target.value)} value={password} />
          <label className="formlable absolute bg-white text-gray-700 text-base top-2 left-4 p-1">Password</label>
        </div>
        <input className='pt-2 p-2 ml-auto bg-blue-600 w-20 block cursor-pointer text-white rounded-lg' type="submit" value="Sign up" />
      </form>
    </div>
  )
}

export default Login