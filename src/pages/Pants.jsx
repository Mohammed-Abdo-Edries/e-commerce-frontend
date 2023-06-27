import React, { useEffect, useState } from 'react'
import { Product } from '../components/product'
import axios from 'axios'
import url from "../http-common"

const Pants = () => {
  const [pants, setPants] = useState([])
  useEffect(() => {
    axios.get(`${url}/product/`,
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
        {pants.length ? pants.map((product) => (
          <Product data={product} />
        )) : <div>there are no products</div>}
      </div>
    </div>
  )
}

export default Pants