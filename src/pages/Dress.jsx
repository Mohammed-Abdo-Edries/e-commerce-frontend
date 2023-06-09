import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../components/product'

const Dress = () => {
  const [dress, setDress] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/product/',
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          category: "dress"
        }
      })
      .then(response => {
        setDress(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='grid mt-5 grid-cols-3 gap-10'>
      {dress.map((product) => (
        <Product data={product} />
      ))}
    </div>
  )
}

export default Dress