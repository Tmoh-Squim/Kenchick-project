import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Server } from "../server";
import Ratings from "../utils/Rating";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-slate-100 p-1 w-full">
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
      <div className="w-full my-2">
        {data?.length > 0 && (
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
                      <h1 className="text-black">{chick.title}</h1>

                      <p className="text-red-400">Ksh {chick.price}</p>
                      <Ratings rating={chick.rating?.rate} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
