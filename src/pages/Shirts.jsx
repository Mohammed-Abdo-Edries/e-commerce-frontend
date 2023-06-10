import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../components/product'
import url from "../http-common"

const Shirts = () => {
  const [shirts, setShirts] = useState([])
  useEffect(() => {
    axios.get(`${url}/product/`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          category: "shirt"
        }
      })
      .then(response => {
        setShirts(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='grid mt-5 grid-cols-3 gap-10'>
      {shirts.map((product) => (
        <Product data={product} />
      ))}
    </div>
  )
}

export default Shirts