import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../../utils/Rating";
import Cart from "../cart/Cart";
import { Server } from "../../server";
const Headerr = () => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.products);
  const { cartItem } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 140) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, []);

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

  const handleNavigate = (chick) => {
    navigate(`/product-details/${chick._id}`, { state: { product: chick } });
  };

  return (
    <>
      <div
        className={`${
          active
            ? "bg-slate-100 h-[100px] hidden fixed top-0 left-0 right-0 800px:block"
            : "bg-slate-100 h-[100px] hidden 800px:block"
        }`}
      >
        <div className="flex items-end justify-end ml-auto mr-4  w-max px-5 border-b-2 border-gray-500">
          <div className="w-max mx-4">
            <h1 className="text-blue-500 font-semibold">
              Africa poutly development
            </h1>
          </div>

          <div className="w-max">
            <h1 className="text-blue-500 font-semibold">Kenya</h1>
          </div>
        </div>

        <div className="flex justify-between my-4">
          <div className="800px:w-[50%] flex justify-around">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <h1 className="text-red-500 text-xl mt-2  hover:text-red-500">
                Home
              </h1>
            </div>
            <div className="flex items-center hover:text-red-500">
              <h1 className="text-xl cursor-pointer">Coporate</h1>
              <MdKeyboardArrowDown size={25} />
            </div>
            <div className="flex items-center hover:text-red-500">
              <h1 className="text-xl cursor-pointer ">Foods</h1>
              <MdKeyboardArrowDown size={25} />
            </div>
            <div className="flex items-center hover:text-red-500">
              <h1 className="text-xl cursor-pointer">Day Old Chick</h1>
              <MdKeyboardArrowDown size={25} />
            </div>
            <div>
              <h1 className="text-xl cursor-pointer hover:text-red-500 mt-1">
                Carrers
              </h1>
            </div>
            <div>
              <h1 className="text-xl cursor-pointer hover:text-red-500 mt-1">
                Contacts
              </h1>
            </div>
          </div>
          <div className="flex justify-around 800px:w-[40%] px-2 items-center relative">
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

          <div className="800px:w-[10%] flex items-center justify-end px-5 cursor-pointer ">
            <div
              className="cursor-pointer mx-6 relative"
              onClick={() => setOpen(true)}
            >
              <AiOutlineShoppingCart size={30} />

              <div className="absolute left-3.5 w-[18px] h-[18px] top-[-1px] py-1  flex justify-center items-center rounded-full bg-green-500">
                <h1 className="text-white text-center mt-2">
                  {cartItem?.length}
                </h1>
              </div>
            </div>
            <Link to="/login">
              <AiOutlineUser size={30} />
            </Link>
          </div>
        </div>
        {data?.length > 0 && (
          <div
            className={`block absolute z-50 bg-[#000000b0] w-[30%] overflow-y-scroll left-0  px-2 h-screen  ${
              active ? "top-[100px] " : "top-[17.5%] "
            }`}
            style={{ maxHeight: "80vh" }}
          >
            {data.map((chick, index) => {
              return (
                <div
                  key={index}
                  className="my-2 cursor-pointer"
                  onClick={() => handleNavigate(chick)}
                >
                  <div className="flex">
                    <img
                      src={`${Server}/${chick.image}`}
                      alt={chick.title}
                      className="w-[100px] h-[100px]"
                    />
                    <div className="mx-2 block">
                      <h1 className="text-white">{chick.title}</h1>

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
      {open && (
        <div className="absolute top-0 left-0 right-0 bg-[#0000004b]">
          <Cart setOpen={setOpen} />
        </div>
      )}

      <div className={` ${menu ? 'hidden' : ''} h-[80px] fixed z-50 w-full overflow-x-hidden items-center flex px-2 bg-slate-200 800px:hidden right-0 left-0 top-0`}>
        <div className="cursor-pointer" onClick={() => setMenu(!menu)}>
          <AiOutlineMenu size={33} />
        </div>
      </div>

      {menu && (
        <div
          className={`${
            open ? "hidden" : ""
          } h-full w-[70%] z-50 bg-white top-0 py-2 px-3 fixed left-0 `}
        >
          <div className="flex justify-end" onClick={() => setMenu(!menu)}>
            <AiOutlineClose size={30} />
          </div>
          <div className="my-2 block h-full w-full justify-center">
            <div className="w-full p-2 bg-blue-300">
              <Link to={"/"}>Home</Link>
            </div>
            <div
              className="w-full p-2 bg-blue-300"
              onClick={() => setOpen(true)}
            >
              <h1>
                Cart <AiOutlineShoppingCart />
              </h1>
            </div>

            <Link to={"/profile"} className="my-2">
              Profile
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Headerr;
