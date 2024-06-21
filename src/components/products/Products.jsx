import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import Headerr from '../layout/Header'
const Products = () => {
    const {products,loading} = useSelector((state)=>state.products)
  return (
    <div className='bg-slate-100 py-2'>
     <h1 className='text-2xl text-center text-black  font-semibold'>
            Our Products
        </h1>
     <div className='flex flex-wrap 800px:px-4 bg-slate-100'>
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
                        <div key={index} className='my-1 800px:my-2 w-[50%] 800px:w-[19.5%]'>
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