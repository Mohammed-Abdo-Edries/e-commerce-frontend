import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios"
import url from "../http-common"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
const AdminsOnly = () => {
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState();
    const [details, setDetails] = useState();
    const { user } = useAuthContext()


    const handelChange = (e) => {
        setImage(e.target.files[0])
    }
    const sendImage = (e) => {
        e.preventDefault()
        const token = user.token;
        const formData = new FormData()
        formData.append('name', title);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('details', details);
        formData.append('image', image);
        email = user?.email

        axios.post(`${url}/product/create`, formData,
            Headers = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    email
                }
            })
            .then(response => console.log(response))
            .catch(error =>
                console.log(error)
            )
    }
    return (
        <motion.div initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'easeInOut' }} exit={{ opacity: 0, y: 20 }}>
            <div className="container mx-auto pt-8 pb-4 h-[calc(100vh-120px)]">
                {user?.isAdmin ?
                    <form onSubmit={sendImage} className="flex flex-col" action={`${url}/product/create`} method="post" encType="multipart/form-data">
                        <input type='name' placeholder="name" className="border-2 border-gray-700 rounded-lg w-48 sm:w-60 pl-2 my-2 ml-10 py-1" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                        <input type="number" placeholder="price" className="pl-2 py-1 ml-10 my-2 rounded-lg w-48" onChange={(e) => setPrice(e.target.value)} value={price} ></input>
                        <select placeholder="category" className="py-1 pl-2 ml-10 rounded-lg my-2 w-48" onChange={(e) => setCategory(e.target.value)} value={category} >
                            <option onClick={() => setCategory("pants")} >pants</option>
                            <option onClick={() => setCategory("shirt")} >shirt</option>
                            <option onClick={() => setCategory("dress")} >dress</option>
                            <option onClick={() => setCategory("shoes")} >shoes</option>
                        </select>
                        <input placeholder="details" type='text' className="border-2 border-gray-700 my-2 ml-10 rounded-lg w-80 pl-2 py-1" onChange={(e) => setDetails(e.target.value)} value={details}></input>
                        <input type="file" onChange={handelChange} className='ml-10 my-2' />
                        <motion.button initial={{ x: -250 }} animate={{ x: -10 }} transition={{ delay: 1.5, type: 'spring', stiffness: 500 }} whileHover={{ scale: 1.1 }} type="submit"
                            className='py-2 px-2 bg-purple-700 w-20 block cursor-pointer text-white rounded-lg mt-4 mx-auto' onClick={() => console.log(category)} >Do Itttt</motion.button>
                    </form>
                    :
                    <div className="ml-4">why are you here, you must <Link className='ml-1 text-blue-700' to="/login">Login</Link></div>
                }
            </div>
        </motion.div>
    )
}

export default AdminsOnly