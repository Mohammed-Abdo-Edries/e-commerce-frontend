import React from 'react'
import PRODUCTS from '../components/products'
import { Product } from '../components/product'
                                                                                                                                                                                                                                 
const Pants = () => {
  return (
    <div>
      <div className='grid mt-5 grid-cols-3 gap-10'> 
        {PRODUCTS.map((product) => ( 
          <Product data={product} />
        ))}
        </div>
    </div>
  )
}

export default Pants