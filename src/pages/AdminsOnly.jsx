import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
// import apiClint from "../http-common"
import axios from "axios"

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
        const url = "http://localhost:4000/product/create"
        const token = user.token;
        const formData = new FormData()
        formData.append('name', title);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('details', details);
        formData.append('image', image);
        axios.post(url, formData,
            Headers = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => console.log(response))
            .catch(error =>
                console.log(error)
            )
    }
    return (
        <div>
            <form onSubmit={sendImage} action="http://localhost:4000/product/create" method="post" encType="multipart/form-data">
                <input type='name' placeholder="name" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                <br />
                <hr />
                <br />
                <input type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} value={price} ></input>
                <br />
                <hr />
                <br />
                <select placeholder="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option onClick={() => {
                        setCategory("pants")
                    }} >pants</option>
                    <option onClick={() => setCategory("shirt")} >shirt</option>
                    <option onClick={() => setCategory("dress")} >dress</option>
                </select>
                <br />
                <hr />
                <br />
                <input placeholder="details" type='text' onChange={(e) => setDetails(e.target.value)} value={details}></input>
                <br />
                <hr />
                <br />
                <input type="file" onChange={handelChange} />
                <br />
                <button type="submit" className='pt-2 p-2 ml-auto bg-blue-600 w-20 block cursor-pointer text-white rounded-lg' onClick={() => console.log(category)} >Do Itttt</button>
            </form>
        </div>
    )
}

export default AdminsOnly