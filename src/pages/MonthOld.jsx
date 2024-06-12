import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Headerr from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';

const MonthOld = () => {
    const {products} = useSelector((state)=>state.products);
    const [data,setData] = useState([]);


    useEffect(()=>{
        const res = products.filter((product)=>product.category === "3 months old chicks");

        setData(res)
    },[products])
  return (
    <div className='bg-slate-100'>
        <Headerr />
        {
            data?.length > 0 ? (
               <div>
                <div>
                    <h1 className='text-center text-xl my-2 800px:text-2xl'>Three months old chicks</h1>
                </div>
                 <div className='flex flex-wrap justify-around 800px:px-4'>
                    {
                        data?.map((product,index)=>{
                            return (
                                <div key={index} className='my-1 800px:my-2 w-[50%] 800px:w-[19.5%]'>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                    }
                </div>
               </div>
            ):(
                <div className='h-screen w-full flex justify-center items-center'>
                <h1>
                    No data found!
                </h1>
            </div>
            )
        }

        <Footer />
    </div>
  )
}

export default MonthOld