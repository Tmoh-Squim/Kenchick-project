import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Server, Server_Url } from "../../server";
import { useLocation } from "react-router-dom";
import Headerr from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProducti } from "../../redux/product";
import Loader from "../../utils/Loader";

const UpdateProduct = () => {
  const location = useLocation();
  const product = location.state.product;
  const {success,loading} = useSelector((state)=>state.updateProduct);
  const {categories} = useSelector((state)=>state.categories)
  const dispatch = useDispatch();

  const [error] = useState(false);
  const [title, setTitle] = useState(product?.title);
  const [description, setDesription] = useState(product?.description);
  const [category, setCategory] = useState(product?.category);
  const [stock, setStock] = useState(product?.stock);
  const [price, setPrice] = useState(product?.price);
  const [image] = useState(product?.image);

  const id = product?._id;
  const handleCreateProduct = async () => {
    try {
      const product = {
        id:id,
        title: title,
        description: description,
        stock: stock,
        price: price,
        category: category,
      };
      dispatch(updateProducti(product))
    } catch (error) {
      toast.error("Something went wrong! try again later");
    }
  };
  useEffect(() => {
    if(success === true){
      dispatch(getProducts())
    }
  }, [success]);
  return (
    <>
    {
      loading ? (
        <div className="w-full h-screen bg-white flex justify-center items-center">
        <Loader />
      </div>
      ):(
        <div className="h-[100vh] overflow-y-scroll">
      <Headerr />
      <h1 className="text-2xl text-center my-2">Update Product</h1>
      <div className="800px:flex block h-[100vh]  justify-center  items-center mt-[35px] ">
        <div className="bg-white py-4 rounded-md px-2 800px:mx-4 block  800px:w-[60%]  ">
          <div className="block py-2">
            <div>
              <label htmlFor="county" className="text-gray-500">
                Enter product name <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter product name"
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              style={{ color: "black" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="block py-2">
            <div>
              <label htmlFor="county" className="text-gray-500">
                Enter product description{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              type="text"
              placeholder="Enter product description"
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              style={{ color: "black" }}
              value={description}
              onChange={(e) => setDesription(e.target.value)}
            />
          </div>
          <div className="block py-2">
            <div>
              <label htmlFor="county" className="text-gray-500">
                Choose product Category <span className="text-red-500">*</span>
              </label>
            </div>
            <select
              name="categories"
              id="categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
            >
              {category?.legth < 0 && (
                <option value="category">Choose category</option>
              )}
                {categories?.map((category,index) => (
                <option
                  key={index}
                  style={{ color: "black" }}
                  value={category?.name}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="block py-2">
            <div>
              <label htmlFor="county" className="text-gray-500">
                Enter Product Price <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="number"
              placeholder="Enter product price"
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              style={{ color: "black" }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="block py-2">
            <div>
              <label htmlFor="county" className="text-gray-500">
                Enter Product Stock <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="number"
              placeholder="Enter product stock"
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              style={{ color: "black" }}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            {image !== null && (
              <img
                src={`${Server}/${image}`}
                alt=""
                className="w-[80px] h-[80px] my-2"
              />
            )}
          </div>

          <div
            className="bg-blue-500 px-4 mt-2 800px:mt-4 py-1.5 rounded-lg hover:bg-blue-300 cursor-pointer"
            onClick={handleCreateProduct}
          >
            <h1 className="text-center text-white text-[20px] font-semibold">
              Submit
            </h1>
          </div>
        </div>
      </div>
    </div>
      )
    }
    </>
  );
};

export default UpdateProduct;
