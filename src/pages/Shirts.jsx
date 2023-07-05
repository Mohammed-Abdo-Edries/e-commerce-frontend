import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../components/product'
import url from "../http-common"
import { useAuthContext } from '../hooks/useAuthContext'

const Shirts = () => {
  const [shirts, setShirts] = useState([])
  const { user } = useAuthContext()
  const deleteAllProudcts = () => {
    axios.delete(`${url}/product/deleteAllProudcts`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          category: "shirts"
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
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
    <>
      <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
        {shirts.lenght ? shirts.map((product) => (
          <Product data={product} />
        )) : <div>there are no products</div>}
      </div>
      <div>{shirts.length ? user?.isAdmin ? <button className='border-4 border-black px-2 py-1 rounded-xl my-5' onClick={deleteAllProudcts}>delete all products</button> : null : null}</div>
    </>

  )
}

export default Shirts