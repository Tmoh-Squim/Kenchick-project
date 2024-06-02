import React from "react";
import { useLocation } from "react-router-dom";
import Headerr from "../layout/Header";
import { Server } from "../../server";
import Ratings from "../../utils/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const dispatch = useDispatch();

  if (!product) {
    return <div>No product details available</div>;
  }

  const handleAddToCart = (product) => {
    if(product.stock === 0){
      return toast.error('Product is currently not available in the shop')
    }else{
      dispatch(addToCart(product));
    }
  };

  return (
    <div>
      <Headerr />
      <div className=" p-1">
        <div className="800px:flex block">
          <img
            src={`${Server}/${product.image}`}
            alt={product.name}
            className="800px:w-[300px] 800px:h-[300px] w-full h-[300px]"
          />

          <div className="800px:mx-6 my-2 800px:w-[40%]">
            <h1 className="text-xl text-black font-semibold">
              {product.title}
            </h1>
            <p>{product.description}</p>

            <h1 className="text-[16px] font-semibold">Ksh {product.price}</h1>

            <Ratings rating={product?.rating?.rate} />

            <div
              className="flex items-center justify-around bg-blue-500 px-4 h-max w-max py-1.5 rounded-lg my-4 hover:bg-blue-300 cursor-pointer"
              onClick={() => handleAddToCart(product)}
            >
              <h1 className="text-white font-semibold text-xl mx-2">
                Add to cart
              </h1>
              <AiOutlineShoppingCart size={25} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
