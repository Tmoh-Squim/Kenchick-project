import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import Headerr from '../layout/Header'
import Footer from "../layout/Footer"
const Products = () => {
    const {products,loading} = useSelector((state)=>state.products)
  return (
    <div className='bg-gray-200'>
    <Headerr />
     <h1 className='text-2xl text-center text-black my-3 font-semibold'>
            Our Products
        </h1>
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


   <Footer />
   </div>
  )
}

export default Products