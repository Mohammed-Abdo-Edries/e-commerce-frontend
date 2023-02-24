import { useState } from "react"

const AdminsOnly = () => {
    const [image, setImage] = useState();
    const handelImage = (event) => {
        setImage(event.target.files[0])
    }
    const sendImage = (event) => {
        let formData = new FormData();
        formData.append('avatar', image);
        fetch('https://localhost:4000/product/create', {
            method: 'post',
            body: formData,
        })
        .then((res) => res.text())
        .then((resBody) => {
            console.log(resBody);
        })
    }
  return (
    <div>
        <input type="file" onChange={handelImage} />
        <button onClick={sendImage}>upload</button>
    </div>
  )
}

export default AdminsOnly