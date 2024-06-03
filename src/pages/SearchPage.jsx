import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { Server } from '../server';

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.products);
  const [searchIcon, setSearchIcon] = useState(true);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchIcon(false);
    } else {
      setSearchIcon(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const res = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(res);
    } else {
      setData([]);
    }
  }, [searchQuery]);
  console.log('data',data)

  return (
    <div className='bg-slate-100 p-1 w-full'>
        <div className="flex justify-around px-2 items-center relative">
            <input
              type="text"
              placeholder="Search chick..."
              className="h-[2.5rem] px-2 w-full rounded-xl outline-none bg-slate-300"
              onChange={(e) => setQuery(e.target.value)}
            />

            {searchIcon && (
              <div className="absolute right-4 top-2 cursor-pointer">
                <AiOutlineSearch size={24} />
              </div>
            )}
          </div>
          <div className='w-full'>
          {
            data?.length > 0 ? (
                <>
                {
                    data?.map((product,index)=>{
                        <div key={index}>
                            <img src={`${Server}/${product?.image}`} alt={product?.title} className='w-[130px] h-[130px]' />
                        </div>
                    })
                }
                </>
            ):(
                <div className='w-full h-screen flex justify-center items-center'>
                  <h1 className='text-xl'>
                    Search for product
                  </h1>
                </div>
            )
          }
          </div>
    </div>
  )
}

export default SearchPage