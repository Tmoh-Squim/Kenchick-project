import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createProducti, getProducts } from "../../redux/product";
import Loader from "../../utils/Loader";
const token = localStorage.getItem("token");
const CreateProduct = () => {
  const [error, setError] = useState(false);
  const {success,loading} = useSelector((state)=>state.createProduct);
  const {categories} = useSelector((state)=>state.categories);

  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }

  }, [image]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    files.map((file) => setImage(file));
  };

  const handleCreateProduct = async () => {
    try {
      if (
        image === null ||
        title.length === "" ||
        category.length === "" ||
        stock.length === "" ||
        price.length === "" ||
        title.description === ""
      ) {
        return toast.error("All fields are required");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("description", description);
      dispatch(createProducti(formData))
      
    } catch (error) {
      toast.error("Something went wrong! try again later");
    }
  };
  useEffect(()=>{
    if(success === true){
      dispatch(getProducts())
      setTitle("");
      setDesription("");
      setCategory("");
      setStock("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
    }
  },[success])

  return (
    <div>
      {
        loading ? (
          <div className="w-full h-screen bg-white flex justify-center items-center">
          <Loader />
        </div>
        ):(
          <div className="800px:flex block justify-center  items-center ">
        <div className=" py-4 rounded-md px-2 800px:mx-4 block my-4 800px:w-[60%]  800px:my-0">
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
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="category">Choose category</option>
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
              min={1}
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
              min={1}
              onChange={(e) => setStock(e.target.value)}
            />
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <div className="cursor-pointer">
              <label htmlFor="image">
                <AiOutlinePlusCircle
                  size={28}
                  color="black"
                  className="cursor-poinnter"
                />
              </label>
            </div>
            {image !== null && (
              <img
                src={imagePreview}
                alt=""
                className="w-[80px] h-[80px]"
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
        )
      }
    </div>
  );
};

export default CreateProduct;
