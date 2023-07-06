import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../components/product'
import url from "../http-common"
import { useAuthContext } from '../hooks/useAuthContext'

const Shoes = () => {
  const [shoes, setShoes] = useState([])
  const { user } = useAuthContext()
  const deleteAllProudcts = () => {
    email = user?.email
    axios.delete(`${url}/product/deleteAllProudcts`,
      Headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          category: "dress",
          email
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
          category: "shoes"
        }
      })
      .then(response => {
        setShoes(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10'>
        {shoes.lenght ? shoes.map((product) => (
          <Product data={product} />
        )) : <div>there are no products</div>}
      </div>
      <div>{shoes.length ? user?.isAdmin ? <button className='border-4 border-black block text-center mx-auto px-2 py-1 rounded-xl my-5' onClick={deleteAllProudcts}>delete all products</button> : null : null}</div>
    </>

  )
}

export default Shoes