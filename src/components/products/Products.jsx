import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import Slider from '../../utils/Slider'

const Products = () => {
    const {products,loading} = useSelector((state)=>state.products)
  return (
   <div>
    <Slider />
     <div className='flex flex-wrap justify-between 800px:px-4 bg-gray-200'>
        {
            loading ? (
                <div>
                    <h2>
                        loading
                    </h2>
                </div>
            ):(
                <>
                {
                products?.length > 0 &&  products?.map((product,index)=>{
                    return (
                        <div key={index} className='my-1 800px:my-2 w-[50%] 800px:w-[240px]'>
                        <ProductCard product={product} />
                        </div>
                    )
                })
                }
                </>
            )
        }
        
    </div>
   </div>
  )
}

export default Products