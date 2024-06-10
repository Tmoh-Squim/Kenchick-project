import React from "react";
import { useNavigate } from "react-router-dom";
import Ratings from "../../utils/Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { Server } from "../../server";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleCardClick = () => {
    navigate(`/product-details/${product._id}`, { state: { product } });
  };

  const handleAddToCart = (product)=>{
    if(product.stock === 0){
      return toast.error('Product is currently not available in the shop')
    }else{
      dispatch(addToCart(product));
    }
  }

  return (
    <div className=" py-2 800px:w-[100%] bg-slate-50 800px:mx-2 mx-1  800px:px-4 rounded-md">
      <img
        src={`${Server}/${product.image}`}
        className="800px:w-[100%] rounded-md 800px:h-[210px] w-full h-[150px] cursor-pointer"
        alt={product.name}
        onClick={handleCardClick}
      />
      <h1>
        {product.title.length > 18
          ? product.title.slice(0, 18) + "..."
          : product.title}
      </h1>
      <Ratings rating={product.rating?.rate } />
      <div className="my-2 flex justify-between items-center">
        <h2 className="text-red-400">Ksh {product.price}</h2>

        <div className="w-max hidden 800px:block bg-blue-200 rounded-xl px-4 py-1 cursor-pointer" onClick={()=>handleAddToCart(product)}>
          <h1>Buy Now</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
