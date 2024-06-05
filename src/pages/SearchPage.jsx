import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Server } from "../server";
import Ratings from "../utils/Rating";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.products);
  const [searchIcon, setSearchIcon] = useState(true);

  const navigate = useNavigate();

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

  return (
    <div className="bg-slate-50 px-1 py-3 w-full h-screen">
      <div className="flex justify-between items-center">
        <Link to={'/'}>
        <AiOutlineArrowLeft size={28} className="cursor-pointer" />
        </Link>

        <div className="flex justify-around w-[90%] px-2 items-center relative">
        <input
          type="text"
          placeholder="Search chick..."
          className="h-[2.5rem] px-2 w-full rounded-xl outline-none bg-slate-200"
          onChange={(e) => setQuery(e.target.value)}
        />

        {searchIcon && (
          <div className="absolute right-4 top-2 cursor-pointer">
            <AiOutlineSearch size={24} />
          </div>
        )}
      </div>
      </div>
      
      <div className="w-full my-2">
        {data?.length > 0 ? (
          <div className={`block px-2 `} style={{ maxHeight: "80vh" }}>
            {data.map((chick, index) => {
              return (
                <div key={index} className="my-2 cursor-pointer">
                  <div
                    className="flex"
                    onClick={() =>
                      navigate(`/product-details/${chick._id}`, {
                        state: { product: chick },
                      })
                    }
                  >
                    <img
                      src={`${Server}/${chick.image}`}
                      alt={chick.title}
                      className="w-[100px] h-[100px]"
                    />
                    <div className="mx-2 block">
                      <h1 className="text-black">{chick.title?.length > 22 ? chick.title?.slice(0,22)+'...' : chick.title }</h1>

                      <p className="text-red-400">Ksh {chick.price}</p>
                      <Ratings rating={chick.rating?.rate} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ):(
          <div className="w-full h-[90vh] justify-center flex items-center">
            {
              query.length  > 0 ? (
                <div className="w-full h-[90vh] flex  justify-center items-center" >
                  <h1 className="text-xl">
                  No data found
                  </h1>
                </div>
              ):(
                <div className="w-full h-[90vh] flex justify-center items-center">
                  <h1 className="text-xl">
                    Your search data will appear here
                  </h1>
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
