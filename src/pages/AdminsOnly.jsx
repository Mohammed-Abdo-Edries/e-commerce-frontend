import { useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios"
import { url } from "../http-common"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AdminsOnly = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(false);
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [description, setDescription] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [image, setImage] = useState();
    const { user } = useAuthContext()

    const handelChange = (e) => {
        setImage(e.target.files[0])
    }
    const email = user?.email
    const sendImage = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name);
        formData.append('price', price);
        formData.append("description", description);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('image', image);
        formData.append("bestseller", String(bestseller));
        console.log(formData);
        axios.post(`${url}/product/create`, formData,
            Headers = {
                headers: {
                    sizes: { type: Array, required: true },
                    "Content-Type": "multipart/form-data",
                    email
                }
            })
            
            .then(response => {
                setIsLoading(false)
                toast(`${response.data.message}`, {
                    position: "top-right",
                    type: 'success',
                    theme: 'light',
                    autoClose: 5000
                })
            })
            .catch(error => {
                console.log(formData)
                setIsLoading(false),
                    toast(`${error}`, {
                        position: "top-right",
                        type: 'error',
                        theme: 'light',
                        autoClose: 5000
                    })
            }
            )
    }
    return (
        <motion.div initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: 'easeInOut' }} exit={{ opacity: 0, y: 20 }}>
            <div className="container mx-auto pt-8 pb-4">
                {user?.isAdmin ?
                    <>
                        <form onSubmit={sendImage} className="flex flex-col text-black" action={`${url}/product/create`} method="post" encType="multipart/form-data">
                            <input type='name' placeholder="name" className="border-2 border-gray-700 rounded-lg w-48 sm:w-60 pl-2 my-2 ml-10 py-1" onChange={(e) => setName(e.target.value)} value={name}></input>
                            <input type="number" placeholder="price" className="border-2 border-gray-700 pl-2 py-1 ml-10 my-2 rounded-lg w-48" onChange={(e) => setPrice(e.target.value)} value={price} ></input>
                            <input placeholder="description" type='text' className="border-2 border-gray-700 my-2 ml-10 rounded-lg w-52 sm:w-72 pl-2 py-1" onChange={(e) => setDescription(e.target.value)} value={description}></input>
                            <select className="py-1 pl-2 ml-10 rounded-lg my-2 w-48" onChange={(e) => setCategory(e.target.value)} value={category} >
                                <option onClick={() => setCategory("pants")} >men</option>
                                <option onClick={() => setCategory("shirt")} >women</option>
                                <option onClick={() => setCategory("dress")} >kids</option>
                            </select>
                            <select className="py-1 pl-2 ml-10 rounded-lg my-2 w-48" onChange={(e) => setSubCategory(e.target.value)} value={subCategory} >
                                <option value="topwear" >topwear</option>
                                <option value="bottomwear" >bottomwear</option>
                                <option value="winterwear" >Winterwear</option>
                            </select>
                            <label className="ml-12">BestSeller:</label>
                            <select
                            className="py-1 pl-2 ml-10 rounded-lg my-2 w-48"
                            onChange={(e) => setBestseller(e.target.value === "true")}
                            value={bestseller}
                            >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                            </select>

                            <input type="file" onChange={handelChange} className='ml-10 my-2' />
                            <motion.button initial={{ x: -250 }} animate={{ x: -10 }}
                                transition={{ delay: .5 }} type="submit"
                                className='py-1 bg-purple-700 w-20 h-10 block cursor-pointer text-white rounded-lg mt-4 mx-auto'
                                onClick={() => {
                                    setIsLoading(true)
                                }} >
                                {isLoading ? <div><ScaleLoader className='block w-20 h-10' color="white"
                                    size={1} /></div>
                                    :
                                    <div>Do Ittt</div>
                                }
                            </motion.button>
                        </form>
                        <ToastContainer />
                    </>
                    :
                    <div><Link to='/login' className="text-blue-200">Login</Link></div>
                }
            </div>
        </motion.div>
    )
}

export default AdminsOnly