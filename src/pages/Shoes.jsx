import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../components/product'
import url from "../http-common"

const Shoes = () => {
  const [shoes, setShoes] = useState([])
  useEffect(() => {
    axios.get(`${url}/product/`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          category: "shoes"
        }
      })
      .then(response => {
        setShoes(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='grid mt-5 grid-cols-3 gap-10'>
      {shoes.lenght ? shoes.map((product) => (
        <Product data={product} />
      )) : <div>there are no products</div>}
    </div>
  )
}

export default Shoes