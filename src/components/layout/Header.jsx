import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../../utils/Rating";
import Cart from "../cart/Cart";
import { Server } from "../../server";
const Headerr = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.products);
  const { cartItem } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
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
            ? "bg-slate-50 h-[90px] hidden fixed top-0 z-50 shadow-md left-0 right-0 800px:block"
            : "bg-slate-50 h-[90px] z-50 hidden 800px:block shadow-md"
        }`}
      >
        <div
          className={`${
            active
              ? "hidden"
              : "flex items-end justify-end ml-auto mr-4  w-max px-5 border-b-2 border-gray-500"
          }`}
        >
          <div className="w-max mx-4">
            <h1 className="text-blue-500 font-semibold">
              Africa poutly development
            </h1>
          </div>

          <div className="w-max">
            <h1 className="text-blue-500 font-semibold">Kenya</h1>
          </div>
        </div>

        <div className="flex justify-between w-full my-4 px-2">
          <div className="800px:w-[50%] flex justify-between">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <h1 className="text-red-500 text-xl  hover:text-red-500">Home</h1>
            </div>
            <div
              className="flex items-center hover:text-red-500"
              onClick={() => navigate("/products")}
            >
              <h1 className="text-xl cursor-pointer ">Products</h1>
            </div>
            <div
              className="flex items-center relative"
              onClick={() => {
                setDropDown(!dropdown);
              }}
              onMouseOver={() => {
                setDropDown(true);
              }}
            >
              <h1 className="text-xl cursor-pointer hover:text-red-500">
                Chicks
              </h1>
              {dropdown ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}

              <div
                className={`${
                  dropdown
                    ? "p-2 bg-slate-50  absolute top-[2.5rem] w-max z-50 left-0"
                    : "hidden"
                } `}
              >
                <div className="block">
                  <h1 className="cursor-pointer hover:text-red-500">
                    Day old chicks
                  </h1>
                  <h1 className="my-[1.2rem] cursor-pointer hover:text-red-500">
                    1 week old chicks
                  </h1>
                  <h1 className="cursor-pointer hover:text-red-500">
                    3 months old chicks
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <Link to={"/about-us"}>
                <h1 className="text-xl cursor-pointer hover:text-red-500 mt-1">
                  About us
                </h1>
              </Link>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              <h1 className="text-xl cursor-pointer hover:text-red-500 mt-1">
                Contacts
              </h1>
            </div>
          </div>
          <div className="flex justify-around 800px:w-[40%] mx-2 px-2 items-center relative">
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

          <div className="800px:w-[40%] flex items-center justify-end px-5 cursor-pointer ">
            {!user && (
              <div className="flex justify-between">
                <div className="border-blue-500 border-2 px-4 rounded-lg flex justify-center items-center">
                  <Link to={"/login"} className="text-xl">
                    Login
                  </Link>
                </div>
                <div className="mx-3 border-blue-500 border-2 px-4 rounded-lg flex justify-center items-center ">
                  <Link to={"/register"}>Register</Link>
                </div>
              </div>
            )}
            <div className="flex justify-center items-center">
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

              {user && (
                <div className="border-blue-500 border-2 px-3 rounded-lg flex justify-between items-center">
                  <Link
                    to={user?.role === "Admin" ? "/admin-dashboard" : "profile"}
                  >
                    <h1 className="text-xl mt-1 text-center">Dashboard</h1>
                  </Link>
                  <AiOutlineArrowRight size={22} className="mx-1" />
                </div>
              )}
            </div>
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
  {/**mobile sidebar */}
      <div
        className={` ${
          menu ? "hidden" : ""
        } h-[70px] fixed z-50 w-full overflow-x-hidden items-center justify-between flex px-2 bg-slate-200 800px:hidden right-0 left-0 top-0`}
      >
        <div className="cursor-pointer" onClick={() => setMenu(!menu)}>
          <AiOutlineMenu size={33} />
        </div>
        <div className="cursor-pointer" onClick={() => navigate("/search")}>
          <AiOutlineSearch size={33} />
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
            <div className="w-full p-2 bg-blue-300 my-1 rounded-lg">
              <Link to={"/"}>Home</Link>
            </div>
            <div className="w-full p-2 hover:bg-blue-300 my-1 rounded-lg">
              <Link to={"/products"}>Products</Link>
            </div>
            <div
              className="w-full p-2  flex items-center hover:bg-blue-300  my-1 rounded-lg"
              onClick={() => setOpen(true)}
            >
              <h1 className=" ">Cart</h1>
              <AiOutlineShoppingCart size={25} className="mx-2 mt-[-2px]" />
            </div>

            <div className="w-full p-2  flex items-center hover:bg-blue-300  my-1 rounded-lg">
              <Link to={"/about-us"}>
                <h1>About us</h1>
              </Link>
            </div>
            <div className="w-full p-2  flex items-center hover:bg-blue-300  my-1 rounded-lg">
              <Link to={"/contact"}>
                <h1>Contact us</h1>
              </Link>
            </div>

            <div
              className=" w-full p-2  flex items-center hover:bg-blue-300  my-1 rounded-lg"
              onClick={() =>
                navigate(
                  user?.role === "Admin" ? "/admin-dashboard" : "profile"
                )
              }
            >
              <Link
                to={user?.role === "Admin" ? "/admin-dashboard" : "profile"}
                className="my-2"
              >
                Dashboard
              </Link>
              <AiOutlineUser size={25} className="mx-2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Headerr;
