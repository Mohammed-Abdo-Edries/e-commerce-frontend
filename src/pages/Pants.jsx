import React, { useEffect, useState } from 'react'
import { Product } from '../components/product'
import axios from 'axios'

const Pants = () => {
  const [pants, setPants] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/product/',
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          category: "pants"
        }
      })
      .then(response => {
        setPants(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <div className='grid mt-5 grid-cols-3 gap-10'>
        {pants.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  )
}

export default Pants